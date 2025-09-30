import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  variants: {
    isPage: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        paddingTop: '80px',
        paddingBottom: '1rem',
        maxWidth: '1200px',
        flex: 1
      }
    }
  }
})

export const Content = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
  overflow: 'hidden'
})

export const DetailsHeader = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export const AvatarContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
})

export const AvatarInfo = styled('div', {
  display: 'flex',
  color: '$text',
  flexDirection: 'column',

  strong: {
    fontSize: '1.2rem',
    fontWeight: 500
  },

  span: {
    lineHeight: '1.2rem',
    opacity: 0.5
  }
})

export const Actions = styled('div', {
  display: 'flex',
  gap: '1rem'
})

export const DetailsFooter = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column-reverse',
  gap: '1rem',

  '@xsm': {
    flexDirection: 'row',
    gap: 0
  }
})

export const VideoInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
})

export const InfoHeader = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '$primary',
  borderRadius: '1rem',
  flexDirection: 'column',

  '@sm': {
    flexDirection: 'row'
  },

  '& > div:first-of-type': {
    width: '10rem',
    height: '10rem',
    borderRadius: '1rem',
    overflow: 'hidden'
  }
})

export const InfoContent = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',

  strong: {
    fontWeight: 500
  },

  span: {
    fontWeight: 600
  },

  variants: {
    column: {
      true: {
        flexDirection: 'column',

        strong: {
          fontSize: '0.8rem'
        }
      }
    }
  }
})

export const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  gap: '0.25rem'
})

export const InfoCard = styled('div', {
  minWidth: '30%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',

  span: {
    opacity: 0.5
  }
})

export const StatusIconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: '400px',
  backgroundColor: 'hsl(var(--theme-background))',
  borderRadius: '0.5rem',

  variants: {
    status: {
      queued: {
        color: 'gray'
      },
      error: {
        color: 'red'
      }
    }
  }
})
