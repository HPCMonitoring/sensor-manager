import { ClusterSummary, CreateClusterPayload } from "@types";
import { server } from "./server";

export const clusterService = {
  getAll: async function (): Promise<ClusterSummary[]> {
    const response = await server.get("/clusters");
    return response.data;
  },
  create: async function (payload: CreateClusterPayload): Promise<string> {
    const response = await server.post("/clusters", payload);
    return response.data;
  },
  update: async function (clusterId: string, payload: CreateClusterPayload): Promise<string> {
    const response = await server.put(`/clusters/${clusterId}`, payload);
    return response.data;
  },
  delete: async function (clusterId: string): Promise<string> {
    const response = await server.delete(`/clusters/${clusterId}`);
    return response.data;
  }
};
