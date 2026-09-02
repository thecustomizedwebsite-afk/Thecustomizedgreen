export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
};
