type SensorState = 'RUNNING' | 'STOPPED' | 'DISCONNECTED' | 'REQUESTED';

type SensorSummary = {
  id: string;
  name: string;
  ipAddr: string;
  remarks: string | null;
  state: SensorState;
};

type KafkaJob = {
  id: string;
  brokerUrl: string;
  topicName: string;
  interval: number;
  script: string;
  usingTemplate: {
    id: string;
    name: string;
  } | null;
};

type Sensor = {
  id: string;
  name: string;
  ipAddr: string;
  remarks: string | null;
  kernelName: string;
  kernelVersion: string;
  arch: string;
  hostname: string;
  rootUser: string;
  state: SensorState;
  kafkaJobs: KafkaJob[];
};

type UpdateSensorPayload = {
  name: string;
  remarks: string | null;
  kafkaJobs: {
    usingTemplateId: string | null;
    brokerUrl: string;
    topicName: string;
    script: string;
    interval: number;
  }[];
};
