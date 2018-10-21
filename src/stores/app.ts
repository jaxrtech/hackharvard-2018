import { observable } from 'mobx';
import { ItemOrder } from 'src/models';

export class ConfigStore {
  @observable public INITIAL_COUNTER = 0;
 
  constructor(config: { initialCounter: number }) {
    this.INITIAL_COUNTER = config.initialCounter;
  }

  public async load(): Promise<void> {
    return;
  }
}

export class SearchBarStore {
  @observable public query = "";
}

export class ChatStore {
  @observable public hidden = false;

  public toggle() {
    this.hidden = !this.hidden;
  }
}

export class ShoppingCartStore {
  @observable public orders: ItemOrder[] = [];

  public get(order: ItemOrder) {
    const found = this.orders.find(x =>
      x.item.name === order.item.name
      && x.business.name === order.business.name);

    return found;
  }

  public addOrUpdate(newOrder: ItemOrder) {
    // TODO(Bowden): replace with actually UUIDs
    const oldOrderIndex = this.orders.findIndex(x =>
      x.item.name === newOrder.item.name
        && x.business.name === newOrder.business.name);
    
    if (oldOrderIndex < 0) {
      this.orders.push(newOrder);
      return newOrder;
    }

    const oldOrder = this.orders[oldOrderIndex];

    // HACK(Bowden): This might update the business entity which might mess things up
    const order = Object.assign(oldOrder, newOrder);
    if (order.quantity === 0){
      this.orders.splice(oldOrderIndex);
      return null;
    }

    return order;
  }

  public remove(order: ItemOrder) {
    order.quantity = 0;
    this.addOrUpdate(order);
  }
}