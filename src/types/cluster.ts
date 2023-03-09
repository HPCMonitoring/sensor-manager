export type ClusterSummary = {
  id: string;
  name: string;
  remarks: string | null;
  numOfSensors: number;
  numOfActiveSensors: number;
};

export type CreateClusterPayload = {
  name: string;
  remarks: string | null;
};

export type UpdateClusterPayload = CreateClusterPayload;
