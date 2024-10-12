import { DownloadSimple, Info, XCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { GetImageDetails } from '@/application/usecases/GetImageDetails';
import { ImageDetails as ImageDetailsModel } from "@/domain/models/ImageDetails";
import { LoadImage } from '@/presentation/components/Image';
import { Loading } from '@/presentation/components/Loading';

import { Link } from 'react-router-dom';
import { Button, Chips } from 'vbss-ui';

import { DownloadImage } from '@/application/usecases/DownloadImage';
import * as S from './styles';

interface ImageDetailsProps {
  id: string
}

export const ImageDetails = ({ id }: ImageDetailsProps) => {
  const [image, setImage] = useState<ImageDetailsModel>()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const getImageDetails = new GetImageDetails()
    const loadImage = async () => {
      const image = await getImageDetails.execute({ id })
      setImage(image)
    };
    loadImage()
    setIsLoading(false)
  }, [id])

  const handleDownloadImage = async (url: string, id: string) => {
    const downloadImage = new DownloadImage()
    const blob = await downloadImage.execute({ url })
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <S.Container>
      <S.Modal>
        <S.ModalHeader>
          <Link to='/'>
            <XCircle width="2rem" height="2rem"/>
          </Link>
        </S.ModalHeader>
        {
          isLoading && (
            <Loading />
          )
        }
        {
          image && !isLoading && (
            <>
            <S.ModalContent>
              <LoadImage 
                src={image.path}
                alt='any'
              />
            </S.ModalContent>
            <S.ModalFooter>
              <Chips
                chipsProps={{
                  variant: 'secondary',
                  size: 'md'
                }}
                chips={[image.origin, image.modelName]}
              />
              <S.ModalFooterButtons>
                <S.DetailsDialog
                  title='Detalhes da Imagem'
                  trigger={
                    <Button
                      as='div'
                    >
                      <Info color="white" width="1.3rem" height="1.3rem"/>
                      Mais Informações
                    </Button>
                  }
                >
                  <S.DetailsContainer>
                    <S.DetailsHeader>
                      <img src={`${import.meta.env.VITE_CDN}${image.path}`} />
                      <S.DetailsHeaderInfo>
                        <S.DetailsHeaderInfoCard>
                          <span>Origem</span>
                          <strong>{image.origin}</strong>
                        </S.DetailsHeaderInfoCard>
                        <S.DetailsHeaderInfoCard>
                          <span>Modelo</span>
                          <strong>{image.modelName}</strong>
                        </S.DetailsHeaderInfoCard>
                      </S.DetailsHeaderInfo>
                    </S.DetailsHeader>
                    <S.DetailsContent column>
                      <S.DetailsHeaderInfoCard>
                        <span>Prompt</span>
                        <strong>{image.prompt}</strong>
                      </S.DetailsHeaderInfoCard>
                      {
                        image.negativePrompt !== 'none' && (
                          <S.DetailsHeaderInfoCard>
                            <span>Negative Prompt</span>
                            <strong>{image.negativePrompt}</strong>
                          </S.DetailsHeaderInfoCard>
                        )
                      }
                    </S.DetailsContent>
                    <S.DetailsContent>
                      <S.DetailsHeaderInfoCard>
                        <span>Dimensões</span>
                        <strong>{image.width} x {image.height}</strong>
                      </S.DetailsHeaderInfoCard>
                      <S.DetailsHeaderInfoCard>
                        <span>Proporção</span>
                        <strong>{image.aspectRatio}</strong>
                      </S.DetailsHeaderInfoCard>
                      {
                        image.sampler !== 'none' && (
                          <S.DetailsHeaderInfoCard>
                            <span>Sampler</span>
                            <strong>{image.sampler}</strong>
                          </S.DetailsHeaderInfoCard>
                        )
                      }
                      {
                        image.scheduler !== 'none' && (
                          <S.DetailsHeaderInfoCard>
                            <span>Scheduler</span>
                            <strong>{image.scheduler}</strong>
                          </S.DetailsHeaderInfoCard>
                        )
                      }
                      {
                        image.steps !== 0 && (
                          <S.DetailsHeaderInfoCard>
                            <span>Steps</span>
                            <strong>{image.steps}</strong>
                          </S.DetailsHeaderInfoCard>
                        )
                      }
                      {
                        Number(image.seed) !== 0 && (
                          <S.DetailsHeaderInfoCard>
                            <span>Seed</span>
                            <strong>{image.seed}</strong>
                          </S.DetailsHeaderInfoCard>
                        )
                      }
                      <S.DetailsHeaderInfoCard>
                        <span>Criação</span>
                        <strong>{(new Date(image.createdAt)).toLocaleDateString()}</strong>
                      </S.DetailsHeaderInfoCard>
                    </S.DetailsContent>
                  </S.DetailsContainer>
                </S.DetailsDialog>
                <Button
                  onClick={() => handleDownloadImage(`${import.meta.env.VITE_CDN}${image.path}`, image.id)}
                >
                  <DownloadSimple color="white" width="1.3rem" height="1.3rem"/>
                  Fazer Download
                </Button>
              </S.ModalFooterButtons>
            </S.ModalFooter>
            </>
          )
        }
      </S.Modal>
      <S.ContainerBlackOverlay
        to='/'
      />
    </S.Container>
  );
};
