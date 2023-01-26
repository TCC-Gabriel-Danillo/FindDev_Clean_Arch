import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { AuthScreen } from "_/presentation/screens";
import { UserContextProvider } from "_/presentation/context/userContext";
import { AuthContextProvider } from "_/presentation/context/authContext";
import { AuthServiceStub, mockAuthResponse } from "_/__tests__/__mocks__/Stubs/AuthStub";
import { LocalStorageStub } from "_/__tests__/__mocks__/Stubs/LocalStorageStub";
import { UserStub } from "_/__tests__/__mocks__/Stubs/UserStub";
import { TEST_ID } from "_/presentation/constants/testIds";
import { mockPosition } from "_/__tests__/__mocks__/Stubs/LocationStub";

let authService = new AuthServiceStub();
let localStorage = new LocalStorageStub();
let userService = new UserStub();

beforeEach(() => {
  jest.clearAllMocks();
  authService = new AuthServiceStub();
  localStorage = new LocalStorageStub();
  userService = new UserStub();
});

const renderWithProvider = (children: JSX.Element) => {
  return render(
    <AuthContextProvider authService={authService} localStorage={localStorage}>
      <UserContextProvider userService={userService} localStorage={localStorage}>
        {children}
      </UserContextProvider>
    </AuthContextProvider>
  );
};

describe("AuthPage", () => {
  it("Deve criar usuário caso o mesmo ainda não exista", async () => {
    const { findByTestId } = renderWithProvider(<AuthScreen />);

    await act(async () => {
      const button = await findByTestId(TEST_ID.LOGIN_BUTTON);
      fireEvent.press(button);
    });

    expect(userService.createAndUpdateUser).toBeCalledWith(mockAuthResponse);
    expect(userService.createAndUpdateUser).toHaveReturnedWith(
      Promise.resolve({ ...mockAuthResponse, position: mockPosition })
    );
  });

  it("Deve logar automaticamente caso o usuário já exista no dispositivo", async () => {
    localStorage.setItem("ANY_KEY", mockAuthResponse);
    await waitFor(() => {
      renderWithProvider(<AuthScreen />);
    });

    expect(userService.createAndUpdateUser).toBeCalledWith(mockAuthResponse);
    expect(userService.createAndUpdateUser).toHaveReturnedWith(
      Promise.resolve({ ...mockAuthResponse, position: mockPosition })
    );
  });
});
