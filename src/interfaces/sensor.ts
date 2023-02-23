import { SensorStatus } from "@constants";

interface ISensorDetail extends ISensor {
  kernelName: string;
  hostName: string;
  arch: string;
  kernelVersion: string;
  rootUser: string;
}

export interface ISensor {
  clusterId?: string;
  id: string;
  name: string;
  remarks: string | null;
  ipAddr: string;
  status: SensorStatus;
  detail?: ISensorDetail;
}

export interface ISensorConfigModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface ISensorStore {
  sensors: ISensor[];
  fetch: () => void;
}
