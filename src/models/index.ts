import { Business } from './index';


export interface Business {
  id: string;
  name: string;
  rating: number;
  distance: number;
  pricing: number;
}

export interface Item {
  id: string;
  photoUrl: string;
  name: string;
  price: number; // TODO(Bowden): use decimal numbers not float!
  unitOfMeasurement: string;
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