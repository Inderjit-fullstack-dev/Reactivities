import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";
interface IProps
  extends FieldRenderProps<Date, HTMLInputElement>,
    FormFieldProps {}
const DateInput: React.FC<IProps | any> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input
        type="datetime-local"
        placeholder={placeholder}
        {...input}
        onKeyDown={(e) => e.preventDefault()}
      />
      {touched && error && <Label basic color="red" content={error} />}
    </Form.Field>
  );
};

export default DateInput;
