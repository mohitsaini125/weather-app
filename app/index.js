import { Video } from "expo-av";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { GpsFix, MapPin } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AirConditions from "../components/airConditions";
import FiveDayForecast from "../components/fiveDayForecast";
import IconUsed from "../components/iconUsed";
import WeatherCard from "../components/weatherCard";
export default function Homepage() {
  const API_KEY = "3e3f19957f672efff572d53f3b71cca9";
  const [weatherData, setWeatherData] = useState(null);
  const [currentMapLocation, setCurrentMapLocatin] = useState(null);
  const [fiveDayForecast, setfiveDayForecast] = useState(null);
  const [mapOpenState, setMapOpenState] = useState(false);
  const [todayForecast, settodayForecast] = useState(null);
  function openMap() {
    setMapOpenState(true);
  }
  function closeMap() {
    setMapOpenState(false);
  }
  function fetchWeatherData(lat, long) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`;

    fetch(url).then(function (response) {
      response.json().then(function (data) {
        setWeatherData(data);
      });
    });

    fetch(forecastUrl).then(function (response) {
      response.json().then(function (data) {
        settodayForecast(data);
      });
    });
    // console.log(forecastUrl);
  }

  function getLocationInfo() {
    requestForegroundPermissionsAsync().then(function (permission) {
      if (permission.status == "granted") {
        getCurrentPositionAsync().then(function (location) {
          const currLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          fetchWeatherData(currLocation.latitude, currLocation.longitude);
        });
      } else {
        Alert.alert(
          "location access denied",
          "please allow location access through your settings app to use this feature"
        );
      }
    });
  }
  function handleMapPress(event) {
    const coordinate = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setCurrentMapLocatin(coordinate);
  }
  function handleConfirm() {
    const lat = currentMapLocation.latitude;
    const long = currentMapLocation.longitude;
    fetchWeatherData(lat, long);
    setMapOpenState(false);
  }
  useEffect(function () {
    getLocationInfo();
  }, []);
  const video = React.useRef(null);
  return (
    // <ImageBackground
    //   style={{ height: "100%" }}
    //   source={require("../components/cloud2.jpg")}
    // >
    <View>
      <Video
        ref={video}
        source={require("../components/cloud.mp4")}
        style={StyleSheet.absoluteFill}
        isLooping
        shouldPlay
        resizeMode="cover"
        isMuted
      />

      <ScrollView>
        <Modal visible={mapOpenState} transparent={true}>
          <View
            style={{
              margin: "auto",
              height: 400,
              width: "95%",
              boxShadow: "0px 0px 8px 5px #013220",
            }}
          >
            <MapView
              style={{ height: 400 }}
              onPress={handleMapPress}
              zoomEnabled={true}
            >
              {currentMapLocation && (
                <Marker
                  coordinate={{
                    latitude: currentMapLocation.latitude,
                    longitude: currentMapLocation.longitude,
                  }}
                />
              )}
            </MapView>
            <TouchableOpacity
              style={{
                padding: 3,
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
                height: 30,
                width: 30,
                borderWidth: 2,
              }}
              onPress={closeMap}
            >
              <Text>❌</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: "lightgreen",
                  padding: 5,
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "darkgreen",
                }}
                onPress={handleConfirm}
              >
                confirm
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleConfirm}>
            <Text>confirm</Text>
          </TouchableOpacity>
        </Modal>
        <View style={styles.flag1}>
          <Text style={styles.city}>{weatherData?.name}</Text>
          <Text style={styles.temp1}>
            {(weatherData?.main.temp - 273).toFixed(2)}°C
          </Text>
          {IconUsed(weatherData?.weather?.[0]?.description, 68)}
          <Text style={styles.clouds}>
            {weatherData?.weather?.[0]?.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              padding: 5,
              boxShadow: "0px 0px 5px 0.5px black",
              borderRadius: 5,
            }}
            onPress={getLocationInfo}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Use current location
            </Text>
            <GpsFix size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              padding: 5,
              boxShadow: "0px 0px 5px 0.5px black",
              borderRadius: 5,
            }}
            onPress={openMap}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              choose on map:
            </Text>
            <MapPin size={24} onPress={handleMapPress} />
          </TouchableOpacity>
        </View>
        <Text style={styles.forecast}>TODAY'S FORECAST</Text>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginHorizontal: 15,
              gap: 10,
            }}
          >
            {todayForecast?.list?.slice(0, 8).map(function (item) {
              return <WeatherCard key={item.dt} item={item} />;
            })}
          </View>
        </ScrollView>
        <Text style={styles.forecast}>AIR CONDITIONS</Text>
        <View>
          <AirConditions item={weatherData} />
        </View>
        <Text style={styles.forecast}>5-DAY FORECAST</Text>
        <ScrollView style={styles.fiveDayForecast}>
          {todayForecast?.list?.map(function (item, index) {
            if (index % 8 == 0)
              return <FiveDayForecast key={item.dt} item={item} />;
          })}
        </ScrollView>
      </ScrollView>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  forecast: {
    color: "white",
    fontSize: 24,
    marginLeft: 20,
    fontWeight: 800,
    marginTop: 25,
    color: "black",
  },
  flag1: {
    width: "100%",
    height: 200,
    alignItems: "center",
    marginBottom: 60,
    marginTop: 50,
  },
  city: {
    fontSize: 52,
    color: "white",
    fontWeight: 600,
  },
  temp1: {
    fontSize: 40,
    color: "white",
    fontWeight: 600,
  },
  temp2: {
    fontSize: 24,
    color: "white",
    fontWeight: 600,
  },
  clouds: {
    fontSize: 32,
    color: "white",
    fontWeight: 600,
  },
  fiveDayForecast: {
    flexDirection: "column",
    flex: 1,
    marginTop: 20,
    padding: 5,
  },
});
