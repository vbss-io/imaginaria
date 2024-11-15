import { Batch } from "@/domain/models/Batch/Batch";
import { Image } from "@/domain/models/Image/Image";
import { Video } from "@/domain/models/Video/Video";
import { useEffect, useRef, useState } from "react";

interface useModalProps {
  getMedias: (isScroll: boolean) => Promise<Image[] | Video[] | Batch[]>;
}

export const useInfiniteScroll = ({ getMedias }: useModalProps) => {
  const [medias, setMedias] = useState<Image[] | Video[] | Batch[]>([]);
  const shouldGet = useRef(true);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight && shouldGet.current) {
        const newMedias = await getMedias(true);
        if (!newMedias.length) return (shouldGet.current = false);
        return setMedias(newMedias);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return { medias };
};
