import { mockSensorDetailInfo, SensorFormField } from "@constants";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useConfigSensorModalStore, useDarkThemeStore } from "@states";
import { Button, Card, Label, Modal, Textarea, TextInput, Tooltip } from "flowbite-react";

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
  const darkTheme = useDarkThemeStore((state) => state.dark);

  return (
    <Modal show={isOpenConfigSensorModal} onClose={closeConfigSensorModal} size='md' dismissible position={"top-center"}>
      <Modal.Body>
        <Label htmlFor={SensorFormField.SYSTEM_INFO} value='SYSTEM INFO' className='mb-2' />
        <Card className='mb-4 mt-1 p-0' id={SensorFormField.SYSTEM_INFO}>
          {Object.entries(mockSensorDetailInfo).map((entry) => (
            <SystemInfo
              key={entry[0]}
              attr={entry[0]
                .replace(/([A-Z])/g, " $1")
                // uppercase the first character
                .replace(/^./, function (str) {
                  return str.toUpperCase();
                })}
              value={entry[1]}
            />
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
            <Textarea id={SensorFormField.REMARKS} placeholder='Insert remarks ...' rows={2} shadow />
          </div>

          {/* <hr className="border-gray-400 dark:border-gray-600 mb-4"/> */}

          <h4 className='text-gray-800 dark:text-gray-100 font-bold mb-4'>Kafka Topics</h4>

          <div className='flex justify-between'>
            <Tooltip content='Add a Kafka topic' placement='bottom' style={darkTheme ? "light" : "dark"}>
              <Button
                gradientMonochrome='info'
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className='mr-2'
              >
                <SquaresPlusIcon className='h-4 w-4' />
              </Button>
            </Tooltip>

            <div className='flex'>
              <Button color={"light"} onClick={closeConfigSensorModal}>
                Cancel
              </Button>
              <Button gradientMonochrome='teal' className='ml-2' onClick={closeConfigSensorModal} type='submit'>
                {" "}
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
