import {
  NumberInput,
  Group
} from '@mantine/core';
import { useCharacterInfo } from './character';

export const Recoveries = () => {
  const {
    character: {recoveries},
    updateRecoveries,
  } = useCharacterInfo();

  return <>
      <NumberInput
        label="Current Recoveries"
        value={recoveries.current}
        onChange={(v) => updateRecoveries({
            ...recoveries,
            current: typeof v === 'string' ? parseInt(v) : v
        })}
      />
      <Group wrap="nowrap" gap="xs">
      <NumberInput
        label="Stamina" 
        value={recoveries.stamina}
        size="xs"
        variant="unstyled"
        onChange={(v) => updateRecoveries({
          ...recoveries,
          stamina: typeof v === 'string' ? parseInt(v) : v
        })}
      />
      <NumberInput
        label="Max"
        value={recoveries.max}
        size="xs"
        variant="unstyled"
        onChange={(v) => updateRecoveries({
          ...recoveries,
          max: typeof v === 'string' ? parseInt(v) : v
        })}
      />
      </Group>
  </>
}