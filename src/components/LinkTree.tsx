import {
} from '@chakra-ui/react'
import {
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaTelegram
} from 'react-icons/fa'
import {
  EmailIcon
} from '@chakra-ui/icons'
import Link from './Link'
import Layout from './Layout'

interface Props {
}

const LinkTree = (props: Props): JSX.Element => {
  return (
    <Layout>
      <Link
        to="https://tws4793.github.io/me/"
        icon={<FaGlobe />}
        isDisabled
      >
        Portfolio
      </Link>
      <Link
        to="https://www.linkedin.com/in/teo-wei-shen/"
        icon={<FaLinkedin />}
      >
        LinkedIn
      </Link>
      <Link
        to="https://github.com/tws4793"
        icon={<FaGithub />}
      >
        Github
      </Link>
      <Link
        to="https://t.me/tws4793"
        icon={<FaTelegram />}
      >
        Telegram
      </Link>
      <Link
        to="mailto:tws4793@gmail.com"
        icon={<EmailIcon />}
      >
        Email
      </Link>
    </Layout>
  )
}

export default LinkTree
