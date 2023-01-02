import axios from "../utils/axios";
import { useAuthStore } from "../stores/auth";
import { useGlobalStore } from "../stores/global";
import { setItem, getItem, removeItem } from "../utils/localStorage";

export const useAuth = () => {
  const saveCredentials = (profile, token) => {
    setItem("profile", JSON.stringify(profile));
    setItem("token", JSON.stringify(token));
  };

  const removeCredentials = () => {
    removeItem("profile");
    removeItem("token");
  };

  const getSaveCredentials = async () => {
    if (!getItem("token")) {
      return;
    }

    // Access the auth store
    const auth = useAuthStore();

    try {
      const parsedToken = JSON.parse(getItem("token"));
      const parsedProfile = JSON.parse(getItem("profile"));

      // Check if the token is valid
      const {
        data: {
          message,
          data: { ...rest },
        },
      } = await axios.get("/api/auth/refresh-token", {
        headers: {
          AccessToken: parsedToken.accessToken,
          RefreshToken: parsedToken.refreshToken,
        },
      });

      saveCredentials(parsedProfile, rest);

      // Set values to the store's state
      auth.setAuthenticated(true);
      auth.setUser(parsedProfile);
      auth.setToken(rest);
    } catch (err) {
      const global = useGlobalStore();

      if (err.response) {
        global.setError(err.response.data.message);
      } else {
        global.setError(err.message);
      }

      // TODO :: Remove saved credentials
      // and redirect to /login
    }
  };

  return {
    saveCredentials,
    removeCredentials,
    getSaveCredentials,
  };
};
