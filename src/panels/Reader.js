import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

import {
  Panel,
  Group,
  PanelHeader,
  PanelHeaderBack,
  Button,
  Div,
  Input,
  Text,
  Header,
} from '@vkontakte/vkui';

const Reader = ({ id, go }) => {
  const [getShow, setShow] = useState(false);
  const [getQR, setQR] = useState({});
  const [getKeyName, setKeyName] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const readQR = async () => {
    const result = await bridge
      .send('VKWebAppOpenCodeReader')
      .then((res) => JSON.stringify(res.code_data))
      .catch((rej) => JSON.stringify(rej));
    setQR(result);
    setShow(true);
  };

  const deleteQR = () => {
    setQR(null);
    setShow(false);
  };

  const handleInput = (e) => {
    setKeyName(e.target.value);
    e.target.value.length > 1 ? setDisabled(false) : setDisabled(true);
  };

  const saveQR = async () => {
    await bridge
      .send('VKWebAppStorageSet', { key: `${getKeyName}`, value: `${getQR}` })
      .then((res) => JSON.stringify(res))
      .catch((rej) => JSON.stringify(rej));

    setKeyName('');
    setShow(false);
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        QR-Reader
      </PanelHeader>
      {!getShow && (
        <Div header={<Header mode="secondary">QR-Reader</Header>}>
          <Button stretched size="l" mode="secondary" onClick={readQR}>
            Просканировать QR
          </Button>
        </Div>
      )}

      {getShow && (
        <Group>
          <Div top="QR-Value">
            <Text>{getQR}</Text>
            <Input
              placeholder="Введите название QR"
              onChange={handleInput}
            ></Input>
          </Div>
          <Div top="Управление">
            <Button stretched size="l" mode="destructive" onClick={deleteQR}>
              Удалить
            </Button>
            <Button
              stretched
              size="l"
              mode="primary"
              disabled={isDisabled}
              onClick={saveQR}
            >
              Сохранить
            </Button>
          </Div>
        </Group>
      )}
    </Panel>
  );
};

export default Reader;
