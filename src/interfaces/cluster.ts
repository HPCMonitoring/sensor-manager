export interface IClusterStore {
	clusters: ClusterSummary[];
	fetch: () => Promise<void>;
	create: (payload: CreateClusterPayload) => Promise<void>;
	getById: (clusterId: string) => ClusterSummary;
	update: (clusterId: string, payload: CreateClusterPayload) => Promise<void>;
	delete: (clusterId: string) => Promise<void>;
}

export interface IClusterModalStore {
	mode: ModalOpenMode;
	isOpen: boolean;
	open: (mode: ModalOpenMode) => void;
	close: () => void;
}
