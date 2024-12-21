"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './odometer.css';

interface OdometerProps {
  value: number | string;
  format?: string;
  duration?: number;
  animation?: 'count' | 'slide';
  className?: string;
}

function parseValue(value: number | string): { numericValue: number; isPercentage: boolean } {
  if (typeof value === 'number') {
    return { numericValue: value, isPercentage: false };
  }
  
  const percentageMatch = value.match(/^([-+]?\d*\.?\d+)%$/);
  if (percentageMatch) {
    return { numericValue: parseFloat(percentageMatch[1]), isPercentage: true };
  }
  
  const numericValue = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
  return { numericValue: isNaN(numericValue) ? 0 : numericValue, isPercentage: false };
}

const AnimatedValue = ({ 
  value, 
  format = '(,ddd)', 
  duration = 100,
  animation = 'slide',
  className = ''
}: OdometerProps) => {
  const odometerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [odometerInstance, setOdometerInstance] = useState<any>(null);
  const { numericValue, isPercentage } = parseValue(value);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Odometer only on client side
    const loadOdometer = async () => {
      try {
        const Odometer = (await import('odometer')).default;
        await import('odometer/themes/odometer-theme-minimal.css');
        
        if (odometerRef.current && !odometerInstance) {
          const instance = new Odometer({
            el: odometerRef.current,
            value: 0,
            format,
            duration,
            animation
          });
          setOdometerInstance(instance);
        }
      } catch (error) {
        console.error('Error loading Odometer:', error);
      }
    };

    loadOdometer();

    return () => {
      if (odometerInstance) {
        // Clean up if needed
      }
    };
  }, []); // Empty dependency array as we only want to load Odometer once

  useEffect(() => {
    if (odometerInstance && isClient) {
      odometerInstance.update(numericValue);
    }
  }, [numericValue, odometerInstance, isClient]);

  // Server-side and initial client render
  if (!isClient) {
    return (
      <div className={className}>
        {numericValue}{isPercentage ? '%' : ''}
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={odometerRef} className="odometer" />
      {isPercentage && '%'}
    </div>
  );
};

export { AnimatedValue };
