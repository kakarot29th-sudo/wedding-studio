// Generated shape of the database — mirrors supabase/schema.sql.
// If you change the schema, regenerate with:
//   npx supabase gen types typescript --project-id <id> > types/database.ts

export type InquiryStatus =
  | "New"
  | "Contacted"
  | "Follow-up"
  | "Confirmed"
  | "Closed";

export type PortfolioCategory =
  | "Wedding"
  | "Pre-Wedding"
  | "Engagement"
  | "Couple Portraits"
  | "Haldi"
  | "Mehndi"
  | "Sangeet"
  | "Reception";

export interface SiteSettings {
  id: number;
  site_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  updated_at: string;
}

export interface SeoSettings {
  id: number;
  title: string;
  description: string;
  keywords: string;
  og_image: string;
  updated_at: string;
}

export interface HomepageContent {
  id: number;
  hero_heading: string;
  hero_subheading: string;
  hero_image: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  cta_heading: string;
  cta_description: string;
  cta_button_text: string;
  updated_at: string;
}

export interface AboutContent {
  id: number;
  heading: string;
  body: string;
  image: string;
  philosophy: string;
  experience_years: number;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioImage {
  id: string;
  url: string;
  category: PortfolioCategory;
  caption: string;
  alt_text: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface WeddingStory {
  id: string;
  slug: string;
  couple_name: string;
  wedding_date: string | null;
  location: string;
  cover_image: string;
  description: string;
  gallery: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  review: string;
  rating: number;
  wedding_info: string;
  active: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  wedding_date: string | null;
  location: string;
  event_type: string;
  guest_count: number | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      [table: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };

      site_settings: {
        Row: SiteSettings & Record<string, unknown>;
        Insert: Partial<SiteSettings> & Record<string, unknown>;
        Update: Partial<SiteSettings> & Record<string, unknown>;
        Relationships: [];
      };

      seo_settings: {
        Row: SeoSettings & Record<string, unknown>;
        Insert: Partial<SeoSettings> & Record<string, unknown>;
        Update: Partial<SeoSettings> & Record<string, unknown>;
        Relationships: [];
      };

      homepage_content: {
        Row: HomepageContent & Record<string, unknown>;
        Insert: Partial<HomepageContent> & Record<string, unknown>;
        Update: Partial<HomepageContent> & Record<string, unknown>;
        Relationships: [];
      };

      about_content: {
        Row: AboutContent & Record<string, unknown>;
        Insert: Partial<AboutContent> & Record<string, unknown>;
        Update: Partial<AboutContent> & Record<string, unknown>;
        Relationships: [];
      };

      services: {
        Row: Service & Record<string, unknown>;
        Insert: Partial<Service> & Record<string, unknown>;
        Update: Partial<Service> & Record<string, unknown>;
        Relationships: [];
      };

      portfolio_images: {
        Row: PortfolioImage & Record<string, unknown>;
        Insert: Partial<PortfolioImage> & Record<string, unknown>;
        Update: Partial<PortfolioImage> & Record<string, unknown>;
        Relationships: [];
      };

      wedding_stories: {
        Row: WeddingStory & Record<string, unknown>;
        Insert: Partial<WeddingStory> & Record<string, unknown>;
        Update: Partial<WeddingStory> & Record<string, unknown>;
        Relationships: [];
      };

      testimonials: {
        Row: Testimonial & Record<string, unknown>;
        Insert: Partial<Testimonial> & Record<string, unknown>;
        Update: Partial<Testimonial> & Record<string, unknown>;
        Relationships: [];
      };

      inquiries: {
        Row: Inquiry & Record<string, unknown>;
        Insert: Partial<Inquiry> & Record<string, unknown>;
        Update: Partial<Inquiry> & Record<string, unknown>;
        Relationships: [];
      };
    };

    Views: {};

    Functions: {};

    Enums: {};

    CompositeTypes: {};
  };
}