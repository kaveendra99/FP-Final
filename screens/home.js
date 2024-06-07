import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "./Colors";
import DrawerContent from "./Drawer";
import { MaterialIcons } from "@expo/vector-icons";
import Upload from "../assets/Upload.svg";

const LoginPage = ({ navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission to access the media library
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need media library permissions to make this work!");
      }
    })();
  }, []);

  useEffect(() => {
    if (image !== null) {
      navigation.navigate("Scan", { image });
    }
  }, [image]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const nav = async () => {
    navigation.navigate("Scan", { image });
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
        //console.log(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>
        Hi user, welcome to Green Way Finder!
      </Text>
      <Image
        source={require("../assets/Tap-to-scan.png")} // Provide the path to your image file
        style={{ width: 150, height: 60, position: "absolute", bottom: 210 }} // Adjust the size of the image as needed
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.captureButton} onPress={nav}>
        <Image
          source={require("../assets/logo-main.png")} // Provide the path to your image file
          style={{ width: "100%", height: "100%" }} // Adjust the size of the image as needed
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          position: "absolute",
          right: 30,
          bottom: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={selectImage}
      >
        <Image
          source={require("../assets/Upload.png")} // Provide the path to your image file
          style={{ width: 92, height: 92 }} // Adjust the size of the image as needed
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={handleOpenBottomSheet}
        style={styles.bottomSheetButton}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.botomButtonText}>My recycles </Text>
          <MaterialIcons
            name="keyboard-arrow-up"
            size={34}
            style={[{ color: Colors.white }]}
          />
          <Text style={styles.botomButtonText}> 10 Items</Text>
        </View>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetOpen}
        onRequestClose={handleCloseBottomSheet}
      >
        <DrawerContent handleCloseBottomSheet={handleCloseBottomSheet} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: Colors.dark,
  },
  captureButton: {
    position: "absolute",
    bottom: 60,
    width: 200,
    height: 200,
    alignSelf: "center",
    // borderRadius: 45,
    // backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: Colors.green,
  },
  bottomSheetButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  botomButtonText: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 5,
  },
  modalText: {
    marginTop: 20,
    fontSize: 30,
    color: Colors.green,
  },
});

export default LoginPage;
