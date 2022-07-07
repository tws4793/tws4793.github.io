import {
  Container,
  Box
} from '@chakra-ui/react'

interface Props {
  children?: React.ReactNode
}

const Layout = (props: Props): JSX.Element => {
  return (
    <Box px="4">
      <Container maxW="3xl">
        { props.children }
      </Container>
    </Box>
  )
}

export default Layout
