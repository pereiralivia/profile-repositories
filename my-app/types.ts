export interface Repository {
  name: string
  stargazerCount: number
  visibility: string
  createdAt: string,
  description: string
  url: string
  viewerHasStarred: Boolean
  id: string
  languages: {
    nodes: {
      color: string;
      name: string;
    }[];
  }
}

interface PageInfo {
  startCursor: string
  hasPreviousPage: boolean,
  hasNextPage: boolean,
  endCursor: string
}

interface Repositories {
  nodes: Repository[]
  totalCount: number,
  pageInfo: PageInfo

}

interface Edge {
  cursor: string
}

export interface User {
  login: string
  name: string
  repositories: Repositories
  edges: Edge[]
}

