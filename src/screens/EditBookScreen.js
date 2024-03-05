import React, { useState } from "react";
import { Text, TextInput, Alert, ScrollView, StyleSheet } from "react-native";

import BooksAPI from "../api/booksAPI";

const colors = {
  primary: "#0D47A1",
  secondary: "#FFBE00",
  tertiary: "#624F17",
  background: "#121212",
  surface: "#1E1E1E",
  error: "#D32F2F",
  onText: "#FFFFFF",
  onSecondaryText: "#BDBDBD",
  disabled: "#424242",
};

const EditBook = ({ route, navigation }) => {
  const { id, item } = route.params;
  const [book, setBook] = useState(item);

  const handleEdit = async () => {
    if (!book.title || !book.author || !book.description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    await BooksAPI.updateBook(id, book);
    navigation.pop(2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Título</Text>
      <TextInput
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        style={styles.inputContainer}
        placeholderTextColor={colors.onSecondaryText}
        placeholder="Título"
        keyboardAppearance="dark"
        enterKeyHint="done"
      />
      <Text style={styles.title}>Autor</Text>
      <TextInput
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.inputContainer}
        placeholderTextColor={colors.onSecondaryText}
        placeholder="Autor"
        keyboardAppearance="dark"
        enterKeyHint="done"
      />
      <Text style={styles.title}>Descripción</Text>
      <TextInput
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        style={styles.inputContainer}
        multiline={true}
        placeholderTextColor={colors.onSecondaryText}
        placeholder="Descripción"
        keyboardAppearance="dark"
      />
      <Text style={styles.save} onPress={handleEdit}>
        Guardar
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 15,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    color: colors.onText,
    marginBottom: 15,
    padding: 10,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 10,
  },
  save: {
    color: colors.secondary,
    fontSize: 20,
    textAlign: "center",
  },
});

export default EditBook;
