import { merge } from 'theme-ui';
import { tailwind } from '@theme-ui/presets';
import nightOwl from '@theme-ui/prism/presets/night-owl';

const theme = merge(tailwind, {
  initialColorModeName: 'light',
  useCustomProperties: true,
  colors: {
    primary: '#C52',
    secondary: tailwind.colors.orange[6],
    codeBlockBG: tailwind.colors.gray[2],
    codeBlockText: tailwind.colors.gray[9],
    backgroundContent: tailwind.colors.gray[1],
    textHeading: tailwind.colors.black,
    responseOkBG: tailwind.colors.green[1],
    responseOkText: tailwind.colors.green[7],
    responseErrorBG: tailwind.colors.red[1],
    responseErrorText: tailwind.colors.red[7],
    modes: {
      dark: {
        text: tailwind.colors.gray[2],
        textHeading: tailwind.colors.white,
        primary: tailwind.colors.indigo[3],
        background: tailwind.colors.gray[8],
        backgroundContent: tailwind.colors.gray[9],
        textMuted: tailwind.colors.gray[5],
        codeBlockBG: tailwind.colors.gray[7],
        codeBlockText: tailwind.colors.gray[1],
      },
    },
  },
  layout: {
    footer: {
      textAlign: 'center',
      display: 'block',
      color: 'textMuted',
      px: [2, 3],
      py: [3, 4],
    },
    header: {
      px: [3, 4],
      py: [2, 3],
      fontSize: 2,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    main: {
      position: 'relative',
    },
    container: {
      maxWidth: '5xl',
    },
  },
  sizes: {
    sidebar: 300,
  },
  text: {
    bold: {
      fontWeight: 700,
    },
  },
  badges: {
    primary: {
      bg: 'primary',
    },
    get: {
      bg: tailwind.colors.green[5],
    },
    post: {
      bg: tailwind.colors.blue[5],
    },
    delete: {
      bg: tailwind.colors.red[5],
    },
    put: {
      bg: tailwind.colors.purple[5],
    },
    outline: {
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
      fontSize: '0.65rem',
    },
  },
  table: {
    default: {
      borderCollapse: 'collapse',
      'td, th': {
        border: (theme) => `1px solid ${theme.colors.muted}`,
        textAlign: 'left',
        pr: 1,
        pl: 1,
        verticalAlign: 'top',
      },
    },
    borderLess: {
      borderCollapse: 'collapse',
      'td, th': {
        textAlign: 'left',
        pr: 1,
        pl: 1,
        verticalAlign: 'top',
      },
    },
  },
  styles: {
    root: {
      color: 'text',
      backgroundColor: 'background',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    pre: {
      ...nightOwl,
      padding: 3,
    },
    p: {
      fontSize: [1, 2],
      letterSpacing: '-0.003em',
      lineHeight: 'body',
      '--baseline-multiplier': 0.179,
      '--x-height-multiplier': 0.35,
      code: {
        backgroundColor: 'codeBlockBG',
        px: 2,
        py: 1,
        color: 'codeBlockText',
        borderRadius: 'default',
      },
    },
    ul: {
      code: {
        backgroundColor: 'codeBlockBG',
        px: 2,
        py: 1,
        color: 'codeBlockText',
        borderRadius: 'default',
      },
    },
    h1: {
      fontSize: [5, 6],
      mt: 2,
      color: 'textHeading',
    },
    h2: {
      fontSize: [4, 5],
      mt: 2,
      color: 'textHeading',
    },
    h3: {
      fontSize: [3, 4],
      mt: 3,
      color: 'textHeading',
    },
    h4: {
      fontSize: [2, 3],
      color: 'textHeading',
    },
    h5: {
      fontSize: [1, 2],
      color: 'textHeading',
    },
    h6: {
      fontSize: 1,
      mb: 2,
      color: 'textHeading',
    },
  },
});

export default theme;