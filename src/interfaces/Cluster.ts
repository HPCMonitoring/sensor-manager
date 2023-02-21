export interface ICluster {
  id: string;
  name: string;
  numOfSensors: number;
  numOfActiveSensors: number;
  remarks: string | null;
}
