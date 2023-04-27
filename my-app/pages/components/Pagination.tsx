import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { Group, Button, Text, Flex } from "@mantine/core"
import { Dispatch, SetStateAction } from "react";
import { User } from "../../types";

interface PaginationProps {
  getUser: LazyQueryExecFunction<any, OperationVariables>
  login: string,
  page: number,
  user: User
  setPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({ getUser, login, user, page, setPage }: PaginationProps) => {

  const handleGoToNextPage = () => {
    getUser({
      variables: {
        login,
        last: null,
        first: 9,
        after: user?.repositories.pageInfo.endCursor,
        before: null,
        languagesLast2: 10,
        orderBy: {
          direction: "DESC",
          field: "CREATED_AT"
        }
      }
    });
    setPage(page + 1);
  }

  const handleGoToPreviousPage = () => {
    getUser({
      variables: {
        login,
        first: 9,
        last: null,
        after: null,
        before: user?.repositories.pageInfo.endCursor,
        languagesLast2: 10,
        orderBy: {
          direction: "DESC",
          field: "CREATED_AT"
        }
      }
    })
    setPage(page - 1)
  }
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
    <Flex justify="end" sx={{ padding: 24 }}>
      <Group>
        {user?.repositories?.totalCount && (
          <Text>{startItem} - {endItem()} of {totalItems}</Text>
        )}
        <Button
          onClick={handleGoToPreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleGoToNextPage}
          disabled={page === totalPages}>
          Next
        </Button>
      </Group>
    </Flex>

  )
}

export default Pagination;