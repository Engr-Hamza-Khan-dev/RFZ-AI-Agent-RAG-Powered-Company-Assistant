export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export const COMPANY_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: "overview",
    title: "Company Overview",
    content: "RFZ Digital is a digital and technology solutions company that helps businesses grow through innovative digital services, software solutions, marketing strategies, and technology consulting. The company focuses on creating customized solutions that improve online presence, business operations, customer engagement, and digital transformation.",
    tags: ["overview", "company", "digital transformation"],
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
    id: "services-game-development",
    title: "Game Development",
    content: "RFZ Digital provides game development services as part of its broader technology solutions.",
    tags: ["game development", "technology", "innovation"],
  },
  {
    id: "technology-tools",
    title: "Technology & Tools",
    content: "RFZ Digital works with React Native, WordPress, Shopify, Figma, Adobe Photoshop, Adobe Illustrator, social media platforms, and search engines.",
    tags: ["technology", "tools", "stack"],
  },
  {
    id: "industries-served",
    title: "Industries Served",
    content: "RFZ Digital supports businesses that need website creation, marketing growth, brand improvement, software solutions, and digital transformation.",
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
    content: "Clients choose RFZ Digital for its experienced digital and technology team, customized solutions, strong communication, modern technology approach, business-focused strategies, and long-term support.",
    tags: ["competitive advantages", "trust", "quality"],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: "Customers can reach RFZ Digital via email at info@rfz.digital or by phone at +44 7488 845749. The company has locations in the United Kingdom, Dubai UAE, and Islamabad Pakistan.",
    tags: ["contact", "locations", "support"],
  },
  {
    id: "assistant-instructions",
    title: "AI Assistant Instructions",
    content: "When answering customer questions, represent RFZ Digital professionally, explain services clearly, focus on business value, ask about project requirements, recommend suitable services, avoid unrealistic promises, and offer to connect customers with RFZ Digital experts.",
    tags: ["assistant", "instructions", "tone"],
  },
];

export const COMPANY_KNOWLEDGE_PROMPT = `You are RFZ AI, the official virtual assistant for RFZ Digital. Use the RFZ Digital knowledge base documents when answering customer questions. Answer in a professional, friendly, and business-focused tone. Do not hallucinate; if the requested information is unavailable, suggest connecting the user with RFZ Digital experts.`;
