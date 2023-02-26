import { kafkaTopicConfigs } from "@constants";
import { WrenchIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Modal, Table, Tooltip } from "flowbite-react";
import { useState } from "react";
import { YamlCodeBlock } from "./YamlCodeBlock";

export function KafkaTopicUsageTable() {
  const [isOpenCodeBlock, setIsOpenCodeBlock] = useState(false);
  return (
    <div>
      <Modal show={isOpenCodeBlock} onClose={() => setIsOpenCodeBlock(false)} dismissible position={"top-center"} size='5xl'>
        <Modal.Body>
          <YamlCodeBlock />
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
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={config.broker.name + config.topic.name}>
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
