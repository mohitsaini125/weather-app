import {
  CloudIcon,
  CloudRainIcon,
  CloudSnowIcon,
  SnowflakeIcon,
  SunIcon,
} from "phosphor-react-native";

export default function IconUsed(item, size = 44) {
  switch (item) {
    case "light rain":
      return <CloudRainIcon size={size} />;
    case "rain":
      return <CloudRainIcon size={size} />;
    case "heavy rain":
      return <CloudRainIcon size={size} />;
    case "clear sky":
      return <SunIcon size={size} />;
    case "snow":
      return <CloudSnowIcon size={size} />;
    case "light snow":
      return <SnowflakeIcon size={size} />;
    default:
      return <CloudIcon size={size} />;
  }
}
