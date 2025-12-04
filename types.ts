import React from 'react';

export interface CardData {
  id: string;
  text: string;
  timestamp: string;
  x: number;
  y: number;
  rotation: number;
  type: 'manual' | 'ai-enhanced';
}

export interface TypewriterConsoleProps {
  onPrint: (text: string, type: 'manual' | 'ai-enhanced') => void;
  isPrinting: boolean;
}

export interface PrintedCardProps {
  data: CardData;
  containerRef: React.RefObject<HTMLDivElement>;
}