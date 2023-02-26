import { ClusterFormField } from "@constants";
import { useClusterModalStore } from "@states";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useMemo } from "react";

export function ClusterModal() {
  const mode = useClusterModalStore((state) => state.mode);
  const isOpen = useClusterModalStore((state) => state.isOpen);
  const header = useMemo(() => mode[0].toUpperCase() + mode.slice(1) + " cluster", [mode]);
  const close = useClusterModalStore((state) => state.close);

  return (
    <Modal show={isOpen} onClose={close} dismissible position={"top-center"}>
      <Modal.Header>{header}</Modal.Header>
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
            <Button gradientMonochrome='info' className='ml-2' onClick={close} type='submit'>
              {" "}
              {mode[0].toUpperCase() + mode.slice(1)}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
