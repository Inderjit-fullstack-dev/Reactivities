import React, { useContext, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import { RootStoreContext } from "../store/rootStore";
import ErrorMessage from "./common/Form/ErrorMessage";
import TextInput from "./common/Form/TextInput";

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login, submitting } = rootStore.userStore;

  const initial = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };
  const validate = combineValidators({
    email: isRequired("email"),
    password: isRequired("password"),
  });

  const [error, setError] = useState("");

  return (
    <FinalForm
      initialValues={initial}
      onSubmit={(values) => {
        login(values).catch((error) => setError(error));
      }}
      validate={validate}
      render={({ handleSubmit, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} loading={submitting}>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error !== "" && !dirtySinceLastSubmit && (
            <ErrorMessage error={error} text="Invalid username or password" />
          )}
          <Button
            disabled={invalid && !dirtySinceLastSubmit}
            positive
            content="Login"
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
