version: '3'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: production
