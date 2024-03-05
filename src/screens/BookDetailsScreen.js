import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import BooksAPI from "../api/booksAPI";

import { Ionicons } from "@expo/vector-icons";

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

const BookDetails = ({ route, navigation }) => {
  const [item, setItem] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    BooksAPI.getBook(id).then((book) => {
      setItem(book);
    });
  }, []);

  const onDelete = () => {
    Alert.alert(
      `Eliminar ${item.title}`,
      "¿Estás seguro de que quieres eliminar este libro?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            BooksAPI.deleteBook(id).then(() => {
              navigation.pop();
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {item === null ? (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <>
          <Image
            source={{
              uri: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
            }}
            style={styles.image}
          />

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.secondaryText}>Escrito por {item.author}</Text>
          <Text
            style={[
              styles.secondaryText,
              {
                color: colors.onSecondaryText,
                fontStyle: "italic",
                textAlign: "center",
                marginBottom: 15,
              },
            ]}
          >
            {item.description}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={onDelete}>
              <Ionicons name="trash" size={24} color={colors.error} />
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: colors.tertiary,
                },
              ]}
              onPress={() => navigation.push("EditBook", { item, id })}
            >
              <Ionicons name="pencil" size={24} color={colors.secondary} />
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    color: colors.onText,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  secondaryText: {
    color: colors.onText,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    flex: 0.5,
    marginRight: 5,
  },
  deleteText: {
    color: colors.error,
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
  },
  editText: {
    color: colors.secondary,
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
  },
});

export default BookDetails;
