import { Paintbrush, FileJson, Cloudy, BotMessageSquare } from "lucide-react";

export const LINKS = [
  {
    title: "home",
    path: "/",
  },
  {
    title: "portfolio",
    path: "/portfolio",
  },
  {
    title: "contact",
    path: "/contact",
  },
];

export const ACCORDION = [
  {
    question: "Who are you and what do you do?",
    answer:
      "I'm Toby, with a passion for full-stack applications using modern technologies. I can architect, design and implement all parts of a complex web application.",
  },
  {
    question: "Which technologies you are familar with ?",
    answer:
      "React/NextJS for frontend, PostgreSQL/MongoDB for databases, ExpressJS or Java Spring Boot for scalable backend.",
  },
  {
    question:
      "Which languages, and technologies, that you want to learn in the future?",
    answer:
      "LLM training, Golang for Backend, Columnar DB such as Amazon Redshift or Google BigQuery for big data analytics.",
  },
];

export const EDUCATION = [
  {
    title: "Bachelor of Engineering - HUST University, Vietnam",
    year: "2009",
  },
  {
    title: "Master of Computer Science - McGill University, Canada",
    year: "2013",
  },
];
export const CERITIFCATES = [
  {
    title: "AWS Certified Software Developer - Amazon Web Services",
    year: "2023",
  },
  {
    title: "AWS Certified Solution Architect - Amazon Web Services",
    year: "2023",
  },
  {
    title: "Cisco Certified Internetwork Professional - Cisco Systems",
    year: "2009",
  },
];

// SERVICES SECTION
export const SERVICES = [
  {
    icon: <FileJson size={44} strokeWidth={0.8} />,
    title: "BackEnd Development",
    description:
      "Worked on both single-dockerized BE, multi-containers BE, serverless and microservices architectures. Experiences in design and deploy services with Docker, Kubernetes, and AWS.",
  },
  {
    icon: <BotMessageSquare size={44} strokeWidth={0.8} />,
    title: "Machine Learning & AI",
    description:
      "Ability to work with Python, Numpy, Pytorch/Tensorflow, Scikit-learn training, Keras, and AWS SageMaker & AWS Bedrock for Machine Learning/AI projects.",
  },
  {
    icon: <Cloudy size={44} strokeWidth={0.8} />,
    title: "Cloud Computing",
    description:
      "Years of working with AWS and infrastructure-as-code. AWS-Certified and familar with various AWS services, such as EC2, S3, RDS, Lambda, Cloudfront, Cognito, API Gateway, AppSync, CDK, SDK, ElasticCache, DynamoDB, ECS, EKS, Fargate, etc.",
  },
  {
    icon: <Paintbrush size={44} strokeWidth={0.8} />,
    title: "FrontEnd Development",
    description:
      "Worked on various Enterprise and Open-Source FE projects with React, Redux, CSS, Tailwind, NextJS, Material UI, AWS Cloudscape and recently Shadcn UI. Experiences in both SPA, SSR and ISG deployments with AWS.",
  },
];

export const Category = {
  NLP: { id: "NLP", content: "Natural Language Processing" },
  ANN: { id: "ANN", content: "Artificial Neural Network" },
  ML: { id: "ML", content: "Machine Learning" },
  Backend: { id: "Backend", content: "Backend" },
  Frontend: { id: "Frontend", content: "Frontend" },
  AWS: { id: "AWS", content: "Amazon Web Services" },
  GenAI: { id: "GenAI", content: "Generative AI" },
};

// Work data
export const WORKDATA = [
  {
    title: "Multi-tenancy Marketplace",
    url: "/img1.png",
    categories: [Category.Backend, Category.Frontend, Category.AWS],
    des: "NextJS, Payload CMS Backend with ExpressJS, TRPC, MongoDB, Tailwind CSS, and Shadcn UI.",
    git: "https://github.com/thangtran3112/next-marketplace",
    link: "https://market.thangtrandev.net",
  },
  {
    title: "Fashion Ecom Prototype",
    url: "/fashionify.jpg",
    categories: [Category.Backend, Category.Frontend, Category.AWS],
    des: "Admin Dashboard + Shopping, MERN, API Gateway, AWS Lambda, S3, Cognito, and Cloudfront.",
    git: "https://github.com/thangtran3112/ecom/tree/main/fashionify",
    link: "https://fashionify.thangtrandev.net",
  },
  {
    title: "Word Embedding- Simple RNN Training",
    url: "/simple-rnn.png",
    categories: [Category.ML, Category.NLP],
    des: "Simple Recurrent Neural Network on sentiment prediction. Optimizable with LSTM, GRU, and Transformer.",
    git: "https://github.com/thangtran3112/machine-learning/tree/main/simple_rnn_imdb",
    link: "https://movie-review-sentiment-rnn.streamlit.app",
  },
  {
    title: "Deepseek Chat with SQL and MongoDB",
    url: "/sqlChat.png",
    categories: [Category.ML, Category.GenAI],
    des: "Connect to any SQL database or MongoDB on cloud and start conversation with your data.",
    git: "https://github.com/thangtran3112/gen-ai/tree/main/langchain/10-Chat-SQL",
    link: "https://movie-review-sentiment-rnn.streamlit.app",
  },
  {
    title: "Airbnb Fullstack",
    url: "/img2.png",
    categories: [Category.Backend, Category.Frontend, Category.AWS],
    des: "NextJs, Prisma, PostgresSQL, Tailwind CSS, AWS Lambda and Shadcn UI.",
    git: "https://github.com/thangtran3112/next-airbnb",
    link: "https://airnext.thangtrandev.net",
  },
  {
    title: "Gongcha Kelowna Website",
    url: "/img3.png",
    categories: [Category.Frontend, Category.AWS],
    des: "Prototype Website for Gongcha. Gatsby, React, Contentful CMS and AWS Amplify",
    git: "https://github.com/thangtran3112/gongcha",
    link: "https://gongcha.thangtrandev.net",
  },
  {
    title: "Sushi Ichiban Calgary",
    url: "/sushi.png",
    categories: [Category.Frontend, Category.AWS],
    des: "Website for Sushi shop in Canada. Gatsby, React, Material UI, and AWS Cloudfront",
    git: "https://github.com/thangtran3112/sushi",
    link: "https://sushiichibanmacleod.com",
  },
  {
    title: "Cabins Booking Website",
    url: "/img4.png",
    categories: [Category.Frontend, Category.AWS],
    des: "React SPA, Redux, PostgresSQL, AWS Cloudfront, and Supabase.",
    git: "https://github.com/thangtran3112",
    link: "https://cabin.thangtrandev.net",
  },
];

// TESTIMONIAL SECTION
export const TESTIMONIAL = [
  {
    title: "Cisco Systems",
    profession: "Software Engineer Intern, 04/2012 - 08/2012",
    URL: "/cisco-logo.jpg",
    desc: "Developed and fixed defects for In-Service-Software-Update feature of Cisco Router Operating System.",
  },
  {
    title: "Mastercard",
    profession: "Senior Software Developer in Test, 05/2022 - 08/2022",
    URL: "/mastercard-logo.jpg",
    desc: "Working on both development and testing of file transfer and credit card dispute microservices",
  },
  {
    title: "Nortal U.S",
    profession: "Senior Fullstack Engineer, 09/2022 - Present",
    URL: "/nortal-logo.jpg",
    desc: "Worked on internal Amazon projects, mainly on global Amazon Facilities, Buildings, Devices management applications. Also worked on Backend development for TMobile prepaid public APIs.",
  },
  {
    title: "Replicon",
    profession: "Fullstack Software Engineer, 04/2014 - 02/2022",
    URL: "/replicon-logo.jpg",
    desc: "Developed AWS applications for time-attendance tracking, timeoff management, scheduling, project management, compliance payroll, and more.",
  },
  {
    title: "Pason Inc.",
    profession: "Software Developer in Test, 02/2022 - 04/2022",
    URL: "/pason-logo.jpg",
    desc: "Working on writing UI tests on drilling softwaresfor Oil & Gas Industry.",
  },
];

export const SOCIALS = {
  title: "Social",
  links: [
    "/facebook.svg",
    "/instagram.svg",
    "/twitter.svg",
    "/youtube.svg",
    "/linkedin.svg",
  ],
};

export const SOCIALS_LINKS = {
  Facebook: "https://www.facebook.com/thangtran311286",
  Instagram: "https://www.instagram.com/thangtran311286",
  Twitter: "https://www.twitter.com/thangtran3112",
  Linkedin: "https://www.linkedin.com/in/thang-tran-23197784",
  Github: "https://www.github.com/thangtran3112",
};

export const RESUME = {
  title: "Resume",
  googleDrive:
    "https://drive.google.com/file/d/14BtNDwGiIlkOSTE3GnAjmj_Np7U3xxCQ/view?usp=sharing",
  downloadable: "http://thangtrandev.net/resume.pdf",
};
