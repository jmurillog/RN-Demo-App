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
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        style={styles.itemContainer}
        onPress={() => navigation.push("BookDetails", { id: item.id })}
      >
        <View style={styles.rowContainer}>
          <Image
            source={{
              uri: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
            }}
            style={styles.itemImage}
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "bold",
                },
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              {item.author}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "italic",
                  color: colors.onSecondaryText,
                },
              ]}
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Lista de Libros</Text>
      </View>
      {books === null ? (
        <ActivityIndicator color="white" style={styles.marginContainer} />
      ) : (
        <>
          {books.length === 0 ? (
            <View style={styles.marginContainer}>
              <Image
                source={require("../../assets/reading.png")}
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.push("AddBook")}
              >
                <Ionicons name="add-outline" size={30} color="#FFBE00" />
                <Text style={styles.primaryText}>No hay libros, crea uno!</Text>
              </TouchableOpacity>
              <Text style={styles.primaryText} onPress={fetchBooks}>
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
                style={styles.addButtonContainer}
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

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  headerContainer: {
    margin: 15,
    marginRight: 0,
    marginBottom: 0,
    paddingBottom: 5,
    borderColor: "#333",
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  marginContainer: { marginTop: 50 },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 50,
    padding: 7,
    paddingHorizontal: 20,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#624F17",
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryText: {
    color: "#FFBE00",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  addButtonContainer: {
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#624F17",
    justifyContent: "center",
  },
  itemContainer: {
    margin: 15,
    marginRight: 0,
    marginBottom: 0,
    borderColor: "#333",
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  rowContainer: { flexDirection: "row", flex: 1, alignItems: "center" },
  itemImage: { width: 70, height: 100, borderRadius: 5 },
  textContainer: { flex: 1, marginHorizontal: 15 },
  text: { color: colors.onText, fontSize: 16, marginBottom: 5 },
});

export default BookList;
