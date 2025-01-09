import CharacterSheet from './Sheet';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  return <MantineProvider>
    <CharacterSheet />
  </MantineProvider>
}

export default App
