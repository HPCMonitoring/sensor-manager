import { server } from "./server";

export const sensorService = {
  getByClusterId: async function (clusterId: string): Promise<SensorSummary[]> {
    const response = await server.get(`/sensors?clusterId=${clusterId}`);
    return response.data;
  },
  getById: async function (sensorId: string): Promise<Sensor> {
    const response = await server.get(`/sensors/${sensorId}`);
    return response.data;
  }
};
