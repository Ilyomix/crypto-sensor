"use client";

import React, { useEffect, useRef } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-minimal.css';
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
    return { 
      numericValue: parseFloat(percentageMatch[1]), 
      isPercentage: true 
    };
  }
  
  const numericValue = parseFloat(value);
  return { 
    numericValue: isNaN(numericValue) ? 0 : numericValue, 
    isPercentage: false 
  };
}

export function AnimatedValue({ 
  value, 
  format = '(,ddd)', 
  duration = 100,
  animation = 'slide',
  className = ''
}: OdometerProps) {
  const odometerRef = useRef<HTMLDivElement>(null);
  const odometerInstance = useRef<any>(null);
  const { numericValue, isPercentage } = parseValue(value);
  const initialRender = useRef(true);

  useEffect(() => {
    const initOdometer = () => {
      if (!odometerRef.current) return;

      // Clean up previous instance if it exists
      if (odometerInstance.current) {
        odometerInstance.current.el.innerHTML = '';
      }

      // Set random duration seed for CSS
      if (odometerRef.current) {
        odometerRef.current.style.setProperty('--random-duration', (Math.random() * 1000).toString());
      }

      // Create new instance
      odometerInstance.current = new (Odometer as any)({
        el: odometerRef.current,
        value: isPercentage ? Number(0).toFixed(2) : 0,
        format: isPercentage ? '(,ddd).dd' : format,
        duration,
        animation,
        theme: 'minimal'
      });

      // Set initial value immediately without animation
      if (initialRender.current) {
        requestAnimationFrame(() => {
          if (odometerInstance.current) {
            odometerInstance.current.update(isPercentage ? Number(numericValue).toFixed(2) : numericValue);
          }
          initialRender.current = false;
        });
      }
    };

    // Initialize odometer
    initOdometer();

    // Update value with animation for subsequent changes
    if (!initialRender.current && odometerInstance.current) {
      // Set new random duration seed for CSS
      if (odometerRef.current) {
        odometerRef.current.style.setProperty('--random-duration', Math.random().toString());
      }
      
      // Update the value
      setTimeout(() => {
        if (odometerInstance.current) {
          odometerInstance.current.update(isPercentage ? Number(numericValue).toFixed(2) : numericValue);
        }
      }, 0);
    }

    return () => {
      if (odometerInstance.current) {
        odometerInstance.current.el.innerHTML = '';
      }
    };
  }, [numericValue, format, duration, animation, isPercentage]);

  return (
    <div className="flex items-center">
      <div 
        ref={odometerRef} 
        className={`odometer ${className}`}
        style={{ display: 'inline-block' }}
      />
      {isPercentage && <span className="ml-0.5">%</span>}
    </div>
  );
}
