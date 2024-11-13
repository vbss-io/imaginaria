import { Image } from "@/domain/models/Image/Image";
import { Video } from "@/domain/models/Video/Video";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface useModalProps {
  useHook: boolean;
  backPath: string;
  media?: Image | Video | null;
}

export const useCloseModal = ({ useHook, backPath, media }: useModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const mediaDetails = document.getElementById("mediaDetails");
    const closeButton = mediaDetails?.nextElementSibling as HTMLButtonElement;
    if (useHook && closeButton) {
      const originalOnClick = closeButton.onclick;
      closeButton.onclick = async function (event) {
        await originalOnClick?.call(this, event);
        navigate(backPath);
      };
    }
  }, [backPath, media, navigate, useHook]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mediaDetailsDialog =
        document.getElementById("mediaDetails")?.parentElement;
      if (
        useHook &&
        media &&
        mediaDetailsDialog &&
        !mediaDetailsDialog.contains(event.target as Node)
      ) {
        navigate(backPath);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [backPath, media, navigate, useHook]);
};
