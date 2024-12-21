import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiKey } from "./data.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const config = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};
