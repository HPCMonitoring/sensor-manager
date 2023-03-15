type SensorState = "RUNNING" | "STOPPED" | "DISCONNECTED" | "REQUESTED";

type SensorSummary = {
  id: string;
  name: string;
  ipAddr: string;
  remarks: string | null;
  state: SensorState;
};

type Sensor = SensorSummary & {
  kernelName: string;
  kernelVersion: string;
  arch: string;
  hostname: string;
  rootUser: string;
  subscribingTopics: Array<{
    id: string;
    name: string;
    interval: 0;
    usingTemplateId: string | null;
    script: string;
    brokerId: string;
    brokerName: string;
  }>;
};
