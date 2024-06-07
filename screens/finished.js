import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "./Colors";
import { useRoute } from "@react-navigation/native";

const finished = ({ navigation }) => {
  //const route = useRoute();
  //const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Union.png")} style={styles.image} />
      <Text
        style={{
          color: "#C0C0C0",
          fontSize: 28,
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        Successfully you handed over the material
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.navbutton}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.navbuttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default finished;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.dark,
  },
  image: {
    marginTop: 30,
    width: "80%",
    height: 200,
    alignSelf: "center",
    resizeMode: "contain", // Adjust this based on your image aspect ratio
  },
  buttonsContainer: {
    width: "100%",
    marginBottom: 40,
    marginTop: "auto",
  },
  navbutton: {
    backgroundColor: Colors.green,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 0,
    alignItems: "center",
  },
  navbuttonText: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: "600",
  },
});
