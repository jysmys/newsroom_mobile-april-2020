import React from "react";
import styles from "./module/Login.component.style.js";
import Icon from "react-native-vector-icons/AntDesign";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const LoginForm = (props) => {
  return (
    <View testID={"login-form"}>
      <View style={styles.backgound}>
        <TouchableOpacity
          testID={"loginText"}
          onPress={() => {
            props.setModalVisible(false);
          }}
        >
          <Text style={styles.sub}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#409d9b" />
        <TextInput
          testID={"email"}
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="key" size={20} color="#409d9b" />
        <TextInput
          testID={"password"}
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.backgound}>
        <TouchableOpacity
          testID={"submit"}
          style={styles.buttonContainer}
          onPress={() => {
            onSubmithandler();
          }}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
