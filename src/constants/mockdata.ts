import { ICluster, ISensor, ISensorDetail } from "@interfaces";
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
    name: "TL cloud",
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
export const mockSensorDetailInfo: ISensorDetail = {
  kernelName: "Linux",
  kernelVersion: "5.19.0-32-generic",
  arch: "x86_64",
  hostName: "PhucVinh",
  rootUser: "root"
};

export const kafkaTopicConfigs = [
  {
    broker: { url: "http://localhost:8080", name: "Local host" },
    topic: { name: "ram-cpu-usage", alias: "RAM & CPU" },
    usingTemplate: "Template for RAM & CPU"
  },
  {
    broker: { url: "https://hpcc.tl.vn:9092", name: "HPCC Center" },
    topic: { name: "process-basic", alias: "Process basic" },
    usingTemplate: null
  }
];

const longYamlCode = `name: CD

on:
  push:
    branches: ["master"]
  pull_request:
    branches: ["master"]

env:
  # Use docker.io for Docker Hub if empty
  REGISTRY: ghcr.io
  # Image name MUST have a pattern like <org_name_lowercase>/<repo_name_lowercase>
  IMAGE_NAME: hpcmonitoring/sensor-manager
  IMAGE_TAG: 0.1.0
  # username login to ghcr MUST be organization's name in lower case
  ORG_USERNAME: hpcmonitoring

permissions:
  packages: write

jobs:
  build-and-test:
    name: Build and test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        name: Checkout repository

      - name: Set up env file
        run: |
          echo BACKEND_ENDPOINT=\${{ vars.BACKEND_ENDPOINT }} >> .env.production

      - name: Setup Docker buildx
        uses: docker/setup-buildx-action@v2
        # with:
          # version: v0.9.1

      - name: Log into registry \${{ env.REGISTRY }}
        uses: docker/login-action@v2
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ env.ORG_USERNAME }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          context: .
          push: \${{ github.event_name == 'push' }} # Only publish image when push to master
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ env.IMAGE_TAG }}
`;

const shortYamlCode = `name: CD

on:
  push:
    branches: ["master"]
  pull_request:
    branches: ["master"]
`;

export const filterTemplates = [
  {
    name: "Sample Kafka Topic rule",
    value: longYamlCode
  },
  {
    name: "Short Yaml Rule",
    value: shortYamlCode
  }
];
