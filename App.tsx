
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useWindowManager } from './store';
import { DesktopIcons } from './components/DesktopIcons';
import { WindowChrome } from './components/WindowChrome';
import {
  AboutApp,
  ProjectsApp,
  WritingApp,
  ResumeApp,
  ImpactApp,
  ContactApp,
  TerminalApp,
  MusicApp,
  TrashApp,
  ChangelogApp,
  FeedbackApp
} from './components/AppContent';
import { ICON_MAP, APPS } from './constants';
import { WindowChromeStyle, WindowState } from './types';

const App: React.FC = () => {
  const {
    windows,
    focusedId,
    isDarkMode,
    toggleDarkMode,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    moveWindow,
    resizeWindow
  } = useWindowManager();

  const [time, setTime] = useState(new Date());
  const [showPalette, setShowPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Marquee selection state
  const [marquee, setMarquee] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const [isMarqueeSelecting, setIsMarqueeSelecting] = useState(false);

  // Easter egg states
  const [toast, setToast] = useState<string | null>(null);
  const [typedKeys, setTypedKeys] = useState('');
  const [shiftClickCount, setShiftClickCount] = useState(0);
  const [cursorTrail, setCursorTrail] = useState(false);
  const [visitedApps, setVisitedApps] = useState<Set<string>>(new Set());
  const [explorerUnlocked, setExplorerUnlocked] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);

  // Console greeting easter egg
  useEffect(() => {
    console.log('%c🌙 Goodnight00 OS', 'font-size: 24px; font-weight: bold; color: #818cf8;');
    console.log('%c' + `
    ╔═══════════════════════════════════════╗
    ║  Welcome, curious developer!          ║
    ║                                       ║
    ║  Looking for secrets?                 ║
    ║  Try typing "hello" on the desktop... ║
    ║                                       ║
    ║  Or open Terminal.app for more 🤫     ║
    ╚═══════════════════════════════════════╝
    `, 'color: #22c55e; font-family: monospace;');
  }, []);

  // Track visited apps for explorer achievement
  useEffect(() => {
    if (focusedId) {
      const focusedWindow = windows.find(w => w.id === focusedId);
      if (focusedWindow) {
        setVisitedApps(prev => new Set([...prev, focusedWindow.route]));
      }
    }
  }, [focusedId, windows]);

  // Check for explorer achievement
  useEffect(() => {
    const requiredApps = ['/about', '/projects', '/writing', '/resume', '/impact', '/contact', '/terminal'];
    const hasVisitedAll = requiredApps.every(app => visitedApps.has(app));
    if (hasVisitedAll && !explorerUnlocked) {
      setExplorerUnlocked(true);
      showToast('🗺️ Explorer Achievement Unlocked! You visited every app!');
    }
  }, [visitedApps, explorerUnlocked]);

  // Window stacking achievement (5+ windows)
  useEffect(() => {
    if (windows.length >= 5) {
      showToast('🏆 Multitasker Achievement! 5+ windows open!');
    }
  }, [windows.length]);

  // Shooting star easter egg - appears randomly in dark mode
  const shootingStarRef = useRef(false);

  useEffect(() => {
    if (!isDarkMode) {
      setShowShootingStar(false);
      shootingStarRef.current = false;
      return;
    }

    let intervalId: NodeJS.Timeout;

    const checkAndTrigger = () => {
      // Only trigger if not already playing and 50% chance
      if (!shootingStarRef.current && Math.random() > 0.5) {
        shootingStarRef.current = true;
        setShowShootingStar(true);
      }
    };

    // Check every 60-120 seconds (less frequent)
    const scheduleNext = () => {
      const delay = 60000 + Math.random() * 60000; // 60-120 seconds
      intervalId = setTimeout(() => {
        checkAndTrigger();
        scheduleNext();
      }, delay);
    };

    // Initial trigger after 15-30 seconds
    const initialTimer = setTimeout(() => {
      shootingStarRef.current = true;
      setShowShootingStar(true);
      scheduleNext();
    }, 15000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(intervalId);
    };
  }, [isDarkMode]);

  // Called when shooting star video ends
  const handleShootingStarEnded = () => {
    setShowShootingStar(false);
    shootingStarRef.current = false;
  };


  // Toast helper
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts and "hello" easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setShowPalette(prev => !prev);
      }
      if (e.key === 'Escape') setShowPalette(false);

      // "Hello" typing easter egg
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        setTypedKeys(prev => {
          const newKeys = (prev + e.key.toLowerCase()).slice(-5);
          if (newKeys === 'hello') {
            showToast('👋 Hello there, curious one! Welcome to Goodnight00 OS!');
          }
          return newKeys;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Shift+Click cursor trail easter egg
  const handleGlobalClick = (e: React.MouseEvent) => {
    closeContextMenu();

    if (e.shiftKey) {
      setShiftClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 5 && !cursorTrail) {
          setCursorTrail(true);
          showToast('✨ Sparkle Mode Activated! Watch your cursor...');
          setTimeout(() => setCursorTrail(false), 10000);
          return 0;
        }
        return newCount;
      });
    }
  };

  const renderAppContent = (route: string) => {
    switch (route) {
      case '/about': return <AboutApp isDarkMode={isDarkMode} />;
      case '/projects': return <ProjectsApp isDarkMode={isDarkMode} />;
      case '/writing': return <WritingApp isDarkMode={isDarkMode} />;
      case '/resume': return <ResumeApp isDarkMode={isDarkMode} />;
      case '/impact': return <ImpactApp isDarkMode={isDarkMode} />;
      case '/contact': return <ContactApp isDarkMode={isDarkMode} />;
      case '/terminal': return <TerminalApp isDarkMode={isDarkMode} />;
      case '/music': return <MusicApp isDarkMode={isDarkMode} />;
      case '/trash': return <TrashApp isDarkMode={isDarkMode} />;
      case '/changelog': return <ChangelogApp isDarkMode={isDarkMode} />;
      case '/feedback': return <FeedbackApp isDarkMode={isDarkMode} />;
      default: return null;
    }
  };

  const filteredApps = APPS.filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  // Handle marquee selection
  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    // Only start marquee if clicking on the desktop area directly
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('desktop-area')) {
      setIsMarqueeSelecting(true);
      setMarquee({ startX: e.clientX, startY: e.clientY, endX: e.clientX, endY: e.clientY });
      closeContextMenu();
    }
  };

  const handleDesktopMouseMove = (e: React.MouseEvent) => {
    if (isMarqueeSelecting && marquee) {
      setMarquee(prev => prev ? { ...prev, endX: e.clientX, endY: e.clientY } : null);
    }
  };

  const handleDesktopMouseUp = () => {
    setIsMarqueeSelecting(false);
    setMarquee(null);
  };

  // Get marquee rectangle dimensions
  const getMarqueeRect = () => {
    if (!marquee) return null;
    return {
      left: Math.min(marquee.startX, marquee.endX),
      top: Math.min(marquee.startY, marquee.endY),
      width: Math.abs(marquee.endX - marquee.startX),
      height: Math.abs(marquee.endY - marquee.startY),
    };
  };

  const marqueeRect = getMarqueeRect();

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none ${isDarkMode ? 'bg-slate-900' : 'bg-stone-100'} ${cursorTrail ? 'cursor-sparkle' : ''}`}
      style={{ margin: 0, padding: 0 }}
      onContextMenu={handleContextMenu}
      onClick={handleGlobalClick}
    >

      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background wallpaper - switches based on dark mode */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: isDarkMode ? "url('/assets/wallpaper-dark.jpeg')" : "url('/assets/wallpaper.jpeg')",
            filter: isDarkMode ? "brightness(0.9) contrast(1.05) saturate(1.0)" : "brightness(1.05) contrast(0.95) saturate(1.1)"
          }}
        />

        {/* Overlay effects */}
        {isDarkMode ? (
          <>
            {/* Dark mode: Moonlight glow */}
            <div className="absolute top-0 right-[20%] w-32 h-32 bg-amber-200/20 rounded-full blur-[80px] pointer-events-none" />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 pointer-events-none" />
            {/* Shooting star easter egg */}
            {showShootingStar && (
              <video
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                onEnded={handleShootingStarEnded}
              >
                <source src="/assets/shooting-star.mp4" type="video/mp4" />
              </video>
            )}
          </>
        ) : (
          <>
            {/* Light mode: Watercolor Wash Layer */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-teal-500/10 via-transparent to-amber-500/20 mix-blend-overlay" />
            {/* Animated Sunlight Ray */}
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-bl from-white/30 to-transparent blur-[120px] transform -rotate-12 pointer-events-none opacity-60 animate-pulse" />
          </>
        )}

        {/* Foreground vignetting for depth */}
        <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'shadow-[inset_0px_0px_150px_rgba(0,0,0,0.4)]' : 'shadow-[inset_0px_0px_100px_rgba(0,0,0,0.1)]'}`} />
      </div>

      {/* Main OS Layer */}
      <div className="relative z-10 w-full h-full flex flex-col">

        {/* Top Bar - Sleek Dock Style */}
        <div className="h-10 w-full bg-gradient-to-r from-stone-900/80 via-stone-800/80 to-stone-900/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 shadow-lg z-[200]">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-white/90">
              <span className="text-lg">🌙</span>
              <span className="serif tracking-tight text-sm">Goodnight00</span>
            </div>

            {/* Divider */}
            {windows.length > 0 && <div className="w-px h-5 bg-white/20" />}

            {/* Open Windows as Pills */}
            <div className="flex items-center gap-1.5">
              {windows.map(w => (
                <button
                  key={w.id}
                  onClick={() => restoreWindow(w.id)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg transition-all duration-300 font-medium flex items-center gap-1.5 ${focusedId === w.id
                    ? 'bg-white/20 text-white shadow-inner border border-white/20'
                    : w.minimized
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30 hover:bg-amber-500/30'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/15 hover:text-white'
                    }`}
                >
                  {w.minimized && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                  {!w.minimized && focusedId === w.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  {w.title.replace('.app', '').replace('.pdf', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Dark Mode Toggle & Time */}
          <div className="flex items-center gap-3 text-white/70 text-xs font-medium">
            {/* Dark Mode Toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 active:scale-95"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <span className="text-amber-300">☀️</span>
              ) : (
                <span className="text-indigo-300">🌙</span>
              )}
            </button>
            <div className="w-px h-4 bg-white/20" />
            <span className="font-mono tracking-wider">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div
          className="flex-1 relative desktop-area"
          onMouseDown={handleDesktopMouseDown}
          onMouseMove={handleDesktopMouseMove}
          onMouseUp={handleDesktopMouseUp}
          onMouseLeave={handleDesktopMouseUp}
        >
          <DesktopIcons onOpenApp={openWindow} isDarkMode={isDarkMode} />

          {/* Windows Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {windows.filter(w => !w.minimized).map((w) => (
              <DraggableWindow
                key={w.id}
                windowState={w}
                otherWindows={windows.filter(ow => ow.id !== w.id && !ow.minimized)}
                isFocused={focusedId === w.id}
                onFocus={() => focusWindow(w.id)}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onMaximize={() => maximizeWindow(w.id)}
                onMove={(pos) => moveWindow(w.id, pos)}
                onResize={(size) => resizeWindow(w.id, size)}
              >
                {renderAppContent(w.route)}
              </DraggableWindow>
            ))}
          </div>
        </div>
      </div>

      {/* Command Palette */}
      {showPalette && (
        <div className={`fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4 ${isDarkMode ? 'bg-black/50' : 'bg-stone-900/20'} backdrop-blur-md`}>
          <div className={`w-full max-w-xl rounded-2xl shadow-2xl border overflow-hidden transform animate-in fade-in slide-in-from-top-4 duration-200 backdrop-blur-2xl ${isDarkMode ? 'bg-slate-800/95 border-slate-600/50' : 'bg-white/95 border-stone-200/50'
            }`}>
            <div className={`flex items-center px-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-stone-100'}`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-stone-400'}>{ICON_MAP.search}</span>
              <input
                autoFocus
                placeholder="Search apps, projects, posts..."
                className={`w-full p-5 outline-none bg-transparent font-medium ${isDarkMode ? 'text-white placeholder-slate-500' : 'text-stone-700'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono border rounded ${isDarkMode ? 'text-slate-400 border-slate-600' : 'text-stone-400 border-stone-200'
                }`}>ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-3">
              <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 ${isDarkMode ? 'text-slate-500' : 'text-stone-400'}`}>Quick Navigation</div>
              {filteredApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => { openWindow(app.route); setShowPalette(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-teal-50 text-stone-700'
                    }`}
                >
                  <div className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-slate-700 group-hover:bg-slate-600' : 'bg-stone-100 group-hover:bg-white group-hover:shadow-sm'
                    }`}>{ICON_MAP[app.icon]}</div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-sm">{app.title}</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-stone-400'}`}>Launch Application</span>
                  </div>
                </button>
              ))}
            </div>
            <div className={`p-3 border-t flex justify-between text-[10px] ${isDarkMode ? 'bg-slate-900/50 border-slate-700 text-slate-500' : 'bg-stone-50/80 border-stone-100 text-stone-400'
              }`}>
              <span>Press / to search anytime</span>
              <span>Arrow keys to navigate</span>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setShowPalette(false)} />
        </div>
      )}

      {/* Right-Click Context Menu */}
      {contextMenu && (
        <div
          className={`fixed z-[2000] rounded-xl shadow-2xl border overflow-hidden backdrop-blur-xl ${isDarkMode
            ? 'bg-slate-800/95 border-slate-600/50'
            : 'bg-white/95 border-stone-200/50'
            }`}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-1 min-w-[180px]">
            <button
              onClick={() => { openWindow('/about'); closeContextMenu(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-stone-100 text-stone-700'
                }`}
            >
              <span>📄</span> New Window
            </button>
            <button
              onClick={() => { setShowPalette(true); closeContextMenu(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-stone-100 text-stone-700'
                }`}
            >
              <span>🔍</span> Search Apps
              <span className="ml-auto text-[10px] opacity-50">⌘K</span>
            </button>

            <div className={`my-1 h-px ${isDarkMode ? 'bg-white/10' : 'bg-stone-200'}`} />

            <button
              onClick={() => { toggleDarkMode(); closeContextMenu(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-stone-100 text-stone-700'
                }`}
            >
              {isDarkMode ? <span>☀️</span> : <span>🌙</span>}
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <button
              onClick={() => { window.location.reload(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-stone-100 text-stone-700'
                }`}
            >
              <span>🔄</span> Refresh Desktop
            </button>

            <div className={`my-1 h-px ${isDarkMode ? 'bg-white/10' : 'bg-stone-200'}`} />

            <button
              onClick={() => { openWindow('/about'); closeContextMenu(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-stone-100 text-stone-700'
                }`}
            >
              <span>ℹ️</span> About Goodnight00
            </button>
          </div>
        </div>
      )}

      {/* Marquee Selection Box */}
      {marqueeRect && marqueeRect.width > 5 && marqueeRect.height > 5 && (
        <div
          className="fixed pointer-events-none z-[500] border-2 border-indigo-400/60 bg-indigo-400/10 backdrop-blur-[2px] rounded-sm"
          style={{
            left: marqueeRect.left,
            top: marqueeRect.top,
            width: marqueeRect.width,
            height: marqueeRect.height,
          }}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[3000] animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className={`px-6 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl ${isDarkMode
            ? 'bg-slate-800/95 border-slate-600/50 text-white'
            : 'bg-white/95 border-stone-200 text-stone-800'
            }`}>
            <span className="font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for Draggable Windows with Snapping and Animation
const DraggableWindow: React.FC<{
  windowState: WindowState,
  otherWindows: WindowState[],
  children: React.ReactNode,
  isFocused: boolean,
  onFocus: () => void,
  onClose: () => void,
  onMinimize: () => void,
  onMaximize: () => void,
  onMove: (pos: { x: number, y: number }) => void,
  onResize: (size: { w: number, h: number }) => void,
}> = ({ windowState, otherWindows, children, isFocused, onFocus, onClose, onMinimize, onMaximize, onMove, onResize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ w: 0, h: 0, mouseX: 0, mouseY: 0 });
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  // Snap Preview state
  const [snapTarget, setSnapTarget] = useState<{ x: number, y: number, w: number, h: number } | null>(null);

  // Magnetic constants
  const SNAP_THRESHOLD = 20;
  const TOP_BAR_HEIGHT = 40;

  // Mark window as appeared after initial animation
  useEffect(() => {
    const timer = setTimeout(() => setHasAppeared(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      onMinimize();
    }, 250);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowState.position.x,
      y: e.clientY - windowState.position.y
    });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      w: windowState.size.w,
      h: windowState.size.h,
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        let currentSnap: typeof snapTarget = null;

        if (e.clientY < SNAP_THRESHOLD) {
          currentSnap = { x: 0, y: 0, w: winWidth, h: winHeight };
        } else if (e.clientX < SNAP_THRESHOLD) {
          currentSnap = { x: 0, y: 0, w: winWidth / 2, h: winHeight };
        } else if (e.clientX > winWidth - SNAP_THRESHOLD) {
          currentSnap = { x: winWidth / 2, y: 0, w: winWidth / 2, h: winHeight };
        }

        if (!currentSnap) {
          for (const ow of otherWindows) {
            const owRight = ow.position.x + ow.size.w;
            const owBottom = ow.position.y + ow.size.h;
            const myRight = newX + windowState.size.w;
            const myBottom = newY + windowState.size.h;

            if (Math.abs(newX - owRight) < SNAP_THRESHOLD) newX = owRight;
            if (Math.abs(myRight - ow.position.x) < SNAP_THRESHOLD) newX = ow.position.x - windowState.size.w;
            if (Math.abs(newY - owBottom) < SNAP_THRESHOLD) newY = owBottom;
            if (Math.abs(myBottom - ow.position.y) < SNAP_THRESHOLD) newY = ow.position.y - windowState.size.h;
          }
        }

        setSnapTarget(currentSnap);
        onMove({ x: newX, y: Math.max(0, newY) });
      }

      if (isResizing) {
        onResize({
          w: Math.max(300, resizeStart.w + (e.clientX - resizeStart.mouseX)),
          h: Math.max(200, resizeStart.h + (e.clientY - resizeStart.mouseY))
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging && snapTarget) {
        onMove({ x: snapTarget.x, y: snapTarget.y });
        onResize({ w: snapTarget.w, h: snapTarget.h });
      }
      setIsDragging(false);
      setIsResizing(false);
      setSnapTarget(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, onMove, onResize, otherWindows, windowState.size, snapTarget]);

  return (
    <>
      {snapTarget && (
        <div
          className="fixed pointer-events-none z-[999] border-2 border-indigo-400/40 bg-indigo-100/10 backdrop-blur-[4px] rounded-lg transition-all duration-300 shadow-inner"
          style={{
            left: snapTarget.x,
            top: snapTarget.y,
            width: snapTarget.w,
            height: snapTarget.h
          }}
        />
      )}

      <div
        className={`absolute pointer-events-auto transition-shadow duration-500 ${isFocused ? 'z-[100]' : 'z-[50]'} ${!hasAppeared ? 'window-open' : ''} ${isMinimizing ? 'window-minimize' : ''}`}
        style={{
          left: windowState.position.x,
          top: windowState.position.y,
          width: windowState.size.w,
          height: windowState.size.h,
          zIndex: windowState.zIndex,
          transition: isDragging || isResizing
            ? 'none'
            : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onClick={onFocus}
      >
        <WindowChrome
          title={windowState.title}
          style={windowState.chromeStyle}
          isFocused={isFocused}
          onClose={onClose}
          onMinimize={handleMinimize}
          onMaximize={onMaximize}
          dragHandleProps={{ onMouseDown: handleMouseDown }}
        >
          {children}
        </WindowChrome>

        {!windowState.maximized && (
          <div
            onMouseDown={handleResizeStart}
            className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize flex items-end justify-end p-1 overflow-hidden"
          >
            <div className="w-3 h-3 border-r-2 border-b-2 border-stone-400 rotate-45 transform translate-x-1 translate-y-1 opacity-20" />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
