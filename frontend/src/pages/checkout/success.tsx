import * as React from 'react';
import { Icon } from '@blueprintjs/core';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';

import './success.css';
import { Link } from 'react-router-dom';
import { ShoppingCartStore } from 'src/stores/app';

@inject('cart')
@inject('router')
@inject('toaster')
@observer
export class CheckoutSuccessPage extends React.Component<{ router: RouterStore; cart: ShoppingCartStore }> {

  public componentDidMount() {
    this.props.cart.clear();
  }

  public render() {
    return (
      <div className="page-login-container">
        <h1 style={{ color: 'white' }}></h1>
        <main className="page-success">
          <Icon icon="tick-circle" color="#0b7f2e" iconSize={128} />
          <h2>Order Successfully Placed!</h2>
          <Link to="/orders">View All Orders</Link>
        </main>
      </div>
    );
  }
}