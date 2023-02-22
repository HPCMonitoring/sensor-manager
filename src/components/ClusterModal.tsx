import { useClusterModalStore } from "@states";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useMemo } from "react";

export function ClusterModal() {
  const mode = useClusterModalStore((state) => state.mode);
  const isOpen = useClusterModalStore((state) => state.isOpen);
  const header = useMemo(() => mode[0].toUpperCase() + mode.slice(1) + " cluster", [mode]);
  const close = useClusterModalStore((state) => state.close);

  return (
    <Modal show={isOpen} onClose={close}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        <div className='mb-2 block'>
          <Label htmlFor='base' value='Base input' />
        </div>
        <TextInput id='base' type='text' sizing='md' />
        <div className='flex justify-end mt-4'>
          <Button color={"light"} onClick={close}>
            Cancel
          </Button>
          <Button gradientMonochrome='teal' className='ml-2' onClick={close}>
            {" "}
            {mode[0].toUpperCase() + mode.slice(1)}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
