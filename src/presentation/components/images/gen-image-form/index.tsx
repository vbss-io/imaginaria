import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Textarea } from '@vbss-ui/textarea'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RequestImageUsecase } from '@/application/usecases/images/request-image-usecase'
import { imageAspectRatiosValues, imageGatewayValues } from '@/domain/consts/image.const'
import { Loading } from '@/presentation/components/general/loading'

import * as S from './styles'

const genImageForm = z.object({
  gateway: z.string({
    required_error: 'Gateway is required'
  }),
  prompt: z
    .string({
      required_error: 'Prompt is required'
    })
    .min(10, {
      message: 'OPrompt is required'
    }),
  aspectRatio: z.string().min(1, {
    message: 'aspectRatio is required'
  })
})

type GenImageForms = z.infer<typeof genImageForm>

export const GenImageForm = () => {
  const gatewayOptions = imageGatewayValues()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [gateway, setGateway] = useState<string>(gatewayOptions[0].value)
  const [dimensions, setDimensions] = useState(imageAspectRatiosValues[gatewayOptions[0].value])
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState, setValue, reset } = useForm<GenImageForms>({
    resolver: zodResolver(genImageForm)
  })

  const handleSubmitForm = async (data: GenImageForms): Promise<void> => {
    const requestImageUsecase = new RequestImageUsecase()
    try {
      setIsLoading(true)
      const response = await requestImageUsecase.execute(data)
      if (!response.imageId) throw new Error()
      setSuccess(true)
      setIsLoading(false)
      setError('')
      reset()
    } catch {
      setError('* Error to generate image, try again!')
      setSuccess(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setValue('gateway', gateway)
    setValue('aspectRatio', '')
    switch (gateway) {
      case 'goApiMidjourney':
        return setDimensions(imageAspectRatiosValues['goApiMidjourney'])
      case 'openAiDalle3':
        return setDimensions(imageAspectRatiosValues['openAiDalle3'])
      default:
        return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gateway])

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.SelectContainer>
          <S.SelectLabel htmlFor="gateway">Gateway:</S.SelectLabel>
          <S.Select value={gateway} disabled={isLoading} onChange={(e) => setGateway(e.target.value)}>
            <option value="" disabled>
              Gateway
            </option>
            {gatewayOptions.map((value, index) => (
              <option key={value.value} value={value.value} defaultChecked={index === 0}>
                {value.label}
              </option>
            ))}
          </S.Select>
        </S.SelectContainer>
        <S.FormTextAreaContainer>
          <Textarea label="Prompt:" placeholder="Type a prompt" {...register('prompt')} disabled={isLoading} />
          {formState.errors.prompt?.message && <S.ErrorMessage>{formState.errors.prompt?.message}</S.ErrorMessage>}
        </S.FormTextAreaContainer>
        <S.SelectContainer>
          <S.SelectLabel htmlFor="aspectRatio">Aspect Ratio:</S.SelectLabel>
          <S.Select {...register('aspectRatio')}>
            <option value="" disabled>
              Aspect Ratio
            </option>
            {dimensions.map((value, index) => (
              <option key={value.value} value={value.value} defaultChecked={index === 0}>
                {value.label}
              </option>
            ))}
          </S.Select>
          {formState.errors.aspectRatio?.message && (
            <S.ErrorMessage>{formState.errors.aspectRatio?.message}</S.ErrorMessage>
          )}
        </S.SelectContainer>
        <S.FormSubmitContainer error={!!error}>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          {success && <S.SuccessMessage>Image requested success.</S.SuccessMessage>}
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit(handleSubmitForm)}
            rounded="full"
            fontSize="sm"
          >
            {isLoading ? (
              <S.LoadingContainer>
                <Loading />
              </S.LoadingContainer>
            ) : (
              <>
                <PaperPlaneTilt color="white" width="1rem" height="1rem" />
                Request
              </>
            )}
          </Button>
        </S.FormSubmitContainer>
      </S.Form>
    </S.FormContainer>
  )
}
