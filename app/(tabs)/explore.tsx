import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, SafeAreaView, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.titleContainer}>Explore</Text>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#d5501b",
  },
  titleContainer: {
    // flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22ba11",
    textAlign: "center",
    marginTop: 35,
    fontSize: 22,
    color: "#fff",
    width: "100%",
  },
});
