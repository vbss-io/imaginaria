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
  type GetImageFiltersUsecaseOutput,
  GetImageFiltersUsecase
} from '@/application/usecases/images/get-image-filters.usecase'
import type { GetImagesUsecaseInput } from '@/application/usecases/images/get-images.usecases'

import * as S from './styles'

const imageSearchSchema = z.object({
  searchMask: z.string().optional().nullable(),
  aspectRatio: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  modelName: z.string().optional().nullable(),
  orderBy: z.enum(['createdAt', 'likes']).optional().nullable(),
  orderByDirection: z.enum(['ASC', 'DESC']).optional().nullable()
})

type ImageSearchForms = z.infer<typeof imageSearchSchema>

interface ImageFiltersProps {
  isLoading: boolean
  setFilters: (filters: Omit<GetImagesUsecaseInput, 'page'>) => void
}

export const ImageFilters = ({ isLoading, setFilters }: ImageFiltersProps) => {
  const [imageFilters, setImageFilters] = useState<GetImageFiltersUsecaseOutput>()
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false)
  const { register, reset, setValue, watch } = useForm<ImageSearchForms>({
    resolver: zodResolver(imageSearchSchema),
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
    const getImageFilters = new GetImageFiltersUsecase()
    const getFilters = async () => {
      const filters = await getImageFilters.execute()
      setImageFilters(filters)
    }
    getFilters()
  }, [])

  const handleFilterChange = (key: keyof ImageSearchForms, value: string | null) => {
    setValue(key, value)
    const currentValues = watch()

    const filteredData = Object.entries(currentValues).reduce(
      (acc, [key, value]) => {
        if (value && typeof value === 'string' && value.trim() !== '') {
          acc[key as keyof ImageSearchForms] = value
        }
        return acc
      },
      {} as Omit<GetImagesUsecaseInput, 'page'>
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
                {imageFilters?.aspectRatio.map(
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
                {imageFilters?.origin.map(
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
                {imageFilters?.modelName.map(
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
