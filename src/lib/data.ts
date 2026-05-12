// Personal data sourced from farizrafiqi.dev and GitHub
export const personalData = {
  name: "Aulia El Ihza Fariz Rafiqi",
  shortName: "Fariz Rafiqi",
  title: "Software Engineer & 3D Designer",
  tagline: "Engineering Worlds in Code & Dimension",
  bio: "Undergraduate informatics student with experience in software engineering since 2018. Former full-stack web developer at a software house in Jakarta. Passionate about Game Development, 3D Design, Machine Learning, VR, AR, and Mobile Development.",
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

export const projects = [
  {
    id: 1,
    title: "Kaladwipa",
    subtitle: "Local Arts Engagement Platform",
    description:
      "A website created for the ICT Student Exhibition (Gemastik). Built with my team — enabling users to support local artists and discover artworks. Features multiplatform support via Ionic and Capacitor.",
    tech: ["Laravel", "Vue.js", "Ionic", "Capacitor", "Tailwind CSS"],
    category: "Full Stack",
    color: "from-emerald-500 to-teal-600",
    featured: true,
  },
  {
    id: 2,
    title: "Kania Jaya E-Shop",
    subtitle: "Admin Panel",
    description:
      "A comprehensive e-commerce admin panel for managing product data, orders, payments, and users. Clean interface built with Vue.js and enhanced with Tailwind CSS for a university project.",
    tech: ["Laravel", "Vue.js", "Tailwind CSS"],
    category: "Full Stack",
    color: "from-cyan-500 to-blue-600",
    featured: true,
  },
  {
    id: 3,
    title: "MegaMendung PPOB",
    subtitle: "Payment Point Online Bank",
    description:
      "A PPOB website for checking and paying electric bills — my vocational school final project. Features customer and admin pages, integrated with the Midtrans payment gateway.",
    tech: ["Laravel", "Bootstrap 4", "Livewire", "Midtrans"],
    category: "Full Stack",
    color: "from-violet-500 to-purple-600",
    featured: true,
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
    { name: "MySQL", icon: "mysql" },
    { name: "Node.js", icon: "nodedotjs" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "Docker", icon: "docker" },
    { name: "Figma", icon: "figma" },
    { name: "Blender", icon: "blender" },
    { name: "Three.js", icon: "threedotjs" },
  ],
  interests: ["Game Development", "3D Design", "Machine Learning", "VR & AR", "Mobile Development"],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
