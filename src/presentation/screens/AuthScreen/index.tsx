import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, Button } from "_/presentation/components";
import { TEST_ID } from "_/presentation/constants/testIds";
import { useAuth } from "_/presentation/hooks/useAuth";
import { useAuthPrompt } from "_/presentation/hooks/useAuthPrompt";
import { useNavigate } from "_/presentation/hooks/useNavigate";
import { useUserService } from "_/presentation/hooks/useUserService";
import devImg from "_/presentation/assets/dev.png";
import { styles } from "./styles";

export const AuthScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGithub, isUserAuthenticated } = useAuth();
  const { createUser } = useUserService();
  const { promptAuth } = useAuthPrompt();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated) {
      (async () => await signIn())();
    }
  }, [isUserAuthenticated]);

  const signIn = async () => {
    setIsLoading(true);
    const user = await signInWithGithub(promptAuth);
    if (user) {
      createUser(user);
      navigate("Map");
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text fontType="h1" fontWeight="bold">
        Bem Vindo ao FindDev!
      </Text>
      <Text fontType="h2" style={styles.subtitle}>
        Encontre incríveis desenvolvedores próximos a você.
      </Text>

      <Image source={devImg} style={styles.img} />

      <Button testID={TEST_ID.LOGIN_BUTTON} onPress={signIn} style={styles.button} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color={Colors.WHITE} /> : "Entrar com Github"}
      </Button>
    </View>
  );
};
