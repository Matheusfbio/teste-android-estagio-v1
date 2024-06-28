import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.titleContaine}>Olho Vivo Bus</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c1bd5",
  },
  titleContaine: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5f557b",
    textAlign: "center",
    margin: 25,
    fontSize: 22,
    color: "#fff",
  },
});
