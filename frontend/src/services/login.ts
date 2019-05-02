import { observable, computed } from 'mobx';
import { EventEmitter } from 'events';
import { IToaster } from '@blueprintjs/core';
import { MutexedPromise } from 'src/util/mutexed-promise';
import { RouterStore } from 'mobx-react-router';

export interface UserProfile {
  name: string;
  dob: string;
  zipcode: number;
}

export interface LoginContext {
  jwt: string;
  user: UserProfile;
}

export class LoginService extends EventEmitter {

  public get jwt(): string { return window.localStorage.getItem('jwt') || ''; }
  public set jwt(value: string) { window.localStorage.setItem('jwt', value); }

  @observable private _context: LoginContext | null;
  @computed public get isLoggedIn() { return !!this._context; }
  @computed public get context() { return this._context; }
  @computed public get user() {
    if (this._context == null) { return null; }
    return this._context.user;
  }

  @observable private _status: 'enabled' | 'disabled' = 'enabled';
  @computed public get status() { return this._status; }
  @computed public get canLogin() { return this._status === 'enabled'; }

  private readonly API_ROOT_URL: string;

  private toaster: IToaster;
  private router: RouterStore;

  constructor(toaster: IToaster, router: RouterStore) {
    super();

    this._loginMutex = new MutexedPromise(this._login);

    this.toaster = toaster;
    this.router = router;

    this.attemptReauth();
  }

  private async attemptReauth() {
    try {
      await this.reauth();
    } catch (err) {
      console.warn('login', 'reauth failed', err);
    }
  }

  private async reauth() {
    try {
      const jwt = this.jwt;
      if (!jwt) { throw new Error("Cannot reauth without JWT token"); }

      const data = await fetch(
        this.API_ROOT_URL + `/rpc/relogin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ p_jwt: jwt })
        })
        .then(x => x.json());

      await this.handleLogin(data);
    } catch (err) {
      this.toaster.show({
        intent: 'warning',
        message: 'Session expired. Please login again.',
        action: {
          text: 'Login',
          onClick: () => { this.login(true); },
        },
      });
    }
  }

  public invokeIfLoggedIn(fn: (context: any) => void) {
    if (this.isLoggedIn && this._context) {
      fn(this._context);
    }
  }

  public load(force = false) {
    return this.login(force);
  }

  public login(force = false) {
    // Don't need to check if we are already logged in since the mutex will
    // remember the last context...

    // TODO: ...but that will change when we will need to force a logout

    return this._loginMutex.load(force);
  }

  private readonly _loginMutex: MutexedPromise<any>;
  private readonly _login = async () => {
    this._status = 'disabled';

    try {
      this.router.push('/login');
      return null;
    }
    finally {
      this._status = 'enabled';
    }
  }

  private handleLoginContextInternal(data: any, resolve: (data: any) => void, reject: (err: Error) => void) {
    console.debug('login', data);

    if (typeof data.jwt !== 'string') {
      reject(new Error(`Missing JWT token`));
      return false;
    }

    this.jwt = data.jwt;

    console.log('login', 'success!', data);

    resolve(data);
    return true;
  }

  private async handleLogin(data: any) {
    const context = await new Promise<LoginContext>((resolve, reject) => {
      const success = this.handleLoginContextInternal(data, resolve, reject);
      if (!success) {
        reject(new Error('login context validation failed'));
      }
    });

    this._context = context;
    this.notifyLogin(context);
  }

  private notifyLogin(context: LoginContext) {
    console.log('login', 'success');
    this.emit('login', context);
  }
}