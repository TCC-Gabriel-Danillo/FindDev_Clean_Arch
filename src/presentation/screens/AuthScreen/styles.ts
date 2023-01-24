import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.LIGHT,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 10,
  },
  subtitle: { textAlign: "center", marginTop: 10 },
  img: { width: 300, height: 300, resizeMode: "contain" },
});
