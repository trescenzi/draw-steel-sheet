import {
  Grid,
  Checkbox,
  Stack,
  Title
} from '@mantine/core';
import { useCharacterInfo, SkillCategory as SkillCategoryT } from './character';

export const Skills = () => {
  const {character: {skills}} = useCharacterInfo();
  return (
    <Grid>
      {Object.keys(skills).map(category => (
        <Grid.Col span={6} key={category}>
          <Stack>
            <Title order={3}>{category}</Title>
            <SkillCategory 
              category={category as SkillCategoryT}
            />
          </Stack>
        </Grid.Col>
      ))}
    </Grid>
  )
}
export const SkillCategory = ({category}: {category: SkillCategoryT}) => {
  const {
    character: {skills},
    toggleSkill,
  } = useCharacterInfo();
  console.log(skills[category])
  return  <Grid>
      {Object.entries(skills[category]).map(([skill, value]) => (
        <Grid.Col key={skill} span={{xs:12, md:4}}>
          <Checkbox
            label={skill}
            checked={Boolean(value)}
            onChange={(e) => {
              toggleSkill(category, skill, Boolean(e.target.checked))
            }}
          />
        </Grid.Col>
      ))}
    </Grid>
}
