import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Share,
  ImageBackground,
  Text
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ColorPicker from "react-native-wheel-color-picker";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen() {
  const [customText, setCustomText] = useState("Happy Birthday!");
  const [color, setColor] = useState("black");
  const [birthdayImage, setBirthdayImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(require("C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/1011-happy-birthday-card-template.png"));
  const [templateArray] = useState([
    require("C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/birthday-image-0.jpg"),
    require("C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/birthday-image-1.jpg"),
    require("C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/birthday-image-2.jpg"),
    require("C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/birthday-image-3.jpg"),
  ]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [textEditorVisible, setTextEditorVisible] = useState(false);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setBirthdayImage(result.assets[0].uri);
    }
  };

  const changeTemplate = (template) => {
    setBackgroundImage(template);
  };

  const resetCard = () => {
    setCustomText("Happy Birthday!");
    setColor("black");
    setBackgroundImage(require("C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/birthday-image-0.jpg"));
    setBirthdayImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Create Your Birthday Card</ThemedText>

        <View>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            {birthdayImage && <Image source={{ uri: birthdayImage }} style={styles.image} />}
            <ThemedText style={[styles.modalText, { color }]}>{customText}</ThemedText>
          </ImageBackground>
        </View>

        <Text style={styles.chooseTemplateText}>Choose Background Template:</Text>
        <View style={styles.thumbnailRow}>
          {templateArray.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => changeTemplate(image)} style={styles.thumbnailContainer}>
              <Image source={image} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonGroup}>
          <Button title="Choose Color" onPress={() => setColorPickerVisible(!colorPickerVisible)} />
          <Button title="Edit Text" onPress={() => setTextEditorVisible(!textEditorVisible)} />
          <Button title="Select Image" onPress={selectImage} />
          <Button title="Reset Card" onPress={resetCard} />
        </View>

        {colorPickerVisible && (
          <Modal visible={colorPickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <ColorPicker
                color={color}
                onColorChange={setColor}
                style={styles.colorPicker}
              />
              <Button title="Close" onPress={() => setColorPickerVisible(false)} />
            </View>
          </Modal>
        )}

        {textEditorVisible && (
          <Modal visible={textEditorVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.textInput}
                value={customText}
                onChangeText={setCustomText}
              />
              <Button title="Close" onPress={() => setTextEditorVisible(false)} />
            </View>
          </Modal>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
    

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  thumbnailRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  thumbnailContainer: {
    margin: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 16,
  },
  backgroundImage: {
    width: 300,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
    position: "absolute",
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
  },
  chooseTemplateText: {
    marginTop: 20,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  colorPicker: {
    width: 300,
    height: 300,
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
