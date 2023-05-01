export const getUser = async (login: string, first?: number, before?: string, after?: string) => {

  const variables = {
    login,
    first: first || 9,
    last: null,
    after: after || null,
    before: before || null,
    languagesLast2: 10,
    orderBy: {
      direction: "DESC",
      field: "CREATED_AT"
    }
  }
  const response = await fetch('/api/user', {
    body: JSON.stringify(variables),
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export const getRepository = async (owner: string, repositoryName: string) => {

  const variables = {
    owner,
    name: repositoryName,
    first: 1
  }

  const response = await fetch('/api/repository', {
    body: JSON.stringify(variables),
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export const addStar = async (repositoryId: string) => {
  const variables = {
    input: {
      starrableId: repositoryId
    }
  }

  const response = await fetch('/api/repository/star', {
    body: JSON.stringify(variables),
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export const removeStar = async (repositoryId: string) => {
  const variables = {
    input: {
      starrableId: repositoryId
    }
  }

  const response = await fetch('/api/repository/unstar', {
    body: JSON.stringify(variables),
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}