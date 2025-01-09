import CharacterSheet from './Sheet';
import '@mantine/core/styles.css';
import { Container, MantineProvider, rem, createTheme } from '@mantine/core';


const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(900),
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
  },
});

function App() {
  return <MantineProvider>
    <CharacterSheet />
  </MantineProvider>
}

export default App