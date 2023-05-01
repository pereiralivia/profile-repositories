import { Box, Grid } from '@mantine/core'
import { Repository, User } from '../../types'
import RepositoryCard from './RepositoryCard';
import GoToGithubActionIcon from './GoToGithubActionIcon';

interface RepositoriesListProps {
  user: User,
}

const RepositoriesList = ({ user }: RepositoriesListProps) => {
  const repositories = user?.repositories.nodes

  return (
    <Box>
      <Grid>
        {repositories?.map((repository: Repository) => (
          <Grid.Col md={4} key={repository.id} >
            <RepositoryCard repository={repository} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}

export default RepositoriesList;