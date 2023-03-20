export interface ISensorStore {
  sensors: SensorSummary[];
  update: (sensorId: string, payload: UpdateSensorPayload) => Promise<void>;
  delete: (sensorId: string) => Promise<void>;
  fetch: (clusterId: string) => Promise<void>;
}

export interface IConfigSensorModalStore {
  sensor: Sensor | null;
  open: (sensorId: string) => Promise<void>;
  close: () => void;
}

export interface IDeleteSensorModalStore {
  sensorId: string | null;
  open: (sensorId: string) => void;
  close: () => void;
}

export interface IConfigSensorTopicModalStore {
  topic: SubscribeTopic | null;
  setTopic: (topicId: string) => void;
  setBroker: (brokerId: string) => void;
  setInterval: (interval: number) => void;
  setUsingTemplate: (templateId: string) => void;
  setScript: (script: string) => void;
  open: (topic: SubscribeTopic) => void;
  close: () => void;
}
