import { Image } from "@/domain/models/Image/Image";
import { Video } from "@/domain/models/Video/Video";
import { useEffect, useRef, useState } from "react";

interface useModalProps {
  getMedias: (isScroll: boolean) => Promise<Image[] | Video[]>;
}

export const useInfiniteScroll = ({ getMedias }: useModalProps) => {
  const [medias, setMedias] = useState<Image[] | Video[]>([]);
  const shouldGet = useRef(true);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight && shouldGet.current) {
        const newImages = await getMedias(true);
        if (!newImages.length) return (shouldGet.current = false);
        return setMedias(newImages);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return { medias };
};
