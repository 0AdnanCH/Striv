import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { cn } from '../../../../utils/cn.util'; 

export const IdentityImageViewer = ({ src, label }: { src: string; label: string }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
      <div
        className={cn('relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all duration-300 cursor-zoom-in', isZoomed ? 'h-[500px]' : 'h-48')}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img src={src} alt={label} className={cn('w-full h-full object-contain transition-transform duration-500', isZoomed ? 'scale-150' : 'scale-100')} />
        {!isZoomed && (
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              <ZoomIn size={14} /> Click to Inspect
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
