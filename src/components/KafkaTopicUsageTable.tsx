import { filterTemplates, kafkaTopicConfigs } from "@constants";
import { WrenchIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, Label, Modal, Select, Table, TextInput, Tooltip } from "flowbite-react";
import { useState } from "react";
import { YamlCodeBlock } from "./YamlCodeBlock";

export function KafkaTopicUsageTable() {
  const [isOpenCodeBlock, setIsOpenCodeBlock] = useState(false);
  return (
    <div>
      <Modal
        show={isOpenCodeBlock}
        dismissible
        onClose={() => setIsOpenCodeBlock(false)}
        position={"top-center"}
        size='3xl'
      >
        <Modal.Body>
          <div className='mb-4 flex'>
            <div className='flex-1'>
              <Label value='Kafka Broker' className='mb-2' />
              <Select required={true} sizing='sm'>
                {kafkaTopicConfigs.map((config) => (
                  <option key={config.broker.url}>{config.broker.name}</option>
                ))}
              </Select>
            </div>

            <div className='flex-1 ml-4'>
              <Label value='Kafka Topic' className='mb-2' />
              <Select required={true} sizing='sm'>
                {kafkaTopicConfigs.map((config) => (
                  <option key={config.topic.name}>{config.topic.alias}</option>
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
                min={5}
                placeholder='Insert data collection interval ...'
              />
            </div>
          </div>
          <div className='mb-4'>
            <Label value='Template' className='mb-2' />
            <Select required={true} sizing='sm'>
              {filterTemplates.map((template) => (
                <option key={template.name}>{template.name}</option>
              ))}
            </Select>
          </div>
          <div className=' mb-4 flex items-center gap-2 flex-1'>
            <Checkbox id='use-template-topic-rule' />
            <Label htmlFor='use-template-topic-rule'>Use template rule</Label>
          </div>
          <div className='mb-4'>
            <Label value='FILTER RULE' className='mb-2' />
            <YamlCodeBlock code={filterTemplates[1].value} />
          </div>
          <div className='flex justify-end'>
            <Button color={"light"}>Discard</Button>
            <Button gradientMonochrome='info' className='ml-2'>
              {" "}
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Table>
        <Table.Head>
          <Table.HeadCell>Broker</Table.HeadCell>
          <Table.HeadCell>Topic name</Table.HeadCell>
          <Table.HeadCell>Config Template</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {kafkaTopicConfigs.map((config) => (
            <Table.Row
              className='bg-white dark:border-gray-700 dark:bg-gray-800'
              key={config.broker.name + config.topic.name}
            >
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                <Tooltip content={config.broker.url}>{config.broker.name}</Tooltip>
              </Table.Cell>
              <Table.Cell>
                <Tooltip content={config.topic.name}>{config.topic.alias}</Tooltip>{" "}
              </Table.Cell>
              <Table.Cell>{config.usingTemplate}</Table.Cell>
              <Table.Cell className='flex justify-end'>
                <Button gradientMonochrome='info' size='xs' onClick={() => setIsOpenCodeBlock(true)}>
                  <WrenchIcon className='h-4 w-4' />
                </Button>
                <Button gradientMonochrome='failure' size='xs' className='ml-2'>
                  <XMarkIcon className='h-4 w-4' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
