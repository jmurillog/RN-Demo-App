import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";

import Index from "./src/Index";

export default function App() {
  return (
    <>
      <Index />
      <StatusBar style="light" />
    </>
  );
}
