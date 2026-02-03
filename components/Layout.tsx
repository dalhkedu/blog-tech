import React from 'react';
import { Moon, Sun, Github, Dog, Coffee } from 'lucide-react';
import { ThemeContextType } from '../types';
import { AdBanner } from './AdBanner';

interface LayoutProps {
  children: React.ReactNode;
  theme: ThemeContextType;
  onNavigateHome: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, theme, onNavigateHome }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-6 py-8 md:py-12">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 select-none">
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-hover:-rotate-3">
            <Dog size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
              Blog do Dev Caramelo
            </h1>
            <p className="text-xs text-muted font-mono">
              código & ração
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <button onClick={onNavigateHome} className="hover:text-primary transition-colors">Artigos</button>
            <a href="#" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#" className="hover:text-primary transition-colors">Projetos</a>
          </nav>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

          <button
            onClick={theme.toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Alternar tema"
          >
            {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Ad Space - Leaderboard Standard */}
      <div className="mb-12">
        <AdBanner slotId="SEU_SLOT_ID_TOPO" />
      </div>

      {/* Main Content */}
      <main className="flex-grow animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
            <Coffee size={20} />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Blog do Dev Caramelo. Feito com React & Tailwind.</p>
      </footer>
    </div>
  );
};