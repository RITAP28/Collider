import { bearerToken } from "./data.interface";

export const config = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};
