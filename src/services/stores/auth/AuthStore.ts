import { createStore } from "@udecode/zustood";

export const AuthStore = createStore("AuthStoare")({
  isAuthenticated: false,
  isLoading: true,
});
