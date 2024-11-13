import { useEffect, useState } from "react";
import { MediaHeader } from "./MediaHeader";
import { PageHeader } from "./PageHeader";

export const Header = () => {
  const [isMediaOrProfile, setIsMediaOrProfile] = useState(false);

  useEffect(() => {
    const isMediaOrProfile = (): boolean => {
      const paths = ["/image/", "/video/", "/audio/", "/profile"];
      const isMediaOrProfile = paths.some((path) =>
        window.location.pathname.includes(path)
      );
      return isMediaOrProfile;
    };
    const renderMediaHeader = isMediaOrProfile();
    setIsMediaOrProfile(renderMediaHeader);
  }, []);

  return <>{isMediaOrProfile ? <MediaHeader /> : <PageHeader />}</>;
};
