import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";
import IconUsed from "./iconUsed";

export default function WeatherCard({ item }) {
  const temp = item.main.temp;
  const date_txt = item.dt_txt;
  const arr = date_txt.split(" ");
  const date = arr[0];
  const time = arr[1];
  const reqtime = time.slice(0, time.length - 3);
  const convertToAMPM = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}:00`);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <View style={styles.cardWrapper}>
      <BlurView intensity={40} style={styles.card1}>
        <Text style={styles.time}>{convertToAMPM(reqtime)}</Text>
        <Text>{IconUsed(item.weather[0].description)}</Text>
        <Text style={styles.temp1}>
          {(item?.main?.temp - 273).toFixed(2)}°C
        </Text>
        <Text style={styles.weatherType}>{item?.weather[0]?.main}</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    // boxShadow: "0px 0px 5px 2px black",
  },
  card1: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  temp1: {
    fontSize: 24,
    color: "charcoal",
  },
  weatherType: {
    fontSize: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: 500,
  },
});
