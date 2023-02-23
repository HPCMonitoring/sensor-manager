import { ClusterFormField } from "@constants";
import { useSensorConfigModalStore } from "@states";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";

export function SensorConfigModal() {
  const isOpen = useSensorConfigModalStore((state) => state.isOpen);
  const close = useSensorConfigModalStore((state) => state.close);

  return (
    <Modal show={isOpen} onClose={close}>
      <Modal.Header>Config sensor</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className='mb-4 block'>
            <Label htmlFor={ClusterFormField.NAME} value='Cluster name*' className='mb-2' placeholder='Insert cluster name ...' />
            <TextInput id={ClusterFormField.NAME} type='text' required={true} shadow />
          </div>

          <div className='mb-4 block'>
            <Label htmlFor={ClusterFormField.REMARKS} value='Remarks' />
            <Textarea id={ClusterFormField.REMARKS} placeholder='Insert remarks ...' rows={4} shadow />
          </div>

          <div className='flex justify-end'>
            <Button color={"light"} onClick={close}>
              Cancel
            </Button>
            <Button gradientMonochrome='teal' className='ml-2' onClick={close} type='submit'>
              {" "}
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
