
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Loader2 } from 'lucide-react';
import { getZakatGuidance } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAdvisorProps {
  context?: string;
  isOpen: boolean;
  onClose: () => void;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ context, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Assalamu Alaikum! I'm your AI Zakat Advisor. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getZakatGuidance(userMsg, context);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col animate-in slide-in-from-bottom-full duration-300">
      <header className="bg-emerald-900 text-white pt-12 pb-6 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold">AI Advisor</h3>
            <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Islamic Financial Intelligence</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
              msg.role === 'user' 
              ? 'bg-emerald-600 text-white rounded-br-none' 
              : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 flex items-center space-x-3">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consulting Rulings...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pb-12 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-2xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Zakat rules..."
            className="flex-grow bg-transparent border-none px-4 py-3 text-sm focus:outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 shadow-lg shadow-emerald-600/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
