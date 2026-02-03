import React from 'react';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface PostListProps {
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Últimas Publicações</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
          Explorando o mundo do desenvolvimento de software com a lealdade de um vira-lata caramelo.
        </p>
      </div>

      <div className="grid gap-10">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="group relative flex flex-col gap-4 p-6 -mx-6 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 cursor-pointer"
            onClick={() => onSelectPost(post.slug)}
          >
            <div className="flex items-center gap-4 text-xs font-medium text-muted uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTimeMinutes} min de leitura
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
               {post.tags.map(tag => (
                 <span key={tag} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium">
                   #{tag}
                 </span>
               ))}
            </div>

            <div className="flex items-center gap-2 text-primary font-medium text-sm mt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Ler Artigo <ArrowRight size={16} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};