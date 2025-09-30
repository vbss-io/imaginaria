interface GatewayValues {
  label: string
  value: keyof typeof imageAspectRatiosValues
}

interface ModelValues {
  label: string
  value: string
}

export const imageGatewayValues = (): Array<GatewayValues> => {
  const options = [
    { label: 'Go API', value: 'goApi' },
    { label: 'Open AI', value: 'openAi' }
  ]
  return options as Array<GatewayValues>
}

export const imageModelValues = (gateway: string): Array<ModelValues> => {
  switch (gateway) {
    case 'goApi':
      return [
        { label: 'Midjourney', value: 'midjourney' },
        { label: 'Stable Diffusion', value: 'stable-diffusion' }
      ]
    case 'openAi':
      return [
        { label: 'Dall-E 3', value: 'dall-e-3' },
        { label: 'Dall-E 2', value: 'dall-e-2' }
      ]
    default:
      return []
  }
}

export const imageAspectRatiosValues = {
  goApi: [
    { label: '1024x1024', value: '1:1' },
    { label: '1456x816', value: '16:9' },
    { label: '816x1456', value: '9:16' },
    { label: '1232x928', value: '4:3' },
    { label: '928x1232', value: '3:4' },
    { label: '1680x720', value: '21:9' },
    { label: '720x1680', value: '9:21' }
  ],
  openAi: [
    { label: '1024x1024', value: '1:1' },
    { label: '1792x1024', value: '16:9' },
    { label: '1024x1792', value: '9:16' }
  ]
}
