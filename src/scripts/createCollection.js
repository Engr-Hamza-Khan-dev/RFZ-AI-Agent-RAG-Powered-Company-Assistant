#!/usr/bin/env node
const { QdrantClient } = require('@qdrant/js-client-rest');

const url = process.env.QDRANT_URL;
const apiKey = process.env.QDRANT_API_KEY;

if (!url) {
  console.error('Missing QDRANT_URL environment variable');
  process.exit(1);
}

const client = new QdrantClient({ url, apiKey });

async function run() {
  try {
    await client.createCollection('rfz-knowledge', {
      vectors: { size: 1024, distance: 'Cosine' },
    });
    console.log('Collection created');
  } catch (err) {
    console.error('Error creating collection:', err.message || err);
    process.exitCode = 1;
  }
}

run();
