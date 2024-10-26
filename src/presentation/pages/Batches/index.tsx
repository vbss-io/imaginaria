import { BatchGallery } from "@/presentation/components/BatchGallery";
import { useAuth } from "@/presentation/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Batches = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      <title>Ai Content Factory - Batches</title>
      <BatchGallery />
    </>
  );
};
