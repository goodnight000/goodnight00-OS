
import React, { useState, useEffect, useRef } from 'react';
import { APPS, ICON_MAP } from '../constants';

interface DesktopIconsProps {
  onOpenApp: (route: string) => void;
  isDarkMode?: boolean;
}

interface IconPosition {
  x: number;
  y: number;
}

interface ContextMenuState {
  x: number;
  y: number;
  appId: string | null;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenApp, isDarkMode = false }) => {
  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ x: 0, y: 0, appId: null });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const mouseStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Initialize positions in a grid if not already set
  useEffect(() => {
    const initialPositions: Record<string, IconPosition> = {};
    const padding = 32;
    const spacingX = 110;
    const spacingY = 120;
    const iconsPerColumn = Math.floor((window.innerHeight - 100) / spacingY);

    APPS.forEach((app, index) => {
      const col = Math.floor(index / iconsPerColumn);
      const row = index % iconsPerColumn;
      initialPositions[app.id] = {
        x: padding + col * spacingX,
        y: padding + row * spacingY,
      };
    });
    setIconPositions(initialPositions);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    // Only left click for dragging
    if (e.button !== 0) return;

    // Close context menu on any left click
    setContextMenu({ x: 0, y: 0, appId: null });

    const pos = iconPositions[id] || { x: 0, y: 0 };
    setDraggingId(id);
    dragStartPos.current = { ...pos };
    mouseStartPos.current = { x: e.clientX, y: e.clientY };
    hasMoved.current = false;

    // Change global body cursor to ensure it stays 'grabbing' even if mouse leaves icon bounds during rapid movement
    document.body.style.cursor = 'grabbing';
  };

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, appId: id });
  };

  useEffect(() => {
    const handleClickOutside = () => setContextMenu({ x: 0, y: 0, appId: null });
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingId) return;

      const dx = e.clientX - mouseStartPos.current.x;
      const dy = e.clientY - mouseStartPos.current.y;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMoved.current = true;
      }

      if (hasMoved.current) {
        setIconPositions((prev) => ({
          ...prev,
          [draggingId]: {
            x: dragStartPos.current.x + dx,
            y: dragStartPos.current.y + dy,
          },
        }));
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!draggingId) return;

      if (!hasMoved.current) {
        const app = APPS.find((a) => a.id === draggingId);
        if (app) onOpenApp(app.route);
      }

      setDraggingId(null);
      // Revert global body cursor
      document.body.style.cursor = '';
    };

    if (draggingId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      // Clean up body cursor on unmount if mid-drag
      document.body.style.cursor = '';
    };
  }, [draggingId, onOpenApp]);

  const handleContextMenuAction = (action: 'open' | 'info') => {
    if (!contextMenu.appId) return;
    const app = APPS.find(a => a.id === contextMenu.appId);
    if (!app) return;

    if (action === 'open') {
      onOpenApp(app.route);
    } else if (action === 'info') {
      alert(`Application: ${app.title}\nDescription: A cozy part of Elara OS.\nRoute: ${app.route}`);
    }
    setContextMenu({ x: 0, y: 0, appId: null });
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {APPS.map((app) => {
        const pos = iconPositions[app.id] || { x: 0, y: 0 };
        const isDragging = draggingId === app.id;

        return (
          <div
            key={app.id}
            onMouseDown={(e) => handleMouseDown(e, app.id)}
            onContextMenu={(e) => handleContextMenu(e, app.id)}
            style={{
              left: pos.x,
              top: pos.y,
              zIndex: isDragging ? 1000 : 1,
            }}
            className={`absolute w-24 flex flex-col items-center gap-2 group pointer-events-auto cursor-grab select-none transition-transform active:scale-95 ${isDragging ? 'opacity-70 scale-105 cursor-grabbing' : 'hover:scale-105'
              }`}
          >
            <div className="w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              {ICON_MAP[app.icon]}
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm transition-all text-center leading-tight ${isDarkMode
              ? 'text-white/90 bg-slate-800/60 group-hover:bg-slate-700/80'
              : 'text-stone-700 bg-stone-100/30 group-hover:bg-stone-100/60'
              }`}>
              {app.title}
            </span>
          </div>
        );
      })}

      {/* Context Menu */}
      {contextMenu.appId && (
        <div
          className={`fixed z-[9999] pointer-events-auto border shadow-2xl rounded-lg py-1 w-40 overflow-hidden animate-in fade-in zoom-in-95 duration-100 ${isDarkMode
            ? 'bg-slate-800/95 border-slate-600/50 backdrop-blur-xl'
            : 'bg-[#fefcf0] border-stone-200'
            }`}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleContextMenuAction('open')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors serif font-bold flex items-center gap-2 ${isDarkMode ? 'text-white/80 hover:bg-white/10' : 'text-stone-700 hover:bg-teal-50'
              }`}
          >
            <span className="opacity-50 scale-75">🚀</span>
            Open
          </button>
          <div className={`h-px mx-2 my-1 ${isDarkMode ? 'bg-white/10' : 'bg-stone-100'}`} />
          <button
            onClick={() => handleContextMenuAction('info')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors serif italic flex items-center gap-2 ${isDarkMode ? 'text-white/60 hover:bg-white/10' : 'text-stone-500 hover:bg-amber-50'
              }`}
          >
            <span className="opacity-50 scale-75">ℹ️</span>
            Show Info
          </button>
        </div>
      )}
    </div>
  );
};
