import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Terminal, Delete } from 'lucide-react';
import { fixTextWithGemini } from '../services/geminiService';
import { TypewriterConsoleProps } from '../types';

export const TypewriterConsole: React.FC<TypewriterConsoleProps> = ({ onPrint, isPrinting }) => {
  const [input, setInput] = useState('');
  const [isFixing, setIsFixing] = useState(false);
  const [blinking, setBlinking] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => setBlinking(b => !b), 530);
    return () => clearInterval(interval);
  }, []);

  const handleManualPrint = () => {
    if (!input.trim() || isPrinting) return;
    onPrint(input, 'manual');
    setInput('');
  };

  const handleAiFixAndPrint = async () => {
    if (!input.trim() || isPrinting || isFixing) return;
    
    setIsFixing(true);
    try {
      const fixed = await fixTextWithGemini(input);
      onPrint(fixed, 'ai-enhanced');
      setInput('');
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="relative z-50 flex flex-col items-center justify-center p-4">
      {/* Device Casing */}
      <div className="w-full max-w-lg bg-zinc-800 rounded-lg shadow-2xl border-b-8 border-r-8 border-zinc-950 p-6 relative overflow-hidden">
        
        {/* Decorative Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-zinc-700 shadow-inner border border-zinc-900 flex items-center justify-center"><div className="w-2 h-0.5 bg-zinc-900 rotate-45"></div></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-zinc-700 shadow-inner border border-zinc-900 flex items-center justify-center"><div className="w-2 h-0.5 bg-zinc-900 rotate-45"></div></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-zinc-700 shadow-inner border border-zinc-900 flex items-center justify-center"><div className="w-2 h-0.5 bg-zinc-900 rotate-45"></div></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-zinc-700 shadow-inner border border-zinc-900 flex items-center justify-center"><div className="w-2 h-0.5 bg-zinc-900 rotate-45"></div></div>

        {/* Branding */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
            <span className="text-zinc-400 font-bold text-xs tracking-widest uppercase font-[Share Tech Mono]">Moto-Fix Beeper 9000</span>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-2 bg-zinc-900 rounded-sm"></div>
            <div className="w-8 h-2 bg-zinc-900 rounded-sm"></div>
            <div className="w-8 h-2 bg-zinc-900 rounded-sm"></div>
          </div>
        </div>

        {/* Screen Bezel */}
        <div className="bg-zinc-900 p-4 rounded-md shadow-[inset_0_2px_10px_rgba(0,0,0,1)] mb-6 border-b border-zinc-700">
          {/* LCD Screen */}
          <div className="bg-[#4a5c48] h-32 w-full rounded border-4 border-[#3a4c38] shadow-inner relative overflow-hidden flex flex-col p-2">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPrinting || isFixing}
              placeholder="INITIATING INPUT SEQUENCE..."
              className="w-full h-full bg-transparent border-none outline-none resize-none text-[#111] font-['VT323'] text-2xl leading-none placeholder-[#2b382a] z-20"
              spellCheck={false}
            />
            
            {/* Blinking Cursor Block */}
            {!input && blinking && (
              <div className="absolute top-3 left-2 w-3 h-5 bg-[#111] opacity-50 z-10 pointer-events-none"></div>
            )}

            {/* Status Line */}
            <div className="mt-auto flex justify-between text-[#111] font-['VT323'] text-sm uppercase z-20 opacity-70">
              <span>{isFixing ? 'UPLINKING TO GEMINI...' : isPrinting ? 'PRINTING...' : 'READY'}</span>
              <span>CHAR: {input.length}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleManualPrint}
            disabled={isPrinting || isFixing || !input}
            className={`group relative flex items-center justify-center gap-2 p-3 bg-zinc-200 border-b-4 border-zinc-400 rounded active:border-b-0 active:translate-y-1 transition-all ${(!input || isPrinting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
          >
            <Send className="w-5 h-5 text-zinc-800" />
            <span className="font-bold text-zinc-800 tracking-wider">PRINT</span>
          </button>

          <button
            onClick={handleAiFixAndPrint}
            disabled={isPrinting || isFixing || !input}
            className={`group relative flex items-center justify-center gap-2 p-3 bg-amber-600 border-b-4 border-amber-800 rounded active:border-b-0 active:translate-y-1 transition-all ${(!input || isPrinting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-500'}`}
          >
            {isFixing ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            )}
            <span className="font-bold text-white tracking-wider">FIX & PRINT</span>
          </button>
        </div>
        
        {/* Keyboard Decor */}
        <div className="mt-6 grid grid-cols-6 gap-1 opacity-40 pointer-events-none select-none">
             {[...Array(12)].map((_, i) => (
               <div key={i} className="h-4 bg-zinc-700 rounded-sm shadow-sm"></div>
             ))}
        </div>

      </div>
      
      {/* Paper Feed Slot Visual */}
      <div className="w-[90%] h-4 bg-zinc-950 mt-[-2px] rounded-b-xl relative z-40 mx-auto shadow-xl"></div>
    </div>
  );
};