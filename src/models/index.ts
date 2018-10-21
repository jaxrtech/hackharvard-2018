import { ExperiencePage } from './../pages/experience/index';
import { Business } from './index';


export interface Business {
  name: string;
  rating: number;
  distance: number;
  pricing: number;
}

export interface Item {
  photoUrl: string;
  name: string;
  price: number; // TODO(Bowden): use decimal numbers not float!
  unit: string;
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
  name: string;
  by: string;
  date: string;
  contact: string;
  address: string;
  spotsLeft: string;
}