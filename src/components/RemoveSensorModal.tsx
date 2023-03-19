import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useDeleteSensorModalStore, useSensorsStore } from "@states";
import { Modal, Button } from "flowbite-react";

export function RemoveSensorModal() {
  const { close, sensorId } = useDeleteSensorModalStore();
  const { delete: deleteSensor } = useSensorsStore();

  return (
    <Modal show={sensorId !== null} size='md' popup={true} onClose={close}>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <ExclamationTriangleIcon className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Remove this sensor ?</h3>
          <div className='flex justify-center gap-4'>
            <Button
              color='failure'
              onClick={() => {
                if (sensorId !== null) deleteSensor(sensorId);
                close();
              }}
            >
              Remove
            </Button>
            <Button color='gray' onClick={close}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
