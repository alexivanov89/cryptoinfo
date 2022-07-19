import { FC, ReactNode, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { shape } from '../shape';
import { palette } from '../palette';
import { typography } from '../typography';
import { componentsOverrides } from '../overrides';
import { breakpoints } from '../breakpoints';
import { mixins } from '../mixins';
import { shadows, customShadows } from '../shadows';

interface IThemeConfigProps {
  children: ReactNode;
}

export const ThemeConfig: FC<IThemeConfigProps> = ({ children }) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
      mixins,
    }),
    [],
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const theme = createTheme(themeOptions);
  theme.components = componentsOverrides();
  theme.breakpoints.values = breakpoints.values;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
