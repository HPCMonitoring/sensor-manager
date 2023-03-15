type SensorState = "RUNNING" | "STOPPED" | "DISCONNECTED" | "REQUESTED";

type SensorSummary = {
  id: string;
  name: string;
  ipAddr: string;
  remarks: string | null;
  state: SensorState;
};

type SubscribingTopic = {
  id: string;
  name: string;
  interval: number;
  usingTemplate: {
    id: string;
    name: string;
  } | null;
  script: string;
  broker: {
    id: string;
    name: string;
    url: string;
  };
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
  subscribingTopics: SubscribingTopic[];
};
