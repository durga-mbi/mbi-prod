import acaImg from "../assets/aca_project.webp";
import crashImg from "../assets/crash_project.webp";
import forgeImg from "../assets/forge_project.webp";
import ten4Img from "../assets/tend4_project.webp";
import personalizedImg from "../assets/prs_project.webp";
import proptimaImg from "../assets/promtima_project.webp";
import mountainImg from "../assets/mountain_lev_project.webp";
import type { ProjectData } from "../components/ProjectCard";

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "ACA PROJECT",
    category: "FINANCE",
    client: "ACA",
    domain: "Trading And Investment",
    details:
      "The Automated Compliance Application (ACA) Enhances Efficiency And Accuracy In Regulatory Processes While Providing Scalable Compliance And Risk Solutions For Financial Services Firms.",
    tech: "ASP.NET Core, Entity Framework Core, SQL Server, Playwright, Angular, NUnit.",
  },
  { id: 2, title: "HALA GLOBAL", category: "BANKING", client: "Saksoft", domain: "Banking", details: "Hala Global Is Offering The Service For Pos Device Management For Payment Across The Retail Solutions Which Is Developed In .Net Core.", tech: "" },
  { id: 3, title: "PAYPAL CUSTOMER CARE AI AGENT", category: "FINANCE", client: "PayPal", domain: "Customer Care", details: "Project details coming soon.", tech: "Google Dialogflow CX, Webhooks API, MERN, Cloud Functions, payment/CRM systems", image: acaImg },
  { id: 4, title: "CRASH WAKEUP ALGO", category: "OTHER", client: "Internal", domain: "Algorithms", details: "Project details coming soon.", tech: "Python, Flask, OpenCV, GenAI, BigQuery, GCP, PostgreSQL ", image: crashImg },
  { id: 5, title: "FORGE DES", category: "IT", client: "Augmento Labs (Honeywell)", domain: "IT", details: "Generic Data Pipeline Is A Forge Insights Offering Which Provides A Low Code, Configuration Driven Approach To Start An ETL Job With Required Capabilities.", tech: "AI, Python, Apache Spark, ETL Pipelines, AWS, SQL", image: forgeImg },
  { id: 6, title: "TEN4(DMA)", category: "LOGISTICS", client: "ForwardAir", domain: "Logistics", details: "Ten4 App Is A Robust Logistics Management Platform Designed To Streamline Operations For Transportation And Delivery Services. Built With A Focus On Driver And Delivery Management, The Platform Addresses Key Logistics Processes Such As Driver Details, Availability, Settlements, Platform Addresses Key Logistics Processes Such As Driver Details, Availability, Settlements, Loading Times, And Delivery Schedules.", tech: "Java Spring , Mybatis , Oracle", image: ten4Img },
  { id: 7, title: "PERSONALIZED RECOMMENDED SYSTEMS", category: "ECOMMERCE", client: "Belcorp", domain: "E-Commerce", details: "Segments The Users And Derive The Personilzed Recommended Systems By Using Historical Data", tech: "Python, Data Science", image: personalizedImg },
  { id: 8, title: "PROPTIMA", category: "OTHER", client: "Proptima", domain: "Real Estate", details: "Project details coming soon.", tech: "Vue.js, Laravel, Java, GWT, Kubernetes, Jenkins", image: proptimaImg },
  { id: 9, title: "MOUNTAIN LEVERAGE - MAESTRO", category: "LOGISTICS", client: "Mountain Leverage", domain: "Logistics", details: "Project details coming soon.", tech: "React Native, Java, Spring Boot, MySQL, AWS" },
  { id: 10, title: "BNYM BVD INTEGRATION", category: "BANKING", client: "BNYM", domain: "Banking", details: "Project details coming soon.", tech: "Python, Spark, AWS, SQL" },
  { id: 11, title: "FLOWMETER", category: "OTHER", client: "Flowmeter Sys", domain: "Analytics", details: "Project details coming soon.", tech: "React, D3.js, Python, AWS" },
  { id: 12, title: "API CENTRE AND ESG API PRODUCT (FOR MUTUAL FUND: BROKER AND FUND MANAGER)", category: "BANKING", client: "Coming soon", domain: "Banking", details: "Project details coming soon.", tech: "Java, Spring Boot, AWS, SQL, RESTful APIs, Microservices Architecture, OAuth2, ESG Data Integration, JWT Authentication" },
  { id: 13, title: "TAQA DEVELOPMENT", category: "BANKING", client: "Coming soon", domain: "Banking", details: "Project details coming soon.", tech: "Java, Spring Boot, AWS, SQL, RESTful APIs, Microservices Architecture, OAuth2, Kafka, JWT Authentication" },
  { id: 14, title: "ONYXPlus for Telos Corporation (Cybersecurity)", category: "IT", client: "Coming soon", domain: "IT", details: "Project details coming soon.", tech: "Cybersecurity Frameworks, SIEM Tools, Python, Java, REST APIs, Threat Detection Systems, Encryption Protocols, IAM" },
  { id: 15, title: "AGENTIC SOLUTIONS", category: "ECOMMERCE", client: "Coming soon", domain: "E-Commerce", details: "Project details coming soon.", tech: "LLMs (GPT/Gemini), LangChain, Vector Databases, Python, Node.js, REST APIs, Prompt Engineering" },
  { id: 16, title: "MOUNTAIN LEVARAGE", category: "ECOMMERCE", client: "Coming soon", domain: "E-Commerce", details: "Project details coming soon.", tech: "Next.js, Node.js, Express, REST APIs, PostgreSQL, Stripe, Razorpay, OAuth, AWS", image: mountainImg },
  { id: 17, title: "STAFF AUGMENTATION (M:JON:SR:PHPDVP)", category: "ECOMMERCE", client: "Coming soon", domain: "E-Commerce", details: "Project details coming soon.", tech: "PHP, Laravel, MySQL, REST APIs, MVC Architecture, JavaScript, Git, Agile Methodology, AWS" },
  { id: 18, title: "GREEN HYDROGEN", category: "IT", client: "Coming soon", domain: "IT", details: "Project details coming soon.", tech: "IoT Sensors, SCADA Systems, Data Analytics, Python, AI/ML Models, AWS" },
  { id: 19, title: "TQ 100", category: "IT", client: "Coming soon", domain: "IT", details: "Project details coming soon.", tech: "Python, Data Analytics, AI/ML Models, REST APIs, SQL" },
  { id: 20, title: "Intelligent Document Processing (Zoop)", category: "IT", client: "Coming soon", domain: "IT", details: "Project details coming soon.", tech: "NLP, Python, MLM, Document Parsing, REST APIs, Data Extraction Pipelines" },
  { id: 21, title: "AccessHope ChatGPT App (GenAI)", category: "IT", client: "Coming soon", domain: "IT", details: "Project details coming soon.", tech: "OpenAI GPT API, Node.js, React, LangChain, REST APIs, FAISS, Prompt Engineering, JWT, AWS" },
];
