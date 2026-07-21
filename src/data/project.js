export const projects = [
  {
    title: 'SmartBite',
    category: 'Full Stack',
    slug: 'smartbite',
    featured: true,
    description:
      'A multilingual restaurant management and ordering platform with AI assistance, role-based access, payment flows, and admin operations designed for real business use.',
    problem:
      'The product needed a strong operational backend for restaurant workflows while also delivering a polished customer experience across Arabic and English.',
    solution:
      'I helped build a full-stack system combining a secure backend, AI-driven support, and a responsive frontend experience for both end users and administrators.',
    features: ['AI assistant', 'Multilingual support', 'Secure auth', 'Admin dashboard', 'Order management', 'Payments'],
    responsibilities: ['Backend architecture', 'Authentication & authorization', 'AI integration', 'API design', 'Product collaboration'],
    challenges: ['Complex role-based access', 'Multilingual content flow', 'Reliable payment and order lifecycle handling'],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React', 'JWT', 'OpenAI', 'i18next', 'REST APIs'],
    stats: ['20+ APIs', 'AI Assistant', 'Localization', 'Responsive'],
    github: 'https://github.com/NesmaAbdel-fataha/smartbite-backend',
    link: 'https://smart-bite-rho.vercel.app/',
    architecture: 'A modular MERN architecture with REST endpoints, middleware-driven auth, and AI services integrated into the order workflow.',
    timeline: '3 months',
    teamSize: '3 developers',
    futureImprovements: 'Optimize database query caching, implement a Redis store for session management, and refine the AI model fine-tuning for restaurant-specific menus.'
  },
  {
    title: 'Accounting Company Website',
    category: 'Frontend',
    slug: 'accounting-company',
    description:
      'A polished business website for an accounting firm that needed a professional online presence with clear service messaging and a modern visual language.',
    problem:
      'The client needed a credible digital presence that reflected professionalism and trust for potential customers.',
    solution:
      'I designed and implemented a structured website with refined content hierarchy, responsive layouts, and a clean business-first experience.',
    features: ['Service-focused UI', 'Responsive layout', 'Modern branding', 'Fast loading experience'],
    responsibilities: ['Frontend implementation', 'Content structure', 'Responsive design'],
    challenges: ['Balancing simplicity with professional tone'],
    tech: ['React', 'Node.js', 'MongoDB'],
    stats: ['Responsive', 'Business-ready UI', 'Modern UX'],
    github: 'https://github.com/NesmaAbdel-fataha/Auditor',
    link: 'https://auditor.eg/',
    architecture: 'A lightweight React frontend with server-side support and a straightforward content-driven structure.',
    timeline: '1 month',
    teamSize: '1 developer',
    futureImprovements: 'Integrate a Headless CMS (like Contentful or Sanity) so the accounting staff can write blog posts and update service details without redeploying code.'
  },
  {
    title: 'Users Management App',
    category: 'Full Stack',
    slug: 'users-management',
    description:
      'A CRUD-based admin application for managing user records with a clear interface and a maintainable data flow.',
    problem:
      'The app needed to help admins manage records efficiently without sacrificing usability or clarity.',
    solution:
      'I built a focused dashboard experience around CRUD operations, data presentation, and smooth interactions.',
    features: ['Admin dashboard', 'CRUD flows', 'Responsive UI', 'Data management'],
    responsibilities: ['Frontend development', 'API consumption', 'UI polish'],
    challenges: ['Keeping the interface simple while supporting multiple user actions'],
    tech: ['Next.js', 'React', 'REST API', 'Responsive Design'],
    stats: ['CRUD', 'Admin-ready', 'Responsive'],
    github: 'https://github.com/NesmaAbdel-fataha/next-crud',
    link: 'https://next-crud-tau-seven.vercel.app/',
    architecture: 'A Next.js front end paired with API-driven data flows for efficient administration.',
    timeline: '2 weeks',
    teamSize: '1 developer',
    futureImprovements: 'Add role-based client-side routing, expand the audit logging system, and implement automated end-to-end testing using Playwright.'
  },
  {
    title: 'Educational Website',
    category: 'Frontend',
    slug: 'eduhub',
    description:
      'An educational platform for presenting learning content in an accessible and modern format.',
    problem:
      'The platform needed to make educational content feel approachable and easy to navigate.',
    solution:
      'I focused on clean information architecture, readable layouts, and a calm visual experience for learners.',
    features: ['Accessible content', 'Modern layout', 'Readable UI', 'Responsive design'],
    responsibilities: ['UI implementation', 'Content organization', 'Responsive design'],
    challenges: ['Making static educational content feel engaging'],
    tech: ['React', 'Responsive Design'],
    stats: ['Accessible', 'Modern UI', 'Responsive'],
    github: 'https://github.com/NesmaAbdel-fataha/edu-hub',
    link: 'https://nesmaabdel-fataha.github.io/edu-hub/',
    architecture: 'A component-driven React experience designed for clear educational presentation.',
    timeline: '1 month',
    teamSize: '1 developer',
    futureImprovements: 'Introduce an interactive quiz engine, user bookmarks for learning modules, and support for video lesson playback with progress caching.'
  },
  {
    title: 'Donation Platform',
    category: 'Backend',
    slug: 'donation-platform',
    description:
      'A full-stack donation platform that supports campaign creation, secure user flows, and streamlined contribution management.',
    problem:
      'The platform needed trustworthy user journeys and backend logic to handle campaign creation responsibly.',
    solution:
      'I built the system around secure authentication, campaign handling, and a simple user experience that supports the donation workflow.',
    features: ['Campaign management', 'User auth', 'Secure flow', 'Responsive design'],
    responsibilities: ['Backend development', 'Auth implementation', 'Database design'],
    challenges: ['Designing a secure and dependable contribution flow'],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Authentication', 'Responsive Design'],
    stats: ['Secure auth', 'Campaign flow', 'Responsive'],
    github: 'https://github.com/alimahmoud223/alitask',
    architecture: 'A server-oriented architecture using Express and MongoDB to manage campaigns and user interactions.',
    timeline: '2 months',
    teamSize: '2 developers',
    futureImprovements: 'Integrate a real payment gateway (like Stripe) in sandbox mode, and implement automated transactional email notifications for donor receipts.'
  },
  {
  title: 'Movie App',
  category: 'Frontend',
  slug: 'movie-app',
  description:
    'A responsive movie discovery web application built with React that allows users to browse trending movies, explore detailed information, search for titles, and enjoy a seamless browsing experience through a clean and modern interface.',
  problem:
    'Users often struggle to discover movies efficiently across different platforms. The goal was to create a fast and intuitive application for exploring movie information in one place.',
  solution:
    'Built a responsive React application integrated with a movie database API, providing real-time movie browsing, search functionality, detailed movie pages, and an engaging user experience.',
  features: [
    'Browse Trending Movies',
    'Movie Details',
    'Search Movies',
    'Responsive Design',
    'Dynamic Routing',
    'Loading States',
    'Error Handling',
    'Modern UI'
  ],
  responsibilities: [
    'Frontend Development',
    'API Integration',
    'Responsive UI Design',
    'State Management',
    'Component Architecture',
    'Performance Optimization'
  ],
  challenges: [
    'Handling asynchronous API requests efficiently.',
    'Managing application state across multiple pages.',
    'Creating a responsive layout that works on all devices.'
  ],
  tech: [
    'React.js',
    'JavaScript',
    'React Router',
    'Axios',
    'CSS3',
    'REST API',
    'Responsive Design'
  ],
  stats: [
    'React',
    'REST API',
    'Responsive'
  ],
  github: 'https://github.com/NesmaAbdel-fataha/e-commerce',
  link: 'https://e-commerce-eight-xi-22.vercel.app/#/',
  architecture:
    'A component-based React architecture integrated with a RESTful Movie API using reusable components, client-side routing, and efficient state management.',
  timeline: '2 weeks',
  teamSize: '1 developer',
  futureImprovements:
    'Add user authentication, favorite movies, watchlist functionality, movie trailers, pagination, filtering by genres, dark mode, and offline caching for improved user experience.'
},
 {
  title: 'CodeMentor',
  category: 'Frontend',
  slug: 'codementor',
  description:
    'A modern and responsive landing page designed for a programming mentorship platform. The website showcases mentoring services, learning paths, features, testimonials, and contact information with a clean and engaging user experience.',
  problem:
    'The goal was to build a professional landing page that clearly presents the platform, attracts potential learners, and provides an intuitive user experience across all devices.',
  solution:
    'Developed a fully responsive React application with Material UI, focusing on clean layouts, reusable components, smooth navigation, and modern UI/UX while maintaining excellent performance.',
  features: [
    'Responsive Design',
    'Modern Material UI Interface',
    'Interactive Hero Section',
    'About Section',
    'Services Section',
    'Mentors Showcase',
    'Testimonials',
    'FAQ Section',
    'Contact Page',
    'Smooth Navigation'
  ],
  responsibilities: [
    'UI/UX Design Implementation',
    'Frontend Development',
    'Responsive Layout Development',
    'Component Architecture',
    'Material UI Customization',
    'Performance Optimization'
  ],
  challenges: [
    'Creating a visually appealing layout while keeping the interface clean.',
    'Ensuring full responsiveness across different screen sizes.',
    'Maintaining reusable and scalable component architecture.'
  ],
  tech: [
    'React.js',
    'Material UI',
    'JavaScript',
    'React Router',
    'CSS',
    'Responsive Design'
  ],
  stats: [
    'Responsive',
    'Material UI',
    'React'
  ],
  github: 'https://github.com/NesmaAbdel-fataha/codementor', 
  link: 'https://codementor-mu.vercel.app/',
  architecture:
    'A component-based React architecture using Material UI for consistent design, React Router for navigation, and reusable UI components for scalability.',
  timeline: '1 week',
  teamSize: '1 developer',
  futureImprovements:
    'Integrate a backend for mentor booking, authentication, blog management, dashboard, multilingual support, dark mode, and CMS-powered content management.'
}
];