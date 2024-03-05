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

const AddBook = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const addBook = () => {
    if (title === "" || author === "" || description === "") {
      Alert.alert(
        "Rellene los campos",
        "Por favor rellene todos los campos para poder agregar un libro"
      );
      return;
    }

    BooksAPI.createBook({ title, author, description })
      .then(() => {
        navigation.pop();
      })
      .catch((error) => console.error(error));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Título</Text>
      <TextInput
        placeholder="Título"
        placeholderTextColor={colors.onSecondaryText}
        value={title}
        style={styles.inputContainer}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.title}>Autor</Text>
      <TextInput
        placeholder="Autor"
        placeholderTextColor={colors.onSecondaryText}
        value={author}
        style={styles.inputContainer}
        onChangeText={(text) => setAuthor(text)}
      />
      <Text style={styles.title}>Descripción</Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        style={styles.inputContainer}
        placeholderTextColor={colors.onSecondaryText}
        placeholder="Descripción"
        keyboardAppearance="dark"
      />
      <Text style={styles.addBook} onPress={addBook}>
        Agregar Libro
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 25,
    paddingHorizontal: 15,
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
  addBook: {
    color: colors.secondary,
    fontSize: 20,
    textAlign: "center",
  },
});

export default AddBook;
