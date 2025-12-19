
export type WindowId = string;

export enum WindowChromeStyle {
  PAPER = 'paper',
  WOOD = 'wood',
  LANTERN = 'lantern',
  SLATE = 'slate',
}

export interface WindowState {
  id: WindowId;
  route: string;
  title: string;
  iconKey: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  preMaximizePosition?: { x: number; y: number };
  preMaximizeSize?: { w: number; h: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  lastFocusedAt: number;
  chromeStyle: WindowChromeStyle;
}

export interface AppConfig {
  id: string;
  title: string;
  route: string;
  icon: string;
  chromeStyle: WindowChromeStyle;
  defaultSize?: { w: number; h: number };
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  links: { site?: string; github?: string };
  featured: boolean;
  imageUrl?: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

export interface ImpactItem {
  year: string;
  title: string;
  description: string;
  category: 'Award' | 'Talk' | 'Press' | 'Metric';
}
