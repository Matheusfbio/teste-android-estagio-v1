import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

interface BusLine {
  id: number;
  nome: string;
  codigo: string;
  latitude?: number; // Supondo que você tenha latitude e longitude
  longitude?: number; // Adicione estas propriedades se não existirem
}

const BusLinesScreen: React.FC = () => {
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      "6139d58e7b6e874fc32994d53dfb25b453a27a07a900b2047fb093c622ce4ee3";
    const fetchBusLines = async () => {
      try {
        // Primeira chamada para autenticação
        const authResponse = await fetch(
          `https://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!authResponse.ok) {
          const errorText = await authResponse.text();
          console.error(
            `Erro na autenticação! status: ${authResponse.status}, message: ${errorText}`
          );
          throw new Error(
            `Erro na autenticação! status: ${authResponse.status}, message: ${errorText}`
          );
        }

        // Segunda chamada para buscar as linhas de ônibus
        const response = await fetch(
          "https://api.olhovivo.sptrans.com.br/v2.1/Linha/BuscarLinhaSentido?termosBusca=800&sentido=2",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // A API da Olho Vivo SPTRANS usa cookies para autenticação após a primeira chamada
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const json: BusLine[] = await response.json();
        console.log("API Response:", json);
        setBusLines(json);
      } catch (error) {
        console.error("Fetch Error:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocorreu um erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBusLines();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={busLines}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text>{item.codigo}</Text>
            {item.latitude && item.longitude ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  title={item.nome}
                />
              </MapView>
            ) : (
              <Text>Localização não disponível</Text>
            )}
          </View>
        )}
      />
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  map: {
    width: "100%",
    height: 200,
  },
});

export default BusLinesScreen;
