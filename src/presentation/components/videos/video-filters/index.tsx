import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowsDownUp, CaretDown, Eraser, Funnel } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { Popover } from '@vbss-ui/popover'
import { Tooltip } from '@vbss-ui/tooltip'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  type GetVideoFiltersUsecaseOutput,
  GetVideoFiltersUsecase
} from '@/application/usecases/videos/get-video-filters.usecase'
import type { GetVideosUsecaseInput } from '@/application/usecases/videos/get-videos.usecases'

import * as S from './styles'

const videoSearchSchema = z.object({
  searchMask: z.string().optional().nullable(),
  aspectRatio: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  modelName: z.string().optional().nullable(),
  orderBy: z.enum(['createdAt', 'likes']).optional().nullable(),
  orderByDirection: z.enum(['ASC', 'DESC']).optional().nullable()
})

type VideoSearchForms = z.infer<typeof videoSearchSchema>

interface VideoFiltersProps {
  isLoading: boolean
  setFilters: (filters: Omit<GetVideosUsecaseInput, 'page'>) => void
}

export const VideoFilters = ({ isLoading, setFilters }: VideoFiltersProps) => {
  const [videoFilters, setVideoFilters] = useState<GetVideoFiltersUsecaseOutput>()
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false)
  const { register, reset, setValue, watch } = useForm<VideoSearchForms>({
    resolver: zodResolver(videoSearchSchema),
    defaultValues: {
      searchMask: '',
      aspectRatio: null,
      origin: null,
      modelName: null,
      orderBy: 'createdAt',
      orderByDirection: 'DESC'
    }
  })

  useEffect(() => {
    const getVideoFilters = new GetVideoFiltersUsecase()
    const getFilters = async () => {
      const filters = await getVideoFilters.execute()
      setVideoFilters(filters)
    }
    getFilters()
  }, [])

  const handleFilterChange = (key: keyof VideoSearchForms, value: string | null) => {
    setValue(key, value)
    const currentValues = watch()

    const filteredData = Object.entries(currentValues).reduce(
      (acc, [key, value]) => {
        if (value && typeof value === 'string' && value.trim() !== '') {
          acc[key as keyof VideoSearchForms] = value
        }
        return acc
      },
      {} as Omit<GetVideosUsecaseInput, 'page'>
    )

    setFilters(filteredData)
  }

  const handleReset = () => {
    reset()
    setFilters({})
  }

  return (
    <S.FormContainer>
      <S.Form onSubmit={(e) => e.preventDefault()}>
        <S.FormContentContainer first>
          <Input
            placeholder="Search by Prompt or negativePrompt"
            {...register('searchMask', {
              onChange: (e) => handleFilterChange('searchMask', e.target.value)
            })}
            rounded="full"
            disabled={isLoading}
          />
          <Tooltip
            trigger={
              <Button
                as="div"
                type="button"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                variant={showMoreFilters ? 'primary' : 'secondary'}
                size="icon-md"
                rounded="full"
              >
                <Funnel color="white" style={{ width: '1.25rem' }} />
              </Button>
            }
          >
            {showMoreFilters ? 'Hide Filters' : 'Show Filters'}
          </Tooltip>
          <Popover
            trigger={
              <Button as="div" type="button" variant="secondary" size="icon-md" rounded="full">
                <ArrowsDownUp color="white" style={{ width: '1.25rem' }} />
              </Button>
            }
          >
            <S.SortOptionsContainer>
              <S.SortOptionButton
                onClick={() => {
                  const currentOrderBy = watch('orderBy')
                  const currentDirection = watch('orderByDirection')
                  const newDirection = currentOrderBy === 'createdAt' && currentDirection === 'DESC' ? 'ASC' : 'DESC'
                  handleFilterChange('orderBy', 'createdAt')
                  handleFilterChange('orderByDirection', newDirection)
                }}
                className={watch('orderBy') === 'createdAt' ? 'active' : ''}
              >
                <S.SortOptionContent>
                  <S.SortOptionLabel>Created At</S.SortOptionLabel>
                  {watch('orderBy') === 'createdAt' && (
                    <S.SortDirection>{watch('orderByDirection') === 'DESC' ? '↓' : '↑'}</S.SortDirection>
                  )}
                </S.SortOptionContent>
              </S.SortOptionButton>
              <S.SortOptionButton
                onClick={() => {
                  const currentOrderBy = watch('orderBy')
                  const currentDirection = watch('orderByDirection')
                  const newDirection = currentOrderBy === 'likes' && currentDirection === 'DESC' ? 'ASC' : 'DESC'
                  handleFilterChange('orderBy', 'likes')
                  handleFilterChange('orderByDirection', newDirection)
                }}
                className={watch('orderBy') === 'likes' ? 'active' : ''}
              >
                <S.SortOptionContent>
                  <S.SortOptionLabel>Likes</S.SortOptionLabel>
                  {watch('orderBy') === 'likes' && (
                    <S.SortDirection>{watch('orderByDirection') === 'DESC' ? '↓' : '↑'}</S.SortDirection>
                  )}
                </S.SortOptionContent>
              </S.SortOptionButton>
            </S.SortOptionsContainer>
          </Popover>
          <Button type="button" onClick={handleReset} variant="secondary" size="icon-md" rounded="full">
            <Eraser color="white" style={{ width: '1.25rem' }} />
          </Button>
        </S.FormContentContainer>
        {showMoreFilters && (
          <S.FormContentContainer>
            <S.SelectWrapper>
              <S.Select
                {...register('aspectRatio', {
                  onChange: (e) => handleFilterChange('aspectRatio', e.target.value)
                })}
                disabled={isLoading}
              >
                <option value="">Aspect Ratio</option>
                {videoFilters?.aspectRatio.map(
                  (filter) =>
                    filter && (
                      <option key={filter} value={filter}>
                        {filter}
                      </option>
                    )
                )}
              </S.Select>
              <CaretDown size={16} weight="bold" />
            </S.SelectWrapper>
            <S.SelectWrapper>
              <S.Select
                {...register('origin', {
                  onChange: (e) => handleFilterChange('origin', e.target.value)
                })}
                disabled={isLoading}
              >
                <option value="">Origin</option>
                {videoFilters?.origin.map(
                  (filter) =>
                    filter && (
                      <option key={filter} value={filter}>
                        {filter}
                      </option>
                    )
                )}
              </S.Select>
              <CaretDown size={16} weight="bold" />
            </S.SelectWrapper>
            <S.SelectWrapper>
              <S.Select
                {...register('modelName', {
                  onChange: (e) => handleFilterChange('modelName', e.target.value)
                })}
                disabled={isLoading}
              >
                <option value="">Model</option>
                {videoFilters?.modelName.map(
                  (filter) =>
                    filter && (
                      <option key={filter} value={filter}>
                        {filter}
                      </option>
                    )
                )}
              </S.Select>
              <CaretDown size={16} weight="bold" />
            </S.SelectWrapper>
          </S.FormContentContainer>
        )}
      </S.Form>
    </S.FormContainer>
  )
}
