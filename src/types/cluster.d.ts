type Cluster = {
  id: string;
  name: string;
  remarks: string | null;
  numOfSensors: number;
  numOfActiveSensors: number;
};

type CreateClusterPayload = {
  name: string;
  remarks: string | null;
};

type UpdateClusterPayload = CreateClusterPayload;
type ModalMode = { action: 'create'; id?: never } | { action: 'update'; id: string };
