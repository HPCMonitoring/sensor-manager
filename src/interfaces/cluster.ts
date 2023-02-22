import { ModalOpenMode } from "@types";

export interface ICluster {
  id: string;
  name: string;
  numOfSensors: number;
  numOfActiveSensors: number;
  remarks: string | null;
}

export interface IClusterStore {
  clusters: ICluster[];
  fetch: () => void;
}

export interface IClusterModalStore {
  mode: ModalOpenMode;
  isOpen: boolean;
  open: (mode: ModalOpenMode) => void;
  close: () => void;
}
