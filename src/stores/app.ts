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
