export type Review = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  service: string | null;
  approved: boolean;
  created_at: string;
};
