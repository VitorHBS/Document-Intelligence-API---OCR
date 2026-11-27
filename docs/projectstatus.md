**Última atualização:** 2026-11-26

## Estado atual
- Fase 1 concluída (T03–T05)
- Repositório criado, com remoto (origin/main)
- Arquivos já criados, ainda não revisados: upload.middleware, documents (controller, routers, service), módulo ocr (engine, service)

## Tarefa atual
**T06:** Extração direta de PDF com camada de texto

## Concluído
- Planejamento e ADR-001 a ADR-010 (exceto ADR-006)
- T01 e T02 (imagem final testada com `docker run`, compose com db healthy e volume persistente)
- T3 upload com multer e tratamento de error
- T05 endpoint `POST /documents/extract` com resposta `text` ou `json` para imagens

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
- T05: demonstrou domínio de modelagem de retorno, validação com Zod e ramificação da resposta por formato.

**Declarado como já conhecido:** Express, organização com controllers e services.

**Conceitos novos previstos (ainda sem evidência de domínio):**
- tesseract.js e workers (T04)
- Processos externos / poppler (T08)
- Prisma e migrations (T10)
- Hash de senha e tokens (T11)
- Vitest e Zod (T13, T14)
- Docker e docker-compose (T02)

## Dificuldades recorrentes
- A confusão entre objeto e lista (`pages`) apareceu em três tentativas seguidas.

## Próximo passo
Iniciar a T06: extração direta de PDF com camada de texto.
