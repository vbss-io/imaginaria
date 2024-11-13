import { Copy } from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "vbss-ui";
import * as S from "./styles";

export const MediaShare = () => {
  const locationHref = window.location.href;
  const [inputValue, setInputValue] = useState(locationHref);

  const handleCopyMediaLink = () => {
    navigator.clipboard.writeText(locationHref);
  };

  return (
    <S.Container>
      <Input
        value={inputValue}
        buttonProps={{
          children: <Copy color="white" width="1.3rem" height="1.3rem" />,
          onClick: () => {
            handleCopyMediaLink();
            setInputValue("Copiado!");
          },
        }}
      />
    </S.Container>
  );
};
