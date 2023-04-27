import { useLazyQuery } from "@apollo/client";
import { createStyles, Loader, Grid, Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { GET_USER, GET_REPOSITORY } from "../queries";

import Hero from "./components/Hero";
import RepositorySectionHeader from "./components/RepositoriesSectionHeader";
import RepositoriesList from "./components/RepositoriesList";
import Pagination from "./components/Pagination";
import RepositoryCard from "./components/RepositoryCard";

const useStyles = createStyles(() => ({
  text: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '50vh' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '50vh' }
}));

export default function Home() {
  const { classes } = useStyles();

  const [login, setLogin] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [page, setPage] = useState(1);

  const [getUser, { data, error, loading }] = useLazyQuery(GET_USER);
  const [getRepository, { data: repositoryData, error: repositoryError, loading: repositoryLoading }] = useLazyQuery(GET_REPOSITORY);

  useEffect(() => {
    getUser({
      variables: {
        login: 'pereiralivia',
        first: 9,
        last: null,
        after: null,
        before: null,
        languagesLast2: 10,
        orderBy: {
          direction: "DESC",
          field: "CREATED_AT"
        }
      }
    });
    setLogin('pereiralivia')
  }, [getUser])

  return (
    <>
      <Hero
        login={login}
        setLogin={setLogin}
        getUser={getUser}
        setPage={setPage}
      />

      {error && (
        <Box className={classes.text}>
          <Text size="xl">Profile not found</Text>
        </Box>
      )}

      {loading && (
        <Box className={classes.text}>
          <Loader />
        </Box>
      )}

      {data && (
        <Box>
          <RepositorySectionHeader
            user={data?.user}
            repositoryName={repositoryName}
            setRepositoryName={setRepositoryName}
            getRepository={getRepository}
            login={login} />

          {repositoryError && repositoryName && (
            <Box className={classes.text}>
              <Text size="xl">Repository not found</Text>
            </Box>
          )}

          {repositoryLoading && (
            <Box className={classes.text}><Loader /></Box>
          )}

          {repositoryData && (repositoryName === repositoryData?.repository.name) ? (
            <Box sx={{ margin: 24 }}>
              <Grid>
                <Grid.Col md={4}>
                  <RepositoryCard repository={repositoryData.repository} />
                </Grid.Col>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ margin: 24 }}>
              <RepositoriesList
                user={data?.user}
                repositoryName={repositoryName}
              />
            </Box>
          )}

          <Pagination
            getUser={getUser}
            user={data?.user}
            login={login}
            page={page}
            setPage={setPage}
          />
        </Box >
      )
      }
    </>

  );
}