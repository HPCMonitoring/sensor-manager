import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useClustersStore, useDeleteClusterModalStore } from "@states";
import { Button, Modal } from "flowbite-react";

export const DeleteClusterModal: IComponent<{ clusterId: string }> = ({ clusterId }) => {
  const { isOpen, close } = useDeleteClusterModalStore();
  const deleteCluster = useClustersStore((state) => state.delete);

  const handleDelete = () => {
    deleteCluster(clusterId).then(() => close());
  };

  return (
    <Modal show={isOpen} size='md' popup={true} onClose={close}>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <ExclamationTriangleIcon className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Are you sure to remove this cluster ?</h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDelete}>
              Yes, I'm sure
            </Button>
            <Button color='gray' onClick={close}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
