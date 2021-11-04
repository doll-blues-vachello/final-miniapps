import bridge from '@vkontakte/vk-bridge';
import React, { useState } from 'react';

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Button,
  Div,
  Text,
  Group,
  Link,
  Header,
} from '@vkontakte/vkui';

const Storage = ({ id, go }) => {
  const [getStorage, setStorage] = useState(false);
  const [getKeysVK, setKeysVK] = useState([]);
  const [getStorageKeys, setStorageKeys] = useState(null);

  const deleteQRs = async () => {
    const keysToDelete = getKeysVK;
    keysToDelete.forEach((e) =>
      bridge.send('VKWebAppStorageSet', { key: `${e}`, value: '' })
    );
    setKeysVK(keysToDelete);
    setStorage(false);
  };

  const loadData = async () => {
    const keysVK = await bridge
      .send('VKWebAppStorageGetKeys', { count: 100, offset: 0 })
      .then((res) => res.keys)
      .catch((rej) => JSON.stringify(rej));

    setKeysVK(keysVK);

    const result = await bridge
      .send('VKWebAppStorageGet', { keys: keysVK })
      .then((res) => res.keys)
      .catch((rej) => JSON.stringify(rej));

    const listItems = result.map((el) => (
      <Div>
        <Link key={el.key} href={el.value}>
          {el.key}
        </Link>
      </Div>
    ));
    setStorageKeys(listItems);
    setStorage(true);
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        QR-Storage
      </PanelHeader>
      {!getStorage && (
        <Div header={<Header mode="secondary">QR Storage</Header>}>
        <Button stretched size="l" mode="secondary" onClick={loadData}>
          Показать QR
        </Button>
        </Div>
      )}

      {getStorage &&
        (getStorageKeys.length > 0 ? (
          <Group header={<Header mode="secondary">QR-Storage</Header>}>
            <Div>
              Хорошая работа! У тебя уже {getStorageKeys.length} QR-кодов!
            </Div>
            <Div>{getStorageKeys}</Div>
            <Div>
              <Button stretched size="l" mode="destructive" onClick={deleteQRs}>
                Удалить все QR
              </Button>
            </Div>
          </Group>
        ) : (
          <Div>
            <Text>К сожалению, ты ещё не отсканировал ни одного QR</Text>
            <Button stretched size="m" mode="primary">
              Возможно стоит попробовать?
            </Button>
          </Div>
        ))}
    </Panel>
  );
};

export default Storage;
