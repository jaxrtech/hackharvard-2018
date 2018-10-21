import { observable } from 'mobx';

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