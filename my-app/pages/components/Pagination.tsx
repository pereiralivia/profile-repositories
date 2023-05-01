import { Group, Button, Text, Flex } from "@mantine/core"
import { User } from "../../types";

interface PaginationProps {
  user: User,
  page: number,
  onPreviousPageClick: (login: string, before: string) => Promise<void>,
  onNextPageClick: (login: string, before: string) => Promise<void>
}

const Pagination = ({ user, page, onPreviousPageClick, onNextPageClick }: PaginationProps) => {
  const totalItems = Number(user?.repositories?.totalCount)
  const totalPages = Math.ceil(totalItems / 9)
  const startItem = page === 1 ? 1 : ((page - 1) * 9) + 1;
  const endItem = () => {
    switch (true) {
      case totalItems < 9:
        return totalItems
      case totalItems < page * 9:
        return totalItems
      default:
        return page * 9;
    }
  }

  return (
    <Flex justify="end" sx={{ paddingRight: 36, paddingLeft: 36, paddingTop: 24, paddingBottom: 24 }}>
      <Group>
        {user?.repositories?.totalCount && (
          <Text size="sm">{startItem} - {endItem()} of {totalItems}</Text>
        )}
        <Button
          onClick={() => onPreviousPageClick(user.login, user.repositories.pageInfo.endCursor)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => onNextPageClick(user.login, user.repositories.pageInfo.endCursor)}
          disabled={page === totalPages}>
          Next
        </Button>
      </Group>
    </Flex>

  )
}

export default Pagination;