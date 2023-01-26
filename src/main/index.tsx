import React from "react";
import "./config/firebaseConfig";
import { AuthService } from "_/data/usecases/AuthService";
import { UsersService } from "_/data/usecases/UsersService";
import { LocalStorage } from "_/infra/cache/LocalStorage";
import { Database } from "_/infra/database/Database";
import { HttpsClient } from "_/infra/https/HttpsClient";
import { LocationService } from "_/data/usecases/LocationService";
import { GITHUB_URL } from "_/presentation/constants";
import { AuthContextProvider } from "_/presentation/context/authContext";
import { UserContextProvider } from "_/presentation/context/userContext";
import { Routes } from "./navigation";
import { useCustomFonts } from "_/presentation/hooks/useCustomFonts";
import { LocationContextProvider } from "_/presentation/context/locationContext";

export const Main = () => {
  const gitApi = new HttpsClient(GITHUB_URL.API_BASE_URL);
  const gitAuth = new HttpsClient(GITHUB_URL.AUTH_BASE_URL);

  const location = new LocationService();

  const userDatabase = new Database("users");
  const localStorage = new LocalStorage();
  const authService = new AuthService(gitApi, gitAuth);
  const userService = new UsersService(location, userDatabase);

  const [usingFonts] = useCustomFonts();

  if (usingFonts)
    return (
      <LocationContextProvider locationService={location}>
        <AuthContextProvider authService={authService} localStorage={localStorage}>
          <UserContextProvider localStorage={localStorage} userService={userService}>
            <Routes />
          </UserContextProvider>
        </AuthContextProvider>
      </LocationContextProvider>
    );
  return <></>;
};
