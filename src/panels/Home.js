import React from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
} from '@vkontakte/vkui';

const Home = ({ id, go }) => {
  return (
    <Panel id={id}>
      <PanelHeader>YB-QR!</PanelHeader>
      <Group>
        <Div header={<Header mode="secondary">QR Reader</Header>}>
          <Button
            stretched
            size="l"
            mode="primary"
            onClick={go}
            data-to="reader"
          >
            Read QR
          </Button>
        </Div>
      </Group>

      <Group>
        <Div header={<Header mode="secondary">QR Storage</Header>}>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={go}
            data-to="storage"
          >
            QR Storage
          </Button>
        </Div>
      </Group>

      <Group>
        <Div header={<Header mode="secondary">Story Maker</Header>}>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={go}
            data-to="history"
          >
            Make a Story
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

export default Home;
