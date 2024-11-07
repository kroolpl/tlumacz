import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up';
  delay?: number;
  className?: string;
}

export default function AnimatedElement({ 
  children, 
  animation = 'fade-up',
  delay = 0,
  className = ''
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={elementRef} 
      className={`animation-${animation} ${className}`}
    >
      {children}
    </div>
  );
}