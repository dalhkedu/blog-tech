import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  isDark: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, isDark }) => {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none 
      prose-headings:font-bold prose-headings:tracking-tight
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-pre:bg-transparent prose-pre:p-0
      prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      ">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="rounded-lg overflow-hidden my-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-slate-100 dark:bg-surface px-4 py-2 text-xs font-mono text-slate-500 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 flex justify-between">
                   <span>{match[1].toUpperCase()}</span>
                </div>
                <SyntaxHighlighter
                  {...props}
                  style={isDark ? dracula : oneLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem' }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};