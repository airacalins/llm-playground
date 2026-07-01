FROM node:25.9.0-alpine3.22

RUN addgroup app && adduser -S -G app app

WORKDIR /app

COPY --chown=app:app . .

USER app

RUN npm --prefix client install && \
    npm --prefix backend install

ENV API_URL=http://api.myapp.com

EXPOSE 3000