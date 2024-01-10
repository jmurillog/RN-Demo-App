import React, { useState } from "react";
import { Text, View, TextInput, Alert, ScrollView } from "react-native";
import BooksAPI from "../api/BooksAPI";

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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 25,
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Título
      </Text>
      <TextInput
        placeholder="Título"
        placeholderTextColor={colors.onSecondaryText}
        value={title}
        style={{
          color: colors.onText,
          marginBottom: 15,
          padding: 10,
          borderColor: colors.disabled,
          borderWidth: 1,
          borderRadius: 10,
        }}
        onChangeText={(text) => setTitle(text)}
      />
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Autor
      </Text>
      <TextInput
        placeholder="Autor"
        placeholderTextColor={colors.onSecondaryText}
        value={author}
        style={{
          color: colors.onText,
          marginBottom: 15,
          padding: 10,
          borderColor: colors.disabled,
          borderWidth: 1,
          borderRadius: 10,
        }}
        onChangeText={(text) => setAuthor(text)}
      />
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Descripción
      </Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        style={{
          color: colors.onText,
          marginBottom: 15,
          padding: 10,
          borderColor: colors.disabled,
          borderWidth: 1,
          borderRadius: 10,
        }}
        placeholderTextColor={colors.onSecondaryText}
        placeholder="Descripción"
        keyboardAppearance="dark"
      />
      <Text
        style={{
          color: colors.secondary,
          fontSize: 20,
          textAlign: "center",
        }}
        onPress={addBook}
      >
        Agregar Libro
      </Text>
    </ScrollView>
  );
};

export default AddBook;
