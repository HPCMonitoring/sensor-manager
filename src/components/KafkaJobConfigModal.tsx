import { useKafkaJobConfigModalStore, useFilterTemplateStore } from "@states";
import { Modal, Label, Select, TextInput, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
import { YamlCodeBlock } from "./YamlCodeBlock";

export function KakfaJobConfigModal() {
  const {
    close,
    job: kafkaJob,
    setBrokerUrl,
    setTopicName,
    setInterval,
    setUsingTemplate
  } = useKafkaJobConfigModalStore();
  const [isUseTemplate, setIsUseTemplate] = useState<boolean>(true);

  const filterTemplates = useFilterTemplateStore((state) => state.filterTemplates);

  return (
    <Modal show={kafkaJob !== null} dismissible onClose={close} position={"top-center"} size='3xl'>
      {kafkaJob && (
        <Modal.Body>
          <div className='mb-4 flex'>
            <div className='flex-1'>
              <Label value='Kafka Broker' className='mb-2' />
              <TextInput
                required={true}
                sizing='sm'
                type='text'
                autoComplete='off'
                placeholder='Kafka broker'
                onChange={(e) => setBrokerUrl(e.target.value)}
                value={kafkaJob ? kafkaJob.brokerUrl : ""}
              />
            </div>

            <div className='flex-1 ml-4'>
              <Label value='Kafka Topic' className='mb-2' />
              <TextInput
                required={true}
                sizing='sm'
                type='text'
                autoComplete='off'
                placeholder='Kafka topic name'
                onChange={(e) => setTopicName(e.target.value)}
                value={kafkaJob ? kafkaJob.topicName : ""}
              />
            </div>
            <div className='flex-1 ml-4'>
              <Label value='Data collection interval' className='mb-2' />
              <TextInput
                required={true}
                sizing='sm'
                autoComplete='off'
                type={"number"}
                min={1}
                placeholder='Insert data collection interval ...'
                onChange={(e) => setInterval(e.target.valueAsNumber)}
                value={kafkaJob ? kafkaJob.interval : ""}
              />
            </div>
          </div>
          <div className='mb-4'>
            <Label value='Template' className='mb-2' />
            <Select
              required={true}
              sizing='sm'
              onChange={(e) => setUsingTemplate(e.target.value)}
              value={kafkaJob && kafkaJob.usingTemplate ? kafkaJob.usingTemplate.id : ""}
              disabled={!isUseTemplate}
            >
              <option disabled value={""}>
                --Select template--
              </option>
              {filterTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </Select>
          </div>
          <div className=' mb-4 flex items-center gap-2 flex-1'>
            <Checkbox
              id='use-template-kakfa-job-rule'
              onChange={(e) => {
                setIsUseTemplate(e.target.checked);
                if (!e.target.checked) setUsingTemplate(null);
              }}
              checked={isUseTemplate}
            />
            <Label htmlFor='use-template-kakfa-job-rule'>Use template rule</Label>
          </div>
          <div className='mb-4'>
            <Label value='FILTER RULE' className='mb-2' />
            <YamlCodeBlock
              turnOffTemplateUsage={() => {
                setUsingTemplate(null);
                setIsUseTemplate(false);
              }}
            />
          </div>
          <div className='flex justify-end'>
            <Button gradientMonochrome='info' className='ml-2' onClick={close}>
              {" "}
              Close
            </Button>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}
