import { createStyles, Box, Grid, Card, Flex, Group, Text, Badge, ColorSwatch, Notification } from '@mantine/core'
import StarActionIcon from './StarActionIcon'
import { Repository, User } from '../../types'
import RepositoryCard from './RepositoryCard';
import GoToGithubActionIcon from './GoToGithubActionIcon';

interface RepositoriesListProps {
  user: User,
  repositoryName: string
}

const RepositoriesList = ({ user }: RepositoriesListProps) => {
  const repositories = user?.repositories.nodes

  return (
    <Box>
      <Grid>
        {repositories?.map((repository: Repository) => <RepositoryCard key={repository.id} repository={repository} />)}
      </Grid>
    </Box>
  )
}

export default RepositoriesList;