import { useState } from 'react';
import {
  Button,
  Stack,
  TextInput,
  TagsInput,
  Grid,
  Card
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCharacterInfo, Power } from './character';

const defaultPower: Power= {
  name: '',
  type: 'Action',
  keywords: ['Strike'],
  distance: '',
  target: '',
  powerRoll: 0,
  effects: {
    low: '',
    mid: '',
    high: ''
  }
};

export const AddPowerForm = () => {
  const { addPower } = useCharacterInfo();
  const [newPower, setNewPower] = useState(defaultPower);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: defaultPower,
  });

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
    <form onSubmit={form.onSubmit(values => {
      console.log(values);
      addPower(values)
    })}>
      <Stack>
        <Grid>
          <Grid.Col span={{base: 12, md: 3}}>
            <TextInput
              label="Name"
              value={newPower.name}
              onChange={(e) => setNewPower({...newPower, name: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 3}}>
            <TextInput
              label="Type"
              value={newPower.type}
              onChange={(e) => setNewPower({...newPower, type: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 3}}>
            <TextInput
              label="Distance"
              value={newPower.distance}
              onChange={(e) => setNewPower({...newPower, distance: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 3}}>
            <TextInput
              label="Target"
              value={newPower.target} 
              onChange={(e) => setNewPower({...newPower, target: e.target.value})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12}}>
            <TagsInput
              label="Keywords"
              value={newPower.keywords}
              onChange={(value) => setNewPower({...newPower, keywords: value})}
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
              value={newPower.effects.low}
              onChange={(e) => setNewPower({...newPower, effects: {...newPower.effects, low: e.target.value}})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 4}}>
            <TextInput
              label="Tier 2: 12-16"
              value={newPower.effects.mid}
              onChange={(e) => setNewPower({...newPower, effects: {...newPower.effects, mid: e.target.value}})}
            />
          </Grid.Col>
          <Grid.Col span={{xs: 12, md: 4}}>
            <TextInput
              label="Tier 3: 17+"
              value={newPower.effects.high}
              onChange={(e) => setNewPower({...newPower, effects: {...newPower.effects, high: e.target.value}})}
            />
          </Grid.Col>
        </Grid>

        <Button type="submit">
          Add Power
        </Button>
      </Stack>
    </form>
    </Card>
  );
}
