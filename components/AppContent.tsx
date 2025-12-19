
import React from 'react';
import { PROJECTS, POSTS, IMPACT, ICON_MAP } from '../constants';
import { Project, Post, ImpactItem } from '../types';

interface AppProps {
  isDarkMode?: boolean;
}

export const AboutApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className="space-y-6">
    <header className={`flex items-center gap-6 pb-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-stone-200'}`}>
      <img src="https://picsum.photos/seed/avatar/200/200" className={`w-24 h-24 rounded-full border-4 shadow-sm ${isDarkMode ? 'border-slate-700' : 'border-stone-100'}`} alt="Portrait" />
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>Hello, I'm Elara</h1>
        <p className={`italic ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>Creative Developer & Nature Enthusiast</p>
      </div>
    </header>
    <section className={`prose leading-relaxed ${isDarkMode ? 'text-slate-300' : 'prose-stone'}`}>
      <p>
        I build digital experiences that feel like turning the pages of a well-loved sketchbook.
        My work is inspired by the intersection of technology and the tactile warmth of the analog world.
      </p>
      <h3 className={`text-xl font-bold mt-4 mb-2 ${isDarkMode ? 'text-white' : ''}`}>My Values</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Intentional Design:</strong> Every pixel should serve a purpose.</li>
        <li><strong>Cozy Systems:</strong> Technology should reduce stress, not create it.</li>
        <li><strong>Open Roots:</strong> Growing together through shared knowledge.</li>
      </ul>
    </section>
  </div>
);

export const ProjectsApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {PROJECTS.map((p: Project) => (
      <div key={p.slug} className={`group p-4 rounded-lg transition-all hover:shadow-md hover:-translate-y-1 border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-stone-200'
        }`}>
        <img src={p.imageUrl} alt={p.title} className={`w-full h-32 object-cover mb-4 rounded border ${isDarkMode ? 'border-slate-600' : 'border-stone-100'}`} />
        <h3 className={`font-bold text-lg flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>
          {p.title}
          <div className="flex gap-2">
            {p.links.github && <a href={p.links.github} className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-stone-400 hover:text-stone-600'}`}>{ICON_MAP.github}</a>}
            {p.links.site && <a href={p.links.site} className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-stone-400 hover:text-stone-600'}`}>{ICON_MAP.external}</a>}
          </div>
        </h3>
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>{p.summary}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map(t => (
            <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-stone-100 text-stone-500'
              }`}>{t}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const WritingApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className="space-y-8">
    {POSTS.map((post: Post) => (
      <article key={post.slug} className="group cursor-pointer">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-stone-800 group-hover:text-teal-700'
            }`}>{post.title}</h3>
          <time className={`text-sm font-mono ${isDarkMode ? 'text-slate-500' : 'text-stone-400'}`}>{post.date}</time>
        </div>
        <p className={`line-clamp-2 mb-2 ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>{post.summary}</p>
        <div className="flex gap-2">
          {post.tags.map(t => <span key={t} className={`text-xs italic ${isDarkMode ? 'text-indigo-400' : 'text-teal-600'}`}>#{t}</span>)}
        </div>
      </article>
    ))}
  </div>
);

export const ResumeApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className="flex flex-col items-center h-full">
    <div className={`w-full max-w-2xl p-8 shadow-sm border mb-4 font-sans text-sm ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-white border-stone-100'
      }`}>
      <div className="text-center mb-8">
        <h1 className={`text-2xl font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>Elara Thorne</h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-stone-500'}>elarathorne.dev • hello@elara.dev</p>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className={`border-b font-bold uppercase mb-2 ${isDarkMode ? 'border-slate-600 text-white' : 'border-stone-800'}`}>Experience</h2>
          <div className="mb-4">
            <div className={`flex justify-between font-bold ${isDarkMode ? 'text-white' : ''}`}>
              <span>Senior Creative Developer @ Studio Bloom</span>
              <span>2021 – Present</span>
            </div>
            <p className={`italic ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>Led the development of 20+ award-winning interactive sites.</p>
          </div>
          <div>
            <div className={`flex justify-between font-bold ${isDarkMode ? 'text-white' : ''}`}>
              <span>Frontend Architect @ Gaia Tech</span>
              <span>2018 – 2021</span>
            </div>
            <p className={`italic ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>Optimized asset delivery pipelines reducing carbon footprint by 40%.</p>
          </div>
        </div>
        <div>
          <h2 className={`border-b font-bold uppercase mb-2 ${isDarkMode ? 'border-slate-600 text-white' : 'border-stone-800'}`}>Education</h2>
          <div className={`flex justify-between font-bold ${isDarkMode ? 'text-white' : ''}`}>
            <span>B.S. Computer Science @ Redwood University</span>
            <span>2018</span>
          </div>
        </div>
      </div>
    </div>
    <button className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all active:scale-95 shadow-lg ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-stone-800 text-white hover:bg-stone-700'
      }`}>
      <FileText size={18} /> Download PDF
    </button>
  </div>
);

export const ImpactApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className="space-y-4">
    {IMPACT.map((item: ImpactItem, idx) => (
      <div key={idx} className={`flex gap-4 p-4 border-l-4 ${isDarkMode ? 'border-amber-500/50 bg-slate-800/50' : 'border-amber-200 bg-[#fffdf0]'
        }`}>
        <div className={`font-mono font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>{item.year}</div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
              }`}>{item.category}</span>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>{item.title}</h3>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export const ContactApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
    <div className={`p-4 rounded-full border-2 ${isDarkMode ? 'bg-indigo-500/20 border-indigo-400/50' : 'bg-orange-100 border-orange-200'}`}>
      <Mail size={48} className={isDarkMode ? 'text-indigo-400' : 'text-orange-600'} />
    </div>
    <div>
      <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>Let's write a story together</h2>
      <p className={isDarkMode ? 'text-slate-400' : 'text-stone-600'}>I'm always open to talking about creative code, nature conservation, or just sharing tea.</p>
    </div>
    <a href="mailto:hello@elara.dev" className={`text-xl font-bold underline decoration-wavy underline-offset-4 ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-orange-700 hover:text-orange-900'
      }`}>
      hello@elara.dev
    </a>
    <div className="flex gap-4">
      {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
        <a key={social} href="#" className={`px-4 py-1.5 rounded-full border transition-all ${isDarkMode
          ? 'border-slate-600 text-slate-400 hover:border-indigo-400 hover:text-indigo-400'
          : 'border-stone-300 text-stone-500 hover:border-orange-400 hover:text-orange-600'
          }`}>
          {social}
        </a>
      ))}
    </div>
  </div>
);

// Terminal App
export const TerminalApp: React.FC<AppProps> = ({ isDarkMode = false }) => {
  const [history, setHistory] = React.useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: '🌙 Goodnight00 Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const historyRef = React.useRef<HTMLDivElement>(null);

  const commands: Record<string, (args: string[]) => string> = {
    help: () => `
Available commands:
  help          Show this help message
  clear         Clear the terminal
  about         About this OS
  echo [text]   Echo text back
  date          Show current date and time
  whoami        Display current user
  neofetch      System information
  ls            List apps
  secret        🤫 Something special...
  hacker        ⚡ Activate hacker mode

Pro tip: There might be more secrets hidden...`,
    clear: () => 'CLEAR',
    about: () => `
🌙 Goodnight00 OS
━━━━━━━━━━━━━━━━━━━━━
A cozy, Ghibli-inspired operating system
for creative developers who appreciate
the art of slowing down.

Built with React, TypeScript, and love.
`,
    echo: (args) => args.join(' ') || '(empty)',
    date: () => new Date().toLocaleString(),
    whoami: () => '✨ guest@goodnight00',
    neofetch: () => `
   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   guest@goodnight00
  ██░░░░░░░░░░░░░░██   ─────────────────
  ██░░▓▓░░░░▓▓░░░░██   OS: Goodnight00 OS
  ██░░░░░░░░░░░░░░██   Host: Your Browser
  ██░░░░▀▀▀▀░░░░░░██   Kernel: React 19
  ██░░░░░░░░░░░░░░██   Uptime: Since you arrived
   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀   Shell: Goodnight Terminal
                       Theme: ${isDarkMode ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
                       
`,
    ls: () => `
📁 Apps
├── 👤 About.app
├── 💼 Projects.app
├── ✏️ Writing.app
├── 📄 Resume.pdf
├── 🏆 Impact.app
├── 📧 Contact.app
├── � Terminal.app
├── 🎵 Music.app
├── 📜 Changelog.app
├── � Feedback.app
└── 🗑️ Trash
`,
    secret: () => `
╔═══════════════════════════════════╗
║       🎉 SECRET FOUND! 🎉         ║
╠═══════════════════════════════════╣
║  You're curious. I like that.     ║
║                                   ║
║  Here's a haiku for you:          ║
║                                   ║
║    In the quiet code,             ║
║    Easter eggs await the bold—    ║
║    You found one, nice!           ║
║                                   ║
╚═══════════════════════════════════╝
`,
    hacker: () => {
      // Add some fun effects
      setTimeout(() => {
        document.documentElement.style.setProperty('--hacker-mode', '1');
        setTimeout(() => {
          document.documentElement.style.setProperty('--hacker-mode', '0');
        }, 3000);
      }, 100);
      return `
[INITIATING HACKER MODE...]
████████████████████████████ 100%

> Access granted
> System override: ACTIVATED
> 1337 h4x0r m0d3: ENABLED

Just kidding! But you look cool right now. 😎

(Effect wears off in 3 seconds...)
`;
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setHistory(prev => [...prev, { type: 'input', text: `$ ${input}` }]);

    if (commands[cmd]) {
      const result = commands[cmd](args);
      if (result === 'CLEAR') {
        setHistory([{ type: 'output', text: 'Terminal cleared.\n' }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', text: result }]);
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'output',
        text: `Command not found: ${cmd}\nType "help" for available commands.`
      }]);
    }

    setInput('');
  };

  React.useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className="h-full flex flex-col font-mono text-sm bg-slate-900 text-emerald-400"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={historyRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
      >
        {history.map((item, i) => (
          <div key={i} className={`whitespace-pre-wrap ${item.type === 'input' ? 'text-white' : 'text-emerald-400/80'}`}>
            {item.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-slate-700">
        <span className="text-emerald-500">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-slate-600"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  );
};

// Music App - Spotify Profile
export const MusicApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className={`h-full flex flex-col ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-b from-green-900 to-slate-900'}`}>
    <div className="p-4 text-white text-center">
      <h2 className="text-lg font-bold mb-2">🎵 Now Playing</h2>
      <p className="text-sm text-white/60 mb-4">My Spotify Profile</p>
    </div>
    <div className="flex-1 px-2 pb-2">
      <iframe
        src="https://open.spotify.com/embed/user/shadowstorm9870?utm_source=generator&theme=0"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      />
    </div>
    <div className="p-3 border-t border-white/10 text-center">
      <a
        href="https://open.spotify.com/user/shadowstorm9870"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400 text-sm hover:text-green-300 underline"
      >
        Open in Spotify →
      </a>
    </div>
  </div>
);

// Trash App - with pre-populated deleted files
const TRASH_ITEMS = [
  { id: 1, name: 'untitled_draft_v3_FINAL_FINAL.txt', type: 'file', size: '2.3 KB', deletedAt: '2 days ago' },
  { id: 2, name: 'meme_collection_2023', type: 'folder', size: '847 MB', deletedAt: '1 week ago' },
  { id: 3, name: 'todo_list_that_i_ignored.md', type: 'file', size: '156 B', deletedAt: '3 days ago' },
  { id: 4, name: 'screenshot_2024_01_15_at_3am.png', type: 'file', size: '1.2 MB', deletedAt: '5 days ago' },
  { id: 5, name: 'old_portfolio_v1', type: 'folder', size: '23 MB', deletedAt: '2 weeks ago' },
  { id: 6, name: 'definitely_not_my_diary.txt', type: 'file', size: '45 KB', deletedAt: '1 month ago' },
  { id: 7, name: 'node_modules_backup_why.zip', type: 'file', size: '2.1 GB', deletedAt: '3 weeks ago' },
];

export const TrashApp: React.FC<AppProps> = ({ isDarkMode = false }) => {
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalSize = TRASH_ITEMS.reduce((acc, item) => {
    const match = item.size.match(/(\d+\.?\d*)\s*(B|KB|MB|GB)/);
    if (!match) return acc;
    const [, num, unit] = match;
    const multipliers: Record<string, number> = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
    return acc + parseFloat(num) * multipliers[unit];
  }, 0);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 ** 3) return (bytes / 1024 ** 3).toFixed(1) + ' GB';
    if (bytes >= 1024 ** 2) return (bytes / 1024 ** 2).toFixed(1) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return bytes + ' B';
  };

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'text-slate-300' : 'text-stone-700'}`}>
      {/* Header */}
      <div className={`p-3 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-stone-200 bg-stone-50'}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗑️</span>
          <div>
            <h2 className="font-bold">Trash</h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-stone-500'}`}>
              {TRASH_ITEMS.length} items • {formatSize(totalSize)}
            </p>
          </div>
        </div>
        <button className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
          }`}>
          Empty Trash
        </button>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {TRASH_ITEMS.map(item => (
          <div
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${selectedItems.includes(item.id)
              ? isDarkMode ? 'bg-indigo-500/20 border border-indigo-500/50' : 'bg-indigo-100 border border-indigo-300'
              : isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-stone-100'
              }`}
          >
            <span className="text-xl opacity-50">
              {item.type === 'folder' ? '📁' : '📄'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{item.name}</p>
              <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-stone-500'}`}>
                {item.size} • Deleted {item.deletedAt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {selectedItems.length > 0 && (
        <div className={`p-3 border-t flex gap-2 ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-stone-200 bg-stone-50'}`}>
          <button className={`flex-1 text-xs py-2 rounded-lg ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-stone-200 hover:bg-stone-300'}`}>
            🔄 Restore
          </button>
          <button className={`flex-1 text-xs py-2 rounded-lg ${isDarkMode ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-600'}`}>
            🗑️ Delete Forever
          </button>
        </div>
      )}
    </div>
  );
};

// Changelog App - Version history
const CHANGELOG_ENTRIES = [
  {
    version: '1.2.0',
    date: 'Dec 18, 2024',
    type: 'feature',
    changes: [
      '🎵 Added Music.app with Spotify integration',
      '🗑️ Added Trash with pre-populated files',
      '📝 Added Changelog and Feedback apps',
      '🌠 Shooting star easter egg in dark mode',
    ]
  },
  {
    version: '1.1.0',
    date: 'Dec 17, 2024',
    type: 'feature',
    changes: [
      '💻 Added Terminal.app with commands',
      '🥚 Added easter eggs throughout the OS',
      '✨ Shift+Click sparkle cursor mode',
      '🏆 Explorer achievement for visiting all apps',
    ]
  },
  {
    version: '1.0.0',
    date: 'Dec 15, 2024',
    type: 'launch',
    changes: [
      '🚀 Initial launch of Goodnight00 OS',
      '🌙 Dark mode with custom wallpaper',
      '🖱️ Right-click context menu',
      '⬜ Drag-to-select marquee',
      '🎨 All core apps implemented',
    ]
  },
];

export const ChangelogApp: React.FC<AppProps> = ({ isDarkMode = false }) => (
  <div className={`h-full flex flex-col ${isDarkMode ? 'text-slate-300' : 'text-stone-700'}`}>
    <div className={`p-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-stone-200'}`}>
      <h2 className="text-xl font-bold flex items-center gap-2">
        📜 Changelog
      </h2>
      <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-500' : 'text-stone-500'}`}>
        What's new in Goodnight00 OS
      </p>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {CHANGELOG_ENTRIES.map((entry, idx) => (
        <div key={idx} className={`border-l-4 pl-4 ${entry.type === 'launch'
          ? 'border-green-500'
          : entry.type === 'feature'
            ? 'border-purple-500'
            : 'border-blue-500'
          }`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>
              v{entry.version}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-stone-100 text-stone-600'
              }`}>
              {entry.date}
            </span>
          </div>
          <ul className="space-y-1">
            {entry.changes.map((change, i) => (
              <li key={i} className="text-sm">{change}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// Feedback App - User feedback form
export const FeedbackApp: React.FC<AppProps> = ({ isDarkMode = false }) => {
  const [feedback, setFeedback] = React.useState('');
  const [category, setCategory] = React.useState('general');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      setSubmitted(true);
      // In a real app, this would send to a backend
      console.log('Feedback submitted:', { category, feedback });
    }
  };

  if (submitted) {
    return (
      <div className={`h-full flex flex-col items-center justify-center text-center p-8 ${isDarkMode ? 'text-white' : 'text-stone-800'}`}>
        <span className="text-6xl mb-4">💖</span>
        <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
        <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
          Your feedback helps make Goodnight00 OS better.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFeedback(''); }}
          className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-stone-200 hover:bg-stone-300'
            }`}
        >
          Send more feedback
        </button>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'text-slate-300' : 'text-stone-700'}`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-stone-200'}`}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          💬 Feedback
        </h2>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-500' : 'text-stone-500'}`}>
          I'd love to hear your thoughts!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2 rounded-lg border outline-none transition-colors ${isDarkMode
              ? 'bg-slate-800 border-slate-600 text-white focus:border-indigo-500'
              : 'bg-white border-stone-300 text-stone-800 focus:border-orange-400'
              }`}
          >
            <option value="general">💭 General Feedback</option>
            <option value="bug">🐛 Bug Report</option>
            <option value="feature">✨ Feature Request</option>
            <option value="design">🎨 Design Suggestion</option>
            <option value="love">💖 Just Showing Love</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
            Your Message
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What's on your mind?"
            className={`flex-1 p-3 rounded-lg border outline-none resize-none transition-colors ${isDarkMode
              ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-500 focus:border-indigo-500'
              : 'bg-white border-stone-300 text-stone-800 placeholder-stone-400 focus:border-orange-400'
              }`}
          />
        </div>

        <button
          type="submit"
          disabled={!feedback.trim()}
          className={`w-full py-3 rounded-lg font-medium transition-all ${feedback.trim()
            ? isDarkMode
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
            : isDarkMode
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
        >
          Send Feedback 🚀
        </button>
      </form>
    </div>
  );
};

const FileText = ({ size }: { size: number }) => ICON_MAP['file-text'];
const Mail = ({ size, className }: { size: number, className?: string }) => <span className={className}>{ICON_MAP['mail']}</span>;
