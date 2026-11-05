# Arquitetura

## Visão geral

API REST síncrona (Express + TypeScript) que recebe uma imagem ou PDF e devolve o texto extraído. Autenticação por login; sem histórico de documentos.

## Fluxo de `POST /documents/extract`

```
Cliente
  │  arquivo + token
  ▼
[Auth] ─► [Upload + validação] ─► [DocumentService]
                                     │
                       ┌─────────────┴─────────────┐
                    imagem                        PDF
                       │                           │
                       │              tem camada de texto?
                       │                 sim │        │ não
                       │                     │        ▼
                       │                     │   PDF → imagens (poppler)
                       ▼                     │        │
                 OcrEngine (tesseract.js) ◄──┼────────┘
                       │                     │
                       └──────────┬──────────┘
                                  ▼
                       Resposta: texto puro ou JSON
```

## Camadas

`routes → controllers → services → (OcrEngine, PdfProcessor, UserRepository)`

- **Controller:** só lida com HTTP (entrada, saída, status).
- **Service:** concentra a regra de negócio.
- **OcrEngine / PdfProcessor:** isolados atrás de interfaces, permitindo trocar a implementação e testar sem rodar OCR real.

## Estrutura de pastas (por módulo)

```
src/
  modules/
    auth/
    documents/
  shared/          erros, middlewares, config
  app.ts           monta o Express (sem listen)
  server.ts        sobe o servidor
prisma/
docs/
Dockerfile
docker-compose.yml
```

## Stack

Node.js, TypeScript, Express, Prisma, PostgreSQL, tesseract.js, poppler-utils, Zod, Vitest, Docker.

## Limites do MVP

- 10 MB por arquivo
- 20 páginas por PDF
- Formatos: PNG, JPG, PDF
- Idioma: português
- Arquivos não são persistidos

## Pontos de atenção

- OCR consome muita CPU: usar workers do tesseract.js para não travar o servidor para outros usuários.
- Documentos contêm dados sensíveis: não logar o conteúdo extraído.
- Não guardar arquivos reduz a exposição de dados (LGPD).
- Em Docker, o modelo de idioma `por` deve estar embutido na imagem (evita download em runtime).
