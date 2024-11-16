interface GatewayValues {
  label: string;
  value: keyof typeof videoAspectRatiosValues;
}

export const videoGatewayValues = (): Array<GatewayValues> => {
  const options = [{ label: "Luma Labs", value: "lumaLabs" }];
  return options as Array<GatewayValues>;
};

export const videoAspectRatiosValues = {
  lumaLabs: [
    { label: "1024x1024", value: "1:1" },
    { label: "1360x752", value: "16:9" },
    { label: "752x1360", value: "9:16" },
    { label: "1168x864", value: "4:3" },
    { label: "864x1168", value: "3:4" },
    { label: "1552x656", value: "21:9" },
    { label: "656x1552", value: "9:21" },
  ],
};
