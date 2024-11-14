import { DownloadImage } from "@/application/usecases/Image/DownloadImage";
import { DownloadVideo } from "@/application/usecases/Video/DownloadVideo";
import { Loading } from "@/presentation/components/General/Loading";
import { DownloadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import * as S from "./styles";
interface MediaDownloadProps {
  type: string;
  mediaId: string;
  mediaPath: string;
  small?: boolean;
}

export const MediaDownload = ({
  type,
  mediaId,
  mediaPath,
  small = false,
}: MediaDownloadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadImage = new DownloadImage();
  const downloadVideo = new DownloadVideo();

  const getMediaInfos = (type: string) => {
    switch (type) {
      case "image":
        return {
          downloadAction: downloadImage,
          extension: "png",
        };
      case "video":
        return {
          downloadAction: downloadVideo,
          extension: "mp4",
        };
      default:
        throw new Error();
    }
  };
  const mediaInfo = getMediaInfos(type);

  const handleDownloadMedia = async () => {
    setIsLoading(true);
    const blob = await mediaInfo.downloadAction.execute({
      url: `${import.meta.env.VITE_CDN}${mediaPath}`,
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${mediaId}.${mediaInfo.extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setIsLoading(false);
  };

  return (
    <S.DownloadButton
      onClick={(e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleDownloadMedia();
      }}
      rounded={small ? "full" : "md"}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DownloadSimple color="white" width="1.3rem" height="1.3rem" />
          {small ? "Baixar" : "Baixe Grátis"}
        </>
      )}
    </S.DownloadButton>
  );
};
