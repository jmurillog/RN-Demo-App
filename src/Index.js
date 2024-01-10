import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

const Stack = createStackNavigator();

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen
          name="BookList"
          component={BookList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{
            title: "Detalles del Libro",
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTintColor: "white",
            headerBackTitle: "Atrás",
          }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{
            title: "Agregar Libro",
            presentation: "modal",
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTintColor: "white",
            headerBackTitle: "Atrás",
          }}
        />
        <Stack.Screen
          name="EditBook"
          component={EditBook}
          options={{
            title: "Editar Libro",
            presentation: "modal",
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTintColor: "white",
            headerBackTitle: "Atrás",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;
