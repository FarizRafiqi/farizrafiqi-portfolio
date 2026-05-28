import { defineType, defineField } from "sanity";

const localeString = {
  title: "Localized String",
  name: "localeString",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string" },
    { name: "id", title: "Indonesian", type: "string" },
  ],
};

const localeText = {
  title: "Localized Text",
  name: "localeText",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "text" },
    { name: "id", title: "Indonesian", type: "text" },
  ],
};

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "images", title: "Project Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "tags", title: "Tech Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "category", title: "Category", type: "localeString" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({ name: "gradient", title: "Custom Gradient (Tailwind classes)", type: "string" }),
  ],
  preview: {
    select: { title: "title.en", media: "images.0" },
  },
});

export const experienceSchema = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Role / Title", type: "localeString" }),
    defineField({ name: "company", title: "Company / Organization", type: "localeString" }),
    defineField({ name: "companyUrl", title: "Company URL", type: "url" }),
    defineField({ name: "year", title: "Date Range", type: "localeString" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Internship", value: "internship" },
          { title: "Freelance", value: "freelance" },
          { title: "Education", value: "education" },
          { title: "Leadership", value: "leadership" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description Points",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "string" }] },
        { name: "id", title: "Indonesian", type: "array", of: [{ type: "string" }] },
      ]
    }),
    defineField({ name: "tags", title: "Tech Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});

export const bioSchema = defineType({
  name: "bio",
  title: "Bio & Personal Info",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({ name: "shortName", title: "Short Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "localeString" }),
    defineField({ name: "title", title: "Job Title", type: "localeString" }),
    defineField({ name: "bio", title: "Short Bio", type: "localeText" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "photo", title: "Profile Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "instagram", type: "url" },
        { name: "youtube", type: "url" },
        { name: "twitter", type: "url" },
        { name: "tiktok", type: "url" },
      ]
    }),
  ],
});

export const skillSchema = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "SimpleIcons Slug", type: "string" }),
    defineField({ 
      name: "category", 
      title: "Categories", 
      type: "array", 
      of: [{ type: "string" }],
      options: { 
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Tools & 3D", value: "tools" },
          { title: "Exploring / Interests", value: "exploring" }
        ] 
      } 
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});

export const articleSchema = defineType({
  name: "article",
  title: "Article / Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText" }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true } }
          ]
        },
        {
          name: "id",
          title: "Indonesian",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true } }
          ]
        }
      ]
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }]
    })
  ],
  preview: {
    select: { title: "title.en", media: "mainImage" }
  }
});

export const pitchSchema = defineType({
  name: "pitch",
  title: "Application Pitch",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "companyName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Target Role",
      type: "string",
      description: "e.g., Frontend Developer, Backend Engineer. Determines the default role customization.",
      options: {
        list: [
          { title: "Frontend Engineer", value: "frontend" },
          { title: "Backend Engineer", value: "backend" },
          { title: "Fullstack Engineer", value: "fullstack" },
          { title: "Mobile Engineer", value: "mobile" },
          { title: "3D & VR Developer", value: "3d" },
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "greeting",
      title: "Greeting Message",
      type: "localeText",
      description: "Personalized welcome message for the recruiters.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "selectedProjects",
      title: "Selected Projects (Top 3)",
      description: "Choose up to 3 projects to feature at the top of the grid.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "role",
    },
  },
});

export const schemaTypes = [
  projectSchema,
  experienceSchema,
  bioSchema,
  skillSchema,
  articleSchema,
  pitchSchema,
  localeString,
  localeText
];
