import { PortfolioCategory } from "@/types/database";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Wedding", "Pre-Wedding", "Engagement", "Couple Portraits",
  "Haldi", "Mehndi", "Sangeet", "Reception",
];

export function formatDate(d: string | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
