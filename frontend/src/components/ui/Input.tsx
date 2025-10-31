import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-md border border-striv-muted/60 bg-white/60 px-3 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40 focus:outline-none transition-all duration-200',
        'backdrop-blur-sm shadow-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
