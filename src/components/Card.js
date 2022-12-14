import React,{useState,useEffect} from 'react'
import {Box,Input,Stack,Text,ModalBody,ModalFooter,ModalCloseButton,ModalHeader,Heading,Button,Modal,ModalContent,ModalOverlay, useBoolean} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import {useDisclosure } from '@chakra-ui/react';
import BasicUsage from './BasicUsage';
import * as API from '../API'
import { Progress } from '@chakra-ui/react'
import CheckItems from './CheckItems';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

function Card({deleteHandler, card }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

    const [flag, setFlag] = useState(false)
    const flagState = () => {
      setFlag(true)
      onOpen()
    }

  const [check, setCheck] = useState({
         checklist:[], isLoading:false
  })


  let {id} = card;
  
  useEffect(() => {
    let cardId = id
    API.getChecklist(cardId)
    .then(card => {
       setCheck({checklist : card})
    })
  },[])
 
  const [checkList1, setChecklist1] = useState('')

  const changeHandler = (e) => {
    let {value} = e.target
    setChecklist1(value)
  }
  
  const [flag2,setFlag2] = useState(false)

  const submitChecklist = () => {
      API.createCheckList(id,checkList1)
      .then((res) => {
        const newCheckList = [...check.checklist]
        newCheckList.push(res);
        setCheck({checklist : newCheckList})
        setFlag2(true)
      })
  }

  const deleteCheckListItems = (id) => {
      API.deleteCheckList(id)
      .then(() => {
        const newCheckList = check.checklist.filter((checklist) => checklist.id !== id)
        setCheck({checklist:newCheckList})
      })
  }

  function open(){
    setFlag2(false)
  }

  return (
    <Box>
      <Box>
        <Box bg="white" ml={2} mt={4} mb={4} mr={2} key={card.id} display="flex" justifyContent="space-between" p={2}>
        <Box key={card.id}>
        <Box>
        <Text cursor="pointer" key={card.id} onClick={flagState}>{card.name}</Text>
        </Box>
        </Box>
        <Box><DeleteIcon cursor='pointer'onClick={() => {deleteHandler(card.id)}}/></Box>
        </Box>
      </Box>
      
      {
         flag && <Box>
           <Modal isOpen={isOpen} onClose={onClose}>
           <ModalOverlay />
           <ModalContent>
            <ModalHeader>{card.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box display='flex' justifyContent='flex-end'>
                {/*+++++++++++++++++++++++++++++++++++ */}
              { <Popover>
                      <PopoverTrigger >
                      <label  for="checkme" onClick={open}>   <input type="checkbox" name="checkme" /> Check Me! </label>
                      </PopoverTrigger>
                      { !flag2 && <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader ml={20}>Add checklist</PopoverHeader>
                        <PopoverBody>
                        Title
                          <Input placeholder="checklist" mb={5} onChange={(e) => changeHandler(e)}>
                          </Input><br/>
                          <Button onClick={submitChecklist}>Add</Button>
                        </PopoverBody>
                      </PopoverContent>}
           </Popover>}
           {/* /***************************************************************** */}
             {/* <BasicUsage changeHandler={changeHandler} submitChecklist={submitChecklist} open={open}/> */}
              </Box>
              {
                 check.checklist.length > 0 ? check.checklist.map((checklist) => 
                   {return (
                     <Box>
                      <Box display='flex' justifyContent='space-between' key={checklist.id} mt={4}>
                      <Stack spacing={4}>
                      <Text fontSize='3xl' as='b'>{checklist.name}</Text>
                      </Stack>
                        <Box>
                          <Button colorScheme='red' cursor='pointer' onClick={() => deleteCheckListItems(checklist.id)}>Delete</Button>
                        </Box>
                      </Box>
                       <Box>
                       80%  <Progress mb={4} value={100} />
                        <CheckItems checklistId={checklist.id}/>
                       </Box>
                     </Box>
                     
                   )}
                 ) : (console.log("hello"))
              }
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
           </Modal>
         </Box>
      }
        
    </Box>
    
  )
}

export default Card
