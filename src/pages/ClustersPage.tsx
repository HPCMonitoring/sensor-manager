import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Badge, Button, Table, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { ClusterModal, DeleteClusterModal } from '@components';
import {
  useClustersStore,
  useDarkThemeStore,
  useClusterModalStore,
  useDeleteClusterModalStore,
  useClusterExpandStore
} from '@states';

export function ClustersPage() {
  const clusters = useClustersStore((state) => state.clusters);
  const navigate = useNavigate();
  const darkTheme = useDarkThemeStore((state) => state.dark);

  const openClusterModal = useClusterModalStore((state) => state.open);
  const openDeleteClusterModal = useDeleteClusterModalStore((state) => state.open);

  const expandSidebarClusters = useClusterExpandStore((state) => state.expand);

  return (
    <div>
      <ClusterModal />
      <DeleteClusterModal />

      <div className='flex mb-4 justify-between'>
        <div className='flex flex-row items-center'>
          <Badge size='2xl' color={darkTheme ? 'gray' : 'info'}>
            {clusters.length} Clusters
          </Badge>
          <Badge size='2xl' color={darkTheme ? 'gray' : 'info'} className='ml-2'>
            {clusters.reduce((numSensors: number, cluster) => numSensors + cluster.numOfSensors, 0)} Sensors
          </Badge>
        </div>
        <div className='flex flex-row'>
          <TextInput
            type='text'
            autoComplete='off'
            icon={MagnifyingGlassIcon}
            placeholder='Search ...'
            required={true}
          />
          <Button gradientMonochrome='info' className='ml-2' onClick={() => openClusterModal({ action: 'create' })}>
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
              className='bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer'
              key={cluster.id}
              onClick={() => {
                navigate(`/clusters/${cluster.id}`);
                expandSidebarClusters();
              }}
            >
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                {cluster.name}
              </Table.Cell>
              <Table.Cell>{cluster.numOfSensors}</Table.Cell>
              <Table.Cell>{cluster.numOfSensors}</Table.Cell>
              <Table.Cell>{cluster.remarks ? cluster.remarks : '--'}</Table.Cell>
              <Table.Cell className='flex justify-end'>
                <Button
                  gradientMonochrome='info'
                  onClick={(e) => {
                    e.stopPropagation();
                    openClusterModal({ action: 'update', id: cluster.id });
                  }}
                  size='sm'
                  className='mr-2'
                >
                  Edit
                  <PencilIcon className='ml-2 h-4 w-4' />
                </Button>
                <Button
                  gradientMonochrome='failure'
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteClusterModal(cluster.id);
                  }}
                  size='sm'
                >
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
