export const personalData = {
  name: "Aulia El Ihza Fariz Rafiqi",
  shortName: "Fariz Rafiqi",
  title: {
    en: "Software Engineer & AI Enthusiast",
    id: "Software Engineer & Antusias AI"
  },
  tagline: {
    en: "Engineering Intelligence in Code & Infrastructure",
    id: "Merekayasa Kecerdasan dalam Kode & Infrastruktur"
  },
  bio: {
    en: "Fresh graduate informatics student with experience in software engineering since 2018. Currently working as a Fullstack Engineer at Solusi Teknologi Kreatif. Passionate about AI, Server Management, and Modern Full-stack Development.",
    id: "Fresh graduate informatika S1 dengan pengalaman dalam rekayasa perangkat lunak sejak 2018. Saat ini bekerja sebagai Fullstack Engineer di Solusi Teknologi Kreatif. Antusias terhadap AI, Manajemen Server, dan Pengembangan Full-stack Modern."
  },
  location: "Bekasi, Indonesia",
  email: "auliaelihza07@gmail.com",
  socials: {
    github: "https://github.com/FarizRafiqi",
    linkedin: "https://www.linkedin.com/in/fariz-rafiqi/",
    twitter: "https://twitter.com/rafiqi_fariz",
    instagram: "https://www.instagram.com/rafiqi_fariz/",
    youtube: "https://www.youtube.com/channel/UCEf5OjRfHVSjpe6nSxeXOHg",
    tiktok: "https://www.tiktok.com/@farizrafiqi0703",
  },
  website: "https://farizrafiqi.dev",
};

export const experiences = [
  {
    year: { en: "Sep 2025 – Present", id: "Sep 2025 – Sekarang" },
    title: { en: "Fullstack Engineer", id: "Insinyur Fullstack" },
    company: "Solusi Teknologi Kreatif (STK)",
    location: "Jakarta, Indonesia · On-site",
    type: "full-time",
    isCurrent: true,
    description: {
      en: [
        "Developing and maintaining full-stack web applications.",
        "Collaborating with cross-functional teams to deliver software solutions.",
        "Implementing modern frontend and backend technologies.",
      ],
      id: [
        "Mengembangkan dan memelihara aplikasi web full-stack.",
        "Berkolaborasi dengan tim lintas fungsi untuk memberikan solusi perangkat lunak.",
        "Mengimplementasikan teknologi frontend dan backend modern.",
      ]
    },
    tags: ["Golang", "Next.js", "Kubernetes", "NestJS", "Docker", "Ubuntu", "PostgreSQL", "React.js", "TypeScript", "JavaScript"],
  },
  {
    year: { en: "May 2025 – Aug 2025", id: "Mei 2025 – Agt 2025" },
    title: { en: "Backend Developer", id: "Pengembang Backend" },
    company: "PT. Zamasco Mitra Solusindo",
    location: "Jakarta, Indonesia · Hybrid",
    type: "full-time",
    description: {
      en: [
        "Designed and built RESTful APIs for internal business applications.",
        "Optimized database queries and improved system performance.",
        "Worked on integrations with third-party services.",
      ],
      id: [
        "Merancang dan membangun RESTful API untuk aplikasi bisnis internal.",
        "Mengoptimalkan kueri database dan meningkatkan performa sistem.",
        "Bekerja pada integrasi dengan layanan pihak ketiga."
      ]
    },
    tags: ["Go", "PHP", "MySQL", "REST API"],
  },
  {
    year: { en: "2022 – 2025", id: "2022 – 2025" },
    title: { en: "Fullstack Web Developer", id: "Pengembang Web Fullstack" },
    company: { en: "Freelance", id: "Lepas (Freelance)" },
    type: "freelance",
    description: {
      en: [
        "Built custom web applications for clients across various industries.",
        "Delivered projects including e-commerce platforms and admin dashboards.",
        "Managed projects end-to-end from requirements to deployment.",
      ],
      id: [
        "Membangun aplikasi web kustom untuk klien di berbagai industri.",
        "Memberikan proyek termasuk platform e-commerce dan dashboard admin.",
        "Mengelola proyek dari awal hingga akhir dari persyaratan hingga peluncuran."
      ]
    },
    tags: ["Laravel", "Vue.js", "React", "Tailwind CSS"],
  },
  {
    year: { en: "2021 – Present", id: "2021 – Sekarang" },
    title: { en: "Informatics Engineering", id: "Teknik Informatika" },
    company: "UPNVJ",
    location: "Depok, Indonesia",
    type: "education",
    description: {
      en: [
        "Undergraduate student specializing in software engineering.",
        "Active in campus organizations and coding competitions.",
        "Pursuing interests in Linux, Docker, NestJS, and Proxmox.",
      ],
      id: [
        "Mahasiswa S1 spesialisasi rekayasa perangkat lunak.",
        "Aktif dalam organisasi kampus dan kompetisi pemrograman.",
        "Mengejar minat dalam Linux, Docker, NestJS, dan Proxmox."
      ]
    },
    tags: ["Algorithms", "Software Engineering", "Databases"],
  },
];

export const projects = [
  {
    id: "syasaa",
    title: { en: "Attendance App", id: "Aplikasi Presensi" },
    subtitle: { en: "Freelance Administration Platform", id: "Platform Administrasi Freelance" },
    description: {
      en: "A professional attendance system featuring location-based check-ins and AI-powered face recognition for secure identity verification. Built with Ionic React and Laravel.",
      id: "Sistem presensi profesional yang dilengkapi fitur absen berbasis lokasi dan pengenalan wajah berbasis AI untuk verifikasi identitas yang aman. Dibangun dengan Ionic React dan Laravel."
    },
    tags: ["Ionic React", "Capacitor", "TypeScript", "Laravel"],
    category: { en: "Mobile", id: "Mobile" },
    images: ["/img/portfolio/syasaa.png"],
    githubUrl: "https://github.com/FarizRafiqi/syasaa",
    featured: true,
  },
  {
    id: "flowbyte",
    title: { en: "Flowbyte", id: "Flowbyte" },
    subtitle: { en: "The Next-Gen Music Experience", id: "Pengalaman Musik Generasi Mendatang" },
    description: {
      en: "A premium music streaming application built natively with Kotlin. Features seamless integration with the Spotify API for online streaming and supports local storage playback for a complete music experience.",
      id: "Aplikasi streaming musik premium yang dibangun secara native dengan Kotlin. Menampilkan integrasi mulus dengan Spotify API untuk streaming online dan mendukung pemutaran penyimpanan lokal untuk pengalaman musik yang lengkap."
    },
    tags: ["Kotlin", "Android Studio", "Spotify API"],
    category: { en: "Mobile App", id: "Aplikasi Mobile" },
    images: [
      "/img/portfolio/flowbyte/Home Page.png",
      "/img/portfolio/flowbyte/Explore Page.png",
      "/img/portfolio/flowbyte/Library.png",
      "/img/portfolio/flowbyte/Playlist.png",
      "/img/portfolio/flowbyte/Song.png",
      "/img/portfolio/flowbyte/Stats.png",
      "/img/portfolio/flowbyte/Welcome.png",
    ],
    githubUrl: "https://github.com/FarizRafiqi/flowbyte-app",
    featured: true,
    gradient: "bg-gradient-to-t from-black/95 via-blue-900/40 to-transparent",
  },
  {
    id: "kaladwipa",
    title: { en: "Kaladwipa", id: "Kaladwipa" },
    subtitle: { en: "Local Arts Engagement Platform", id: "Platform Keterlibatan Seni Lokal" },
    description: {
      en: "A platform enabling users to support local artists and discover artworks. Features multiplatform support via Ionic and Capacitor.",
      id: "Platform yang memungkinkan pengguna untuk mendukung seniman lokal dan menemukan karya seni. Menampilkan dukungan multiplatform via Ionic dan Capacitor."
    },
    tags: ["Laravel", "Vue.js", "Ionic", "Capacitor"],
    category: { en: "Full Stack", id: "Full Stack" },
    images: ["/img/portfolio/megamendung.png"],
    githubUrl: "https://github.com/FarizRafiqi/kaladwipa",
    featured: true,
  },
  {
    id: "nexpay",
    title: { en: "NexPay", id: "NexPay" },
    subtitle: { en: "PPOB & Bill Payment System", id: "Sistem Pembayaran PPOB & Tagihan" },
    description: {
      en: "A modern PPOB (Payment Point Online Bank) web application for checking and paying electricity bills, fully integrated with Midtrans payment gateway. Built with Laravel and React.js via Inertia.js for a seamless single-page experience. Features include real-time billing checks, payment history, role-based user management (Admin, Bank, Customer), and comprehensive reporting.",
      id: "Aplikasi web PPOB modern untuk mengecek dan membayar tagihan listrik, terintegrasi penuh dengan Midtrans payment gateway. Dibangun dengan Laravel dan React.js melalui Inertia.js untuk pengalaman single-page yang mulus. Fitur termasuk pengecekan tagihan real-time, riwayat pembayaran, manajemen pengguna berbasis peran (Admin, Bank, Pelanggan), dan pelaporan komprehensif."
    },
    tags: ["Laravel", "React.js", "Inertia.js", "Tailwind CSS", "MySQL", "Midtrans"],
    category: { en: "Full Stack", id: "Full Stack" },
    images: ["/img/portfolio/nexpay/1-landing.png", "/img/portfolio/nexpay/2-about-us.png", "/img/portfolio/nexpay/3-how-to-pay.png", "/img/portfolio/nexpay/4-faq.png", "/img/portfolio/nexpay/5-dashboard.png"],
    githubUrl: "https://github.com/FarizRafiqi/nexpay",
    featured: true,
  },
  {
    id: "madina-inventory",
    title: { en: "Madina Inventory", id: "Inventaris Madina" },
    subtitle: { en: "Stock & Warehouse Management", id: "Manajemen Stok & Gudang" },
    description: {
      en: "A professional mobile application for real-time inventory tracking and warehouse management. Features barcode scanning and stock analysis.",
      id: "Aplikasi mobile profesional untuk pelacakan inventaris real-time dan manajemen gudang. Menampilkan pemindaian barcode dan analisis stok."
    },
    tags: ["Ionic React", "Capacitor", "TypeScript", "Node.js"],
    category: { en: "Mobile", id: "Mobile" },
    images: ["/img/portfolio/madina-inventory.png"],
    githubUrl: "https://github.com/FarizRafiqi/MadinaInventoryApp",
    featured: true,
  },
  {
    id: "ankersal",
    title: { en: "Ankersal App", id: "Aplikasi Ankersal" },
    subtitle: { en: "Emergency & Consultation PWA", id: "PWA Darurat & Konsultasi" },
    description: {
      en: "A Progressive Web App for emergency reporting and medical consultations. Features real-time SOS tracking and expert chat systems.",
      id: "Progressive Web App untuk pelaporan darurat dan konsultasi medis. Menampilkan pelacakan SOS real-time dan sistem obrolan ahli."
    },
    tags: ["Laravel", "PWA", "MySQL", "Socket.io"],
    category: { en: "Web / PWA", id: "Web / PWA" },
    images: ["/img/portfolio/ankersal.png"],
    githubUrl: "https://github.com/FarizRafiqi/ankersal-app",
    featured: true,
  },
  {
    id: "kania-jaya",
    title: { en: "Kania Jaya E-Shop", id: "E-Shop Kania Jaya" },
    subtitle: { en: "Admin Panel", id: "Panel Admin" },
    description: {
      en: "Comprehensive e-commerce admin panel for managing product data, orders, payments, and users. Built with Laravel + Vue.js.",
      id: "Panel admin e-commerce komprehensif untuk mengelola data produk, pesanan, pembayaran, dan pengguna. Dibangun dengan Laravel + Vue.js."
    },
    tags: ["Laravel", "Vue.js", "Tailwind CSS"],
    category: { en: "Full Stack", id: "Full Stack" },
    images: ["/img/portfolio/kania-jaya.png"],
    githubUrl: "https://github.com/FarizRafiqi/TokoBajuKaniaJaya",
    featured: false,
  },
  {
    id: "youtube-filter",
    title: { en: "YouTube Comment Filter", id: "Filter Komentar YouTube" },
    subtitle: { en: "AI-Powered Spam Blocker", id: "Pemblokir Spam Berbasis AI" },
    description: {
      en: "A Chrome extension using Gemini AI to filter spam, gambling, and toxic comments in real-time.",
      id: "Ekstensi Chrome menggunakan Gemini AI untuk memfilter spam, judi, dan komentar toksik secara real-time."
    },
    tags: ["JavaScript", "Chrome Extension API", "Gemini API"],
    category: { en: "Extension / AI", id: "Ekstensi / AI" },
    images: ["/img/portfolio/youtube-filter.png"],
    githubUrl: "https://github.com/FarizRafiqi/youtube-comment-filter",
    featured: false,
  },
  {
    id: "doyaneat",
    title: { en: "DoyanEat", id: "DoyanEat" },
    subtitle: { en: "Street Food Recommendation", id: "Rekomendasi Makanan Kaki Lima" },
    description: {
      en: "Vibrant platform for discovering Indonesian street food with ratings and location services.",
      id: "Platform ceria untuk menemukan makanan kaki lima Indonesia dengan rating dan layanan lokasi."
    },
    tags: ["Vue.js", "Ionic", "Capacitor", "Tailwind CSS"],
    category: { en: "Mobile", id: "Mobile" },
    images: ["/img/portfolio/doyaneat.png"],
    githubUrl: "https://github.com/FarizRafiqi/doyaneat",
    featured: false,
  },
  {
    id: "workfrom",
    title: { en: "Workfrom", id: "Workfrom" },
    subtitle: { en: "Workspace Booking Platform", id: "Platform Pemesanan Ruang Kerja" },
    description: {
      en: "A web redesign of workfrom.id created during a bootcamp at Maxy Academy. Focused on improving UI/UX for coworking space discovery.",
      id: "Redesain web dari workfrom.id yang dibuat saat bootcamp di Maxy Academy. Berfokus pada peningkatan UI/UX untuk penemuan ruang kerja bersama."
    },
    tags: ["Laravel", "Bootstrap 5"],
    category: { en: "Web Design", id: "Desain Web" },
    images: ["/img/portfolio/workfrom.png"],
    githubUrl: "https://github.com/FarizRafiqi/workfrom",
    featured: false,
  },
];

export const skills = {
  frontend: [
    { name: "Vue.js", icon: "vuejs" },
    { name: "React", icon: "react" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Ionic", icon: "ionic" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Next.js", icon: "nextdotjs" },
  ],
  backend: [
    { name: "Laravel", icon: "laravel" },
    { name: "PHP", icon: "php" },
    { name: "NestJS", icon: "nestjs" },
    { name: "Elasticsearch", icon: "elasticsearch" },
    { name: "MySQL", icon: "mysql" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Express", icon: "express" },
    { name: "Python", icon: "python" },
    { name: "Go", icon: "go" },
    { name: "MongoDB", icon: "mongodb" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "Docker", icon: "docker" },
    { name: "Linux", icon: "linux" },
    { name: "Ubuntu", icon: "ubuntu" },
    { name: "Debian", icon: "debian" },
    { name: "Proxmox", icon: "proxmox" },
    { name: "Figma", icon: "figma" },
    { name: "Blender", icon: "blender" },
    { name: "Three.js", icon: "threedotjs" },
    { name: "Unity", icon: "unity" },
  ],
  interests: ["Linux Ecosystem", "Proxmox", "AI & Machine Learning", "Server Management", "Software Engineering"],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
