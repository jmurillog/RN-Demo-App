import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BooksAPI from "../api/BooksAPI";

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
    <ScrollView
      style={{
        backgroundColor: "#121212",
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 15,
      }}
    >
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
            style={{
              width: 150,
              height: 200,
              borderRadius: 5,
              alignSelf: "center",
              marginBottom: 20,
            }}
          />

          <Text
            style={{
              color: colors.onText,
              fontSize: 26,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: colors.onText,
              fontSize: 20,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Escrito por {item.author}
          </Text>
          <Text
            style={{
              color: colors.onSecondaryText,
              fontSize: 20,
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            {item.description}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
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
              }}
              onPress={onDelete}
            >
              <Ionicons name="trash" size={24} color={colors.error} />
              <Text
                style={{
                  color: colors.error,
                  fontSize: 20,
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 7,
                borderRadius: 10,
                backgroundColor: colors.tertiary,
                alignItems: "center",
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "center",
                flex: 0.5,
                marginLeft: 5,
              }}
              onPress={() => navigation.push("EditBook", { item, id })}
            >
              <Ionicons name="pencil" size={24} color={colors.secondary} />
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 20,
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default BookDetails;
