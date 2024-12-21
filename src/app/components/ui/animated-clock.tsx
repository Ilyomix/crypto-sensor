"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Clock4 } from 'lucide-react';
import { cn } from '@/src/app/lib/utils';

interface AnimatedClockProps {
  timestamp: string;
  className?: string;
}

export function AnimatedClock({ timestamp, className }: AnimatedClockProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayText, setDisplayText] = useState(timestamp);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start update animation
    setIsUpdating(true);

    // Slide out current text
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateY(-2.5px)';
      containerRef.current.style.opacity = '0';
    }

    // Reset initial position of the clock

    // After slide out, update text and slide in
    timeoutRef.current = setTimeout(() => {
      setDisplayText(timestamp);
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateY(2.5px)';
        containerRef.current.style.opacity = '0';
      }
      
      // Reset updating state
      timeoutRef.current = setTimeout(() => {
        setIsUpdating(false);
      }, 150);
    }, 150);

    timeoutRef.current = setTimeout(() => {
      setDisplayText(timestamp);
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateY(0px)';
        containerRef.current.style.opacity = '1';
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timestamp]);

  return (
    <div className={cn(
      "text-sm text-gray-400 flex gap-2 items-center",
      className
    )}>
      <Clock4 
        size={18}
        className={cn(
          "transition-transform duration-500 ease-out",
          isUpdating ? "rotate-180" : "rotate-0"
        )}
      />
      Last updated:
      <div 
        ref={containerRef}
        style={{
          transform: 'translateY(0px)',
          opacity: '1'
        }}
        className="transition-all duration-150 ease-out"
      >
        {displayText}
      </div>
    </div>
  );
}
