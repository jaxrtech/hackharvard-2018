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
  quanity: number;
}

export interface Order {
  items: ItemOrder[];
  timestamp: Date;
}

export interface OrdersByBusiness {
  business: Business;
  orders: Order[];
}