import axios from "../utils/axios";
import { useGlobalStore } from "../stores/global";

export const useForgotPassword = () => {
  const forgotPassword = async (email) => {
    const global = useGlobalStore();

    global.setLoading(true);

    try {
      const {
        data: { message },
      } = await axios.post("/api/forgot-password", {
        email,
      });

      global.setLoading(false);

      return {
        hasError: false,
        message,
      };
    } catch (err) {
      if (err.response) {
        global.setError({
          ...err.response.data,
        });
      } else {
        global.setError({
          message: err.message,
        });
      }

      global.setLoading(false);

      return {
        hasError: true,
        error: global.getError,
      };
    }
  };

  const resetPassword = async (password, uuid) => {
    const global = useGlobalStore();

    global.setLoading(true);

    try {
      const {
        data: { message },
      } = await axios.post(`/api/reset-password/${uuid}`, {
        password,
      });

      global.setLoading(false);

      return {
        hasError: false,
        message,
      };
    } catch (err) {
      if (err.response) {
        global.setError({
          ...err.response.data,
        });
      } else {
        global.setError({
          message: err.message,
        });
      }

      global.setLoading(false);

      return {
        hasError: true,
        error: global.getError,
      };
    }
  };

  return {
    forgotPassword,
    resetPassword,
  };
};
