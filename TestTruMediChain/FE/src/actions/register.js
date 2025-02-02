import { REGISTER_PRODUCTION } from "../config/constants";

const register =
  (formData, cb = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_PRODUCTION.REQUEST });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful registration
      const response = {
        error: false,
        message: "Registration successful",
        data: {
          id: Date.now(),
          ...formData,
          status: "approved",
        },
      };

      dispatch({
        type: REGISTER_PRODUCTION.SUCCESS,
        payload: response,
      });
      cb(response);
    } catch (e) {
      const errorResponse = {
        error: true,
        message: "Demo mode: Simulated registration error",
      };
      dispatch({ type: REGISTER_PRODUCTION.FAIL, payload: errorResponse });
      cb(errorResponse);
    } finally {
      dispatch({ type: REGISTER_PRODUCTION.COMPLETE });
    }
  };

export default register;
