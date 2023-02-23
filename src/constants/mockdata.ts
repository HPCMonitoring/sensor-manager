import { ICluster, ISensor } from "@interfaces";
import { SensorStatus } from "./sensor";

export const mockClusters: ICluster[] = [
  {
    id: "1915940",
    name: "BK HPC Laboratory",
    numOfSensors: 7,
    numOfActiveSensors: 5,
    remarks: null
  },
  {
    id: "1456984",
    name: "TickLab cloud",
    numOfSensors: 4,
    numOfActiveSensors: 3,
    remarks: null
  },
  {
    id: "1433976",
    name: "UIT Cluster",
    numOfSensors: 6,
    numOfActiveSensors: 5,
    remarks: null
  }
];

export const mockSensors: ISensor[] = [
  {
    id: "1",
    name: "Sensor 1",
    remarks: "Sample sensor",
    ipAddr: "14.255.37.12",
    status: SensorStatus.ONLINE
  },
  {
    id: "2",
    name: "Sensor 2",
    remarks: "2nd sensor",
    ipAddr: "14.255.2.224",
    status: SensorStatus.DISCONNECTED
  },
  {
    id: "3",
    name: "Sensor 3",
    remarks: null,
    ipAddr: "14.255.56.1",
    status: SensorStatus.OFFLINE
  },
  {
    id: "4",
    name: "Sensor 4",
    remarks: "Lorem ispum",
    ipAddr: "14.255.35.66",
    status: SensorStatus.REQUESTED
  }
];

export const mockKafkaBrokers: string[] = ["All", "localhost:9092", "bkhpc.hcmut.edu.vn:1456"];
export const mockKafkaTopics: string[] = ["All", "memory", "cpu-each-process"];
