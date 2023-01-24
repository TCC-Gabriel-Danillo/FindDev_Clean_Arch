import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { Image, View } from "react-native";
import { styles } from "./styles";
import * as Linking from "expo-linking";
import { Button, Text } from "_/presentation/components";
import { useAuth } from "_/presentation/hooks/useAuth";
import { useUserService } from "_/presentation/hooks/useUserService";
import { TEST_ID } from "_/presentation/constants/testIds";
import { User } from "_/domain/useCase/users";
import { ICONS } from "_/presentation/constants/icons";
import { WHITE } from "_/presentation/constants";
import marker from "_/presentation/assets/marker.png";
import { useNavigate } from "_/presentation/hooks/useNavigate";
import { useLocation } from "_/presentation/hooks/useLocation";
import { Coords } from "_/domain/useCase/position";

export function MapScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const { signOut } = useAuth();
  const { position } = useLocation();
  const { listUsers } = useUserService();
  const { navigate } = useNavigate();

  const initialRegion = {
    latitude: Number(position?.latitude),
    longitude: Number(position?.longitude),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    getUsers(initialRegion);
  }, [position]);

  const getUsers = (region: Coords) => {
    (async () => {
      const usersApi = await listUsers(region);
      setUsers(usersApi);
    })();
  };

  const handleCalloutPress = useCallback(async (user: User) => {
    await Linking.openURL(user.profileUrl);
  }, []);

  const signOutUser = () => {
    signOut();
    navigate("Inital");
  };

  if (position.latitude && position.longitude)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onRegionChangeComplete={getUsers}
          initialRegion={initialRegion}
          maxZoomLevel={14}
          minZoomLevel={3.5}
          testID={TEST_ID.MAP}>
          {users.map((user: User) => {
            return (
              <Marker
                testID={TEST_ID.MAP_MARKER}
                key={user.id}
                coordinate={{
                  latitude: user.position.location.latitude,
                  longitude: user.position.location.longitude,
                }}
                image={marker}>
                <UserCallout user={user} onPress={handleCalloutPress} />
              </Marker>
            );
          })}
        </MapView>
        <Button onPress={signOutUser} style={styles.logoutButton} testID={TEST_ID.LOGOUT_BUTTON}>
          <ICONS.LOGOUT size={32} color={WHITE} />
        </Button>
      </View>
    );
  else return <></>;
}

interface UserCalloutProps {
  user: User;
  onPress: (user: User) => void;
}
function UserCallout({ user, onPress }: UserCalloutProps) {
  const handleCalloutPress = useCallback(() => onPress(user), []);
  return (
    <Callout onPress={handleCalloutPress} testID={TEST_ID.MAP_CALLOUT}>
      <View style={styles.calloutView}>
        <View style={styles.calloutImage}>
          <Image source={{ uri: user.photoUrl }} style={styles.imageMarker} />
          <Text fontWeight="bold" style={styles.calloutTitle}>
            {user.username}
          </Text>
        </View>
        <Text style={styles.calloutContent}>Techs: {user.techs?.join(", ")}</Text>
        {user.email && <Text style={styles.calloutContent}>Email: {user.email}</Text>}
      </View>
    </Callout>
  );
}
