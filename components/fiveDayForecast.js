import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";
import IconUsed from "./iconUsed";

export default function FiveDayForecast({ item }) {
  const date_txt = item?.dt_txt;
  const arr = date_txt.split(" ");
  const date = arr[0];
  // console.log(date);

  // const getDayName = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", { weekday: "long" });
  // };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Friday", "Sat"];
  let reqdate = new Date(date);
  let reqday = days[reqdate.getDay()];

  return (
    <View style={styles.cardWrapper}>
      <BlurView intensity={40} style={styles.card1}>
        <Text style={styles.time}>{reqday}</Text>
        <Text>{IconUsed(item.weather[0].description)}</Text>
        <Text style={styles.temp1}>
          {(item?.main?.feels_like - 273).toFixed(2)}°C
        </Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card1: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  temp1: {
    fontSize: 20,
    color: "black",
    fontWeight: 500,
  },
  weatherType: {
    fontSize: 28,
  },
  cardWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    marginHorizontal: 10,
    // boxShadow: "0px 0px 5px 2px black",
  },
  time: {
    fontSize: 21,
    fontWeight: 500,
  },
});
