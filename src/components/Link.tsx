import {
  Box,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react'

interface Props {
  to: string,
  icon?: React.ReactElement,
  colorScheme?: string,
  isDisabled?: boolean,
  children?: React.ReactNode
}

const Link = (props: Props): JSX.Element => {
  return (
    <Button
      as={props.isDisabled ? Box : ChakraLink}
      size="lg"
      width="100%"
      my="2"
      colorScheme={props.colorScheme}
      leftIcon={props.icon}
      isDisabled={props.isDisabled}
      _hover={{
        textDecor: 'none',
        background: 'white',
        color: 'teal.500'
      }}
      target="_blank"
      href={props.to}
    >
      {props.children}
    </Button>
  )
}

export default Link
