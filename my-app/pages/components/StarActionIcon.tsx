import { ActionIcon, Group } from "@mantine/core";
import { Repository } from "../../types";
import { useState } from "react";
import { addStar, removeStar } from "@/lib/api";

interface StarActionIconProps {
  repository: Repository
}

const StarActionIcon = ({ repository }: StarActionIconProps) => {
  const [starred, setStarred] = useState(repository?.viewerHasStarred);

  const handleStarring = () => {
    if (starred) {
      try {
        removeStar(repository.id)
        setStarred(false)
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        addStar(repository.id)
        setStarred(true)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <Group>
      <ActionIcon size="sm" onClick={handleStarring} color="inherit">
        <svg xmlns="http://www.w3.org/2000/svg" fill={starred ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </ActionIcon>
    </Group>
  )
}

export default StarActionIcon;