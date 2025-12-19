
import React from 'react';
import { WindowChromeStyle } from '../types';
import { Minus, Square, X } from 'lucide-react';

interface WindowChromeProps {
  title: string;
  style: WindowChromeStyle;
  isFocused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
  dragHandleProps?: any;
}

export const WindowChrome: React.FC<WindowChromeProps> = ({
  title,
  style,
  isFocused,
  onClose,
  onMinimize,
  onMaximize,
  children,
  dragHandleProps,
}) => {
  const getStyles = () => {
    switch (style) {
      case WindowChromeStyle.WOOD:
        return {
          container: `bg-[#f4e4bc] border-4 border-[#8b5e34] shadow-xl rounded-sm`,
          header: `bg-[#8b5e34] text-white px-3 py-1 flex items-center justify-between cursor-grab active:cursor-grabbing`,
          content: `p-4 h-full overflow-auto text-stone-800`,
          button: `hover:bg-[#a07a56] rounded p-1 transition-all duration-200 active:scale-90`,
          closeButton: `hover:bg-red-900/40 hover:rotate-90 hover:scale-110`,
        };
      case WindowChromeStyle.LANTERN:
        return {
          container: `bg-orange-50/90 border-2 border-orange-200 shadow-2xl rounded-xl backdrop-blur-sm`,
          header: `bg-orange-100/50 px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing rounded-t-xl`,
          content: `p-6 h-full overflow-auto`,
          button: `hover:bg-orange-200/50 rounded-full p-1 transition-all duration-200 active:scale-90`,
          closeButton: `hover:bg-red-200/50 hover:text-red-700 hover:rotate-90 hover:scale-110`,
        };
      case WindowChromeStyle.SLATE:
        return {
          container: `bg-slate-900/95 border border-slate-700/50 shadow-2xl rounded-lg backdrop-blur-md`,
          header: `bg-slate-800/80 border-b border-slate-700/50 px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing rounded-t-lg`,
          content: `p-6 h-full overflow-auto text-slate-300 font-sans selection:bg-teal-500/30`,
          button: `hover:bg-slate-700 text-slate-400 hover:text-slate-100 rounded-md p-1 transition-all duration-200 active:scale-90`,
          closeButton: `hover:bg-rose-500/20 hover:text-rose-400 hover:rotate-90 hover:scale-110`,
        };
      case WindowChromeStyle.PAPER:
      default:
        return {
          container: `bg-[#fefcf0] border border-stone-300 shadow-lg rounded-sm`,
          header: `bg-[#fdf6e3] border-b border-stone-200 px-3 py-1.5 flex items-center justify-between cursor-grab active:cursor-grabbing`,
          content: `p-6 h-full overflow-auto font-serif`,
          button: `hover:bg-stone-200/50 rounded p-1 transition-all duration-200 active:scale-90`,
          closeButton: `hover:bg-red-50 hover:text-red-600 hover:rotate-90 hover:scale-110`,
        };
    }
  };

  const classes = getStyles();
  const isDarkTheme = style === WindowChromeStyle.WOOD || style === WindowChromeStyle.SLATE;

  return (
    <div className={`flex flex-col h-full ${classes.container} ${isFocused ? 'ring-2 ring-indigo-400/30' : 'opacity-95'}`}>
      <div
        {...dragHandleProps}
        onDoubleClick={onMaximize}
        className={classes.header}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold tracking-wide ${isDarkTheme ? 'text-white' : 'text-stone-600'
            }`}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className={classes.button}
            title="Minimize"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className={classes.button}
            title="Maximize"
          >
            <Square size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className={`${classes.button} ${classes.closeButton}`}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};
