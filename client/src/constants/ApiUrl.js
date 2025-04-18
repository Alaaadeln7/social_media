export const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:9090/api"
    : "/api";