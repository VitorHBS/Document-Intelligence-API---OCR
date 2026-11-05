# Roadmap

**Regras:** uma tarefa por vez. Cada tarefa tem critérios de aceitação definidos antes de começar. Ritmo de referência: cerca de 2h por dia.

Legenda de status: `[ ]` pendente, `[~]` em andamento, `[x]` concluída.

## Fase 0: Fundação
- [ ] T01 Repositório, TypeScript, Express, estrutura por módulo, rota `/health`
- [ ] T02 Docker + docker-compose (API + PostgreSQL)

## Fase 1: OCR em imagens
- [ ] T03 Upload de arquivo (multer) com validação de tipo e tamanho
- [ ] T04 Interface `OcrEngine` + implementação com tesseract.js (modelo `por`)
- [ ] T05 Endpoint `POST /documents/extract` para imagens, com `?format=text|json`

## Fase 2: PDF
- [ ] T06 Extração direta de PDF com camada de texto
- [ ] T07 Detecção: o PDF tem texto ou é escaneado?
- [ ] T08 PDF escaneado: páginas → imagens (poppler) → OCR
- [ ] T09 Limite de 20 páginas e tratamento de erros (PDF corrompido, vazio)

## Fase 3: Autenticação
- [ ] T10 Prisma + modelo `User` + migration
- [ ] T11 Cadastro e login (hash de senha, JWT ou sessão: decidir ADR-006)
- [ ] T12 Middleware de autenticação protegendo `/documents/extract`

## Fase 4: Qualidade
- [ ] T13 Testes com Vitest: unitários dos services e integração dos endpoints
- [ ] T14 Validação com Zod, erros padronizados, logs sem conteúdo sensível
- [ ] T15 Rate limit e tratamento de concorrência no OCR

## Fase 5: Entrega de portfólio
- [ ] T16 Dockerfile final, README com instruções de execução, documentação da API (OpenAPI)

## Futuro (fora do MVP)
- Processamento assíncrono com fila
- Extração estruturada de RG/CNH
- Outros idiomas
- Migração opcional para Fastify

## Tarefas com conceitos novos (mais orientação)
T04 (workers e interface de OCR), T08 (processos externos), T11 (hash de senha e tokens).
