import { Image } from "@/domain/models/Image/Image";
import { Video } from "@/domain/models/Video/Video";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface useModalProps {
  useHook: boolean;
  media?: Image | Video | null;
}

export const useCloseModal = ({ useHook, media }: useModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mediaDetails = document.getElementById("mediaDetails");
    const closeButton = mediaDetails?.nextElementSibling as HTMLButtonElement;
    if (useHook && closeButton) {
      const originalOnClick = closeButton.onclick;
      closeButton.onclick = async function (event) {
        await originalOnClick?.call(this, event);
        media?.id && navigate(location.pathname.replace(media.id, ""));
      };
    }
  }, [media, navigate, useHook]);

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
        media?.id && navigate(location.pathname.replace(media.id, ""));
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [media, navigate, useHook]);
};
