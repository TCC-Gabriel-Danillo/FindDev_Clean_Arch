import { useNavigation, NavigationProp } from "@react-navigation/native";
import { NavigationParams } from "_/main/navigation/config";

export const useNavigate = () => useNavigation<NavigationProp<NavigationParams>>();
