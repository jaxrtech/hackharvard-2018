import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';

const DUMMY_SC = 
  { 
    business: [
      {
        "business": "Avalon inc.", 
        "orders": [
          {
            "name": "Lid - 3oz Med Rec",
            "price": 291.73,
            "unit": "bottle",
            "count": 1
          }
        ]
      },
      {
        "business": "7 Eleven.", 
        "orders": [
          {
            "name": "Garlic - Primerba, Paste",
            "price": 14.95,
            "unit": "hour",
            "count": 1
          },
          {
            "name": "Cake Sheet Combo Party Pack",
            "price": 359.31,
            "unit": "bushel",
            "count": 2
          }
        ]
      }
    ]
  };

@observer
export class ShoppingCartPage extends React.Component {
  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/shoppingCartItems.json').then(x => x.json());
    console.log('shoppingCart', json);
    this.results = json;
  }

  public render() {
    const cards = this.results.map((x, i) => <ItemOrderComponent key={i} model={x} />);
    return (
      <>
        <h1>Shopping Cart</h1>
        
        {cards}
      </>
    );

    
  }
}
