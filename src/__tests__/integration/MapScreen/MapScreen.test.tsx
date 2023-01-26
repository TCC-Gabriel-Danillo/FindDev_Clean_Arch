import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { MapScreen } from "_/presentation/screens";
import { DISTANCE_IN_METERS, UserContextProvider } from "_/presentation/context/userContext";
import { AuthContextProvider } from "_/presentation/context/authContext";
import { AuthServiceStub } from "_/__tests__/__mocks__/Stubs/AuthStub";
import { LocalStorageStub } from "_/__tests__/__mocks__/Stubs/LocalStorageStub";
import { mockCurrentUser, UserStub } from "_/__tests__/__mocks__/Stubs/UserStub";
import { TEST_ID } from "_/presentation/constants/testIds";
import { LocationContextProvider } from "_/presentation/context/locationContext";
import { LocationServiceStub, mockPosition } from "_/__tests__/__mocks__/Stubs/LocationStub";
import { STORAGE_KEYS } from "_/presentation/constants";

let authService = new AuthServiceStub();
let localStorage = new LocalStorageStub();
let locationService = new LocationServiceStub();
let userService = new UserStub();

beforeEach(() => {
  jest.clearAllMocks();
  authService = new AuthServiceStub();

  localStorage = new LocalStorageStub();
  userService = new UserStub();
  locationService = new LocationServiceStub();
});

const renderWithProvider = (children: JSX.Element) => {
  return render(
    <LocationContextProvider locationService={locationService}>
      <AuthContextProvider authService={authService} localStorage={localStorage}>
        <UserContextProvider userService={userService} localStorage={localStorage}>
          {children}
        </UserContextProvider>
      </AuthContextProvider>
    </LocationContextProvider>
  );
};

describe("MapPage", () => {
  it("Deve buscar usuários existentes na base de dados", async () => {
    localStorage.setItem("user", mockCurrentUser);
    const { findByTestId } = renderWithProvider(<MapScreen />);

    const map = await findByTestId(TEST_ID.MAP);

    expect(locationService.requestPermission).toBeCalled();
    expect(locationService.getCurrentPosition).toBeCalled();
    expect(map.props.children.length).toBe(1);
    expect(map.props.children[0].props.coordinate).toMatchObject(mockPosition.location);
  });

  it("Deve buscar novos usuários quando mover o mapa", async () => {
    localStorage.setItem("user", mockCurrentUser);
    const { findByTestId } = renderWithProvider(<MapScreen />);

    const map = await findByTestId(TEST_ID.MAP);

    act(() => {
      fireEvent(map, "onRegionChangeComplete", mockPosition);
    });

    const args = [mockPosition, DISTANCE_IN_METERS];

    expect(userService.listUsersByDistance).toBeCalledTimes(3);
    expect(userService.listUsersByDistance).toHaveBeenLastCalledWith(...args);
  });

  it("Deve deslogar ao apertar botão de logout", async () => {
    const { findByTestId } = await waitFor(() => renderWithProvider(<MapScreen />));

    const button = await findByTestId(TEST_ID.LOGOUT_BUTTON);

    act(() => {
      fireEvent.press(button);
    });

    const args = [STORAGE_KEYS.USERS, {}];

    expect(localStorage.setItem).toHaveBeenLastCalledWith(...args);
  });
});
