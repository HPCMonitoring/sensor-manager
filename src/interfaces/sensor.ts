export interface ISensorKafkaTopic {
	brokerUrl: string;
	topicName: string;
	filterRule: string; // In SQL
}

export interface ISensorStore {
	sensors: SensorSummary[];
	fetch: (clusterId: string) => Promise<void>;
}
