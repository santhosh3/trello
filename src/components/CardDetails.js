import * as API from '../API'
import React, { useEffect, useState} from 'react'
import {Box,Input,Text,ModalBody,ModalFooter,ModalCloseButton,ModalHeader,Heading,Button,Modal,ModalContent,ModalOverlay, useBoolean} from '@chakra-ui/react'
import { DeleteIcon,CloseIcon } from '@chakra-ui/icons'
import {useDisclosure } from '@chakra-ui/react';
import BasicUsage from './BasicUsage';
import Card from './Card';


function CardDetails({listId}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  let [card,setCard] = useState({
       cards : [],
       cardName : ""
  })

  let [cardData, setCardData] = useState('');

  useEffect(() => {
    API.getCard(listId)
    .then(card => {
        setCard({
            cards:card
        });
    }).catch((err) => console.log(err))
  },[])
  
  const deleteHandler = (id) => {
    API.deleteCard(id)
    .then(() => {
      const newCard = card.cards.filter((card) => card.id !== id)
      setCard({cards:newCard}) 
    }).catch((err) => console.log(err))
  }

  const HandleChange = (e) => {
    let {value} = e.target
      setCardData(value)
  }
 
  const createCard = () => {
     API.createCard(listId,cardData)
     .then((res) => {
       console.log(res.name)
       const newCards = [...card.cards];
       newCards.push(res);
       setCard({
        cards:newCards,
       })
       setFlag(false)
     }).then(() => onClose())
  }

  let [flag, setFlag] = useState(false);
  function trigger(){
     setFlag(true);
  }

  function closing(){
    setFlag(false);
  }
  return (
    <Box>
      {       
        card.cards.map((card) => {
             return (
              <Card card={card} deleteHandler={deleteHandler}/>
             )
        })
      
      }  
    {/* <Box >
       <Button bg="gray.200" mt={5} onClick={onOpen}>+ Add a card</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder='Enter board title' onChange={(e) => HandleChange(e)}></Input>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={createCard}>+ Add card</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Box> */}


    <Box>
       {flag && 
       <Box> 
      <Input bg="white" placeholder='Enter card title' padding="2" onChange={(e) => HandleChange(e)} />
      <Button colorScheme='green' mt={4} onClick={createCard}>Add card</Button>
      <Button colorScheme='red' ml={3} mt={4} onClick={closing}>
      <CloseIcon />
      </Button>
      </Box>}
     {!flag && <Button onClick={trigger}>+ Add a card</Button> }
    </Box>
    </Box> 
  )
}

export default CardDetails
