# Document Intelligence API (OCR)

API back-end que recebe imagens e PDFs e devolve o texto extraído, em texto puro ou JSON.

## Problema

Eliminar a digitação manual de documentos: o usuário envia uma imagem ou um PDF e recebe o texto pronto para uso.

## MVP

- Upload de imagem (PNG/JPG) ou PDF
- PDF com camada de texto: extração direta
- PDF escaneado e imagens: OCR com Tesseract (idioma: português)
- Resposta síncrona em texto puro ou JSON (`?format=text|json`, JSON como padrão)
- Login de usuários (sem histórico de documentos)

## Fora do escopo do MVP

- Extração estruturada de RG/CNH
- Processamento assíncrono e filas
- Edição do texto extraído
- Outros idiomas além de português
- Deploy em nuvem (o projeto roda localmente via Docker)

## Stack

Node.js, TypeScript, Express, PostgreSQL, Prisma, tesseract.js, poppler-utils, Zod, Vitest, Docker.

Detalhes e justificativas em [decisions.md](decisions.md) e [arquitetura.md](arquitetura.md).

## Documentação do projeto

| Arquivo | Conteúdo |
|---|---|
| [arquitetura.md](arquitetura.md) | Fluxo, camadas, estrutura de pastas e limites |
| [decisions.md](decisions.md) | Decisões técnicas (ADRs) e alternativas descartadas |
| [roadmap.md](roadmap.md) | Fases e tarefas planejadas |
| [projectstatus.md](projectstatus.md) | Estado atual, próxima tarefa e aprendizados |

## Como rodar

A preencher na tarefa T16.
