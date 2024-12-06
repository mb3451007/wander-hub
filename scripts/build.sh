#!/usr/bin/env zsh

nvm use
yarn install
npx prisma generate
yarn build
