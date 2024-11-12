import React, { useState } from 'react';
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
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ColorPicker from 'react-native-wheel-color-picker';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
  const [customText, setCustomText] = useState('');
  const [color, setColor] = useState('');
  const [birthdayImage, setBirthdayImage] = useState(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [textEditorVisible, setTextEditorVisible] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/app/pastel-blue-background-with-balloons-full-of-daisies-and-confetti-template-for-advertising-web-party-holiday-birthday-promotion-card-poster-invitation-and.jpg');

  const onColorChange = color => setColor(color);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setBirthdayImage(result.assets[0].uri);
      setImage(result.assets[0].uri);  
    }
  };

  const saveCard = () => {
    const newCard = { customText, birthdayImage, color };
    setSavedCards([...savedCards, newCard]);
  };

  const openCard = card => setSelectedCard(card);
  const closeCard = () => setSelectedCard(null);

  const removeCard = index => {
    const updatedCards = [...savedCards];
    updatedCards.splice(index, 1);
    setSavedCards(updatedCards);
  };

  const editCard = index => {
    const cardToEdit = savedCards[index];
    setCustomText(cardToEdit.customText);
    setBirthdayImage(cardToEdit.birthdayImage);
    setColor(cardToEdit.color);
    removeCard(index);
  };

  const shareCard = async card => {
    try {
      await Share.share({
        message: `${card.customText}`,
        url: card.birthdayImage,
        title: 'Check out this birthday card!',
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const changeTemplate = (template) => {
    setBackgroundImage(template);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Create Your Birthday Card</ThemedText>

        {colorPickerVisible && (
          <View style={styles.colorPickerContainer}>
            <ColorPicker
              color={color}
              onColorChange={onColorChange}
              thumbSize={30}
              sliderSize={30}
              noSnap
              row={false}
            />
          </View>
        )}

        <View>
          <ImageBackground
            source={{ uri: backgroundImage }}
            style={styles.backgroundImage}
          />
        </View>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        {textEditorVisible && (
          <TextInput
            value={customText}
            onChangeText={setCustomText}
            placeholder="Enter your custom message"
            style={styles.input}
          />
        )}

        <View style={styles.buttonGroup}>
          <Button title="Choose Color" onPress={() => setColorPickerVisible(!colorPickerVisible)} />
          <Button title="Edit Text" onPress={() => setTextEditorVisible(!textEditorVisible)} />
          <Button title="Select Image" onPress={selectImage} />
          <Button title="Save Card" onPress={saveCard} />
          <Button title="Change Template" onPress={() => changeTemplate('C:/Users/khany/OneDrive/Desktop/my projects/Codetribe/Expo/React-native-tutorial/assets/images/1131w-j15WhJZGmGc.webp')} />
        </View>

        {savedCards.length > 0 && (
          <View style={styles.savedCards}>
            <ThemedText style={styles.savedCardsTitle}>Saved Cards</ThemedText>
            {savedCards.map((card, index) => (
              <View key={index} style={styles.savedCard}>
                {card.birthdayImage && (
                  <ImageBackground
                    source={{ uri: backgroundImage }}
                    style={styles.savedCardImageBackground}
                    imageStyle={styles.savedCardImage}
                  >
                    <ThemedText style={[styles.savedCardText, { color: card.color }]}>
                      {card.customText}
                    </ThemedText>
                  </ImageBackground>
                )}
                <View style={styles.cardButtonGroup}>
                  <TouchableOpacity onPress={() => openCard(card)} style={styles.viewCardButton}>
                    <ThemedText style={styles.viewCardText}>View</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => editCard(index)} style={styles.editCardButton}>
                    <ThemedText style={styles.editCardText}>Edit</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => shareCard(card)} style={styles.shareCardButton}>
                    <ThemedText style={styles.shareCardText}>Share</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeCard(index)} style={styles.deleteCardButton}>
                    <ThemedText style={styles.deleteCardText}>Delete</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedCard && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={!!selectedCard}
            onRequestClose={closeCard}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedCard.birthdayImage && (
                  <Image source={{ uri: selectedCard.birthdayImage }} style={styles.modalImage} />
                )}
                <ThemedText style={[styles.modalText, { color: selectedCard.color }]}>
                  {selectedCard.customText}
                </ThemedText>
                <Button title="Close" onPress={closeCard} />
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
    marginTop: 106,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    width: '80%',
    marginVertical: 16,
  },
  buttonGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 16,
  },
  colorPickerContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  savedCards: {
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  savedCardsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  savedCard: {
    width: '80%',
    marginBottom: 16,
    alignItems: 'center',
  },
  savedCardImageBackground: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedCardImage: {
    borderRadius: 8,
    opacity: 0.5,  
  },
  savedCardText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
  cardButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  viewCardButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
  },
  editCardButton: {
    backgroundColor: '#FFA500',
    padding: 8,
    borderRadius: 5,
  },
  shareCardButton: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 5,
  },
  deleteCardButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  viewCardText: {
    color: '#fff',
  },
  editCardText: {
    color: '#fff',
  },
  shareCardText: {
    color: '#fff',
  },
  deleteCardText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
});
