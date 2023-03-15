import { WrenchIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useConfigSensorSendingModalStore } from "@states";
import { Button, Table, Tooltip } from "flowbite-react";

export const KafkaTopicConfigTable: Component<{ sensor: Sensor }> = ({ sensor }) => {
  const openConfigModal = useConfigSensorSendingModalStore((state) => state.open);

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Broker</Table.HeadCell>
          <Table.HeadCell>Topic name</Table.HeadCell>
          <Table.HeadCell>Config Template</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {sensor.subscribingTopics.map((topic) => (
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={topic.id}>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                <Tooltip content={topic.broker.url}>{topic.broker.name}</Tooltip>
              </Table.Cell>
              <Table.Cell> {topic.name} </Table.Cell>
              <Table.Cell>{topic.usingTemplate ? topic.usingTemplate.name : ""}</Table.Cell>
              <Table.Cell className='flex justify-end'>
                <Button gradientMonochrome='info' size='xs' onClick={() => openConfigModal(sensor)}>
                  <WrenchIcon className='h-4 w-4' />
                </Button>
                <Button gradientMonochrome='failure' size='xs' className='ml-2'>
                  <XMarkIcon className='h-4 w-4' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
