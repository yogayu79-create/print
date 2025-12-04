import React, { useState, useRef } from 'react';
import { TypewriterConsole } from './components/TypewriterConsole';
import { PrintedCard } from './components/PrintedCard';
import { CardData } from './types';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate a random position around the center, but slightly offset so they don't pile up exactly
  const getRandomPosition = () => {
    if (!containerRef.current) return { x: 0, y: 200 };
    
    // Get container dimensions
    const { clientWidth, clientHeight } = containerRef.current;
    
    // Bias towards the bottom half of the screen where "paper" falls
    const x = (Math.random() - 0.5) * (clientWidth * 0.4); 
    const y = 150 + Math.random() * 200; 
    const rotation = (Math.random() - 0.5) * 10; // Slight tilt
    
    return { x, y, rotation };
  };

  const handlePrint = (text: string, type: 'manual' | 'ai-enhanced') => {
    const { x, y, rotation } = getRandomPosition();
    
    const newCard: CardData = {
      id: uuidv4(),
      text,
      timestamp: new Date().toLocaleTimeString(),
      x,
      y,
      rotation,
      type
    };

    setCards((prev) => [...prev, newCard]);
  };

  return (
    <div className="relative w-full h-screen bg-[#1a1a1a] overflow-hidden flex flex-col items-center">
      
      {/* Background Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      {/* Radial Gradient for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>

      {/* Main Content Container (Ref for Drag Constraints) */}
      <div 
        ref={containerRef} 
        className="relative w-full h-full flex flex-col items-center pt-10 md:pt-20 overflow-hidden"
      >
        
        {/* Title */}
        <div className="relative z-0 mb-4 text-center">
             <h1 className="text-4xl md:text-6xl text-zinc-800 font-black tracking-tighter uppercase select-none drop-shadow-md font-['Share_Tech_Mono']">
               <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-500 to-zinc-700">FIX BEEPER</span>
             </h1>
             <p className="text-zinc-600 font-['VT323'] text-xl tracking-widest mt-[-5px]">RETRO TERMINAL SYSTEM</p>
        </div>

        {/* The Machine */}
        <TypewriterConsole 
            onPrint={handlePrint} 
            isPrinting={false} // Logic simplified for visual effect; in real app might track queue
        />

        {/* Generated Cards Zone */}
        {/* We map cards here. They are absolutely positioned relative to this container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* We enable pointer events on the cards themselves */}
            <div className="w-full h-full relative pointer-events-auto">
                {cards.map((card) => (
                    <PrintedCard 
                        key={card.id} 
                        data={card} 
                        containerRef={containerRef} 
                    />
                ))}
            </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="absolute bottom-4 right-4 text-zinc-700 text-xs font-['Share_Tech_Mono'] opacity-50 select-none">
         SYS.VER.2.5.FLASH // READY
      </div>
    </div>
  );
}