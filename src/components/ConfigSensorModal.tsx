import { NOT_FOUND_ANY_TOPICS, SensorFormField } from "@constants";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import {
  useConfigSensorModalStore,
  useConfigTopicSubscriptionModalStore,
  useKafkaBrokerStore,
  useSensorsStore
} from "@states";
import { Button, Card, Label, Modal, Textarea, TextInput } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { KafkaTopicConfigTable } from "./KafkaTopicUsageTable";
import { SystemInfoCard } from "./SystemInfoCard";

export function ConfigSensorModal() {
  const { sensor: targetSensor, close } = useConfigSensorModalStore();
  const [isOpenAdvancedConfig, setIsOpenAdvancedConfig] = useState(false);
  const { update: updateSensor } = useSensorsStore();

  const { topic: modifyingTopic, open: openConfigTopicSubscriptionModal } =
    useConfigTopicSubscriptionModalStore();
  const { register, setValue, getValues: getFormValues, watch, handleSubmit } = useForm<Sensor>();

  useEffect(() => {
    if (modifyingTopic === null) return;
    const subscribeTopics = getFormValues("subscribeTopics");
    const targetTopicIdx = subscribeTopics.findIndex((topic) => topic.key === modifyingTopic.key);
    if (targetTopicIdx === -1) {
      subscribeTopics.push(modifyingTopic);
    } else {
      Object.assign(subscribeTopics[targetTopicIdx], modifyingTopic);
    }
    setValue("subscribeTopics", subscribeTopics);
  }, [modifyingTopic, getFormValues, setValue]);

  useEffect(() => {
    if (!targetSensor) return;
    setValue("id", targetSensor.id);
    setValue("name", targetSensor.name);
    setValue("remarks", targetSensor.remarks ? targetSensor.remarks : "");
    setValue("subscribeTopics", targetSensor.subscribeTopics);
  }, [targetSensor, setValue]);

  const deleteConfig = (key: string) => {
    const subscribeTopics: SubscribeTopic[] = getFormValues("subscribeTopics");
    const targetTopicIdx = subscribeTopics.findIndex((topic) => topic.key === key);
    if (targetTopicIdx === -1) return;
    subscribeTopics.splice(targetTopicIdx, 1);
    setValue("subscribeTopics", subscribeTopics);
  };

  const topicConfigs = watch("subscribeTopics");

  const defaultKafkaBroker = useKafkaBrokerStore((state) => {
    if (state.brokers.length === 0) return null;
    for (const item of state.brokers) {
      if (item.topics.length > 0) return item;
    }
    return null;
  });

  const onSubmit = () => {
    const modifiedSensor = getFormValues();
    updateSensor(modifiedSensor.id, {
      name: modifiedSensor.name,
      remarks: modifiedSensor.remarks,
      subscribeTopics: modifiedSensor.subscribeTopics.map((item) => ({
        id: item.id,
        usingTemplateId: item.usingTemplate ? item.usingTemplate.id : null,
        script: item.script,
        interval: item.interval
      }))
    }).then(() => close());
  };

  return (
    <Modal
      show={targetSensor !== null}
      onClose={close}
      size={isOpenAdvancedConfig ? "6xl" : "md"}
      position={"top-center"}
    >
      {targetSensor && (
        <Modal.Body>
          <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='border-b-2 dark:border-gray-600 mb-4 w-full flex'>
              <div className={isOpenAdvancedConfig ? "flex-none w-1/3" : "w-full"}>
                <Label htmlFor={SensorFormField.SYSTEM_INFO} value='SYSTEM INFO' className='mb-2' />
                <Card className='mb-4 mt-1 p-0 w-full' id={SensorFormField.SYSTEM_INFO}>
                  <SystemInfoCard attr={"Kernel Name"} value={targetSensor.kernelName} />
                  <SystemInfoCard attr={"Kernel Version"} value={targetSensor.kernelVersion} />
                  <SystemInfoCard attr={"Architecture"} value={targetSensor.arch} />
                  <SystemInfoCard attr={"Hostname"} value={targetSensor.hostname} />
                  <SystemInfoCard attr={"Root user"} value={targetSensor.rootUser} />
                </Card>

                <div className='mb-4 block'>
                  <Label htmlFor={SensorFormField.NAME} value='Sensor name*' className='mb-2' />
                  <TextInput
                    id={SensorFormField.NAME}
                    type='text'
                    shadow
                    autoComplete='off'
                    placeholder='Insert sensor name ...'
                    {...register("name", { required: true })}
                  />
                </div>

                <div className='mb-4 block'>
                  <Label htmlFor={SensorFormField.REMARKS} value='Remarks' />
                  <Textarea
                    id={SensorFormField.REMARKS}
                    placeholder='Insert remarks ...'
                    rows={2}
                    shadow
                    {...register("remarks")}
                  />
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

              <div
                style={{ display: isOpenAdvancedConfig ? "block" : "none" }}
                className='flex-1 ml-4 pl-4 border-l-2 dark:border-gray-600'
              >
                <div className='w-full mb-6'>
                  <div className='flex justify-between align-middle text-gray-500 dark:text-gray-200 font-bold w-full dark:border-gray-600 border-b-2 pb-1'>
                    Kafka Topics
                  </div>
                  <div className='mb-2'>
                    <KafkaTopicConfigTable
                      deleteItem={deleteConfig}
                      configs={topicConfigs ? topicConfigs : []}
                    />
                  </div>
                  <Button
                    color='light'
                    onClick={() => {
                      if (!defaultKafkaBroker) {
                        toast.warning(NOT_FOUND_ANY_TOPICS);
                      } else
                        openConfigTopicSubscriptionModal({
                          key: moment().unix().toString(),
                          id: defaultKafkaBroker.topics[0].id,
                          name: defaultKafkaBroker.topics[0].name,
                          interval: 10,
                          script: "",
                          broker: {
                            id: defaultKafkaBroker.id,
                            name: defaultKafkaBroker.name,
                            url: defaultKafkaBroker.url
                          },
                          usingTemplate: null
                        });
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
              <Button color={"light"} onClick={close}>
                Cancel
              </Button>
              <Button gradientMonochrome='info' className='ml-2' type='submit'>
                {" "}
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      )}
    </Modal>
  );
}
