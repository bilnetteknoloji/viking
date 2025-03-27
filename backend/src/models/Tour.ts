export interface Tour {
  id: string;
  name: string;
  description?: string;
  route_info: string;
  boat_name?: string;
  start_time: Date;
  max_capacity: number;
  price: number;
  image_url?: string;
  created_at: Date;
  boat?: {
    id: string;
    name: string;
    capacity: number;
  };
  route?: {
    id: string;
    name: string;
    description: string;
    duration: number;
  };
  reservations?: {
    id: string;
    people_count: number;
  }[];
} 