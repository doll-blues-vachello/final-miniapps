import { Button, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import React from 'react';
import bridge from '@vkontakte/vk-bridge';

const History = ({ id, go }) => {
  const createStory = async () => {
    await bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: 'https://sun9-35.userapi.com/impf/c305413/v305413275/39bd/P6D4_5LLotg.jpg?size=685x1024&quality=96&sign=ec18b81587100115fbff0dab2fe6c45a&type=album',
      stickers: [
        {
          sticker_type: 'renderable',
          sticker: {
            can_delete: 0,
            content_type: 'image',
            url: 'https://raw.githubusercontent.com/odb/official-bash-logo/master/assets/Logos/Icons/PNG/256x256.png',
            clickable_zones: [
              {
                action_type: 'app',
                action: {
                  app_id: 7992764,
                },
                clickable_area: [
                  {
                    x: 1,
                    y: 1,
                  },
                  {
                    x: 299,
                    y: 1,
                  },
                  {
                    x: 299,
                    y: 299,
                  },
                  {
                    x: 1,
                    y: 299,
                  },
                ],
              },
            ],
          },
        },
      ],
    }).catch(rej => JSON.stringify(rej));
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        Story Generator
      </PanelHeader>
      <Button stretched size="m" mode="secondary" onClick={createStory}>
        Создать!
      </Button>
    </Panel>
  );
};

export default History;
