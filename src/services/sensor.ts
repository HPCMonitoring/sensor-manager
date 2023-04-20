import { invoke, server } from './server';

export const sensorService = {
  getByClusterId: (clusterId: string) =>
    invoke<SensorSummary[]>(server.get(`/sensors?clusterId=${clusterId}`)),
  getById: (sensorId: string) => invoke<Sensor>(server.get(`/sensors/${sensorId}`)),
  update: (sensorId: string, payload: UpdateSensorPayload) =>
    invoke<string>(server.put(`/sensors/${sensorId}`, payload)),
  delete: (sensorId: string) => invoke<string>(server.delete(`/sensors/${sensorId}`))
};
