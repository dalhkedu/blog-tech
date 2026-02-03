export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string YYYY-MM-DD
  readTimeMinutes: number;
  tags: string[];
  keywords: string[]; // Specific keywords for SEO meta tags
  content: string; // Markdown content
}

export type ViewState = 
  | { type: 'LIST' }
  | { type: 'POST'; slug: string };

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}