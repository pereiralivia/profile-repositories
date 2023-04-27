import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { createStyles, rem, Flex, Group, TextInput, Button, Title } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import { Dispatch, SetStateAction, useState } from "react";

const useStyles = createStyles((theme) => ({
  hero: {
    width: '100%',
    paddingLeft: rem(36),
    paddingRight: rem(36),
    height: rem(250),
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)',
  },
  inputSection: {
    gap: 5,
    width: rem(400),

    '@media (max-width: 40em)': {
      width: '80vw'
    },

  }
}));

interface HeroProps {
  login: string,
  setLogin: Dispatch<SetStateAction<string>>
  getUser: LazyQueryExecFunction<any, OperationVariables>
  setPage: Dispatch<SetStateAction<number>>,
}

const Hero = ({ login, setLogin, getUser, setPage }: HeroProps) => {
  const { classes } = useStyles();
  const [keyword, setKeyword] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setLogin(e.target.value);
  }

  return (
    <Flex direction="column" justify="center" gap="md" className={classes.hero}>
      <Flex direction="column">
        <Group spacing="xs">
          <Title order={1} color="white">GitHub</Title>
          <GithubIcon size={30} color="white" />
        </Group>
        <Title order={1} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>Repositories</Title>
      </Flex>
      <Flex className={classes.inputSection}>
        <TextInput value={keyword} onChange={handleChange} placeholder="Github username" sx={{ width: '100%' }} />
        <Button onClick={() => {
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
          setKeyword('');
          setPage(1);
        }}>Find</Button>
      </Flex>
    </Flex>

  )
}

export default Hero;