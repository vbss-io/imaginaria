import { DownloadImage } from "@/application/usecases/Image/DownloadImage";
import { DownloadVideo } from "@/application/usecases/Video/DownloadVideo";
import { DownloadSimple } from "@phosphor-icons/react";
import { Button } from "vbss-ui";

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
  const mediaInfo = getMediaInfos(type);

  const handleDownloadMedia = async () => {
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
  };

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        handleDownloadMedia();
      }}
      rounded={small ? "full" : "md"}
    >
      <DownloadSimple color="white" width="1.3rem" height="1.3rem" />
      {small ? "Baixar" : "Baixe Grátis"}
    </Button>
  );
};

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
