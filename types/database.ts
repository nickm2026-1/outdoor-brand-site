export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export type Destination = {
  id: string;
  name: string;
  location: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  affiliate_link: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
};
