import { RemoveSensorModal, ConfigSensorModal } from "@components";
import { mockKafkaBrokers, mockKafkaTopics, SensorStatus } from "@constants";
import { Cog6ToothIcon, MinusCircleIcon, PaperAirplaneIcon, SignalSlashIcon, StopIcon, WifiIcon } from "@heroicons/react/24/solid";
import { useClustersStore, useConfigSensorModalStore, useRemoveSensorModalStore, useSensorsStore } from "@states";
import { Badge, Button, Dropdown, Table, Tooltip } from "flowbite-react";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

function SensorStatusBadge(props: { status: SensorStatus }) {
  const { color, icon } = useMemo(() => {
    if (props.status === SensorStatus.ONLINE)
      return {
        color: "success",
        icon: WifiIcon
      };
    if (props.status === SensorStatus.OFFLINE) return { color: "gray", icon: StopIcon };
    if (props.status === SensorStatus.REQUESTED) return { color: "info", icon: PaperAirplaneIcon };
    return { color: "failure", icon: SignalSlashIcon };
  }, [props.status]);

  return (
    <Badge color={color} icon={icon} className='w-fit px-2 cursor-pointer'>
      {props.status}
    </Badge>
  );
}

export function ClusterDetailPage() {
  const { clusterId } = useParams();
  const clusters = useClustersStore((state) => state.clusters);

  const clusterName = useMemo(() => {
    const cluster = clusters.find((item) => item.id === clusterId);
    if (!cluster) return "";
    return cluster.name;
  }, [clusterId, clusters]);

  const sensors = useSensorsStore((state) => state.sensors);
  const fetchSensors = useSensorsStore((state) => state.fetch);
  const openConfigSensorModal = useConfigSensorModalStore((state) => state.open);
  const openRemoveSensorModal = useRemoveSensorModalStore((state) => state.open);

  useEffect(() => fetchSensors(), [clusterId, fetchSensors]);

  return (
    <div>
      <ConfigSensorModal />
      <RemoveSensorModal />

      <div className='flex mb-4 justify-between align-middle text-gray-800 dark:text-gray-200'>
        <Badge size={"xl"} className='font-semibold' color={"gray"}>
          {clusterName}
        </Badge>
        <Button.Group>
          <Dropdown label='Status' size='sm' color={"gray"}>
            <Dropdown.Item>{SensorStatus.ONLINE}</Dropdown.Item>
            <Dropdown.Item>{SensorStatus.OFFLINE}</Dropdown.Item>
            <Dropdown.Item>{SensorStatus.DISCONNECTED}</Dropdown.Item>
            <Dropdown.Item>{SensorStatus.REQUESTED}</Dropdown.Item>
          </Dropdown>
          <Dropdown label='Kafka Broker' size='sm' color={"gray"}>
            {mockKafkaBrokers.map((broker) => (
              <Dropdown.Item key={broker}>{broker}</Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown label='Kafka Topic' size='sm' color={"gray"}>
            {mockKafkaTopics.map((broker) => (
              <Dropdown.Item key={broker}>{broker}</Dropdown.Item>
            ))}
          </Dropdown>
        </Button.Group>
      </div>

      <hr className='dark:border-gray-600 border-gray-300 mb-4' />
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Sensor name</Table.HeadCell>
          <Table.HeadCell>IP Address</Table.HeadCell>
          <Table.HeadCell>Remarks</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {sensors.map((sensor) => (
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={sensor.id}>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{sensor.name}</Table.Cell>
              <Table.Cell>{sensor.ipAddr}</Table.Cell>
              <Table.Cell>{sensor.remarks ? sensor.remarks : "--"}</Table.Cell>
              <Table.Cell>
                <SensorStatusBadge status={sensor.status} />
              </Table.Cell>
              <Table.Cell className='flex justify-end align-middle'>
                <Tooltip content='Stop'>
                  <Button
                    color={"warning"}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    size='xs'
                  >
                    <StopIcon className='h-4 w-4' />
                  </Button>
                </Tooltip>

                <Tooltip content='Config'>
                  <Button
                    color={"info"}
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfigSensorModal();
                    }}
                    size='xs'
                    className='ml-2'
                  >
                    <Cog6ToothIcon className='h-4 w-4' />
                  </Button>
                </Tooltip>

                <Tooltip content='Remove' className='ml-2'>
                  <Button
                    color={"failure"}
                    onClick={(e) => {
                      e.stopPropagation();
                      openRemoveSensorModal();
                    }}
                    size='xs'
                    className='ml-2'
                  >
                    <MinusCircleIcon className='h-4 w-4' />
                  </Button>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
