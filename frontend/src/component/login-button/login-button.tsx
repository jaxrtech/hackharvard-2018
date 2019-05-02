import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, Intent } from '@blueprintjs/core';

import { LoginService } from 'src/services/login';

export type LoginButtonProps = { login: LoginService, onSuccess: (data: LoginContext, props: LoginButtonProps) => void };

export type LoginContext = { screenName: string };

@observer
export class LoginButton extends React.Component<LoginButtonProps> {

  private readonly _listener = (ctx: any) => {
    this.props.onSuccess({ screenName: (ctx.data.screenName as string) }, this.props);
  }

  public componentDidMount() {
    this.props.login.invokeIfLoggedIn(this._listener);
    this.props.login.addListener('login', this._listener);
  }

  public componentWillUnmount() {
    this.props.login.removeListener('login', this._listener);
  }

  private handleLogin = async () => {
    try {
      await this.props.login.login();
    } catch (err) {
      // TODO: Use more rebust error handling here.
      //   E.g. Did the user close the window or did something break?
      console.warn('login', 'failed!', err);
      return;
    }
  }

  public render() {
    return (
      <Button
        onClick={this.handleLogin}
        text={<span>Login</span>}
        intent={Intent.PRIMARY}
        disabled={this.props.login.status === 'disabled'} />
    );
  }
}