FROM node:20-bookworm

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python-is-python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV VIRTUAL_ENV=/opt/venv
ENV PATH="${VIRTUAL_ENV}/bin:${PATH}"

COPY requirements.txt requirements_ml.txt ./
RUN python3 -m venv "${VIRTUAL_ENV}" \
    && pip install --no-cache-dir -r requirements.txt -r requirements_ml.txt

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY . .

WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["node", "src/server.js"]
