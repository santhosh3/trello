import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../API'
import { useDisclosure } from '@chakra-ui/react';
import { Box,
         Heading,
         ModalCloseButton, 
         Button,
         Input,
         Modal,
         ModalOverlay,
         ModalContent,
         ModalHeader,
         ModalFooter,
         ModalBody} from '@chakra-ui/react';


function Boards() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [boardName, setBoardName] = useState('');

  const [Board, setBoard] = useState({
    boards:[],
    boardName:'',
    isLoading:true,
  })
 console.log(Board);
  useEffect(() => {
    API.getAllBoards()
    .then(boards => {
      console.log(boards);
      setBoard({
        boards : boards,
        isLoading : false,
        hasError : false
      });
    })
    .catch((err) => console.log(err))
  }, [])
 


const HandleChange = (e) => {
  let {value} = e.target;
  setBoardName(value);
}

const createBoard = () => {
   API.createBoards(boardName)
   .then((res) => {
      const newBoards = [...Board.boards]
      newBoards.push(res);
      setBoard({
        boards: newBoards,
      })
   })
}

  return (

    <Box display="flex" flexWrap="wrap">
    {
    !Board.isLoading?(Board.boards.map((board) => {
      return (
         <Link to = {`/${board.id}`} key={board.id}>
         <Box key={board.id} >
           <Box display="flex" flexWrap="wrap">
           <Box backgroundImage="url('https://cdn.wallpapersafari.com/27/63/K89E4N.jpg')"
                backgroundPosition="center" 
                backgroundSize={300} h="10rem" w="20rem" 
                ml="2rem" mt="5rem" color="white" 
                textAlign="center" 
                border="10px" >
           <Heading as="h1">
           {board.name}
           </Heading>
           </Box>
           </Box>
        </Box>
        </Link>
      )
     })):( <Heading as="h1">Loading......</Heading>)
    }
    <Box mt="5rem" ml="2rem">
    <Box bg="gray.200" w="20rem" h="10rem" textAlign="center">
       <Button bg="gray.200" mt={14} onClick={onOpen}>Create new board</Button>
       </Box>
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
              <Button variant='ghost' onClick={createBoard}>create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Box>
    </Box>
  )
}

export default Boards

