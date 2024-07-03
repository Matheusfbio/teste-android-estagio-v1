import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  useColorScheme,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import VehicleMap from "../screens/VehicleScreen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import BusLines from "../screens/BusLinesScreen";
import ShowScreen from "../screens/ShowScreen";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  return (
    <>
      <ThemedView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <Text style={styles.titleContainer}>Olho Vivo Bus</Text>
      </ThemedView>
      <VehicleMap />
      {/* <BusLines /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleContainer: {
    // flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#5f557b",
    textAlign: "center",
    marginTop: 35,
    fontSize: 22,
    color: "#0000f8",
    width: "100%",
  },
});
