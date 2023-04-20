import { server } from './server';

export const sensorService = {
  getByClusterId: async function (clusterId: string): Promise<SensorSummary[]> {
    const response = await server.get(`/sensors?clusterId=${clusterId}`);
    return response.data;
  },
  getById: async function (sensorId: string): Promise<Sensor> {
    const response = await server.get(`/sensors/${sensorId}`);
    return response.data;
  },
  update: async function (sensorId: string, payload: UpdateSensorPayload): Promise<string> {
    const response = await server.put(`/sensors/${sensorId}`, payload);
    return response.data;
  },
  delete: async function (sensorId: string): Promise<string> {
    const response = await server.delete(`/sensors/${sensorId}`);
    return response.data;
  }
};
