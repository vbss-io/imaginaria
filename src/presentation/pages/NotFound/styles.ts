import { styled } from "@/presentation/config/stitches.config";

export const Container = styled('div', {
  gridArea: 'main',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center'
});

export const NotFoundText = styled('p', {
  fontSize: '1.2rem',
  color: '$text'
})

export const NotFound404 = styled('h1', {
  fontSize: '6rem',
  lineHeight: '6rem',
  fontWeight: 'bold',
  color: '$secondary'
})

export const NotFound404Text = styled('h2', {
  fontSize: '1.5rem',
  lineHeight: '1.5rem',
  fontWeight: 'bold',
  color: '$primary'
})