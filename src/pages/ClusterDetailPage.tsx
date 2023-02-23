import { SignalIcon, SignalSlashIcon } from "@heroicons/react/24/solid";
import { useClustersStore } from "@states";
import { Button, Table } from "flowbite-react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function ClusterDetailPage() {
  const { clusterId } = useParams();
  const clusters = useClustersStore((state) => state.clusters);

  const {
    name: clusterName,
    numOfActiveSensors,
    numOfSensors
  } = useMemo(() => {
    const cluster = clusters.find((item) => item.id === clusterId);
    if (!cluster) throw new Error("Cluster not found !");
    return cluster;
  }, [clusterId, clusters]);

  return (
    <div>
      <div className='flex mb-2 justify-between align-middle text-gray-800 dark:text-gray-200'>
        <h3 className='mb-5 text-2xl font-semibold'>{clusterName}</h3>
        <Button.Group>
          <Button color='gray'>
            <SignalIcon className='mr-3 h-5 w-5' />
            {numOfActiveSensors} running sensors
          </Button>
          <Button color='gray'>
            <SignalSlashIcon className='mr-3 h-5 w-5' />
            {numOfSensors - numOfActiveSensors} pending sensors
          </Button>
        </Button.Group>
      </div>
      <hr className='dark:border-gray-600 border-gray-300 mb-4' />
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>Apple MacBook Pro 17"</Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href='/tables' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>Microsoft Surface Pro</Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href='/tables' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href='/tables' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
