FROM node:21-bullseye AS deps
WORKDIR /app

COPY . .

RUN npm install -g pnpm; \
    pnpm --version; \
    pnpm setup; \
    mkdir -p /usr/local/share/pnpm &&\
    export PNPM_HOME="/usr/local/share/pnpm" &&\
    export PATH="$PNPM_HOME:$PATH"; \
    pnpm bin -g &&\
    pnpm install

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["pnpm", "run", "start"]
