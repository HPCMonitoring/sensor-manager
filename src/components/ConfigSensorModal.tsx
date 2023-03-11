import { mockSensorDetailInfo, SensorFormField } from "@constants";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

import { useConfigSensorModalStore } from "@states";
import { Button, Card, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { KafkaTopicUsageTable } from "./KafkaTopicUsageTable";

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

  const [isOpenAdvancedConfig, setIsOpenAdvancedConfig] = useState(false);

  return (
    <Modal
      show={isOpenConfigSensorModal}
      onClose={closeConfigSensorModal}
      size={isOpenAdvancedConfig ? "6xl" : "md"}
      position={"top-center"}
    >
      <Modal.Body>
        <form
          className='w-full'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className='border-b-2 dark:border-gray-600 mb-4 w-full flex'>
            <div className={isOpenAdvancedConfig ? "flex-none w-1/3" : "w-full"}>
              <Label htmlFor={SensorFormField.SYSTEM_INFO} value='SYSTEM INFO' className='mb-2' />
              <Card className='mb-4 mt-1 p-0 w-full' id={SensorFormField.SYSTEM_INFO}>
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
                <TextInput
                  id={SensorFormField.NAME}
                  type='text'
                  required={true}
                  shadow
                  autoComplete='off'
                  placeholder='Insert cluster name ...'
                />
              </div>

              <div className='mb-4 block'>
                <Label htmlFor={SensorFormField.REMARKS} value='Remarks' />
                <Textarea id={SensorFormField.REMARKS} placeholder='Insert remarks ...' rows={2} shadow />
              </div>

              <div
                className='cursor-pointer text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 font-bold outline-none bg-none w-full flex justify-between py-2 px-1 rounded'
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenAdvancedConfig(!isOpenAdvancedConfig);
                }}
              >
                <span>See advanced settings</span>
                <ArrowTopRightOnSquareIcon className='h-5 w-5' />
              </div>
            </div>

            <div style={{ display: isOpenAdvancedConfig ? "block" : "none" }} className='flex-1 ml-4 pl-4 border-l-2 dark:border-gray-600'>
              <div className='w-full mb-6'>
                <div className='flex justify-between align-middle text-gray-500 dark:text-gray-200 font-bold w-full dark:border-gray-600 border-b-2 pb-1'>
                  <div>Kafka Topics</div>
                </div>
                <div className='mb-2'>
                  <KafkaTopicUsageTable />
                </div>
                <Button
                  color='light'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  size='xs'
                  className='w-full text-left cursor-pointer'
                >
                  <PlusCircleIcon className='h-5 w-5 mr-2' />
                  Add topic
                </Button>
              </div>
              <div>
                <div className='flex align-middle mb-2 text-gray-500 dark:text-gray-200 font-bold w-full dark:border-gray-600 border-b-2 pb-1'>
                  <div>Alert Triggers</div>
                </div>
                <Button
                  color='light'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  size='xs'
                  className='w-full text-left cursor-pointer'
                >
                  <PlusCircleIcon className='h-5 w-5 mr-2' />
                  Add alert rule
                </Button>
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <Button color={"light"} onClick={closeConfigSensorModal}>
              Cancel
            </Button>
            <Button gradientMonochrome='info' className='ml-2' onClick={closeConfigSensorModal} type='submit'>
              {" "}
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
