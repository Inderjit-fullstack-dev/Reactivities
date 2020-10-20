import React, { useContext, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import { RootStoreContext } from "../store/rootStore";
import ErrorMessage from "./common/Form/ErrorMessage";
import TextInput from "./common/Form/TextInput";

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register, submitting } = rootStore.userStore;

  const initial = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };

  const validate = combineValidators({
    username: isRequired("username"),
    displayName: isRequired("displayName"),
    email: isRequired("email"),
    password: isRequired("password"),
  });

  const [error, setError] = useState<any>(null);

  return (
    <FinalForm
      initialValues={initial}
      onSubmit={(values) => {
        register(values).catch((error) => setError(error));
      }}
      validate={validate}
      render={({ handleSubmit, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} loading={submitting}>
          <Header
            as="h2"
            content="Register to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && !dirtySinceLastSubmit && <ErrorMessage error={error} />}
          <Button
            disabled={invalid && !dirtySinceLastSubmit}
            positive
            content="Register"
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
