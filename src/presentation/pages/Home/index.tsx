
import { CassetteTape, Image, Video } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from 'vbss-ui';

import { Header } from '@/presentation/components/Header';
import { ImageGallery } from '@/presentation/components/ImageGallery';

import * as S from './styles';

export const Home = () => {
  const [tab, setTab] = useState<Tab>('images')

  return (
    <S.Container>
      <Header />
      <S.TabsContainer>
        <Button
          variant={tab === 'images' ? 'secondary' : 'primary'}
          rounded="full"
          onClick={() => setTab('images')}
        >
          <Image color="white" width="1.3rem" height="1.3rem"/>
          Imagens
        </Button>
        <Button
          variant={tab === 'videos' ? 'secondary' : 'primary'}
          rounded="full"
          onClick={() => setTab('videos')}
          disabled
        >
          <Video color="white" width="1.3rem" height="1.3rem"/>
          Vídeos
        </Button>
        <Button
          variant={tab === 'audios' ? 'secondary' : 'primary'}
          rounded="full"
          onClick={() => setTab('audios')}
          disabled
        >
          <CassetteTape color="white" width="1.3rem" height="1.3rem"/>
          Audios
        </Button>
      </S.TabsContainer>
      <S.Content>
        {
          tab === 'images' && (
            <ImageGallery />
          )
        }
      </S.Content>
    </S.Container>
  );
};

type Tab = 'images' | 'videos' | 'audios'
