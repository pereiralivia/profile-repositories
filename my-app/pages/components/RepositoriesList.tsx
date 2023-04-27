import { createStyles, Box, Grid, Card, Flex, Group, Text, Badge, ColorSwatch } from '@mantine/core'
import StarActionIcon from './StarActionIcon'
import { Repository, User } from '../../types'

const useStyles = createStyles((theme) => ({
  card: {
    height: '100%'
  },
  cardDescription: {
    paddingTop: 5,
    paddingBottom: 5,
  }
}));

interface RepositoriesListProps {
  user: User,
  repositoryName: string
}

const RepositoriesList = ({ user, repositoryName }: RepositoriesListProps) => {
  const { classes } = useStyles();

  const repositories = user?.repositories.nodes

  return (
    <Box>
      <Grid>
        {repositories?.map((repository: Repository) => (
          <Grid.Col key={repository.name} md={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>

              <Flex justify="space-between">
                <Group>
                  <Text weight={500} >{repository.name}</Text>
                  <Badge size="xs">{repository.visibility}</Badge>
                </Group>
                <StarActionIcon repository={repository} />
              </Flex>

              <Text size="sm" color="dimmed" className={classes.cardDescription}>
                {repository.description || 'No description'}
              </Text>

              {repository?.languages?.nodes?.map((language: { color: string; name: string }) => (
                <Group key={language.name} spacing="xs">
                  <ColorSwatch key={language.color} color={language.color} size='10' />
                  <Text size="xs">{language.name}</Text>
                </Group>
              ))}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}

export default RepositoriesList;