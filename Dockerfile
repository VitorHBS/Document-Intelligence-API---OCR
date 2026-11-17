FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build



FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV TESSDATA_PATH=/app/tessdata

COPY package*.json ./

RUN mkdir -p /app/tessdata \
    && wget -O /app/tessdata/por.traineddata \
    https://github.com/tesseract-ocr/tessdata/raw/main/por.traineddata


COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "start" ]