import * as API from '../API'
import React, { useEffect, useState } from 'react'
import {Box,Input,Text,ModalBody,ModalFooter,ModalCloseButton,ModalHeader,Heading,Button,Modal,ModalContent,ModalOverlay} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import {useDisclosure } from '@chakra-ui/react';

function CardDetails({listId}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  let [card,setCard] = useState({
       cards : [],
       cardName : ""
  })

  let [Add,setAdd] = useState(true);
  let [cardInput,setCardInput] = useState(true);
  let [cardData, setCardData] = useState('');

  useEffect(() => {
    API.getCard(listId)
    .then(card => {
        console.log(card)
        setCard({
            cards:card
        });
    }).catch((err) => console.log(err))
  })
  
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
       const newCards = [...card.cards];
       newCards.push(res);
       setCard({
        cards:newCards,
        cardName:""
       })
     }).then(() => onClose())
  }

  return (
    <Box>
      {
        card.cards.map((card,index) => {
             return (
              <Box>
                <Box bg="white" ml={2} mt={4} mb={4} mr={2} key={index} display="flex" justifyContent="space-between" p={2}>
                <Box key={index}>
                <Box><Text cursor="pointer">{card.name}</Text></Box>
               </Box>
               <Box><DeleteIcon cursor='pointer'onClick={() => {deleteHandler(card.id)}}/></Box>
               </Box>
              </Box>
             )
        })
      }
    <Box>
    <Box >
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
              <Button variant='ghost' onClick={createCard} >+ Add card</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Box>
    </Box> 
    </Box>
  )
}

export default CardDetails
