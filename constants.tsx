
import React from 'react';
import {
  User,
  Briefcase,
  PenTool,
  FileText,
  Award,
  Mail,
  Calendar,
  Search,
  Maximize2,
  Minimize2,
  X,
  Layout,
  ExternalLink,
  Github,
  Terminal,
  Trash2,
  Music,
  ScrollText,
  MessageSquare
} from 'lucide-react';
import { WindowChromeStyle, AppConfig, Project, Post, ImpactItem } from './types';

export const APPS: AppConfig[] = [
  { id: 'about', title: 'About.app', route: '/about', icon: 'user', chromeStyle: WindowChromeStyle.PAPER, defaultSize: { w: 600, h: 500 } },
  { id: 'projects', title: 'Projects.app', route: '/projects', icon: 'briefcase', chromeStyle: WindowChromeStyle.WOOD, defaultSize: { w: 800, h: 600 } },
  { id: 'writing', title: 'Writing.app', route: '/writing', icon: 'pen-tool', chromeStyle: WindowChromeStyle.PAPER, defaultSize: { w: 700, h: 550 } },
  { id: 'resume', title: 'Resume.pdf', route: '/resume', icon: 'file-text', chromeStyle: WindowChromeStyle.PAPER, defaultSize: { w: 650, h: 800 } },
  { id: 'impact', title: 'Impact.app', route: '/impact', icon: 'award', chromeStyle: WindowChromeStyle.WOOD, defaultSize: { w: 600, h: 650 } },
  { id: 'contact', title: 'Contact.app', route: '/contact', icon: 'mail', chromeStyle: WindowChromeStyle.LANTERN, defaultSize: { w: 500, h: 400 } },
  { id: 'terminal', title: 'Terminal.app', route: '/terminal', icon: 'terminal', chromeStyle: WindowChromeStyle.SLATE, defaultSize: { w: 700, h: 500 } },
  { id: 'music', title: 'Music.app', route: '/music', icon: 'music', chromeStyle: WindowChromeStyle.SLATE, defaultSize: { w: 400, h: 500 } },
  { id: 'changelog', title: 'Changelog.app', route: '/changelog', icon: 'scroll', chromeStyle: WindowChromeStyle.PAPER, defaultSize: { w: 500, h: 550 } },
  { id: 'feedback', title: 'Feedback.app', route: '/feedback', icon: 'message', chromeStyle: WindowChromeStyle.LANTERN, defaultSize: { w: 450, h: 500 } },
  { id: 'trash', title: 'Trash', route: '/trash', icon: 'trash', chromeStyle: WindowChromeStyle.PAPER, defaultSize: { w: 500, h: 400 } },
];

export const PROJECTS: Project[] = [
  {
    slug: 'forest-whisper',
    title: 'Forest Whisper',
    summary: 'An ambient sound generator built with React and Web Audio API. Mimics the sounds of a deciduous forest during various weather conditions.',
    tags: ['React', 'Web Audio', 'Design'],
    links: { site: '#', github: '#' },
    featured: true,
    imageUrl: 'https://picsum.photos/seed/forest/600/400'
  },
  {
    slug: 'cloud-painter',
    title: 'Cloud Painter',
    summary: 'A generative art experiment creating procedural clouds using Perlin noise and watercolor-inspired rendering techniques.',
    tags: ['Canvas', 'Generative', 'Math'],
    links: { github: '#' },
    featured: true,
    imageUrl: 'https://picsum.photos/seed/cloud/600/400'
  }
];

export const POSTS: Post[] = [
  {
    slug: 'finding-calm',
    title: 'Finding Calm in Code',
    date: '2024-05-12',
    summary: 'Reflecting on why watercolor aesthetics and cozy UI can make the digital world feel more human.',
    tags: ['Design', 'Philosophy'],
    content: 'The digital landscape is often sharp, fast, and neon. But what if it were soft, slow, and paper-textured? In this post, I explore the psychology of cozy interfaces...'
  },
  {
    slug: 'tech-stack-simplicity',
    title: 'The Beauty of Small Stacks',
    date: '2024-03-20',
    summary: 'Why I stopped chasing every new framework and started focusing on building robust, long-lasting tools.',
    tags: ['Dev', 'Learning'],
    content: 'Complexity is the enemy of craft. When we build with simple, powerful tools, we leave room for the soul of the project to emerge...'
  }
];

export const IMPACT: ImpactItem[] = [
  { year: '2024', title: 'Green Web Award', category: 'Award', description: 'Awarded for excellence in sustainable web design practices.' },
  { year: '2023', title: 'Tech for Good Talk', category: 'Talk', description: 'Gave a keynote on how aesthetic calm reduces user stress in financial apps.' },
  { year: '2022', title: 'Open Source Contributor', category: 'Metric', description: 'Contributed 500+ commits to educational nature-monitoring software.' }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  // App icons - custom images (full size to fill container, non-draggable)
  user: <img src="/assets/Icons/about.png" alt="About" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  briefcase: <img src="/assets/Icons/projects.png" alt="Projects" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  'pen-tool': <img src="/assets/Icons/Blog.png" alt="Writing" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  'file-text': <img src="/assets/Icons/resume.png" alt="Resume" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  award: <img src="/assets/Icons/impact.png" alt="Impact" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  mail: <img src="/assets/Icons/contact.png" alt="Contact" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  calendar: <Calendar size={56} className="text-emerald-800 pointer-events-none" />,
  terminal: <img src="/assets/Icons/terminal.png" alt="Terminal" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  music: <img src="/assets/Icons/music.png" alt="Music" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  scroll: <img src="/assets/Icons/change-log.png" alt="Changelog" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  message: <img src="/assets/Icons/feedback.png" alt="Feedback" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  trash: <img src="/assets/Icons/trash.png" alt="Trash" className="w-16 h-16 object-contain pointer-events-none" draggable={false} />,
  // UI icons - keep as lucide-react
  search: <Search size={20} />,
  maximize: <Maximize2 size={16} />,
  minimize: <Minimize2 size={16} />,
  close: <X size={16} />,
  layout: <Layout size={20} />,
  external: <ExternalLink size={16} />,
  github: <Github size={16} />
};
