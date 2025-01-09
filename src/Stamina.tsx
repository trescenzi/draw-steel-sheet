import {
  NumberInput,
  Group
} from '@mantine/core';
import { useCharacterInfo } from './character';

export const Stamina = () => {
  const {
    character: {stamina},
    updateStamina,
  } = useCharacterInfo();

  return <>
      <NumberInput
        label="Current Stamina"
        value={stamina.current}
        onChange={(v) => updateStamina({
          ...stamina,
          current: typeof v === 'string' ? parseInt(v) : v
        })}
      />
      <Group wrap="nowrap" gap="xs">
      <NumberInput
        label="Max" 
        value={stamina.max}
        size="xs"
        variant="unstyled"
        onChange={(v) => updateStamina({
          ...stamina,
          max: typeof v === 'string' ? parseInt(v) : v
        })}
      />
      <NumberInput
        label="Temp"
        value={stamina.temporary}
        size="xs"
        variant="unstyled"
        onChange={(v) => updateStamina({
          ...stamina,
          temporary: typeof v === 'string' ? parseInt(v) : v
        })}
      />
      </Group>
  </>
}
