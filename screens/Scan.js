import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
  Dimensions,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import { useRoute } from "@react-navigation/native";
import DrawerContent from "./Drawer";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Colors } from "./Colors";

export default function App({ navigation }) {
  const route = useRoute();
  const { image } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const windowHeight = Dimensions.get("window").height;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [detectedClass, setDetectedClass] = useState(null);
  const [detectedUrl, setDetectedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    setCapturedImage(image);
    console.log(image, "ooooooooooooo");
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      console.log(photo.uri, "yyyyyyyyyyyyyy");
      setCapturedImage(photo.uri);
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const uploadPhoto = async () => {
    try {
      setModalVisible(true);
      setLoading(true);
      if (!capturedImage) {
        console.error("No image captured");
        return;
      }

      const formData = new FormData();
      formData.append("image_file", {
        uri: capturedImage,
        name: "image.jpg", // Adjust the filename as needed
        type: "image/jpeg", // Adjust the image type as needed
      });

      const headers = {
        "Content-Type": "multipart/form-data",
        "x-api-key": "your-api-key-here", // Insert your API key here if required
      };

      const response = await axios.post(
        "https://13a1-203-143-16-66.ngrok-free.app/detect_img", // Adjust the URL to match your API endpoint
        formData,
        {
          headers: headers,
        }
      );
      if (response.data.detections[0].detected_class) {
        //console.log(response, "#############################################");
        setDetectedClass(response.data.detections[0].detected_class);
      } else {
        Alert.alert("Image cannot reconize");
      }
      console.log(JSON.stringify(response.data, null, 2));
      setDetectedUrl(
        `https://13a1-203-143-16-66.ngrok-free.app${response.data.imageURL}`
      );
      console.log("Class", response.data.detections[0].detected_class);
      console.log(
        "URL",
        `https://13a1-203-143-16-66.ngrok-free.app${response.data.imageURL}`
      );
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const map = async () => {
    setModalVisible(false);
    navigation.navigate("Map");
  };

  const closeModal = async () => {
    setModalVisible(false);
  };

  const cancelUpload = () => {
    setCapturedImage(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      />
      {capturedImage && (
        <View style={styles.previewContainer}>
          {detectedUrl !== null && (
            <Image source={{ uri: detectedUrl }} style={styles.previewImage} />
          )}
          {detectedUrl == null && (
            <Image
              source={{ uri: capturedImage }}
              style={styles.previewImage}
            />
          )}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.okbutton} onPress={uploadPhoto}>
              <Text style={styles.okbuttonText}>Scan Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelbutton]}
              onPress={cancelUpload}
            >
              <Text style={styles.cancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!capturedImage && (
        <>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialIcons
              name="camera-alt"
              size={44}
              style={[{ color: Colors.green }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
        </>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Handle modal close (optional)
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading == true && (
              <>
                <Text style={styles.modalText}>Processing...</Text>
                <ActivityIndicator size="large" color={Colors.green} />
              </>
            )}
            {loading == false && (
              <>
                {detectedClass !== null && (
                  <>
                    <View
                      style={{
                        width: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.modalText}>Founded item: </Text>
                    </View>
                    <View
                      style={{
                        width: 200,
                        //justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.modalText,
                          {
                            color: "yellow",
                            fontSize: 40,
                          },
                        ]}
                      >
                        {detectedClass}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.modalText,
                          { marginVertical: 5, color: "white" },
                        ]}
                      >
                        Click Navigate
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        map();
                      }}
                    >
                      <Text style={[styles.buttonText, { color: Colors.dark }]}>
                        Navigate
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonclose}
                      onPress={() => {
                        closeModal();
                      }}
                    >
                      <Text
                        style={[styles.buttonText, { color: Colors.white }]}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {detectedClass == null && (
                  <>
                    <Text style={styles.modalText}>Process failed!</Text>
                    <TouchableOpacity
                      style={styles.buttonclose}
                      onPress={() => {
                        closeModal();
                      }}
                    >
                      <Text
                        style={[styles.buttonText, { color: Colors.white }]}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  buttonGroup: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  captureButton: {
    position: "absolute",
    bottom: 60,
    width: 90,
    height: 90,
    alignSelf: "center",
    borderRadius: 45,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.green,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: Colors.green,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  buttonsContainer: {
    width: "90%",
    marginBottom: 100,
  },
  okbutton: {
    backgroundColor: Colors.green,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  cancelbutton: {
    backgroundColor: Colors.red,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  okbuttonText: {
    color: Colors.dark,
    fontSize: 18,
  },
  cancelbuttonText: {
    color: Colors.white,
    fontSize: 18,
  },
  buttonclose: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: Colors.red,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.red,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  botomButtonText: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalText: {
    fontSize: 25,
    color: Colors.green,
  },
  modalContent: {
    backgroundColor: Colors.dark,
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow on Android
  },
});
