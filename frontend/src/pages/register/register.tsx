import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';
import { LoginService } from 'src/services/login';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FormGroup, InputGroup, Intent, Button, Toast, Toaster, IToaster } from '@blueprintjs/core';

import './register.css';
import { RouterStore } from 'mobx-react-router';
import { BPFInput } from 'src/component/bpf-input/bpf-input';
import { Link } from 'react-router-dom';
import { RegisterService } from 'src/services/register';

@inject('login')
@inject('router')
@inject('toaster')
@inject('register')
@observer
export class RegisterPage extends React.Component<{ toaster: IToaster; login: LoginService; router: RouterStore; register: RegisterService }> {
  @observable private results: Item[] = [];

  public render() {
    return (
      <div className="page-login-container">
      <main className="page-login">
        <h1>Register</h1>

        <Formik
          initialValues={{ email: '', name: '', dob: '01/26/2019', password: '', zipcode: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.props.register.submit(values).then(() => {
              setSubmitting(false);
              this.props.router.replace('/');
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
              isSubmitting,
              handleSubmit,
              handleReset,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <BPFInput
                  id="name"
                  label="Name"
                  placeholder="Enter your name"
                  formik={props} />
                  
                <BPFInput
                  id="email"
                  label="Email"
                  placeholder="Enter your email"
                  formik={props} />

                <BPFInput
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  formik={props} />

                <BPFInput
                  id="zipcode"
                  label="Zipcode"
                  placeholder="Enter your zipcode"
                  formik={props} />

                {/* <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button> */}
                
                <Link to="/login" style={{ float: 'left' }}>Or Login</Link>

                <Button
                  disabled={isSubmitting}
                  text="Submit"
                  intent={Intent.PRIMARY}
                  onClick={() => handleSubmit()}
                />
              </form>
            );
          }}
        </Formik>
      </main>
      </div>
    );
  }
}
