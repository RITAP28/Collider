import axios from "axios";

export const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error("Server Error:", error.response.data);
        return {
          message: error.response.data?.message || "An error occurred on the server.",
          status: error.response.status,
        };
      } else if (error.request) {
        // Request was made but no response received
        console.error("No Response:", error.request);
        return {
          message: "No response received from the server. Please try again later.",
        };
      }
    }
    // Fallback for non-Axios errors
    console.error("Unexpected Error:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
  };
  