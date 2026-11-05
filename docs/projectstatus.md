**Última atualização:** 2026-11-05

## Estado atual
- Fase: 0 concluída (T01, T02); trabalho adiantado na Fase 1
- Repositório criado, com remoto (origin/main)
- Arquivos já criados, ainda não revisados: upload.middleware, documents (controller, routers, service), módulo ocr (engine, service)

## Tarefa atual
**T03:** Upload de arquivo (multer), em revisão junto com T04.

## Concluído
- Planejamento e ADR-001 a ADR-010 (exceto ADR-006)
- T01 e T02 (imagem final testada com `docker run`, compose com db healthy e volume persistente)

## Pendências e decisões em aberto
- ADR-006: JWT ou sessão (decidir na T11)
- Compose: mapeamento de porta acompanhar a variável `PORT`
- `@types/node` alinhado ao Node 22
- `import "dotenv/config"` na primeira linha do `server.ts` (confirmar)
- Módulo `ocr` separado difere do arquitetura.md: decidir se o documento muda ou o código se ajusta
- Perguntas de consolidação sem resposta: por que `app.ts` não chama `listen`; por que o compose usa `target: builder`

## Mapa de conhecimento
- Docker multi-stage e compose com healthcheck: implementado e testado; explicação ainda não verificada.
- ESM vs CommonJS: configurou `nodenext` corretamente, mas trouxe um exemplo com `require` para um projeto ESM; vale reforçar a diferença.

**Declarado como já conhecido:** Express, organização com controllers e services.

**Conceitos novos previstos (ainda sem evidência de domínio):**
- tesseract.js e workers (T04)
- Processos externos / poppler (T08)
- Prisma e migrations (T10)
- Hash de senha e tokens (T11)
- Vitest e Zod (T13, T14)
- Docker e docker-compose (T02)

## Dificuldades recorrentes
Nenhuma registrada ainda.

## Próximo passo
Criar a pasta do projeto e executar a T01.
