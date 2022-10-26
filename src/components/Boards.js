import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../API'
import { Box, Heading, Button,Input,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody} from '@chakra-ui/react';

function Boards() {
  const [Board, setBoard] = useState({
    boards:[],
    isOpen: false,
    hasError:false,
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
 
 const handleOpen = () => {
    setBoard({ isOpen: true });
 }
 
 const handClose = () => {
    setBoard({ isOpen: false });
}

const newName = (e) => {
  let {value} = e.target
  console.log(value)
}



console.log(Board)

  return (
    <Box display="flex" flexWrap="wrap">
    {
      Board.boards.map((board) => {
      return (
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
      )
     })
    }

    <Box mt="5rem" ml="2rem">
    <Box bg="gray.200" w="20rem" h="10rem" textAlign="center" onClick={handleOpen}>
        <Button bg="gray.200" mt={14} >Create new board</Button>
    </Box>
    <Modal isOpen={Board.isOpen}>
    <ModalOverlay />
    <ModalContent mt="10rem">
      <ModalHeader>Create a board</ModalHeader>
      <ModalBody>
        <Input placeholder='Enter board title' onChange={e => newName(e)} >
        </Input>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={handClose}>
          Close
        </Button>
        <Button variant='ghost' onClick={createBoard} color="white" bg="blue.300">Create</Button>
      </ModalFooter>
    </ModalContent>
    </Modal>
    </Box>      
    </Box>
  )
}

export default Boards

