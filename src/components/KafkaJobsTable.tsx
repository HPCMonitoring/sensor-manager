import { WrenchIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useKafkaJobConfigModalStore } from "@states";
import { Button, Table } from "flowbite-react";

export const KafkaJobsTable: Component<{
  kafkaJobs: KafkaJob[];
  deleteItem: (key: string) => void;
}> = ({ kafkaJobs, deleteItem }) => {
  const openConfigModal = useKafkaJobConfigModalStore((state) => state.open);

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
        {kafkaJobs.map((job) => (
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={job.id}>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {job.brokerUrl}
            </Table.Cell>
            <Table.Cell>{job.topicName}</Table.Cell>
            <Table.Cell>{job.usingTemplate ? job.usingTemplate.name : ""}</Table.Cell>
            <Table.Cell className='flex justify-end'>
              <Button gradientMonochrome='info' size='xs' onClick={() => openConfigModal(job)}>
                <WrenchIcon className='h-4 w-4' />
              </Button>
              <Button
                gradientMonochrome='failure'
                size='xs'
                className='ml-2'
                onClick={() => deleteItem(job.id)}
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
