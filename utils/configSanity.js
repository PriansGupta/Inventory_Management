import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "8iqbuhs8",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
  withCredentials: true,
});
