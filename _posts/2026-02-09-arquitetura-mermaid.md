---
layout: post
title:  "Arquitetura de Software com Mermaid"
date:   2026-02-09 12:00:00 -0300
categories: arquitetura mermaid
---

Neste artigo vamos explorar como diagramas podem ajudar na documentação de software, utilizando a sintaxe **Mermaid** diretamente no Markdown.

## O que é Mermaid?

Mermaid é uma ferramenta baseada em JavaScript que permite criar diagramas e visualizações usando texto e código.

### Exemplo de Diagrama de Sequência

<div class="mermaid">
sequenceDiagram
    participant U as Usuário
    participant P as Frontend
    participant S as Servidor
    participant D as Banco de Dados

    U->>P: Acessa Dashboard
    P->>S: GET /api/dashboard
    S->>D: SELECT * FROM stats
    D-->>S: Resultados
    S-->>P: JSON Data
    P-->>U: Renderiza Gráficos
</div>

### Exemplo de Gráfico de Gantt

<div class="mermaid">
gantt
    title Roadmap do Projeto
    dateFormat  YYYY-MM-DD
    section Planejamento
    Requisitos       :a1, 2026-02-01, 7d
    Design           :after a1  , 5d
    section Desenvolvimento
    Backend          :2026-02-15  , 10d
    Frontend         :2026-02-20  , 10d
    section Deploy
    Homologação      :2026-03-05  , 2d
    Produção         :2026-03-10  , 1d
</div>

## Conclusão

Usar Mermaid simplifica muito a criação de diagramas técnicos sem precisar de ferramentas gráficas externas.

> "A documentação deve ser tão viva quanto o código."

### Código Exemplo

```python
def hello_world():
    print("Olá, Mundo!")
    return True
```
