import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Calendar, Clock, ChevronLeft, Share2, Check } from 'lucide-react';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  isDark: boolean;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, isDark }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Handle Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Dynamic SEO Update
  useEffect(() => {
    // Update Title
    document.title = `${post.title} | Eduardo Dalhke Lopes`;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', post.excerpt);
    updateMeta('keywords', post.keywords.join(', '));
    updateMeta('og:title', post.title, 'property');
    updateMeta('og:description', post.excerpt, 'property');

    window.scrollTo(0, 0);

    // Cleanup: We rely on App.tsx to reset the title/meta when unmounting/switching view
  }, [post]);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    // Try Native Share API first (Mobile/Supported Browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error, harmless to ignore
        console.debug('Share cancelled or failed', err);
      }
    } else {
      // Fallback to Clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link', err);
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 via-primary to-orange-400 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(255,184,108,0.4)] dark:shadow-[0_0_20px_rgba(255,184,108,1)] animate-pulse"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />
      </div>

      <article className="animate-fade-in-up">
        <button 
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para artigos
        </button>

        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8 relative">
            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTimeMinutes} min de leitura</span>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={handleShare}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-muted transition-all active:scale-95" 
                title="Compartilhar"
                aria-label="Compartilhar este artigo"
              >
                 {copied ? <Check size={18} className="text-green-500 animate-in zoom-in spin-in-90 duration-300" /> : <Share2 size={18} />}
              </button>
              
              {copied && (
                <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-slate-800 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10 animate-fade-in-up">
                  Link copiado!
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="mb-12">
          <MarkdownRenderer content={post.content} isDark={isDark} />
        </div>

        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
           <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
                EL
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Eduardo Dalhke Lopes</h3>
                <p className="text-xs text-primary font-mono mb-1">Staff Software Engineer @ PicPay</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Compartilhando experiências sobre iGaming, arquitetura de software, gestão técnica e o impacto da IA no desenvolvimento.
                </p>
              </div>
           </div>
        </div>
      </article>
    </>
  );
};