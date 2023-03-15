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
  sensor: Sensor | null;
  isOpen: boolean;
  open: (sensor: Sensor) => void;
  close: () => void;
}
