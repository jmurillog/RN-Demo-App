import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setRefreshing(true);
    setTimeout(async () => {
      const response = await BooksAPI.getBooks();
      setBooks(response);
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          margin: 15,
          marginRight: 0,
          marginBottom: 0,
          borderColor: "#333",
          paddingBottom: 15,
          borderBottomWidth: 1,
        }}
        onPress={() => navigation.push("BookDetails", { id: item.id })}
      >
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Image
            source={{
              uri: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
            }}
            style={{ width: 70, height: 100, borderRadius: 5 }}
          />
          <View style={{ flex: 1, marginHorizontal: 15 }}>
            <Text
              style={{
                color: colors.onText,
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: colors.onText,
                fontSize: 16,
                marginBottom: 5,
              }}
              numberOfLines={1}
            >
              {item.author}
            </Text>
            <Text
              style={{
                color: colors.onSecondaryText,
                fontSize: 16,
                fontStyle: "italic",
              }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View
        style={{
          margin: 15,
          marginRight: 0,
          marginBottom: 0,
          paddingBottom: 5,
          borderColor: "#333",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Lista de Libros
        </Text>
      </View>
      {books === null ? (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <>
          {books.length === 0 ? (
            <View style={{ marginTop: 50 }}>
              <Image
                source={require("../../assets/reading.png")}
                style={{
                  width: 250,
                  height: 250,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
              />
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  borderRadius: 50,
                  padding: 7,
                  paddingHorizontal: 20,
                  alignSelf: "center",
                  alignItems: "center",
                  backgroundColor: "#624F17",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={() => navigation.push("AddBook")}
              >
                <Ionicons name="add-outline" size={30} color="#FFBE00" />
                <Text
                  style={{
                    color: "#FFBE00",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  No hay libros, crea uno!
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "#FFBE00",
                  fontSize: 16,
                  marginTop: 20,
                  textAlign: "center",
                }}
                onPress={fetchBooks}
              >
                Refrescar
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchBooks}
                    tintColor="white"
                  />
                }
              />
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  padding: 10,
                  marginRight: 15,
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "#624F17",
                  justifyContent: "center",
                }}
                onPress={() => navigation.push("AddBook")}
              >
                <Ionicons name="add-outline" size={40} color="#FFBE00" />
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default BookList;
