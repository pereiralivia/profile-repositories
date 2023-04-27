import { createStyles, Card, Badge, Flex, Group, Text, ColorSwatch } from "@mantine/core";
import StarActionIcon from "./StarActionIcon";
import { Repository } from "../../types";

const useStyles = createStyles(() => ({
  card: {
    height: '100%'
  },
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
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>

      <Flex justify="space-between" align="">
        <Group>
          <Text weight={500} >{repository?.name}</Text>
          <Badge size="xs">{repository?.visibility}</Badge>
        </Group>
        <StarActionIcon repository={repository} />
      </Flex>

      <Text size="sm" color="dimmed" className={classes.cardDescription}>
        {repository?.description || 'No description'}
      </Text>

      {repository?.languages && (
        repository?.languages?.nodes.map((language: { color: string; name: string }) => (
          <Group key={language.name} spacing="xs">
            <ColorSwatch key={language.color} color={language.color} size='10' />
            <Text size="xs">{language.name}</Text>
          </Group>
        ))
      )}
    </Card>

  )
}

export default RepositoryCard;