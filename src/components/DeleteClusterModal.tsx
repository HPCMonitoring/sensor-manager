import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useDeleteClusterModalStore } from "@states";
import { Button, Modal } from "flowbite-react";

export function DeleteClusterModal() {
  const { isOpen, close } = useDeleteClusterModalStore();
  return (
    <div>
      <Modal show={isOpen} size='md' popup={true} onClose={close} dismissible>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <ExclamationTriangleIcon className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Are you sure to remove this cluster ?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={close}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={close}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
