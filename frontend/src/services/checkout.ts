import { IToaster, Intent } from '@blueprintjs/core';
import { RouterStore } from 'mobx-react-router';
import { ConfigStore } from 'src/stores/app';
import { ItemOrderComponent } from 'src/component/item';

export interface UserRegistration {
  name: string;
  email: string;
  dob: string;
  zipcode: string;
  password: string;
}

export class CheckoutService {
  private config: ConfigStore;
  private router: RouterStore;
  private toaster: IToaster;

  constructor(config: ConfigStore, router: RouterStore, toaster: IToaster) {
    this.config = config;
    this.router = router;
    this.toaster = toaster;
  }

  // TODO
  public async submit() {
    setTimeout(() => {
      this.toaster.show({ intent: Intent.SUCCESS, message: "Order placed successfully!" });
      this.router.replace('/checkout/success');
    }, 200);
    return;
    
    //

    // tslint:disable-next-line:one-variable-per-declaration
    /*
    const res = await fetch(
      this.config.API_ROOT_URL + `/rpc/user_register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          p_name: profile.name,
          p_dob: "01/19/2019",
          p_email: profile.email,
          p_zipcode: parseInt(profile.zipcode, 10),
          p_password: profile.password })
      });

    const json = await res.json();
    if (res.status >= 400 && res.status <= 599) {
      throw new Error((json as any).message || 'Unable to register account. Try again in a moment...');
    }

    this.toaster.show({ intent: Intent.SUCCESS, message: 'Account successfully created! You can now login.'});
    this.router.replace('/login');
    */
  }
}