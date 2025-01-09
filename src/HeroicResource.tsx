import {
  NumberInput,
  TextInput,
} from '@mantine/core';
import { useCharacterInfo } from './character';

export const HeroicResource = () => {
  const {
    character: {heroicResource},
    updateHeroicResource,
  } = useCharacterInfo();

  return <>
      <NumberInput
        label={`${heroicResource.name.length > 0 ? heroicResource.name : 'Heroic Resource'}`}
        value={heroicResource.current}
        onChange={(v) => updateHeroicResource({
          ...heroicResource,
          current: typeof v === 'string' ? parseInt(v) : v
        })}
    />
    <details>
        <summary>Name</summary>
        <TextInput
        value={heroicResource.name}
        onChange={(v) => updateHeroicResource({
            ...heroicResource,
            name: v.target.value
        })}
        />
    </details>
  </>
}
