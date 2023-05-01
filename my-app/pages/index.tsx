import { Suspense, useEffect, useState } from "react";
import { getUser, getRepository } from "@/lib/api";
import { Box, Button, Flex, Grid, Loader, Notification } from "@mantine/core";

import Hero from "./components/Hero";
import RepositoriesList from "./components/RepositoriesList";
import RepositorySectionHeader from "./components/RepositoriesSectionHeader";
import RepositoryCard from "./components/RepositoryCard";
import Pagination from "./components/Pagination";

export default function Home() {
  const [user, setUser] = useState(null)
  const [repository, setRepository] = useState(null)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const handleGetUser = async (login: string) => {
    if (!login) return;

    setLoading(true)
    const { user, error } = await getUser(login)
    setLoading(false)

    if (error) setError(error)
    setUser(user)
  }

  const handleGetRepository = async (owner: string | undefined, repositoryName: string) => {
    if (!owner || !repositoryName) return;

    const { repository, error } = await getRepository(owner, repositoryName)
    if (error) setError(error)
    setRepository(repository);
  }

  const handleGoToPreviousPage = async (login: string, before: string) => {
    const { user } = await getUser(login, 9, before)
    setUser(user);
    setPage(page - 1)
  }

  const handleGoToNextPage = async (login: string, after: string) => {
    const { user } = await getUser(login, 9, '', after)
    setUser(user);
    setPage(page + 1)
  }

  useEffect(() => {
    (async () => {
      await handleGetUser('pereiralivia')
    })()
  }, [])

  return (
    <>
      {error && (
        <Box >
          <Notification sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setError('')}>{error}</Notification>
        </Box>
      )}

      <Hero onClick={handleGetUser} />

      {loading && <Loader />}

      {user && (
        <Box>
          <RepositorySectionHeader user={user} onClick={handleGetRepository} />
          {repository ? (
            <Box sx={{ margin: 36 }}>
              <Grid>
                <Grid.Col md={4}>
                  <RepositoryCard repository={repository} />
                </Grid.Col>
              </Grid>
              <Flex justify="center" sx={{ margin: 36 }}>
                <Button variant="light" onClick={() => setRepository(null)}>Show all repositories</Button>
              </Flex>
            </Box>
          ) : (
            <Box>
              < Box sx={{ marginRight: 36, marginLeft: 36, marginTop: 24 }}>
                <Suspense fallback={<Loader />}>
                  <RepositoriesList user={user} />
                </Suspense>
              </Box >
              <Pagination user={user} page={page} onPreviousPageClick={handleGoToPreviousPage} onNextPageClick={handleGoToNextPage} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
}