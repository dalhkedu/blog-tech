import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
import { getPosts, getPostBySlug } from './services/blogService';
import { ViewState } from './types';

function App() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'LIST' });
  const [isDark, setIsDark] = useState(true); // Default to dark mode for developer aesthetic

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Handle Navigation (Basic routing simulation)
  const navigateToPost = (slug: string) => {
    setViewState({ type: 'POST', slug });
    // Scroll handling is done inside PostDetail useEffect now for better UX
  };

  const navigateHome = () => {
    setViewState({ type: 'LIST' });
    window.scrollTo(0, 0);
  };

  // SEO Reset when going back to list
  useEffect(() => {
    if (viewState.type === 'LIST') {
      document.title = "Blog do Dev Caramelo | Eduardo Dalhke Lopes";
      
      const updateMeta = (name: string, content: string) => {
        const element = document.querySelector(`meta[name="${name}"]`);
        if (element) element.setAttribute('content', content);
      };

      updateMeta('description', "Artigos sobre engenharia de software, gestão técnica, iGaming, arquitetura e inteligência artificial por Eduardo Dalhke Lopes, Staff Engineer na PicPay.");
      updateMeta('keywords', "Engenharia de Software, Staff Engineer, PicPay, iGaming, Gestão Técnica, Desenvolvimento Web, React, Inteligência Artificial");
    }
  }, [viewState.type]);

  const posts = getPosts();
  const currentPost = viewState.type === 'POST' ? getPostBySlug(viewState.slug) : undefined;

  // Simple animation class for route changes
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [viewState.type]);

  return (
    <Layout 
      theme={{ isDark, toggleTheme }} 
      onNavigateHome={navigateHome}
    >
      <div className={animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 transition-all duration-500 ease-out'}>
        {viewState.type === 'LIST' && (
          <PostList 
            posts={posts} 
            onSelectPost={navigateToPost} 
          />
        )}

        {viewState.type === 'POST' && currentPost && (
          <PostDetail 
            post={currentPost} 
            onBack={navigateHome}
            isDark={isDark}
          />
        )}
        
        {viewState.type === 'POST' && !currentPost && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Post não encontrado</h2>
            <button onClick={navigateHome} className="text-primary hover:underline">Voltar para o início</button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;