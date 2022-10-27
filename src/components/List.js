import React, { useEffect, useState } from 'react'
import * as API from '../API'
import {useParams} from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react';
import {Box,Input,ModalBody,ModalFooter,ModalCloseButton,ModalHeader,Heading,Button,Modal,ModalContent,ModalOverlay} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import {DeleteIcon} from '@chakra-ui/icons'

function List() {
  let params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  console.log(params.id)
  let [Lists, setList] = useState({
    list:[], listName:'', cardDetail:false, isOpen:false 
  })
  
  useEffect(() => {
    const id = params.id
    API.getList(id)
    .then(list => {
        setList({
            list:list,
        });
    }).catch((err) => console.log(err))
  },[])
  console.log(Lists)

   const deleteHandler = (id) => {
    API.deleteList(id,true)
    .then((res) => {
     const newList = Lists.list.filter((list) => list.id !== id)
     setList({list:newList})
    })
 }


  return (
    <div>
      {
        Lists.list.map((list) => {
            return (
                <Box>
                    <Box bg="gray.300" w="300px" m={2} key={list.id} mt={5} p={1} borderRadius={5}>
                    <Box display="flex" justifyContent="space-between">
                    <Heading as="h6" fontSize={28} ml={2}>{list.name}</Heading>
                    <Box color="gray.700" mr={3}>
                   <DeleteIcon cursor='pointer' onClick={(id) => {deleteHandler(list.id)}}/>
                    </Box>
                    {/* display card details */}
                    </Box>
                    </Box>
                </Box>
            )
        })
      }
    <Box mt="5rem" ml="2rem">
       <Button bg="gray.200" mt={14} onClick={onOpen}>Create new board</Button>
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
    </Box>
    </div>
  )
}

export default List
