import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';
import { Button, Intent, Card, IToaster } from '@blueprintjs/core';
import { Formik } from 'formik';
import { BPFInput } from 'src/component/bpf-input/bpf-input';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { RouterStore } from 'mobx-react-router';
import { CheckoutService } from 'src/services/checkout';
import { DateTimePicker, DatePicker } from '@blueprintjs/datetime';

import 'react-day-picker/lib/style.css';

@inject('cart')
@inject('router')
@inject('toaster')
@inject('checkout')
@observer
export class CheckoutPage extends React.Component<{ cart: ShoppingCartStore; router: RouterStore; toaster: IToaster; checkout: CheckoutService }> {
  @observable private results: Item[] = [];

  private static readonly INITIAL_VALUES = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    cardHolder: '',
    cardNumber: '',
    deliveryDate: new Date(),
  };

  public render() {
    const cards = this.props.cart.orders.map((x, i) =>
      <Col key={i}>
        <ItemOrderComponent model={x.item} cart={this.props.cart} />
      </Col>
    );

    return (
      <>
        <h1 style={{color:"white"}}>Checkout</h1>
        <Row>
        <Col md={6}>
            <Card style={{ paddingBottom: '40px' }}>
            <Formik
              initialValues={CheckoutPage.INITIAL_VALUES}
              validationSchema={Yup.object().shape({
                name: Yup.string().required('Required'),
                address: Yup.string().required('Required'),
                city: Yup.string().required('Required'),
                state: Yup.string().required('Required'),
                cardHolder: Yup.string().required('Required'),
                cardNumber: Yup.string().required('Required'),
                zipcode: Yup.string().required('Required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                this.props.checkout.submit().then(() => {
                  setSubmitting(false);
                  this.props.router.replace('/orders');
                })
                .catch(err => {
                  console.error(err);
                  this.props.toaster.show({ intent: Intent.DANGER, message: err.toString() });
                  setSubmitting(false);
                });
              }}
            >
              {props => {
                const {
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleReset,
                  handleChange
                } = props;

                return (
                  <form onSubmit={handleSubmit}>
                    <BPFInput
                      id="name"
                      label="Name"
                      placeholder=""
                      formik={props} />

                    <BPFInput
                      id="address"
                      label="Address"
                      placeholder=""
                      formik={props} />

                    <BPFInput
                      id="city"
                      label="City"
                      placeholder=""
                      formik={props} />

                    <BPFInput
                      id="state"
                      label="State"
                      placeholder=""
                      formik={props} />

                    <BPFInput
                      id="zipcode"
                      label="Zipcode"
                      placeholder=""
                      formik={props} />

                    <BPFInput
                      id="cardHolder"
                      label="Name on Card"
                      placeholder=""
                      formik={props} />

                    <BPFInput
                      id="cardNumber"
                      label="Cardnumber"
                      placeholder=""
                      formik={props} />

                    {/* <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button> */}

                    <DateTimePicker />

                    <Button
                      disabled={isSubmitting}
                      text="Place Order"
                      intent={Intent.SUCCESS}
                      onClick={() => handleSubmit()}
                    />
                  </form>
                );
              }}
            </Formik>
          </Card>
        </Col>
        <Col md={6}>{cards}</Col>
        </Row>
      </>
    );

    
  }
}
