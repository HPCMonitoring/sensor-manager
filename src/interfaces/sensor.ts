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

export interface IKafkaJobConfigModalStore {
  job: KafkaJob | null;
  setTopicName: (topicName: string) => void;
  setBrokerUrl: (brokerUrl: string) => void;
  setInterval: (interval: number) => void;
  setUsingTemplate: (templateId: string | null) => void;
  setScript: (script: string) => void;
  open: (job: KafkaJob) => void;
  close: () => void;
}
