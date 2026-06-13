#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { QdrantClient } = require('@qdrant/js-client-rest');
const { CohereClientV2 } = require('cohere-ai');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value && !process.env[key.trim()]) {
      process.env[key.trim()] = value.trim();
    }
  });
}

const qdrantUrl = process.env.QDRANT_URL;
const qdrantApiKey = process.env.QDRANT_API_KEY;
const cohereApiKey = process.env.COHERE_API_KEY;

if (!qdrantUrl) {
  console.error('Missing QDRANT_URL environment variable');
  process.exit(1);
}

if (!cohereApiKey) {
  console.error('Missing COHERE_API_KEY environment variable');
  process.exit(1);
}

// Company knowledge documents - must match src/data/company.ts
const COMPANY_KNOWLEDGE_DOCS = [
  {
    id: "overview",
    title: "Company Overview",
    content: "RFZ Digital is a digital and technology solutions company that helps businesses grow through innovative digital services including website design, mobile app development (iOS/Android), software solutions, marketing strategies, and technology consulting. The company focuses on creating customized solutions that improve online presence, business operations, customer engagement, and digital transformation.",
    tags: ["overview", "company", "digital transformation", "mobile app development"],
  },
  {
    id: "mission",
    title: "Mission",
    content: "RFZ Digital's mission is to empower businesses with modern digital solutions by combining technology, creativity, and strategic thinking. The company helps organizations build strong digital identities, improve online visibility, automate business processes, increase customer engagement, and achieve sustainable growth.",
    tags: ["mission", "values", "growth"],
  },
  {
    id: "values",
    title: "Core Values",
    content: "RFZ Digital operates on innovation, a client-centric approach, transparency, and quality. The company delivers forward-thinking solutions, understands client goals, communicates clearly, and provides measurable business value.",
    tags: ["values", "culture", "client focus"],
  },
  {
    id: "services-website",
    title: "Website Design & Development",
    content: "RFZ Digital designs and develops modern, user-friendly, responsive, business-focused websites built to convert visitors into customers. Services include business websites, custom website development, landing pages, website redesign, and e-commerce websites.",
    tags: ["website", "development", "ecommerce"],
  },
  {
    id: "services-seo",
    title: "Search Engine Optimization (SEO)",
    content: "RFZ Digital provides SEO services to improve website ranking and visibility. Services include keyword research, on-page SEO, technical SEO, website optimization, and search engine visibility improvement.",
    tags: ["seo", "search", "visibility"],
  },
  {
    id: "services-digital-marketing",
    title: "Digital Marketing",
    content: "RFZ Digital delivers digital marketing solutions to help businesses reach more customers through online campaigns, growth strategies, customer engagement, and brand awareness.",
    tags: ["marketing", "digital", "campaigns"],
  },
  {
    id: "services-social-media",
    title: "Social Media Management",
    content: "RFZ Digital manages business social media presence with content planning, social media strategy, campaign management, and audience growth.",
    tags: ["social media", "content", "strategy"],
  },
  {
    id: "services-graphic-design",
    title: "Graphic Design",
    content: "RFZ Digital creates professional visual designs such as brand identity design, marketing graphics, social media designs, and creative assets.",
    tags: ["graphic design", "branding", "creative"],
  },
  {
    id: "services-software",
    title: "Software Development",
    content: "RFZ Digital provides custom software development, business applications, digital platforms, and technology consulting as part of its technology solutions.",
    tags: ["software", "solutions", "consulting"],
  },
  {
    id: "services-mobile",
    title: "Mobile App Development",
    content: "RFZ Digital develops native iOS and Android applications as well as cross-platform mobile apps using React Native and Flutter. Services include mobile UI/UX design, app deployment, and ongoing maintenance. RFZ has expertise building fitness apps, e-commerce apps, enterprise management apps, and logistics tracking applications.",
    tags: ["mobile", "app development", "ios", "android", "react native", "flutter"],
  },
  {
    id: "services-cloud",
    title: "Cloud Services",
    content: "RFZ Digital delivers cloud-based technology solutions to improve business efficiency, scalability, and operational flexibility.",
    tags: ["cloud", "scalability", "efficiency"],
  },
  {
    id: "services-ppc",
    title: "PPC Marketing",
    content: "RFZ Digital offers paid advertising services to generate leads and increase online visibility.",
    tags: ["ppc", "ads", "lead generation"],
  },
  {
    id: "technology-tools",
    title: "Technology & Tools",
    content: "RFZ Digital works with React Native, Flutter, WordPress, Shopify, Figma, Adobe Photoshop, Adobe Illustrator, social media platforms, and search engines.",
    tags: ["technology", "tools", "stack"],
  },
  {
    id: "industries-served",
    title: "Industries Served",
    content: "RFZ Digital supports businesses that need website creation, marketing growth, brand improvement, mobile apps, software solutions, and digital transformation.",
    tags: ["industries", "business", "digital transformation"],
  },
  {
    id: "client-approach",
    title: "Client Approach",
    content: "RFZ Digital follows a process of understanding client requirements, analyzing business goals, creating a customized strategy, developing the digital solution, and providing support and improvements.",
    tags: ["process", "client", "strategy"],
  },
  {
    id: "why-choose",
    title: "Why Choose RFZ Digital",
    content: "RFZ Digital offers expertise, innovation, proven track record, client-centric approach, quality assurance, timely delivery, and cost-effectiveness. The company has successfully completed 100+ projects for happy clients worldwide.",
    tags: ["benefits", "expertise", "quality"],
  },
  {
    id: "portfolio",
    title: "Portfolio & Projects",
    content: "RFZ Digital has successfully delivered diverse projects including e-commerce platforms, mobile apps (iOS/Android), SaaS dashboards, enterprise solutions, and digital marketing campaigns. Recent work includes fitness tracking apps, logistics applications, and social commerce platforms.",
    tags: ["portfolio", "projects", "case studies"],
  },
];

const qdrantClient = new QdrantClient({ url: qdrantUrl, apiKey: qdrantApiKey });
const cohereClient = new CohereClientV2({ token: cohereApiKey });

async function uploadDocuments() {
  try {
    console.log('Starting document upload to Qdrant...');
    console.log(`Embedding ${COMPANY_KNOWLEDGE_DOCS.length} documents with Cohere...`);

    // Embed all documents
    const response = await cohereClient.embed({
      texts: COMPANY_KNOWLEDGE_DOCS.map((doc) => doc.content),
      model: 'embed-english-v3.0',
      inputType: 'search_document',
      embeddingTypes: ['float'],
    });

    const embeddings = Array.isArray(response.embeddings)
      ? response.embeddings
      : response.embeddings.float;

    console.log(`✓ Embedded ${embeddings.length} documents`);

    // Prepare points for Qdrant
    const points = COMPANY_KNOWLEDGE_DOCS.map((doc, index) => ({
      id: doc.id.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0) + index,
      vector: embeddings[index],
      payload: {
        id: doc.id,
        title: doc.title,
        content: doc.content,
        tags: doc.tags,
      },
    }));

    // Delete old points from collection if it exists
    try {
      const collection = await qdrantClient.getCollection('rfz-knowledge');
      console.log(`✓ Collection exists with ${collection.points_count} points`);
      
      // Clear old points
      await qdrantClient.deletePointsByFilter('rfz-knowledge', {
        filter: {
          must: [
            {
              has_id: points.map(p => p.id),
            },
          ],
        },
      });
      console.log('Cleared old points');
    } catch (err) {
      console.log('Collection does not exist yet, will create it');
    }

    // Upsert points to Qdrant
    console.log(`Uploading ${points.length} points to Qdrant...`);
    await qdrantClient.upsert('rfz-knowledge', {
      points,
    });

    console.log('✓ Successfully uploaded all documents to Qdrant!');
    console.log(`✓ ${points.length} knowledge documents are now indexed and searchable`);
    console.log('\nUpdated services include:');
    console.log('  • Website Design & Development');
    console.log('  • Mobile App Development (iOS/Android/React Native/Flutter)');
    console.log('  • Software Development');
    console.log('  • SEO');
    console.log('  • Digital Marketing');
    console.log('  • Social Media Management');
    console.log('  • Graphic Design');
    console.log('  • Cloud Services');
    console.log('  • PPC Marketing');
 
  } catch (err) {
    console.error('Error uploading documents:', err.message || err);
    process.exitCode = 1;
  }
}

uploadDocuments();
