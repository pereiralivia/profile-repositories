import { createStyles, Card, Badge, Flex, Group, Text, ColorSwatch, Grid } from "@mantine/core";
import StarActionIcon from "./StarActionIcon";
import { Repository } from "../../types";
import GoToGithubActionIcon from "./GoToGithubActionIcon";

const useStyles = createStyles(() => ({
  cardDescription: {
    paddingTop: 5,
    paddingBottom: 5,
  }
}));

interface RepositoryCardProps {
  repository: Repository
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const { classes } = useStyles();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: '100%', border: "1px solid black" }}>

      <Flex direction="column">
        <Flex justify="space-between">
          <Group>
            <Text weight={500} >{repository?.name}</Text>
            <Badge size="xs">{repository?.visibility}</Badge>
          </Group>
          <StarActionIcon repository={repository} />
        </Flex>

        <Text size="sm" color="dimmed" className={classes.cardDescription}>
          {repository?.description || 'No description'}
        </Text>
      </Flex>

      <Flex gap="md" sx={{ justifyContent: "space-between" }}>
        <Flex gap="md">
          {repository?.languages?.nodes?.map((language: { color: string; name: string }) => (
            <Group key={language.name} spacing="xs">
              <ColorSwatch key={language.color} color={language.color} size='10' />
              <Text size="xs">{language.name}</Text>
            </Group>
          ))}
        </Flex>
        <GoToGithubActionIcon repositoryUrl={repository?.url} />
      </Flex>

    </Card>
  )
}

export default RepositoryCard;