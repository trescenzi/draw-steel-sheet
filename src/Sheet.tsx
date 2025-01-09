import {
  Title,
  TextInput,
  Stack,
  Button,
  Container,
  Grid,
  Modal,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { useCharacterInfo } from './character';
import { PowerCard } from './PowerCard';
import { Skills } from './SkillCategory';
import { Victories } from './Victories';
import { Attributes } from './Attributes';
import { Stamina } from './Stamina';
import { AddPowerForm } from './AddPowerModal';
import { Recoveries } from './Recoveries';
import { HeroicResource } from './HeroicResource';

const ExportButton = () => {
  const {
    character
  } = useCharacterInfo();
  const exportJson = JSON.stringify(character);
  const [modalOpen, setModalOpen] = useState(false);

  return <>
    <Button onClick={() => setModalOpen(true)}>Export</Button>
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Export Character"
    >
      <Textarea value={exportJson} />
    </Modal>
  </>
}

const CharacterSheet: React.FC = () => {
  const {
    updateAttributes: _setAttributes,
    updateCharacterInfo: setCharacterInfo,
    updateStamina: _setStamina,
    addPower: _addPower,
    updatePower: _updatePower,
    removePower: _removePower,
    character: {
      characterInfo,
      powers
    }
  } = useCharacterInfo();

  if (!characterInfo) return null;

  return (
    <Container size="xl">
      <Stack gap="lg">
          <Title>
            {characterInfo.name} Character Sheet
          </Title>
          <Grid>
            <Grid.Col span={{base: 12, md: 2}}>
              <TextInput
                label="Name"
                value={characterInfo.name}
                onChange={(e) => setCharacterInfo({...characterInfo, name: e.target.value})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <TextInput
                label="Career"
                value={characterInfo.career}
                onChange={(e) => setCharacterInfo({...characterInfo, career: e.target.value})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <TextInput
                label="Ancestry"
                value={characterInfo.ancestry}
                onChange={(e) => setCharacterInfo({...characterInfo, ancestry: e.target.value})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <TextInput
                label="Class"
                value={characterInfo.class}
                onChange={(e) => setCharacterInfo({...characterInfo, class: e.target.value})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 1}}>
              <TextInput
                label="Level"
                value={characterInfo.level}
                onChange={(e) => setCharacterInfo({...characterInfo, level: parseInt(e.target.value)})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 1}}>
              <TextInput
                label="Wealth"
                value={characterInfo.wealth}
                onChange={(e) => setCharacterInfo({...characterInfo, wealth: parseInt(e.target.value)})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 1}}>
              <TextInput
                label="Renown"
                value={characterInfo.renown}
                onChange={(e) => setCharacterInfo({...characterInfo, renown: parseInt(e.target.value)})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 1}}>
              <TextInput
                label="Surges"
                value={characterInfo.surges}
                onChange={(e) => setCharacterInfo({...characterInfo, surges: parseInt(e.target.value)})}
              />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <Stamina />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <Recoveries />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 4}}>
              <Attributes />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <HeroicResource />
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 2}}>
              <Victories />
            </Grid.Col>
          </Grid>

        <Stack>
          <Title order={2}>
            Skills
          </Title>
          <Skills />
        </Stack>

        <Stack>
          <Title order={2}>
            Powers
          </Title>
          <Grid>
          {powers.map(power => (
            <Grid.Col span={{base: 12, md: 6}} key={power.name}>
              <PowerCard powerName={power.name} />
            </Grid.Col>
          ))}
          <Grid.Col span={{base: 12, md: 6}}>
            <AddPowerForm />
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
      <ExportButton />
    </Container>
  );
};

export default CharacterSheet;
