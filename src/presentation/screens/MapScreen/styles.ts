import { Dimensions, StyleSheet } from "react-native";
import { PRIMARY } from "_/presentation/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  imageMarker: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: PRIMARY,
  },
  logoutButton: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    bottom: "5%",
    right: "5%",
  },
  calloutView: { width: 250 },
  calloutTitle: { marginLeft: 10, textAlign: "center" },
  calloutContent: { fontSize: 12 },
  calloutImage: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
});
