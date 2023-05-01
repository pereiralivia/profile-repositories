import { useState } from "react";
import { Title, Badge, TextInput, Button, Flex } from "@mantine/core";
import { User } from "../../types";

interface RepositorySectionHeaderProps {
  user: User | null
  onClick: (owner: string | undefined, repositoryName: string) => Promise<void>
}

const RepositorySectionHeader = ({ user, onClick }: RepositorySectionHeaderProps) => {
  const [keyword, setKeyword] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <Flex direction={{ base: 'column', sm: 'row' }} gap='sm' sx={{ marginRight: 36, marginLeft: 36, marginTop: 24, justifyContent: 'space-between' }}>
      <Flex align="center" sx={{ width: '100%', gap: 5 }}>
        <Title order={4}>{user?.name ? `${user.name}'s Repositories` : 'Repositories'}</Title>
        <Badge>{user?.repositories.totalCount}</Badge>
      </Flex>
      <Flex align="center" sx={{ width: '100%', gap: 5 }}>
        <TextInput value={keyword} onChange={handleChange} placeholder="Repository name" sx={{ width: '100%' }} />
        <Button onClick={() => { onClick(user?.login, keyword); setKeyword('') }}>Find</Button>
      </Flex>
    </Flex>

  )
}

export default RepositorySectionHeader;