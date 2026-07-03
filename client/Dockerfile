FROM node:25.9.0-alpine3.22
RUN addgroup app && adduser -S -G app app
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --chown=app:app . .
USER app
ENV API_URL=http://api.myapp.com
EXPOSE 3000
CMD ["npm", "run", "dev"]