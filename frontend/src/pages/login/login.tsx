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
                <FormGroup
                  intent={(errors.email && touched.email) ? Intent.DANGER : Intent.NONE}
                  helperText={(errors.email && touched.email) ? errors.email : ' '}
                  label="Email"
                  labelFor="email"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="email"
                    intent={(errors.email && touched.email) ? Intent.DANGER : Intent.NONE}
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                </FormGroup>

                <FormGroup
                  intent={(errors.password && touched.password) ? Intent.DANGER : Intent.NONE}
                  helperText={(errors.password && touched.password) ? errors.password : ' '}
                  label="Pasword"
                  labelFor="password"
                  labelInfo="(required)"
                >
                  <InputGroup
                    id="password"
                    intent={(errors.password && touched.password) ? Intent.DANGER : Intent.NONE}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password" />
                </FormGroup>

                {/* <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button> */}
                
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
