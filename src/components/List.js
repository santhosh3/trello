import React, { useEffect, useState } from 'react'
import * as API from '../API'
import {useParams} from 'react-router-dom'
import { list, useDisclosure } from '@chakra-ui/react';
import {Box,Input,ModalBody,ModalFooter,ModalCloseButton,ModalHeader,Heading,Button,Modal,ModalContent,ModalOverlay} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import {DeleteIcon} from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'
import CardDetails from './CardDetails';

function List() {
  let navigate = useNavigate();
  let params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  
  let [Lists, setList] = useState({
    list:[], listName:'', cardDetail:false, isLoading:false 
  })
  
  const [ListName, setListName] = useState('');
  useEffect(() => {
    const id = params.id
    API.getList(id)
    .then(list => {
        setList({list:list});
    }).catch((err) => console.log(err))
  },[])
 

   const deleteHandler = (id) => {
    API.deleteList(id,true)
    .then((res) => {
     const newList = Lists.list.filter((list) => list.id !== id)
     setList({list:newList})
    })
 }
 
 const HandleChange = (e) => {
    let {value} = e.target;
    console.log(value);
    setListName(value);
  }
  
 const createList = () => {
  const id = params.id
  API.createList(id, ListName)
  .then((res) => {
    const newLists = [...Lists.list]
    newLists.push(res);
    setList({list:newLists, isOpen:false})
  }).then(
    setListName(' ')
  )
 }

 const comeBack = () => {
    navigate('/')
 }

  return (
    <Box backgroundImage="url('https://www.preppywallpapers.com/wp-content/uploads/2020/02/Cute-iPhone-Wallpaper-Collection.jpg')"
         h='100vh'
         bgRepeat="no-repeat"
         backgroundPosition="center"
         backgroundSize="cover"
    >
      <Box m={3}>
      <Button onClick={comeBack} cursor="pointer" >Back</Button>
      </Box>
      {
        !Lists.isLoading?(
          Lists.list.map((list) => {
            return (
                <Box>
                    <Box bg="gray.300" w="300px" m={2} key={list.id} mt={5} p={1} borderRadius={5}>
                    <Box display="flex" justifyContent="space-between">
                    <Heading as="h6" fontSize={28} ml={2}>{list.name}</Heading>
                    <Box color="gray.700" mr={3}>
                   <DeleteIcon cursor='pointer' onClick={() => {deleteHandler(list.id)}}/>
                    </Box> 
                    </Box>
                    <Box>
                    <CardDetails />  
                    </Box>  
                    </Box>
                </Box>
            )
        })
        ):(<Heading as="h1">Loading......</Heading>)
      }
    <Box mt="5rem" ml="2rem">
       <Button bg="gray.200" mt={14} onClick={onOpen}>Create new board</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder='Enter board title' onChange={(e) => HandleChange(e)}></Input>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={createList} >create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Box>
    </Box>
  )
}

export default List
