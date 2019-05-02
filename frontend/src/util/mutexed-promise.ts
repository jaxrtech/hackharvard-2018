
export type MutexedPromiseFn<T> = (force?: boolean) => Promise<T>;

/**
 * A wrapper for a promise that prevents the code from running more than once
 * when the promise is already running. If the promise is already running,
 * and the code `load()` is called again, then the previous promise unresolved
 * will be returned.
 */
export class MutexedPromise<T = void> {
  private _loading: Promise<T> | null = null;
  private _lastResult: T | null = null;
  private action: MutexedPromiseFn<T>;
  private didLoad = false;

  constructor(action: MutexedPromiseFn<T>) {
    this.action = action;
  }

  public async load(force = false) {
    if (!force && this._loading) {
      return await this._loading;
    }

    if (!force && this.didLoad) {
      return this._lastResult;
    }

    try {
      this.didLoad = false;
      const ticket = this.action(force);
      this._loading = ticket;
      
      const result = await ticket;
      this._lastResult = result;
      this.didLoad = true;
      return result;
    }
    finally {
      this._loading = null;
    }
  }
}