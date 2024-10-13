import { AudioGallery } from '@/presentation/components/AudioGallery';
import { ImageGallery } from '@/presentation/components/ImageGallery';
import { VideoGallery } from '@/presentation/components/VideoGallery';
import { useTab } from '@/presentation/hooks/use-tab';

import * as S from './styles';

export const Home = () => {
  const { tab } = useTab()

  return (
    <S.Container>
      <S.Content>
        {
          tab === 'images' && (
            <ImageGallery />
          )
        }
        {
          tab === 'videos' && (
            <VideoGallery />
          )
        }
        {
          tab === 'audios' && (
            <AudioGallery />
          )
        }
      </S.Content>
    </S.Container>
  );
};
