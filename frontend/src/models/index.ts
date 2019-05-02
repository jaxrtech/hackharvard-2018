import { ExperiencePage } from './../pages/experience/index';
import { Business } from './index';


export interface Business {
  id: string;
  name: string;
  rating: number;
  distance: number;
  pricing: number;
  imgurl?: string;
  blurb?: string;
}

export interface Item {
  id: string;
  photoUrl: string;
  price: number; // TODO(Bowden): use decimal numbers not float!
  unitOfMeasurement: string;
  product: {
    name: string;
  };
}

export interface ItemOrder {
  item: Item;
  quantity: number;
  business: Business;
}

export interface Order {
  items: ItemOrder[];
  timestamp: Date;
}

export interface OrdersByBusiness {
  business: Business;
  orders: Order[];
}

export interface Experience {
  eventType: string;
  events: Event[];
}

export interface Event {
  name: string;
  by: string;
  date: string;
  contact: string;
  address: string;
  spotsLeft: string;
}

export interface BusinessSearchResult {
  id: string;
  business_id: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  stars: number;
  rating: number;
  review_count: number;
  is_open: number;
  attributes: { [key: string]: string };
  categories: string;
  hours: Hours | null;
}

export interface Hours {
  Friday: string;
  Saturday: string;
  Sunday: string;
}