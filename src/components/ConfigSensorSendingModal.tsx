import { useConfigSensorSendingModalStore, useFilterTemplateStore, useKafkaBrokerStore } from "@states";
import { Modal, Label, Select, TextInput, Checkbox, Button } from "flowbite-react";
import { useMemo } from "react";
import { YamlCodeBlock } from "./YamlCodeBlock";

export function ConfigSensorSendingModal() {
  const { isOpen, close, topic, setBroker, setTopic, setInterval, setUsingTemplate } =
    useConfigSensorSendingModalStore();
  const { brokers: kafkaBrokers, getTopicsByBrokerId } = useKafkaBrokerStore();

  const kafkaTopics = useMemo(() => {
    if (!topic) return [];
    return getTopicsByBrokerId(topic.broker.id);
  }, [topic, getTopicsByBrokerId]);

  const filterTemplates = useFilterTemplateStore((state) => state.filterTemplates);

  return (
    <Modal show={isOpen} dismissible onClose={close} position={"top-center"} size='3xl'>
      {topic !== null && (
        <Modal.Body>
          <div className='mb-4 flex'>
            <div className='flex-1'>
              <Label value='Kafka Broker' className='mb-2' />
              <Select
                required={true}
                sizing='sm'
                onChange={(e) => {
                  console.log(e.target.value);
                  setBroker(e.target.value);
                }}
                value={topic ? topic.broker.id : ""}
              >
                <option disabled value={""}>
                  --Select broker--
                </option>
                {kafkaBrokers.map((broker) => (
                  <option key={broker.id} value={broker.id}>
                    {broker.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className='flex-1 ml-4'>
              <Label value='Kafka Topic' className='mb-2' />
              <Select
                required={true}
                sizing='sm'
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                value={topic ? topic.id : ""}
              >
                <option disabled value={""}>
                  --Select topic--
                </option>
                {kafkaTopics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </Select>
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
              />
            </div>
          </div>
          <div className='mb-4'>
            <Label value='Template' className='mb-2' />
            <Select
              required={true}
              sizing='sm'
              onChange={(e) => setUsingTemplate(e.target.value)}
              value={topic && topic.usingTemplate ? topic.usingTemplate.id : ""}
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
            <Checkbox id='use-template-topic-rule' />
            <Label htmlFor='use-template-topic-rule'>Use template rule</Label>
          </div>
          <div className='mb-4'>
            <Label value='FILTER RULE' className='mb-2' />
            <YamlCodeBlock />
          </div>
          <div className='flex justify-end'>
            <Button color={"light"} onClick={close}>
              Discard
            </Button>
            <Button gradientMonochrome='info' className='ml-2' onClick={close}>
              {" "}
              Add
            </Button>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}
