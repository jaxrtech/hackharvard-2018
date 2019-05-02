import { observable } from 'mobx';
import { ItemOrder, BusinessSearchResult } from 'src/models';
import { IToaster, Intent } from '@blueprintjs/core';

export class ConfigStore {
  @observable public INITIAL_COUNTER = 0;
  @observable public API_ROOT_URL;
 
  constructor(config: { initialCounter: number, API_ROOT_URL: string }) {
    this.INITIAL_COUNTER = config.initialCounter;
    this.API_ROOT_URL = config.API_ROOT_URL;
  }

  public async load(): Promise<void> {
    return;
  }
}

export class SearchBarStore {
  @observable public query = "";

  @observable public ready = false;
  @observable public loading = false;
  @observable public error = null as Error | null;

  @observable public results: BusinessSearchResult[] = [];

  public async load() {
    try {
      console.log("Search: attempting to load");
      this.loading = true;
      await this._reload();
      this.ready = true;
    } catch (err) {
      this.error = err;
    } finally {
      this.loading = false;
    }
  }

  private async _reload() {
    console.log('Refetching...');
    const keywords = this.query;
    const keywordsEncoded = encodeURI(keywords);
    const queryUrl = `http://198.37.24.59:3000/store`;
    const json = await fetch(queryUrl).then(x => x.json());

    console.log('search', json);
    this.results = json;
  }

}

export class ChatStore {
  @observable public hidden = false;

  public toggle() {
    this.hidden = !this.hidden;
  }
}

export class ShoppingCartStore {
  @observable public orders: ItemOrder[] = [];

  public get(id: string) {
    const found = this.orders.find(x =>
      x.item.id === id);
    return found;
  }

  public addOrUpdate(newOrder: ItemOrder) {
    const oldOrderIndex = this.orders.findIndex(x =>
      x.item.id === newOrder.item.id);
    
    if (oldOrderIndex < 0) {
      this.orders.push(newOrder);
      return newOrder;
    }

    const oldOrder = this.orders[oldOrderIndex];

    // HACK(Bowden): This might update the business entity which might mess things up
    const order = Object.assign(oldOrder, newOrder);
    if (order.quantity === 0){
      this.orders.splice(oldOrderIndex, 1);
      return null;
    }

    return order;
  }

  public remove(order: ItemOrder) {
    order.quantity = 0;
    this.addOrUpdate(order);
  }
}