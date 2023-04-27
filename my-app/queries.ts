import { gql } from "@apollo/client";

export const GET_TOTAL_REPOSITORIES = gql`
query Repositories($login: String!) {
  user(login: $login) {
    repositories {
      totalCount
    }
  }
}
`

export const GET_USER = gql`
query User($login: String!, $languagesLast2: Int, $first: Int, $last: Int, $after: String, $before: String, $orderBy: RepositoryOrder) {
  user(login: $login) {
    login
    name
    avatarUrl
    repositories(first: $first, last: $last after: $after, before: $before, orderBy: $orderBy) {
      nodes {
        name
        stargazerCount
        visibility
        createdAt
        description
        id
        url
        viewerHasStarred
        languages(last: $languagesLast2) {
          nodes {
            name
            color
          }
        }
      }
      totalCount
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        cursor
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query Repository($name: String!, $owner: String!, $first: Int) {
  repository(name: $name, owner: $owner) {
    name
    stargazerCount
    visibility
    createdAt
    description
    id
    viewerHasStarred
    url
    languages(first: $first) {
      nodes {
        name
        color
      }
    }
  }
}
`