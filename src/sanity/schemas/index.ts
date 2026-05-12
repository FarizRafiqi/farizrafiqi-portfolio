import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "tags", title: "Tech Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});

export const experienceSchema = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Role / Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "company", title: "Company / Organization", type: "string" }),
    defineField({ name: "companyUrl", title: "Company URL", type: "url" }),
    defineField({ name: "year", title: "Date Range (e.g. 2024 – Present)", type: "string" }),
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
    defineField({ name: "description", title: "Bullet Points", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tags", title: "Tech Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order (lower = first)", type: "number" }),
  ],
});

export const bioSchema = defineType({
  name: "bio",
  title: "Bio & Personal Info",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "bio", title: "Short Bio", type: "text" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "photo", title: "Profile Photo", type: "image", options: { hotspot: true } }),
  ],
});

export const skillSchema = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "SimpleIcons Slug", type: "string" }),
    defineField({ name: "color", title: "Brand Color (hex without #)", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Frontend", "Backend", "Tools & 3D"] } }),
    defineField({ name: "level", title: "Proficiency Level", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});

export const schemaTypes = [projectSchema, experienceSchema, bioSchema, skillSchema];
