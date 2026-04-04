const skillGroups = [
  {
    category: "Language",
    useCaseExample: "Building full-stack apps, scripts, and automation flows.",
    items: [
      { name: "TypeScript", role: "Type-Safe App Development", logo: "TS" },
      { name: "JavaScript", role: "Web Runtime", logo: "JS" },
      { name: "Python", role: "Automation and Scripting", logo: "PY" },
      { name: "PHP", role: "Backend Development", logo: "PHP" },
      { name: "Dart", role: "Cross-Platform App Language", logo: "DART" },
      { name: "C#", role: "Game Development Scripting", logo: "C#" },
      { name: "C++", role: "Low-Level Systems and Performance", logo: "C++" },
      { name: "Bash", role: "Shell Automation", logo: "BS" },
      { name: "Powershell", role: "Windows Task Automation", logo: "PS" },
      { name: "HTML", role: "Web Markup", logo: "HTML" },
      { name: "CSS", role: "UI Styling", logo: "CSS" },
    ],
  },
  {
    category: "Framework",
    useCaseExample: "Shipping web and mobile products from idea to production.",
    items: [
      { name: "React", role: "UI Framework", logo: "RE" },
      { name: "Next.js", role: "App Platform", logo: "NX" },
      { name: "Laravel", role: "Backend Framework", logo: "LR" },
      { name: "Flutter", role: "Mobile Development Framework", logo: "FL" },
      { name: "Astro", role: "Static Site Framework", logo: "AST" },
      { name: "Tailwind CSS", role: "Styling System", logo: "TW" },
      { name: "Vite", role: "Frontend Build Tool", logo: "VITE" },
    ],
  },
  {
    category: "Database",
    useCaseExample: "Designing scalable data layers and backend services.",
    items: [
      { name: "MySQL", role: "Relational Database", logo: "MY" },
      { name: "MariaDB", role: "Relational Database", logo: "MDB" },
      { name: "PostgreSQL", role: "Relational Database", logo: "PG" },
      { name: "DynamoDB", role: "NoSQL Database", logo: "DDB" },
      { name: "Redis", role: "In-Memory Cache and Store", logo: "RD" },
      { name: "Neon", role: "Serverless Postgres Platform", logo: "NEON" },
      { name: "Supabase", role: "Backend Platform", logo: "SUPA" },
      { name: "NocoDB", role: "No-Code Data Layer", logo: "NDB" },
      { name: "Baserow", role: "No-Code Database", logo: "BR" },
    ],
  },
  {
    category: "Engine",
    useCaseExample: "Developing playable game prototypes and interactive experiences.",
    items: [
      { name: "Godot", role: "Game Engine", logo: "GD" },
      { name: "Unity", role: "Game Engine", logo: "UN" },
      { name: "Three.js", role: "3D Web Engine", logo: "3JS" },
      { name: "Framer Motion", role: "UI Motion Engine", logo: "FM" },
    ],
  },
  {
    category: "Tooling and DevOps",
    useCaseExample: "Building reliable pipelines, deployment flows, and local dev environments.",
    items: [
      { name: "Node.js", role: "Backend Runtime", logo: "ND" },
      { name: "Docker", role: "Containerization", logo: "DK" },
      { name: "Github", role: "Version Control", logo: "GH" },
      { name: "CLI", role: "Command-Line Workflows", logo: "CLI" },
      { name: "VS Code", role: "Primary IDE", logo: "VS" },
      { name: "Cursor", role: "AI-Enhanced Code Editor", logo: "CUR" },
      { name: "Nginx", role: "Web Server", logo: "NGX" },
      { name: "Caddy", role: "Web Server", logo: "CAD" },
      { name: "Railway", role: "Cloud Platform", logo: "RAIL" },
    ],
  },
  {
    category: "AI and Automation",
    useCaseExample: "Integrating AI assistants, RAG pipelines, and automated operations.",
    items: [
      { name: "Ollama", role: "Local LLM Runtime", logo: "OLL" },
      { name: "Hugging Face", role: "ML Platform", logo: "HF" },
      { name: "OpenClaw AI", role: "AI Assistant", logo: "OC" },
      { name: "RAG", role: "Knowledge Retrieval Pattern", logo: "RAG" },
      { name: "N8N", role: "Workflow Automation", logo: "N8N" },
      { name: "Power Automate", role: "Business Process Automation", logo: "PA" },
      { name: "Grafana", role: "Monitoring and Analytics", logo: "GRA" },
      { name: "Prometheus", role: "Metrics and Monitoring", logo: "PROM" },
    ],
  },
  {
    category: "Creative and Design",
    useCaseExample: "Producing game art, 3D assets, UI concepts, and multimedia content.",
    items: [
      { name: "Blender", role: "3D Modeling", logo: "BL" },
      { name: "Aseprite", role: "2D Pixel Art", logo: "AS" },
      { name: "Krita", role: "2D Digital Art", logo: "KR" },
      { name: "Figma", role: "UI and UX Prototyping", logo: "FG" },
      { name: "Canva", role: "Design Platform", logo: "CN" },
      { name: "DaVinci Resolve", role: "Video Editing", logo: "DR" },
      { name: "Adobe Suite", role: "Creative Production Suite", logo: "AD" },
    ],
  },
  {
    category: "Business Systems and Productivity",
    useCaseExample: "Managing operations, teams, documents, and planning workflows.",
    items: [
      { name: "Odoo", role: "ERP System", logo: "OD" },
      { name: "ERPNext", role: "ERP System", logo: "ERP" },
      { name: "Plane", role: "Project Management", logo: "PLAN" },
      { name: "Affine", role: "Collaborative Workspace", logo: "AFF" },
      { name: "Microsoft Suite", role: "Productivity Suite", logo: "MS" },
      { name: "M365", role: "Cloud Productivity Suite", logo: "M365" },
      { name: "MIT App Inventor", role: "Visual App Builder", logo: "MIT" },
    ],
  },
  {
    category: "Networking",
    useCaseExample: "Prototyping network behavior and local infrastructure workflows.",
    items: [
      { name: "Cisco Packet Tracer", role: "Network Simulation", logo: "CPT" },
      { name: "mDNS", role: "Local Discovery Protocol", logo: "MDNS" },
    ],
  },
];

export const portfolioData = {
  selector: {
    title: "Choose Portfolio View",
    subtitle: "Pick your preferred experience. You can switch back anytime.",
    modes: {
      minimal: {
        title: "Clean Professional",
        description:
          "Focused and minimal layout designed for quick scanning and readability.",
        cta: "OPEN MINIMAL",
      },
      neo: {
        title: "Creative Layout",
        description:
          "Dynamic and creative layout with interactive elements and bold visuals for an engaging and cool experience.",
        cta: "OPEN CREATIVE",
      },
    },
  },
  profile: {
    displayName: "YLLARIS",
    heroSummary:
      "I am Shawn Ashleigh Yllaris M. Cruz, a creative developer specializing in but not limited to Game Development, Full Stack Development, and 3D Modeling. I have a passion for crafting immersive digital experiences that blend creativity with technology.",
    professionalSummary:
      "I am Shawn Ashleigh Yllaris M. Cruz, a versatile creative developer with a passion for crafting immersive digital experiences. With a strong foundation in game development, full stack development, and 3D modeling, I specialize in bringing innovative ideas to life through code and design. My work is driven by a commitment to creativity, technical excellence, and delivering engaging solutions that resonate with users.",
  },
  skills: {
    title: "Skill Matrix",
    groups: skillGroups,
  },
  tools: skillGroups.flatMap((group) => group.items),
  projects: [
    {
      title: "Old Portfolio Site",
      stack: "Astro • TypeScript • Javascript • Tailwind",
      summary:
        "My first portfolio site built with Astro and Tailwind CSS.",
      workUrl: "https://yllarisang.github.io/",
    },
    {
      title: "Wonderzyme Inc. Website",
      stack: "React • Vite • Typescript • Tailwind",
      summary:
        "A WIP website for a nature-first company called Wonderzyme Inc., built with React, Vite, and Tailwind CSS.",
      workUrl: "https://wonderzyme.vercel.app/",
    },
    {
      title: "Air2Holiday System",
      stack: "HTML • Laravel • PHP • MySQL • JavaScript • Tailwind",
      summary:
        "Github repo of a mock airline booking system built with Next.js, featuring a custom CMS and API for managing flights and reservations.",
      workUrl: "https://github.com/YllariSang/Air2Holiday-System",
    },
    {
      title: "Crescere",
      stack: "Godot • GDScript • Aseprite",
      summary:
        "A 2D platformer pixel art game where you can change sizes to overcome obstacles, built in Godot with GDScript and Aseprite.",
      workUrl: "https://yllaris.itch.io/crescere",
    },
    {
      title: "EvEx Traxer",
      stack: "React • Tailwind • Vite",
      summary:
        "A web application for tracking and managing events and expenses.",
      workUrl: "https://github.com/YllariSang/EvEx-Traxer",
    },
        {
      title: "EvEx Traxer App",
      stack: "Flutter • Dart",
      summary:
        "A mobile application for tracking and managing events and expenses.",
      workUrl: "N/A",
    },
    {
      title: "Compass",
      stack: "JavaScript • PHP",
      summary:
        "A web application for web travel and vlog.",
      workUrl: "https://github.com/YllariSang/Compass",
    },
    {
      title: "Stylized 3D Chest",
      stack: "Blender • 3D Modeling",
      summary:
        "A stylized 3D chest model created in Blender with detailed textures and lighting.",
      workUrl: "https://skfb.ly/pFXKO",
    },
    {
      title: "Stylized 3D Camera",
      stack: "Blender • 3D Modeling",
      summary:
        "A reference to Genshin Impact's Kamera item. A stylized 3D camera model created in Blender with detailed textures and lighting.",
      workUrl: "https://skfb.ly/pGtNO",
    },
    {
      title: "3D Book Model",
      stack: "Blender • 3D Modeling",
      summary:
        "A 3D model of a book created in Blender for a school activity.",
      workUrl: "https://skfb.ly/pGqvT",
    },
    {
      title: "3D Donut Model",
      stack: "Blender • 3D Modeling",
      summary:
        "My first 3D model created in Blender, a simple donut with basic materials and lighting, made as part of the Blender Guru beginner tutorial.",
      workUrl: "https://skfb.ly/pFXLv",
    },
  ],
  contact: {
    intro:
      "Let’s build something unforgettable. Available for freelance projects, collaborations, and full-time roles.",
    email: "yllaris1004@gmail.com",
    github: "https://github.com/YllariSang",
    linkedin: "https://www.linkedin.com/in/shawn-m-cruz/",
  },
  professional: {
    backToSelectorCta: "BACK TO SELECTOR",
    loadingText: "Loading clean portfolio...",
    sections: {
      skillsTitle: "Core Skills",
      projectsTitle: "Selected Work",
      contactTitle: "Contact",
    },
    projects: {
      openCaseCta: "OPEN WORK",
      expandCta: "VIEW MORE PROJECTS",
      collapseCta: "VIEW LESS PROJECTS",
      initialVisibleCount: 3,
      layoutMode: "expand",
      externalNotice:
        "[USER_NOTICE] These buttons redirect to separate external project sites. Please proceed only with your consent for safety.",
    },
    ctas: {
      email: "EMAIL",
      github: "GITHUB",
      linkedin: "LINKEDIN",
    },
  },
  creative: {
    hero: {
      labels: [
        "[SYSTEM_STATUS: ACTIVE]",
        "[DATA_LOAD: 100%]",
        "[SIGNAL_LOCK: STABLE]",
        "[RENDER_PIPE: ONLINE]",
      ],
      ctas: {
        works: "VIEW WORKS",
        comms: "OPEN COMMS",
      },
    },
    tools: {
      title: "My Skills",
      moduleTag: "[SYSTEM_MODULE: SKILL_TREE]",
      feedTag: "[RIZZ_KIT: LIVE]",
      scrollTag: "[SCROLL: WHEEL / BUTTONS]",
    },
    projects: {
      title: "Projects / Works",
      archiveTag: "[ARCHIVE: FEATURED]",
      openCaseCta: "OPEN CASE",
      expandCta: "VIEW MORE PROJECTS",
      collapseCta: "VIEW LESS PROJECTS",
      initialVisibleCount: 3,
      layoutMode: "expand",
      externalNotice:
        "[USER_NOTICE] These buttons redirect to separate external sites containing project works. Continue only with your consent for safety.",
    },
    contact: {
      title: "Contact",
      channelTag: "[CHANNEL: OPEN]",
      ctas: {
        email: "EMAIL",
        github: "GITHUB",
        linkedin: "LINKEDIN",
      },
    },
  },
};
