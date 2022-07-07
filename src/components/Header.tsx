import { useState } from 'react'
import {
  Box,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react'
import Layout from './Layout'

const NavBar = (): JSX.Element => {
  return (
    <Layout>
      <Stack
        as={Box}
        textAlign="center"
        my="4"
      >
        <Heading
          as="h1"
          size="md"
        >
          <Text>Teo Wei Shen</Text>
        </Heading>
      </Stack>
    </Layout>
  )
}

export default NavBar
