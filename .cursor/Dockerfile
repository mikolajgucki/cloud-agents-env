FROM node:20-bookworm

# Keep the image focused: install only what background agents commonly need
# (git + ssh for fetching private deps; ca-certs for https).
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    git \
    openssh-client \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Run as a non-root user and start from the home directory.
USER node
WORKDIR /workspace

# RUN node env/install.js
