import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';
import { LoginService } from 'src/services/login';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormGroup, InputGroup, Intent, Button, Toast, Toaster, IToaster } from '@blueprintjs/core';

import './login.css';
import { RouterStore } from 'mobx-react-router';
import { BPFInput } from 'src/component/bpf-input/bpf-input';
import { Link } from 'react-router-dom';

@inject('login')
@inject('router')
@inject('toaster')
@observer
export class LoginPage extends React.Component<{ toaster: IToaster; login: LoginService; router: RouterStore }> {
  @observable private results: Item[] = [];

  public render() {
    return (
      <div className="page-login-container">
      <main className="page-login">
        <h1>Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.props.login.submit(values).then(() => {
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
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
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

                {/* <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button> */}
                
                <Link to="/register" style={{float: 'left'}}>Or Register</Link>

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
