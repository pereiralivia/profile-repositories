import { useLazyQuery } from "@apollo/client";
import { createStyles, Loader, Grid, Box, Text, Button, Flex, Notification } from "@mantine/core";
import { useEffect, useState } from "react";
import { GET_USER, GET_REPOSITORY } from "../queries";

import Hero from "./components/Hero";
import RepositorySectionHeader from "./components/RepositoriesSectionHeader";
import RepositoriesList from "./components/RepositoriesList";
import Pagination from "./components/Pagination";
import RepositoryCard from "./components/RepositoryCard";

const useStyles = createStyles(() => ({
  text: { display: 'flex', alignItems: 'center', width: '100vw', marginTop: 12, marginLeft: 36 },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '50vh' }
}));

export default function Home() {
  const { classes } = useStyles();

  const [login, setLogin] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [page, setPage] = useState(1);
  const [showError, setShowError] = useState(false);

  const [getUser, { data, error, loading }] = useLazyQuery(GET_USER, { onError: () => setShowError(true) });
  const [getRepository, { data: repositoryData, error: repositoryError, loading: repositoryLoading }] = useLazyQuery(GET_REPOSITORY, { onError: () => setShowError(true) });

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

      {error && showError && (
        <Box className={classes.text}>
          <Notification sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setShowError(false)}>Profile not found</Notification>
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
            login={login}
            setShowError={setShowError}
          />

          {repositoryError && showError && (
            <Notification sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setShowError(false)}>Repository not found</Notification>
          )}

          {repositoryLoading && (
            <Box className={classes.text}><Loader /></Box>
          )}

          {repositoryData && (repositoryName === repositoryData?.repository.name) ? (
            <Box sx={{ margin: 24 }}>
              <Grid>
                <RepositoryCard repository={repositoryData.repository} />
              </Grid>
              <Flex justify="center" sx={{ margin: 36 }}>
                <Button variant="light" onClick={() => {
                  setRepositoryName('');
                  getUser({
                    variables: {
                      login,
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
                  })
                }}>show all repositories</Button>
              </Flex>
            </Box>
          ) : (
            <Box sx={{ marginRight: 36, marginLeft: 36, marginTop: 24 }}>
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