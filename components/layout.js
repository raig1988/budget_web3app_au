// COMPONENTS
import Header from './header';
import Footer from './footer';
import { Flex } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <>
      <Header />
        <Flex id='layout-container' margin={"50px 20px"} minHeight={"50vh"}>{children}</Flex>
      <Footer />
    </>
  )
}

export default Layout;