import {
  useConfigTopicSubscriptionModalStore as useConfigTopicSubscriptionModalStore,
  useFilterTemplateStore,
  useKafkaBrokerStore
} from "@states";
import { Modal, Label, Select, TextInput, Checkbox, Button } from "flowbite-react";
import { useEffect, useMemo } from "react";
import { YamlCodeBlock } from "./YamlCodeBlock";

export function ConfigTopicSubscriptionModal() {
  const { close, topic, setBroker, setTopic, setInterval, setUsingTemplate } = useConfigTopicSubscriptionModalStore();
  const { brokers: kafkaBrokers, getTopicsById: getTopicsByBrokerId } = useKafkaBrokerStore();

  const kafkaTopics = useMemo(() => {
    if (!topic) return [];
    return getTopicsByBrokerId(topic.broker.id);
  }, [topic, getTopicsByBrokerId]);

  const currentBroker = useMemo(() => {
    if (!topic) return null;
    const broker = kafkaBrokers.find((item) => item.id === topic.broker.id);
    if (!broker) return null;
    return broker;
  }, [kafkaBrokers, topic]);

  useEffect(() => {
    if (currentBroker && currentBroker.topics.length > 0) {
      setTopic(currentBroker.topics[0].id);
    }
  }, [currentBroker, setTopic]);

  const filterTemplates = useFilterTemplateStore((state) => state.filterTemplates);

  return (
    <Modal show={topic !== null} dismissible onClose={close} position={"top-center"} size='3xl'>
      {topic && (
        <Modal.Body>
          <div className='mb-4 flex'>
            <div className='flex-1'>
              <Label value='Kafka Broker' className='mb-2' />
              <Select
                required={true}
                sizing='sm'
                onChange={(e) => setBroker(e.target.value)}
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
                value={topic ? topic.interval : ""}
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
