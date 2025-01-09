import {
  Group,
  NumberInput
} from '@mantine/core';
import { Attribute, useCharacterInfo } from './character';

const AttributeBox = ({name}: {name: Attribute}) => {
  const {
    character: {attributes}, 
    setAttribute
  } = useCharacterInfo();
  return <NumberInput 
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      value={attributes[name]}
      onChange={(v) => setAttribute(name, v)}
      w="75"
      hideControls
      size="xs"
    >
  </NumberInput>
}

export const Attributes = () => {
  const {
    character: {attributes}
  } = useCharacterInfo();
  return <Group  gap="xs">{Object.keys(attributes).map(key => 
    <AttributeBox key={key} name={key as Attribute} />
  )}</Group>
}
