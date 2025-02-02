import { LOGIN_PRODUCTION } from "../config/constants";

const MOCK_USERS = {
  "admin@example.com": {
    password: "any", // Accepts any password
    user: {
      id: 1,
      name: "Demo Admin",
      email: "admin@example.com",
      role: "admin",
      license: "MOCK-ADMIN-123",
    },
  },
  "user@example.com": {
    password: "any",
    user: {
      id: 2,
      name: "Demo User",
      email: "user@example.com",
      role: "user",
      license: "MOCK-USER-456",
    },
  },
};

const loginAction =
  (formData, cb = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_PRODUCTION.REQUEST });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = formData.email
        ? MOCK_USERS[formData.email.toLowerCase()]
        : undefined;
      const valid = mockUser && formData.password === "any";

      if (valid) {
        const response = {
          error: false,
          message: "Login successful",
          user: mockUser.user,
        };

        dispatch({
          type: LOGIN_PRODUCTION.SUCCESS,
          payload: { user: response.user },
        });

        cb(response);
      } else {
        const errorResponse = {
          error: true,
          message: "Invalid credentials",
        };
        dispatch({ type: LOGIN_PRODUCTION.FAIL, payload: errorResponse });
        cb(errorResponse);
      }
    } catch (e) {
      const errorResponse = {
        error: true,
        message: "Network error - Demo Mode",
      };
      dispatch({ type: LOGIN_PRODUCTION.FAIL, payload: errorResponse });
      cb(errorResponse);
    } finally {
      dispatch({ type: LOGIN_PRODUCTION.COMPLETE });
    }
  };

export default loginAction;
