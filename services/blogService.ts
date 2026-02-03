import { BlogPost } from '../types';

// In a real app, this might fetch from an API or parse local .md files at build time.
// Here we simulate the content of _posts/
const SAMPLE_MARKDOWN = `
## Introdução

Este é um post de exemplo para demonstrar a renderização de **Markdown** com *Syntax Highlighting*. O objetivo é ter um blog minimalista, focado na leitura.

## Por que Jekyll/React?

Embora o Jekyll seja ótimo para sites estáticos puros, usar React nos permite criar experiências mais interativas e transições suaves entre páginas (SPA), mantendo a simplicidade de escrita em Markdown.

## Exemplo de Código Python

Abaixo, um exemplo simples de uma função Fibonacci em Python:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Testando a função
for i in range(10):
    print(fibonacci(i))
\`\`\`

## Exemplo de Código JavaScript

E aqui, um exemplo moderno usando JavaScript (ES6+):

\`\`\`javascript
const greeting = (name) => {
  const message = \`Olá, \${name}! Bem-vindo ao blog.\`;
  return message;
};

console.log(greeting('Desenvolvedor'));

// Array functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);
\`\`\`

## Listas e Citações

- Item 1
- Item 2
  - Subitem 2.1

> "O código é poesia escrita por máquinas para serem lidas por humanos." - Anonymous

## Conclusão

Espero que este template sirva bem para seus propósitos de compartilhamento de conhecimento!
`;

const posts: BlogPost[] = [
  {
    slug: '2024-01-01-exemplo-artigo',
    title: 'Construindo um Blog de Desenvolvedor Moderno',
    excerpt: 'Um guia rápido sobre como configurar um blog minimalista com suporte a código, focado em legibilidade e performance.',
    date: '2024-01-01',
    readTimeMinutes: 5,
    tags: ['React', 'Frontend', 'Tutorial'],
    keywords: ['React Blog', 'Markdown Renderer', 'Syntax Highlighting', 'Jekyll alternative', 'SPA SEO'],
    content: SAMPLE_MARKDOWN
  },
  {
    slug: '2024-02-15-clean-code-gestao',
    title: 'Clean Code e Liderança Técnica',
    excerpt: 'Como princípios de código limpo influenciam a gestão de times de alta performance e a manutenção de sistemas críticos.',
    date: '2024-02-15',
    readTimeMinutes: 8,
    tags: ['Clean Code', 'Gestão', 'Liderança'],
    keywords: ['Clean Code', 'Gestão de Engenharia', 'Dívida Técnica', 'Mentoria', 'Staff Engineer', 'Qualidade de Software'],
    content: `
## O que é Clean Code na visão de Staff?

Clean Code (código limpo) vai além de indentação. Em níveis de Staff Engineering, trata-se de garantir que o sistema seja sustentável a longo prazo.

### Legibilidade como Documentação

Use nomes que revelem a intenção. Isso reduz o tempo de onboarding de novos engenheiros.

\`\`\`typescript
// Ruim: O contexto se perde
const d = 10; 

// Bom: Regra de negócio explícita
const daysSinceModification = 10;
\`\`\`

### Impacto na Gestão

Sistemas com código ruim aumentam o tempo de entrega (Lead Time). Como líder técnico, defender a qualidade é defender a agilidade futura do negócio.
    `
  },
  {
    slug: '2024-03-20-future-of-ai-igaming',
    title: 'IA e Arquitetura em Alta Escala',
    excerpt: 'Explorando como ferramentas de IA e arquiteturas resilientes se encontram em ambientes de alto tráfego como iGaming.',
    date: '2024-03-20',
    readTimeMinutes: 12,
    tags: ['AI', 'Arquitetura', 'iGaming'],
    keywords: ['Inteligência Artificial', 'iGaming', 'Alta Disponibilidade', 'Arquitetura de Software', 'PicPay', 'Gemini API'],
    content: `
## A Revolução da IA em Sistemas Críticos

Em setores como iGaming e Fintech, a latência e a precisão são cruciais. A IA entra não apenas para gerar código, mas para detecção de anomalias em tempo real.

### Ferramentas e Oportunidades

1. **Gemini**: Ótimo para análise de padrões complexos e suporte multimodal.
2. **Copilot**: Aceleração do desenvolvimento diário.

### O Desafio da Escala

Integrar modelos de IA sem comprometer a performance de sistemas que processam milhares de transações por segundo exige padrões de arquitetura assíncrona e caching inteligente.
    `
  }
];

export const getPosts = (): BlogPost[] => {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return posts.find(p => p.slug === slug);
};