import { gql } from "@apollo/client"

export const REMOVE_STAR = gql`
mutation RemoveStar($input: RemoveStarInput!) {
  removeStar(input: $input) {
    starrable {
      ... on Repository {
        name
        viewerHasStarred
      }
    }
  }
}
`
export const ADD_STAR = gql`
mutation AddStar($input: AddStarInput!) {
  addStar(input: $input) {
    starrable {
      ... on Repository {
        name
        viewerHasStarred
      }
    }
  }
}
`
