ARG VARIANT=20-bullseye

FROM mcr.microsoft.com/devcontainers/typescript-node:1-${VARIANT}

# Uncomment following lines to enable non-interactive installation.
# ENV DEBIAN_FRONTEND=noninteractive

# RUN \
#   apt update && \
#   apt --yes install --no-install-recommends \
#   # https://firebase.google.com/docs/emulator-suite/install_and_configure
#   openjdk-17-jre-headless && \
#   curl -sL firebase.tools | bash && \
#   apt clean autoclean && \
#   apt autoremove --yes && \
#   rm -rf /var/lib/{apt,cache,dpkg,log}

# https://www.npmjs.com/package/firebase-tools
ENV DEPENDENCIES="@antfu/ni npkill npm@latest pnpm@latest taze"

RUN \
  corepack enable && \
  npm install --global $DEPENDENCIES
