export interface AppItem {
  id: string;
  name: string;
  archiveName: string;
  entryPath: string;
  type: "zip" | "rar";
  size: number;
}

export interface Solution {
  id: string;
  title: string;
  icon: string; // Lucide icon name or emoji
  description: string;
  targetAudience: string;
  features: string[];
  benefits: string[];
  modules: string[];
  integrations: string[];
  faqs: { question: string; answer: string }[];
  basePriceEstimate: number;
}

export interface ModuleItem {
  id: string;
  name: string;
  icon: string;
  category: "core" | "features" | "integrations" | "advanced";
  description: string;
  priceWeight: number; // For budget calculator
}

export interface Project {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: string;
  tech: string[];
  features: string[];
  demoType: "iframe" | "simulator";
  iframeAppId?: string; // Links to apps.json items if available
  simulatorPreset?: string; // Predefined simulated screens
  image: string; // Mockup or generative placeholder
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface Diferencial {
  title: string;
  description: string;
  icon: string;
}
