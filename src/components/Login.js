import { useState } from "react";
import * as React from "react";
import { connect } from "react-redux";
// import auth from "../modules/auth";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import LoginForm from "./LoginForm";
import styles from "./module/Login.component.style.js";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmithandler = async () => {
    try {
      const response = await auth.signIn(email, password);
      response.success &&
        props.dispatch({
          type: "CHECK_LOGIN",
          payload: {
            authenticated: response.success,
            role: response.data.role,
            uid: response.data.uid,
          },
        });
      props.setModalVisible(false);
    } catch (error) {
      let err = error;
      debugger;
      setErrorMessage(err.response.data.errors[0]);
    }
  };

  const message = !!errorMessage && props.visibleForm && (
    <Text style={styles.errorText} testID={"error-message"}>
      {errorMessage}
    </Text>
  );

  return (
    <View style={styles.background}>
      {props.visibleForm && (
        <LoginForm
          setPassword={password}
          setEmail={email}
          onSubmithandler={onSubmithandler}
        />
      )}
      {message}
    </View>
  );
};

export default connect()(Login);
