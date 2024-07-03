// components/VehicleMap.js
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

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

  useEffect(() => {
    const fetchVehicles = async () => {
      const token =
        "0330629571cb529677755317957f82072f0fc671d517836139d58e7b6e874fc32994d53dfb25b453a27a07a900b2047fb093c622ce4ee3cd8f874cd872c363b";
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
  }, []);

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
      <MapView style={styles.map} region={region}>
        {vehicles.map((vehicle, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: vehicle.py, // 'py' é a latitude
              longitude: vehicle.px, // 'px' é a longitude
            }}
            title={`Vehicle ${vehicle.p}`}
            description={`Last updated: ${vehicle.u}`}
          />
        ))}
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
});

export default VehicleMap;
