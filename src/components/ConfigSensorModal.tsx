import { SensorFormField } from '@constants';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { useConfigSensorModalStore, useKafkaJobConfigModalStore, useSensorsStore } from '@states';
import { Button, Card, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KafkaJobsTable } from './KafkaJobsTable';
import { SystemInfoCard } from './SystemInfoCard';
import moment from 'moment';

export function ConfigSensorModal() {
  const { sensor: targetSensor, close } = useConfigSensorModalStore();
  const [isOpenAdvancedConfig, setIsOpenAdvancedConfig] = useState(false);
  const { update: updateSensor } = useSensorsStore();

  const { job: modifyingTopic, open: openKafkaJobConfigModal } = useKafkaJobConfigModalStore();
  const { register, setValue, getValues: getFormValues, watch, handleSubmit } = useForm<Sensor>();

  useEffect(() => {
    if (modifyingTopic === null) return;
    const kafkaJobs = getFormValues('kafkaJobs');
    const targetTopicIdx = kafkaJobs.findIndex((topic) => topic.id === modifyingTopic.id);
    if (targetTopicIdx === -1) {
      kafkaJobs.push(modifyingTopic);
    } else {
      Object.assign(kafkaJobs[targetTopicIdx], modifyingTopic);
    }
    setValue('kafkaJobs', kafkaJobs);
  }, [modifyingTopic, getFormValues, setValue]);

  useEffect(() => {
    if (!targetSensor) return;
    setValue('id', targetSensor.id);
    setValue('name', targetSensor.name);
    setValue('remarks', targetSensor.remarks ? targetSensor.remarks : '');
    setValue('kafkaJobs', targetSensor.kafkaJobs);
  }, [targetSensor, setValue]);

  const deleteConfig = (id: string) => {
    const jobs: KafkaJob[] = getFormValues('kafkaJobs');
    const targetJobIdx = jobs.findIndex((topic) => topic.id === id);
    if (targetJobIdx === -1) return;
    jobs.splice(targetJobIdx, 1);
    setValue('kafkaJobs', jobs);
  };

  const topicConfigs = watch('kafkaJobs');

  const onSubmit = () => {
    const modifiedSensor = getFormValues();
    updateSensor(modifiedSensor.id, {
      name: modifiedSensor.name,
      remarks: modifiedSensor.remarks,
      kafkaJobs: modifiedSensor.kafkaJobs.map((item) => ({
        usingTemplateId: item.usingTemplate ? item.usingTemplate.id : null,
        script: item.script,
        interval: item.interval,
        brokerUrl: item.brokerUrl,
        topicName: item.topicName
      }))
    }).then(() => close());
  };

  return (
    <Modal
      show={targetSensor !== null}
      onClose={close}
      size={isOpenAdvancedConfig ? '6xl' : 'md'}
      position={'top-center'}
    >
      {targetSensor && (
        <Modal.Body>
          <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='border-b-2 dark:border-gray-600 mb-4 w-full flex'>
              <div className={isOpenAdvancedConfig ? 'flex-none w-1/3' : 'w-full'}>
                <Label htmlFor={SensorFormField.SYSTEM_INFO} value='SYSTEM INFO' className='mb-2' />
                <Card className='mb-4 mt-1 p-0 w-full' id={SensorFormField.SYSTEM_INFO}>
                  <SystemInfoCard attr={'Kernel Name'} value={targetSensor.kernelName} />
                  <SystemInfoCard attr={'Kernel Version'} value={targetSensor.kernelVersion} />
                  <SystemInfoCard attr={'Architecture'} value={targetSensor.arch} />
                  <SystemInfoCard attr={'Hostname'} value={targetSensor.hostname} />
                  <SystemInfoCard attr={'Root user'} value={targetSensor.rootUser} />
                </Card>

                <div className='mb-4 block'>
                  <Label htmlFor={SensorFormField.NAME} value='Sensor name*' className='mb-2' />
                  <TextInput
                    id={SensorFormField.NAME}
                    type='text'
                    shadow
                    autoComplete='off'
                    placeholder='Insert sensor name ...'
                    {...register('name', { required: true })}
                  />
                </div>

                <div className='mb-4 block'>
                  <Label htmlFor={SensorFormField.REMARKS} value='Remarks' />
                  <Textarea
                    id={SensorFormField.REMARKS}
                    placeholder='Insert remarks ...'
                    rows={2}
                    shadow
                    {...register('remarks')}
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
                style={{ display: isOpenAdvancedConfig ? 'block' : 'none' }}
                className='flex-1 ml-4 pl-4 border-l-2 dark:border-gray-600'
              >
                <div className='w-full mb-6'>
                  <div className='flex justify-between align-middle text-gray-500 dark:text-gray-200 font-bold w-full dark:border-gray-600 border-b-2 pb-1'>
                    Kafka Jobs
                  </div>
                  <div className='mb-2'>
                    <KafkaJobsTable
                      deleteItem={deleteConfig}
                      kafkaJobs={topicConfigs ? topicConfigs : []}
                    />
                  </div>
                  <Button
                    color='light'
                    onClick={() => {
                      openKafkaJobConfigModal({
                        id: moment().unix().toString(),
                        topicName: '',
                        brokerUrl: '',
                        script: '',
                        usingTemplate: null,
                        interval: 10
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
              <Button color={'light'} onClick={close}>
                Cancel
              </Button>
              <Button gradientMonochrome='info' className='ml-2' type='submit'>
                {' '}
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      )}
    </Modal>
  );
}
