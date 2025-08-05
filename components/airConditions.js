import { BlurView } from "expo-blur";
import { Cloud } from "phosphor-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function AirConditions({ item }) {
  return (
    <View style={styles.cardWrapper}>
      <BlurView intensity={100} style={styles.card1}>
        <View style={styles.main}>
          <View>
            <Text style={styles.text1}>Feels Like</Text>
            <Text style={styles.text2}>
              {(item?.main.feels_like - 273).toFixed(2)}°C
            </Text>
            <Text style={styles.text1}>Humidity</Text>
            <Text style={styles.text2}>{item?.main.humidity}%</Text>
            <Text style={styles.text1}>Ground Level</Text>
            <Text style={styles.text2}>{item?.main.grnd_level} hPa</Text>
            <Text style={styles.text1}>Visibility</Text>
            <Text style={styles.text2}>{item?.visibility / 1000} km</Text>
          </View>
          <View>
            <Text style={styles.text1}>Pressure</Text>
            <Text style={styles.text2}>{item?.main.pressure} hPa</Text>
            <Text style={styles.text1}>Wind</Text>
            <Text style={styles.text2}>{item?.wind.speed} m/sec</Text>
            <Text style={styles.text1}>Sea Level</Text>
            <Text style={styles.text2}>{item?.main.sea_level} hPa</Text>
            <Text style={styles.text1}>Description</Text>
            <Text style={styles.text2}>{item?.weather[0].description}</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    marginHorizontal: 10,
    // boxShadow: "0px 0px 5px 2px black",
  },
  card1: {
    padding: 10,
    alignItems: "center",
  },
  temp1: {
    fontSize: 30,
    color: "white",
  },
  weatherType: {
    fontSize: 28,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 50,
  },
  text1: {
    fontSize: 20,
    color: "grey",
    fontWeight: 700,
  },
  text2: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
    fontWeight: 700,
  },
});
