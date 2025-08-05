import {
  Cloud,
  CloudRain,
  CloudSnow,
  Snowflake,
  Sun,
} from "phosphor-react-native";

export default function IconUsed(item, size = 44) {
  switch (item) {
    case "light rain":
      return <CloudRain size={size} />;
    case "rain":
      return <CloudRain size={size} />;
    case "heavy rain":
      return <CloudRain size={size} />;
    case "clear sky":
      return <Sun size={size} />;
    case "snow":
      return <CloudSnow size={size} />;
    case "light snow":
      return <Snowflake size={size} />;
    default:
      return <Cloud size={size} />;
  }
}
