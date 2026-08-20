export const PORTFOLIO_DATA = {
  personal: {
    name: "Harshil Makwana",
    role: "Generative AI Engineer",
    subtitle: "AI Automation & Agentic Systems",
    location: "Surat, Gujarat, India",
    email: "harshilmakwana8399@gmail.com",
    phone: "+91-7990780309",
    linkedin: "https://linkedin.com/in/harshil8399",
    github: "https://github.com/makwana8399",
    resumeUrl: "/Harshil_Makwana_Resume.pdf",
    summary:
      "Computer Engineering graduate (CGPA 8.39) with hands-on experience building LLM-powered autonomous agents, RAG pipelines, and generative AI systems across two internships — shipping 10+ production AI workflows and 5 live public projects, including dual-platform publishing systems and REST APIs. Skilled in integrating LLMs with vector databases, async task pipelines, and multi-platform APIs to deliver reliable, production-grade automation. SAP Code Unnati certified via Edunet Foundation. Focused on retrieval-augmented generation, multi-step agent orchestration, and tool-integrated LLM pipelines from prototype to cloud deployment.",
    stats: [
      { value: "10+", label: "PRODUCTION AI WORKFLOWS" },
      { value: "5", label: "LIVE PUBLIC PROJECTS" },
      { value: "2", label: "AI INTERNSHIPS" },
    ],
  },
  statement: {
    part1: "Ten production AI workflows. Five live public projects. ",
    highlight: "Zero manual publishing.",
  },
  signals: [
    {
      number: "95",
      symbol: "~%",
      label: "publishing efficiency lift",
      context: "Telegram-driven publishing agent, Rohtre Media",
    },
    {
      number: "5",
      symbol: "×",
      label: "reduction in writer time",
      context: "End-to-end content generation, zero manual writing",
    },
    {
      number: "90",
      symbol: "~%",
      label: "accuracy on spot-checked output",
      context: "Across autonomous publishing runs, Rohtre Media",
    },
    {
      number: "85",
      symbol: "~%",
      label: "less manual upload effort",
      context: "E-commerce product onboarding automation, Rohtre Media",
    },
    {
      number: "1",
      symbol: "<s",
      label: "semantic search latency",
      context: "PGVector RAG over large document corpora, Toshal Infotech",
    },
    {
      number: "20",
      symbol: "+",
      label: "YouTube channels monitored",
      context: "Autonomous sports-content agent with self-eval loop, Rohtre Media",
    },
  ],
  workChapters: [
    {
      id: "ch-01",
      index: "CH.01",
      number: "01 / 05",
      title: "Dual-Platform Publishing Agent",
      company: "Rohtre Media — Remote",
      tagline: "TELEGRAM BOT · INSTAGRAM GRAPH · PYTHON · GPT-4O",
      problem:
        "Publishing a story required a designer, a writer, and two separate manual uploads to the website and Instagram.",
      system:
        "Built a Telegram-driven publishing agent that turns a headline and source image into a branded graphic, drafts and reviews the caption and website summary, then publishes simultaneously to a company website and Instagram — tracking each platform's publish state independently so a partial failure only retries the side that failed, never double-posting.",
      outcome:
        "~95% publishing efficiency lift · 5× writer time reduction · ~90% accuracy on spot-checked output · isolated retry mechanics.",
      stack: ["Python", "Telegram Bot API", "Instagram Graph API", "OpenAI GPT-4o", "GPT-image", "Celery"],
      type: "dual-platform",
    },
    {
      id: "ch-02",
      index: "CH.02",
      number: "02 / 05",
      title: "Autonomous Sports-Content Agent & Evaluator",
      company: "Rohtre Media — Remote",
      tagline: "YOUTUBE SCRAPER · SEO RUBRIC · N8N · TELEGRAM ALERTS",
      problem:
        "Finding and writing sports stories across dozens of channels was a full-time manual editorial job.",
      system:
        "Designed a fully autonomous content agent that scans 20+ YouTube channels, filters relevant sports content, and drafts complete articles with a self-evaluation loop that scores each draft against an SEO rubric and regenerates up to 2 revisions before auto-selecting the best version. Runs autonomously 24/7 with Telegram status alerts on source volume, auto-generating and hosting thumbnails.",
      outcome:
        "End-to-end publishing with zero manual writing · 24/7 autonomous monitoring · auto-thumbnail hosting.",
      stack: ["Python", "OpenAI API", "n8n", "Telegram Bot API", "Cloudflare"],
      type: "sports-agent",
    },
    {
      id: "ch-03",
      index: "CH.03",
      number: "03 / 05",
      title: "AI-Powered Video Intelligence Platform",
      company: "Toshal Infotech Pvt. Ltd. — Surat, India",
      tagline: "FASTAPI · POSTGRESQL · PGVECTOR · CELERY · RENDER",
      problem:
        "Hours of raw video transcripts with no way to semantically query them or extract real-time structured insights.",
      system:
        "Architected a full-stack AI platform ingesting video transcripts and generating real-time insights via an LLM + RAG pipeline, with Celery async task pipelines, PGVector semantic search, channel-tracking alerts for new uploads, and automated insight generation (summaries, keyword extraction, sentiment, topic detection).",
      outcome:
        "~90% retrieval accuracy · sub-second semantic search over large datasets · significant manual analysis reduction · deployed on Render.",
      stack: ["FastAPI", "PostgreSQL", "PGVector", "Celery", "OpenAI API", "Render"],
      type: "rag-vector",
    },
    {
      id: "ch-04",
      index: "CH.04",
      number: "04 / 05",
      title: "Commerce Onboarding & Editorial Pipeline",
      company: "Rohtre Media — Remote",
      tagline: "VISION PARSING · WOOCOMMERCE API · N8N WORKFLOWS",
      problem:
        "Every single e-commerce product listing and editorial article was hand-assembled and manually uploaded.",
      system:
        "Automated e-commerce product onboarding using Vision AI image parsing to auto-generate product titles, descriptions, and dynamic prices, and built an n8n editorial workflow moving pieces from draft to review to publish.",
      outcome:
        "~85% cut in manual upload effort · ~90% faster publishing time · seamless WooCommerce sync.",
      stack: ["Python", "WooCommerce API", "n8n", "OpenAI API", "Google Docs/Sheets API"],
      type: "commerce-pipeline",
    },
    {
      id: "ch-05",
      index: "CH.05",
      number: "05 / 05",
      title: "AI News Aggregator & Insight Engine",
      company: "Key Production Project",
      tagline: "PYTHON · FASTAPI · OPENAI API · CLOUD DEPLOYMENT",
      problem:
        "Aggregating, processing, and categorizing fast-moving multi-source news streams without manual curation delay.",
      system:
        "Built an end-to-end AI-powered news aggregation service from ingestion through production deployment, structuring the build across local setup, deployment configuration, and production-optimization stages with automated summary extraction.",
      outcome:
        "100% automated ingestion and categorization · cloud deployment · real-time content delivery.",
      stack: ["Python", "FastAPI", "OpenAI API", "Docker", "Render", "PostgreSQL"],
      type: "orchestrator-core",
    },
  ],
  focusAreas: [
    {
      id: "agentic",
      title: "Agentic Systems",
      description:
        "Autonomous task agents, multi-step tool orchestration, self-evaluation and scoring loops, n8n agentic workflows, prompt engineering.",
      hue: "plasma",
    },
    {
      id: "rag",
      title: "Retrieval & RAG",
      description:
        "RAG pipelines, embeddings, semantic search, PGVector (Vector Search), PostgreSQL, Supabase, NLP, Hugging Face Transformers.",
      hue: "indigo",
    },
    {
      id: "automation",
      title: "Workflow Automation",
      description:
        "Multi-platform API dispatch (Telegram, Instagram, WooCommerce), Celery async task queues, n8n pipeline orchestration, scheduled 24/7 bots.",
      hue: "plasma",
    },
    {
      id: "engineering",
      title: "Backend & Cloud Deployment",
      description:
        "Python, FastAPI, REST APIs, Celery, Docker, Linux, Git, cloud deployment on Render, Railway, Netlify, and Cloudflare.",
      hue: "aurum",
    },
  ],
  techSpecs: [
    {
      category: "GENERATIVE AI & LLMs",
      items: [
        "LLMs",
        "Prompt Engineering",
        "OpenAI API (GPT-4o, GPT-image)",
        "RAG Pipelines",
        "Embeddings",
        "Semantic Search",
        "NLP",
        "Hugging Face Transformers",
      ],
    },
    {
      category: "AGENTIC SYSTEMS",
      items: [
        "Autonomous Task Agents",
        "Multi-step Tool Orchestration",
        "Self-Evaluation/Scoring Loops",
        "n8n Agentic Workflows",
      ],
    },
    {
      category: "BACKEND & DEPLOYMENT",
      items: [
        "Python",
        "FastAPI",
        "REST APIs",
        "Celery (Async Task Queues)",
        "Docker",
        "Render",
        "Railway",
        "Netlify",
        "Git",
        "Linux",
      ],
    },
    {
      category: "ML & DATA",
      items: [
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
        "Bidirectional LSTM",
        "Neural Networks",
      ],
    },
    {
      category: "DATABASES",
      items: [
        "PostgreSQL",
        "PGVector (Vector Search)",
        "Supabase",
      ],
    },
    {
      category: "INTEGRATIONS & APIS",
      items: [
        "Telegram Bot API",
        "Instagram Graph API",
        "WooCommerce API",
        "Google Docs/Sheets API",
        "Cloudflare",
        "Discord API",
        "Trello API",
      ],
    },
  ],
  timeline: [
    {
      period: "MAY 2026 — PRESENT",
      role: "AI Automation Engineer (Intern)",
      company: "Rohtre Media — Remote",
      details:
        "Built Telegram-driven publishing agent for simultaneous website & Instagram posting with isolated retry; autonomous sports-content agent scanning 20+ YouTube channels with self-eval SEO loop; automated e-commerce onboarding via Vision parsing (~85% upload effort reduction).",
      isCurrent: true,
    },
    {
      period: "NOV 2025 — MAY 2026",
      role: "Python AI Engineer (Intern)",
      company: "Toshal Infotech Pvt. Ltd. — Surat, India",
      details:
        "Engineered AI-powered FastAPI microservices with Celery async task pipelines; implemented PGVector-based RAG pipeline enabling sub-second semantic search over large document corpora; integrated OpenAI LLMs for automated insight generation (summaries, keyword extraction, sentiment, topic detection); deployed on Render.",
      isCurrent: false,
    },
    {
      period: "GRADUATED MAY 2026",
      role: "Bachelor of Engineering in Computer Science (CGPA 8.39)",
      company: "Vidhyadeep Institute of Engineering and Technology, Gujarat Technological University (GTU), India",
      details:
        "Graduated with 8.39 CGPA. Core focus in Artificial Intelligence, Software Engineering, Database Management Systems, and Distributed Computing.",
      isCurrent: false,
    },
    {
      period: "2020 — 2023",
      role: "Diploma, Computer Engineering (CGPA 8.21)",
      company: "Bhagwan Mahavir University",
      details:
        "Graduated with 8.21 CGPA. Foundation in Computer Engineering, Programming Fundamentals, Data Structures, and Computer Networks.",
      isCurrent: false,
    },
    {
      period: "CERTIFIED",
      role: "SAP Code Unnati Certification",
      company: "Edunet Foundation",
      details:
        "Industry certification covering Artificial Intelligence, Machine Learning, Deep Learning, IoT, and SAP BTP.",
      isCurrent: false,
    },
  ],
  contact: {
    headline: "Let's build something autonomous.",
    subhead:
      "I'm available for engineering roles building generative AI products, autonomous agent pipelines, and enterprise automation.",
    links: [
      { label: "harshilmakwana8399@gmail.com", href: "mailto:harshilmakwana8399@gmail.com", isEmail: true },
      { label: "linkedin.com/in/harshil8399", href: "https://linkedin.com/in/harshil8399", isEmail: false },
      { label: "github.com/makwana8399", href: "https://github.com/makwana8399", isEmail: false },
    ],
  },
};
