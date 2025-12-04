import React, { useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { GripVertical, XCircle, Zap } from 'lucide-react';
import { PrintedCardProps } from '../types';

export const PrintedCard: React.FC<PrintedCardProps> = ({ data, containerRef }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const controls = useDragControls();

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    const speed = 40; // ms per char

    const interval = setInterval(() => {
      setDisplayedText(data.text.slice(0, index + 1));
      index++;

      if (index >= data.text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [data.text]);

  return (
    <motion.div
      drag
      dragControls={controls}
      dragConstraints={containerRef}
      dragMomentum={false}
      initial={{ y: -100, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      whileDrag={{ scale: 1.05, rotate: 2, zIndex: 100, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
      style={{ x: data.x, y: data.y, rotate: data.rotation }}
      className={`absolute w-72 bg-[#f0f0e6] text-zinc-900 shadow-lg p-4 font-['Special_Elite'] text-lg leading-snug cursor-grab active:cursor-grabbing
        ${isTyping ? 'border-t-4 border-amber-500' : 'border-t-4 border-zinc-800'}
      `}
    >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

        {/* Header / Meta */}
        <div className="flex justify-between items-center mb-3 border-b-2 border-zinc-300 pb-1 relative z-10">
            <div className="flex items-center gap-1 opacity-60">
                {data.type === 'ai-enhanced' && <Zap size={14} className="text-amber-600" />}
                <span className="text-xs font-['Share_Tech_Mono']">{data.timestamp}</span>
            </div>
            
            {/* Drag Handle */}
            <div 
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-zinc-200 rounded"
                onPointerDown={(e) => controls.start(e)}
            >
                <GripVertical size={16} className="text-zinc-400" />
            </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[60px] break-words">
            {displayedText}
            {isTyping && (
                <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse align-middle"></span>
            )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t border-dashed border-zinc-300 flex justify-between items-end relative z-10">
             <div className="text-[10px] text-zinc-400 font-['Share_Tech_Mono'] uppercase tracking-widest">
                Job #{data.id.slice(-4)}
             </div>
             {data.type === 'ai-enhanced' && (
                 <div className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1 border border-amber-200">FIXED</div>
             )}
        </div>

        {/* Decorative holes like perforated paper */}
        <div className="absolute -left-1.5 top-0 bottom-0 flex flex-col justify-between py-2">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
            ))}
        </div>
        <div className="absolute -right-1.5 top-0 bottom-0 flex flex-col justify-between py-2">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
            ))}
        </div>
    </motion.div>
  );
};