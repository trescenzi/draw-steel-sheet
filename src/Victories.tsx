import {
  Checkbox,
  Stack,
  Group,
  Text
} from '@mantine/core';

export const Victories = () => {
  return <Stack gap="1">
      <Text>Victories</Text>
      <Group gap="2">
        {Array(15).fill(1).map((_, __) => <Checkbox key={__} />)}
      </Group>
  </Stack>
}
