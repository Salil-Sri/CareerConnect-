import { API_ENDPOINTS } from "../config/api";

// Register endpoint
export const registerUser = async (userData) => {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Login endpoint
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    // Store token if needed
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout endpoint
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem("token");
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }

    return { success: response.ok };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Verify token
export const verifyToken = async (token) => {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_TOKEN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
};
