import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PremiumBlocker = () => {
  return (
    <>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 1)",
        ]}
        style={{
          position: "relative",
          marginTop: -50,
          left: 0,
          right: 0,
          top: 0,
          height: 40,
          zIndex: 12,
        }}
      ></LinearGradient>
      <View testID="premium-blocker" style={styles.premiumBlocker}>
        <Text style={styles.premiumText}>This is a premium article</Text>
        <Text>
          <AntDesign name="lock1" size="24" color="white" />
        </Text>
        <Text style={styles.premiumText}>
          Become a premium member to view this article
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  premiumBlocker: {
    display: "flex",
    flexDirection: "column",
    // border: "2 solid grey",
    alignItems: "center",
    backgroundColor: "#409d9b",
    borderRadius: 3,
  },
  premiumText: {
    color: "white",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default PremiumBlocker;
