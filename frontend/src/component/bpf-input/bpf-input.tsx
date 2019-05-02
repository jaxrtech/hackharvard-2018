import * as React from 'react';
import { FormikProps } from "formik";
import { FormGroup, Intent, InputGroup } from '@blueprintjs/core';

export type BPFInputProps<TKey extends Extract<keyof TModel, string>, TModel extends { [K in TKey]: string; }> = {
  id: string & TKey,
  label: string,
  type?: string,
  placeholder: string,
  formik: FormikProps<TModel>
};

export class BPFInput<TKey extends Extract<keyof TModel, string>, TModel extends { [K in TKey]: string; }> extends React.Component<BPFInputProps<TKey, TModel>> {

  public componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.forceUpdate();
  }

  public render() {
  const { id, label, placeholder, formik, type } = this.props;
  const { errors, touched, values, handleChange, handleBlur } = formik;
  return (
    <FormGroup
      intent={(errors[id] && touched[id]) ? Intent.DANGER : Intent.NONE}
      helperText={(errors[id] && touched[id]) ? errors[id] : ''}
      label={label}
      labelFor={id}
      labelInfo="(required)"
    >
      <InputGroup
        id={id}
        intent={(errors[id] && touched[id]) ? Intent.DANGER : Intent.NONE}
        placeholder={placeholder}
        type={type}
        value={values[id]}
        onChange={handleChange}
        onBlur={handleBlur} />
    </FormGroup>
  );
  }
}