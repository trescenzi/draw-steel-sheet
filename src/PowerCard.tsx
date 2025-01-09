import {
  Paper,
  TextInput,
  TagsInput,
  Grid,
  Text,
  Stack,
  Button,
  Space,
  NumberInput,
  SegmentedControl,
  Group,
  Card
} from '@mantine/core';
import { useCharacterInfo } from './character';
import { useState } from 'react';
import { powerRoll } from './dice';

export const PowerCard = ({powerName}: {powerName: string}) => {
  const {
    updatePower,
    character: {powers}
  } = useCharacterInfo();
  const powerIndex = powers.findIndex(p => p.name === powerName);
  const power = powers[powerIndex];
  const [isEditing, setIsEditing] = useState(false);
  const [powerRollBonus, setPowerRollBonus] = useState('0');
  const [powerRollNumbericBonus, setPowerRollNumbericBonus] = useState(0);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Group justify="space-between">
        <Text>{power.name}</Text>
        <Button
          mt="sm"
          onClick={() => {
            updatePower(powerIndex, {...power})
            setIsEditing(!isEditing)
          }}
        >
          {isEditing ? 'View' : 'Edit'}
        </Button>
      </Group>
      {isEditing ? (
        <>
        <Grid>
          <Grid.Col span={{base: 12, md: 3}}>
            <TextInput
              label="Name"
              value={power.name}
              onChange={(e) => updatePower(powerIndex, {...power, name: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 3}}>
            <TextInput
              label="Type"
              value={power.type}
              onChange={(e) => updatePower(powerIndex, {...power, type: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 3}}>
            <TextInput
              label="Distance"
              value={power.distance}
              onChange={(e) => updatePower(powerIndex, {...power, distance: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 3}}>
            <TextInput
              label="Target"
              value={power.target}
              onChange={(e) => updatePower(powerIndex, {...power, target: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs:12}}>
            <TagsInput
              label="Keywords"
              value={power.keywords}
              onChange={(value) => updatePower(powerIndex, {...power, keywords: value})}
              data={[
                'Area',
                'Charge', 
                'Magic',
                'Psionic',
                'Melee',
                'Strike',
                'Ranged',
                'Weapon'
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 4}}>
            <TextInput
              label="Tier 1: ≤ 11"
              value={power.effects.low}
              onChange={(e) => updatePower(powerIndex, {...power, effects: {...power.effects, low: e.target.value}})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 4}}>
            <TextInput
              label="Tier 2: 12-16"
              value={power.effects.mid}
              onChange={(e) => updatePower(powerIndex, {...power, effects: {...power.effects, mid: e.target.value}})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 4}}>
            <TextInput
              label="Tier 3: 17+"
              value={power.effects.high}
              onChange={(e) => updatePower(powerIndex, {...power, effects: {...power.effects, high: e.target.value}})}
            />
          </Grid.Col>
        </Grid>
        <Button
          onClick={() => {
            updatePower(powerIndex, power)
            setIsEditing(!isEditing)
          }}
          fullWidth
        >
          Save Changes
        </Button>
        </>
      ) : (
        <>
        <Stack gap="xs">
          <Text size="sm"><b>Type:</b> {power.type} • <b>Keywords:</b> {power.keywords.join(', ')}</Text>
          <Text size="sm"><b>Distance:</b> {power.distance} • <b>Target:</b> {power.target}</Text>
          <Stack gap="xs">
            <Text><b>Tier 1 (≤11):</b> {power.effects.low}</Text>
            <Text><b>Tier 2 (12-16):</b> {power.effects.mid}</Text>
            <Text><b>Tier 3 (17+):</b> {power.effects.high}</Text>
          </Stack>
        </Stack>
        <Space h="xs" />
        <Stack gap="xs">
          <SegmentedControl
            size="xs"
            data={[
              {value: 'downgrade', label: 'Double Bane'},
              {value: '-1', label: 'Bane'},
              {value: '0', label: 'Natural'},
              {value: '1', label: 'Edge'},
              {value: 'boost', label: 'Double Edge'}
              ]}
              value={powerRollBonus}
              onChange={(value) => setPowerRollBonus(value)}
            />
            <NumberInput
              label="Bonus"
              value={powerRollNumbericBonus}
              onChange={(value) => setPowerRollNumbericBonus(typeof value === 'number' ? value : 0)}
            />
            <Button
              mb="lg"
              onClick={() => {
                const result = powerRoll([parseInt(powerRollBonus) || 0, powerRollNumbericBonus], powerRollBonus);
                console.log(`Power Roll Result:`, result);
              }}
              >
                Power Roll
              </Button>
            </Stack>
        </>
      )}
    </Card>
  )
}
