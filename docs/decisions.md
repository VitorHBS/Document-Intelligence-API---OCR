# Decisões Técnicas

Formato: contexto, decisão, alternativas e consequências. Decisões novas entram no fim; decisões revertidas não são apagadas, apenas marcadas como substituídas.

## ADR-001: Express + TypeScript
- **Status:** aceita
- **Motivo:** familiaridade com Express; o aprendizado do projeto deve se concentrar em OCR, PDF, Docker e autenticação.
- **Alternativas:** Fastify (melhor validação e tipos nativos), NestJS (muita estrutura de uma vez).
- **Consequências:** validação feita com Zod. Migração para Fastify pode ser tarefa opcional futura.

## ADR-002: PostgreSQL com Prisma
- **Status:** aceita
- **Motivo:** o login exige persistir usuários; PostgreSQL é muito pedido no mercado e roda fácil em Docker. Prisma tem curva curta, migrations e tipos gerados.
- **Alternativas:** SQLite (mais simples, ensina menos), Drizzle ou `pg` puro (mais próximos do SQL).
- **Consequências:** container adicional no docker-compose; o Prisma esconde parte do SQL.

## ADR-003: OCR com tesseract.js, atrás de uma interface
- **Status:** aceita
- **Motivo:** menos peças para quem está aprendendo; Docker elimina o problema de ambiente.
- **Alternativas:** binário nativo do Tesseract (mais rápido, exige chamada de processos externos).
- **Consequências:** embutir o modelo `por` na imagem Docker. O OCR fica atrás de uma interface (`OcrEngine`), então trocar de motor deve afetar um módulo só.

## ADR-004: Processamento síncrono no MVP
- **Status:** aceita
- **Motivo:** simplicidade; cliente envia e espera a resposta.
- **Consequências:** limites de 10 MB por arquivo e 20 páginas por PDF. Processamento assíncrono (fila) fica no roadmap futuro.

## ADR-005: RG/CNH fora do escopo do MVP
- **Status:** aceita
- **Motivo:** extração estruturada exige tratamento de layout e dados sensíveis (LGPD). MVP cobre texto genérico em imagens e PDFs.

## ADR-006: Autenticação (JWT ou sessão)
- **Status:** pendente (decidir na tarefa T11, com prós e contras apresentados na hora)

## ADR-007: Estrutura de pastas por módulo
- **Status:** aceita
- **Motivo:** dois domínios claros (`auth` e `documents`); escolhida também por fins de aprendizado.
- **Alternativa:** organização por camada (`controllers/`, `services/`).

## ADR-008: Não persistir arquivos enviados
- **Status:** aceita
- **Motivo:** não há histórico; reduz complexidade e exposição de dados (LGPD).
- **Consequências:** arquivo processado em memória ou arquivo temporário e descartado; conteúdo extraído não deve ser logado.

## ADR-009: Zod para validação e Vitest para testes
- **Status:** aceita

## ADR-010: Formato da resposta via query string
- **Status:** aceita
- **Decisão:** `?format=text|json`, com JSON como padrão. O JSON traz texto por página e metadados (número de páginas, método usado, tempo de processamento); estrutura exata definida na T05.
