export interface IClusterStore {
  clusters: Cluster[];
  fetch: () => Promise<void>;
  create: (payload: CreateClusterPayload) => Promise<void>;
  getById: (clusterId: string) => Cluster;
  update: (clusterId: string, payload: CreateClusterPayload) => Promise<void>;
  delete: (clusterId: string) => Promise<void>;
}

export interface IClusterModalStore {
  mode: ModalMode;
  isOpen: boolean;
  open: (mode: ModalMode) => void;
  close: () => void;
}

export interface IClusterDeleteModalStore {
  clusterId: string | null;
  isOpen: boolean;
  open: (clusterId: string) => void;
  close: () => void;
}
