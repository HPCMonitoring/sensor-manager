import { WrenchIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useConfigTopicSubscriptionModalStore } from "@states";
import { Button, Table, Tooltip } from "flowbite-react";

export const KafkaTopicConfigTable: Component<{
  configs: SubscribingTopic[];
  deleteItem: (key: string) => void;
}> = ({ configs, deleteItem }) => {
  const openConfigModal = useConfigTopicSubscriptionModalStore((state) => state.open);

  return (
    <Table className='overflow'>
      <Table.Head>
        <Table.HeadCell>Broker</Table.HeadCell>
        <Table.HeadCell>Topic name</Table.HeadCell>
        <Table.HeadCell>Config Template</Table.HeadCell>
        <Table.HeadCell>
          <span className='sr-only'>Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className='divide-y'>
        {configs.map((topic) => (
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={topic.key}>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              <Tooltip content={topic.broker.url}>{topic.broker.name}</Tooltip>
            </Table.Cell>
            <Table.Cell>{topic.name}</Table.Cell>
            <Table.Cell>{topic.usingTemplate ? topic.usingTemplate.name : ""}</Table.Cell>
            <Table.Cell className='flex justify-end'>
              <Button gradientMonochrome='info' size='xs' onClick={() => openConfigModal(topic)}>
                <WrenchIcon className='h-4 w-4' />
              </Button>
              <Button
                gradientMonochrome='failure'
                size='xs'
                className='ml-2'
                onClick={() => deleteItem(topic.key)}
              >
                <XMarkIcon className='h-4 w-4' />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
