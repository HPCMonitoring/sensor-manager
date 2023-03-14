type SensorState = 'RUNNING' | 'STOPPED' | 'DISCONNECTED' | 'REQUESTED';

type SensorSummary = {
	id: string;
	name: string;
	ipAddr: string;
	remarks: string | null;
	state: SensorState;
};
