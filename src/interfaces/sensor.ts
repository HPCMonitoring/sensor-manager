export interface ISensorKafkaTopic {
  brokerUrl: string;
  topicName: string;
  filterRule: string; // In SQL
}

export interface ISensorStore {
  sensors: SensorSummary[];
  fetch: (clusterId: string) => Promise<void>;
}

export interface IConfigSensorModalStore {
  sensorId: string | null;
  isOpen: boolean;
  open: (sensorId: string) => void;
  close: () => void;
}

export interface IDeleteSensorModalStore {
  sensorId: string | null;
  isOpen: boolean;
  open: (sensorId: string) => void;
  close: () => void;
}

export interface IConfigSensorSendingModalStore {
  topic: SubscribingTopic | null;
  isOpen: boolean;
  setTopic: (topicId: string) => void;
  setBroker: (brokerId: string) => void;
  setInterval: (interval: number) => void;
  setUsingTemplate: (templateId: string) => void;
  setScript: (script: string) => void;
  open: (topic: SubscribingTopic) => void;
  close: () => void;
}
