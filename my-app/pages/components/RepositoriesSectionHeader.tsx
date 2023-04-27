import { Group, Title, Badge, TextInput, Button, Flex } from "@mantine/core";
import { User } from "../../types";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";

interface RepositorySectionHeaderProps {
  user: User,
  repositoryName: string,
  setRepositoryName: Dispatch<SetStateAction<string>>,
  getRepository: LazyQueryExecFunction<any, OperationVariables>,
  login: string
}

const RepositorySectionHeader = ({ user, repositoryName, setRepositoryName, getRepository, login }: RepositorySectionHeaderProps) => {
  const [keyword, setKeyword] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    setRepositoryName(e.target.value)
  }

  const handleFindRepository = () => {
    if (!repositoryName) return;

    getRepository({
      variables: {
        owner: login,
        name: repositoryName,
        first: 10
      }
    })

    setKeyword('');
  }

  return (
    <Flex direction={{ base: 'column', sm: 'row' }} gap='sm' sx={{ marginRight: 36, marginLeft: 36, marginTop: 24, justifyContent: 'space-between' }}>
      <Flex align="center" sx={{ width: '100%', gap: 5 }}>
        <Title order={4}>{user?.name ? `${user.name}'s Repositories` : 'Repositories'}</Title>
        <Badge>{user?.repositories.totalCount}</Badge>
      </Flex>
      <Flex align="center" sx={{ width: '100%', gap: 5 }}>
        <TextInput value={keyword} onChange={handleChange} placeholder="Repository name" sx={{ width: '100%' }} />
        <Button onClick={handleFindRepository}>Find</Button>
      </Flex>
    </Flex>

  )
}

export default RepositorySectionHeader;