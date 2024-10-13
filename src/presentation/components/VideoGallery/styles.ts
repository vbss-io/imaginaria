import { styled } from "@/presentation/config/stitches.config";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 20rem)'
});

export const Text = styled('p', {
  fontSize: '1.2rem',
  color: '$text'
})

export const Title = styled('h1', {
  fontSize: '3rem',
  lineHeight: '3rem',
  fontWeight: 'bold',
  color: '$secondary'
})

export const SubTitle = styled('h2', {
  fontSize: '1.5rem',
  lineHeight: '1.5rem',
  fontWeight: 'bold',
  color: '$primary'
})