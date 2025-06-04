interface GatewayValues {
  label: string
  value: keyof typeof imageAspectRatiosValues
}

export const imageGatewayValues = (): Array<GatewayValues> => {
  const options = [
    { label: 'Midjourney (GoAPI)', value: 'goApiMidjourney' },
    { label: 'Dall-E 3', value: 'openAiDalle3' }
  ]
  return options as Array<GatewayValues>
}

export const imageAspectRatiosValues = {
  goApiMidjourney: [
    { label: '1024x1024', value: '1:1' },
    { label: '1456x816', value: '16:9' },
    { label: '816x1456', value: '9:16' },
    { label: '1232x928', value: '4:3' },
    { label: '928x1232', value: '3:4' },
    { label: '1680x720', value: '21:9' },
    { label: '720x1680', value: '9:21' }
  ],
  openAiDalle3: [
    { label: '1024x1024', value: '1:1' },
    { label: '1792x1024', value: '16:9' },
    { label: '1024x1792', value: '9:16' }
  ]
}
