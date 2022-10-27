import React from "react"
import {useDisclosure} from '@chakra-ui/react'
import {
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    Box,Input,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  /**
     <ModalBody>
        <Input placeholder='Enter board title' onChange={(e) => newName(e)} >
        </Input>
      </ModalBody>
   */

function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
       <Box bg="gray.200" w="20rem" h="10rem" textAlign="center">
       <Button bg="gray.200" mt={14} onClick={onOpen}>Create new board</Button>
       </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder='Enter board title'></Input>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default BasicUsage
