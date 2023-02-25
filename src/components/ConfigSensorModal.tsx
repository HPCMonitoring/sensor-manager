import { mockSensorDetailInfo, SensorFormField } from "@constants";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useConfigSensorModalStore } from "@states";
import { Button, Card, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

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

  const [isOpenTopicConfig, setIsOpenTopicConfig] = useState(false);

  return (
    <Modal
      show={isOpenConfigSensorModal}
      onClose={closeConfigSensorModal}
      size={isOpenTopicConfig ? "6xl" : "md"}
      dismissible
      position={"top-center"}
    >
      <Modal.Body>
        <form
          className='w-full'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className='grid grid-cols-12 grid-flow-col border-b-2 dark:border-gray-600 mb-4'>
            <div className={`${isOpenTopicConfig ? "col-span-5" : "col-span-12"}`}>
              <Label htmlFor={SensorFormField.SYSTEM_INFO} value='SYSTEM INFO' className='mb-2' />
              <Card className='mb-4 mt-1 p-0' id={SensorFormField.SYSTEM_INFO}>
                {Object.entries(mockSensorDetailInfo).map((entry) => (
                  <SystemInfo
                    key={entry[0]}
                    attr={entry[0].replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                      return str.toUpperCase();
                    })}
                    value={entry[1]}
                  />
                ))}
              </Card>

              <div className='mb-4 block'>
                <Label htmlFor={SensorFormField.NAME} value='Sensor name*' className='mb-2' />
                <TextInput id={SensorFormField.NAME} type='text' required={true} shadow placeholder='Insert cluster name ...' />
              </div>

              <div className='mb-4 block'>
                <Label htmlFor={SensorFormField.REMARKS} value='Remarks' />
                <Textarea id={SensorFormField.REMARKS} placeholder='Insert remarks ...' rows={2} shadow />
              </div>

              <div
                className='hover text-gray-500 dark:text-gray-300 hover:text-blue-700 font-bold outline-none bg-none w-full flex justify-between py-2 px-1 rounded hover:bg-slate-400'
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenTopicConfig(!isOpenTopicConfig);
                }}
              >
                <span> See kafka topic settings</span>
                <ArrowTopRightOnSquareIcon className='h-5 w-5' />
              </div>
            </div>

            <div className={isOpenTopicConfig ? "" : "hidden"}>asdasdasd</div>
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
