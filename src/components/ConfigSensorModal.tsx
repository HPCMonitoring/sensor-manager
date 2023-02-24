import { mockSensorDetailInfo, SensorFormField } from "@constants";
import { useConfigSensorModalStore } from "@states";
import { Button, Card, Label, Modal, Textarea, TextInput } from "flowbite-react";

function SystemInfo(props: { attr: string; value: string }) {
  return (
    <div className='flex align-middle justify-between'>
      <div className='text-gray-700 dark:text-gray-400'>{props.attr}</div>
      <div className='font-bold tracking-tight text-gray-900 dark:text-white'>{props.value}</div>
    </div>
  );
}

export function ConfigSensorModal() {
  const isOpenConfigSensorModal = useConfigSensorModalStore((state) => state.isOpen);
  const closeConfigSensorModal = useConfigSensorModalStore((state) => state.close);

  return (
    <Modal show={isOpenConfigSensorModal} onClose={closeConfigSensorModal}>
      {/* <Modal.Header>Config sensor</Modal.Header> */}
      <Modal.Body>
        <Label htmlFor={SensorFormField.SYSTEM_INFO} value='SYSTEM INFO' className='mb-2' />
        <Card className='mb-4 mt-1' id={SensorFormField.SYSTEM_INFO}>
          {Object.entries(mockSensorDetailInfo).map((entry) => (
            <SystemInfo key={entry[0]} attr={entry[0]} value={entry[1]} />
          ))}
        </Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className='mb-4 block'>
            <Label htmlFor={SensorFormField.NAME} value='Sensor name*' className='mb-2' />
            <TextInput id={SensorFormField.NAME} type='text' required={true} shadow placeholder='Insert cluster name ...' />
          </div>

          <div className='mb-4 block'>
            <Label htmlFor={SensorFormField.REMARKS} value='Remarks' />
            <Textarea id={SensorFormField.REMARKS} placeholder='Insert remarks ...' rows={3} shadow />
          </div>

          <div className='flex justify-end'>
            <Button color={"light"} onClick={closeConfigSensorModal}>
              Cancel
            </Button>
            <Button gradientMonochrome='teal' className='ml-2' onClick={closeConfigSensorModal} type='submit'>
              {" "}
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
