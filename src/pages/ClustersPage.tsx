import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useClustersStore, useDarkThemeStore } from "@states";
import { Badge, Button, Table, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function ClustersPage() {
  const clusters = useClustersStore((state) => state.clusters);
  const navigate = useNavigate();
  const darkTheme = useDarkThemeStore((state) => state.dark);

  return (
    <div>
      <div className='flex mb-4 justify-between'>
        <div className='flex flex-row items-center'>
          <Badge size='2xl' color={darkTheme ? "gray" : "info"}>
            {" "}
            {clusters.length} Clusters
          </Badge>
          <Badge size='2xl' color={darkTheme ? "gray" : "info"} className='ml-2'>
            {" "}
            {clusters.reduce((numSensors: number, cluster) => numSensors + cluster.numOfSensors, 0)} Sensors
          </Badge>
        </div>
        <div className='flex flex-row'>
          <TextInput type='text' icon={MagnifyingGlassIcon} placeholder='Search ...' required={true} />
          <Button gradientMonochrome='info' className='ml-2'>
            New cluster
          </Button>
        </div>
      </div>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Number of sensors</Table.HeadCell>
          <Table.HeadCell>Active sensors</Table.HeadCell>
          <Table.HeadCell>Remarks</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {clusters.map((cluster) => (
            <Table.Row
              className='bg-white dark:border-gray-700 dark:bg-gray-800 hover'
              key={cluster.id}
              onClick={() => navigate(`/clusters/${cluster.id}`)}
            >
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{cluster.name}</Table.Cell>
              <Table.Cell>{cluster.numOfSensors}</Table.Cell>
              <Table.Cell>{cluster.numOfSensors}</Table.Cell>
              <Table.Cell>{cluster.remarks ? cluster.remarks : ""}</Table.Cell>
              <Table.Cell className='flex justify-end'>
                <Button gradientMonochrome='info' onClick={(e) => e.stopPropagation()} size='sm' className='mr-2'>
                  Edit
                  <PencilIcon className='ml-2 h-4 w-4' />
                </Button>
                <Button gradientMonochrome='failure' onClick={(e) => e.stopPropagation()} size='sm'>
                  Delete
                  <TrashIcon className='ml-2 h-4 w-4' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
