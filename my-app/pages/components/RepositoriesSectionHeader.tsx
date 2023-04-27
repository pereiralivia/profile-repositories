import { Group, Title, Badge, TextInput, Button } from "@mantine/core";
import { User } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";

interface RepositorySectionHeaderProps {
  user: User,
  repositoryName: string,
  setRepositoryName: Dispatch<SetStateAction<string>>,
  getRepository: LazyQueryExecFunction<any, OperationVariables>,
  login: string
}

const RepositorySectionHeader = ({ user, repositoryName, setRepositoryName, getRepository, login }: RepositorySectionHeaderProps) => {
  return (
    <Group position="apart" sx={{ margin: 36 }}>
      <Group>
        <Title order={3}>{user?.name ? `${user.name}'s Repositories` : 'Repositories'}</Title>
        <Badge>{user?.repositories.totalCount}</Badge>
      </Group>
      <Group spacing={3}>
        <TextInput value={repositoryName} onChange={(e) => setRepositoryName(e.target.value)} placeholder="Repository name" />
        <Button onClick={() => {
          if (!repositoryName) return;
          getRepository({
            variables: {
              owner: login,
              name: repositoryName,
              first: 10
            }
          })
        }}>Find</Button>
      </Group>
    </Group>

  )
}

export default RepositorySectionHeader;