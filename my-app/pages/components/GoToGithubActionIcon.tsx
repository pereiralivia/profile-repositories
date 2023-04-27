import { ActionIcon, Center, Flex, createStyles } from "@mantine/core"
import { GithubIcon } from "@mantine/ds"

interface GoToGithubActionIconProps {
  repositoryUrl: string
}

const GoToGithubActionIcon = ({ repositoryUrl }: GoToGithubActionIconProps) => {
  return (
    <ActionIcon component="a" href={repositoryUrl} variant="subtle" color="blue.2">
      <GithubIcon size={18} />
    </ActionIcon>
  )
}

export default GoToGithubActionIcon;