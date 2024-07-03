import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

interface Vehicle {
  py: number; // latitude
  px: number; // longitude
  p: string; // some property, e.g., id or name
  u: string; // last updated timestamp
}

const VehicleMap = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null); // Referência para o componente MapView

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Anima o mapa para a nova região
      mapRef.current?.animateToRegion(region, 1000);
    };

    getLocation();

    const fetchVehicles = async () => {
      const token =
        "6139d58e7b6e874fc32994d53dfb25b453a27a07a900b2047fb093c622ce4ee3";
      try {
        const response = await fetch(
          "https://api.olhovivo.sptrans.com.br/v2.1/Posicao",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.l) {
          setVehicles(data.l); // Supondo que a lista de veículos está em 'data.l'
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

    // Atualiza a localização do usuário a cada 10 segundos
    const intervalId = setInterval(() => {
      getLocation();
    }, 10000); // a cada 10 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleRefreshLocation = () => {
    getLocation();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {vehicles.map(
          (vehicle, index) =>
            typeof vehicle.py === "number" &&
            typeof vehicle.px === "number" && (
              <Marker
                key={index}
                coordinate={{
                  latitude: vehicle.py,
                  longitude: vehicle.px,
                }}
                title={`Vehicle ${vehicle.p}`}
                description={`Last updated: ${vehicle.u}`}
              />
            )
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default VehicleMap;
