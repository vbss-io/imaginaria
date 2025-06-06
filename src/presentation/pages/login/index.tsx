import { zodResolver } from '@hookform/resolvers/zod'
import { SignIn } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { LoginUsecase } from '@/application/usecases/auth/login.usecase'
import {
  type GetBannerImageUsecaseOutput,
  GetBannerImageUsecase
} from '@/application/usecases/images/get-banner-image.usecase'
import { Loading } from '@/presentation/components/general/loading'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

const loginSchema = z.object({
  username: z.string().min(5, {
    message: 'Username is required.'
  }),
  password: z.string().min(5, {
    message: 'Password is required.'
  })
})

type LoginForms = z.infer<typeof loginSchema>

export const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<GetBannerImageUsecaseOutput>()
  const haveFetched = useRef(false)
  const { register, handleSubmit, formState, reset } = useForm<LoginForms>({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    if (haveFetched.current) return
    const getBannerImage = new GetBannerImageUsecase()
    const loadImage = async () => {
      const image = await getBannerImage.execute()
      setImage(image)
      haveFetched.current = true
    }
    loadImage()
  }, [])

  const handleSubmitForm = async (data: LoginForms): Promise<void> => {
    try {
      setIsLoading(true)
      const loginUsecase = new LoginUsecase()
      const { token, user } = await loginUsecase.execute(data)
      if (!token || !user) throw new Error()
      login({ token, user })
      navigate('/')
    } catch {
      reset()
      setError(true)
      setIsLoading(false)
    }
  }

  return (
    <S.Container style={{ backgroundImage: image?.path ? `url(${image.path})` : 'none' }}>
      <title>Imaginaria - Login</title>
      <S.Content>
        <S.FormContainer>
          <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
            <S.Title>Login</S.Title>
            <Input
              label="Username:"
              placeholder="Type your username"
              error={formState.errors.username?.message}
              {...register('username')}
              disabled={isLoading}
            />
            <Input
              label="Password:"
              placeholder="Type your password"
              error={formState.errors.password?.message}
              {...register('password')}
              disabled={isLoading}
              type="password"
              showPasswordSwitch
            />
            <S.FormSubmitContainer error={error}>
              {error && <S.ErrorMessage>* Invalid credentials, try again.</S.ErrorMessage>}
              <Button type="submit" disabled={isLoading} onClick={handleSubmit(handleSubmitForm)} variant="primary">
                {isLoading ? (
                  <S.LoadingContainer>
                    <Loading />
                  </S.LoadingContainer>
                ) : (
                  <>
                    <SignIn color="white" width="1rem" height="1rem" />
                    Login
                  </>
                )}
              </Button>
            </S.FormSubmitContainer>
          </S.Form>
        </S.FormContainer>
      </S.Content>
    </S.Container>
  )
}
