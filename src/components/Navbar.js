
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box,Flex,Heading,Button,HStack, MenuButton } from '@chakra-ui/react'
import { Menu, MenuItem, MenuList, } from '@chakra-ui/react'
import React from 'react'

function Navbar() {
  return (
    <div>
      <HStack>
      <Flex bg="rgb(2,106,167)" alignItems="center" w="100%" mt={0.4} height="16">
      <Heading color="white" ml={5} display="flex" mt={12}>
      <Box mt={1} ml={1} boxSize={20}><img src='https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif' alt="" />
      </Box>
      <Menu>
      <MenuButton as={Button}bg="#026AA7"  fontSize={16} mt={-1-1} ml={12} rightIcon={<ChevronDownIcon />}>
      Workspaces
      </MenuButton>
      <MenuButton as={Button}bg="#026AA7"fontSize={16} mt={-1-1} ml={12} rightIcon={<ChevronDownIcon />}>
      Recent
      </MenuButton>
      <MenuButton as={Button}bg="#026AA7"fontSize={16} mt={-1-1} ml={12} rightIcon={<ChevronDownIcon />}>
      More
      </MenuButton>
      </Menu>
      </Heading>
      </Flex>
      </HStack>
    </div>
  )
}

export default Navbar
