import React, { useEffect, useState } from 'react'
import * as API from '../API'
import {Box,Button,Heading,Input} from '@chakra-ui/react'
import {DeleteIcon} from '@chakra-ui/icons'
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
 

function CheckItems({checklistId}) {

    const [checkItems, setCheckItems] = useState({
        checkItems1 : [], isLoading:false
    })   
   
    console.log(checklistId)
    const Id = checklistId

    useEffect(() => {
        API.getCheckItems(Id)
        .then((checkItems) => {
            setCheckItems({
                checkItems1:checkItems,
            })
        })
    })
  
    let [itemName, setItemName] = useState('');

    const createCheckItems = () => {
        API.createCheckItems(checklistId,itemName)
        .then((response) => {
            const newCheckItems = [...checkItems.checkItems1];
            newCheckItems.push(response);
            setCheckItems({checkItems1:newCheckItems});
            setFlag(false)
        })
    }

    const deleteCheckListItems1 =(checkListId,checkItemId) => {
        API.deleteCheckItems(checkListId,checkItemId)
        .then(() => {
            const newChekItems = this.state.checkItems.filter((checkItem) => {
                return checkItem.id !== checkListId && checkItem.id !== checkItemId;
            })
            this.setState({ checkItems: newChekItems });
        })
    }



    const changeHandler = (e) => {
        let {value} = e.target
        setItemName(value);
    }

    const [flag,setFlag] = useState(false);
    const adding = () => {
        setFlag(true)
    }
    const closeTab = () => {
        setFlag(false)
    }

  return (
    <Box>
    
       { 
          checkItems.checkItems1.map((checkItem) => {
            return(
                <Box key={checkItem.id} display='flex' justifyContent="space-between">
                    <Box ml={5} mr={7} fontSize={18}>
                    <Box mt={3}><input type='checkbox'/> <lable className="strikethrough">{checkItem.name}</lable></Box>
                    </Box>
                    <Box ml={8} onClick={() => deleteCheckListItems1(checklistId,checkItem.id)} cursor="pointer">
                    <DeleteIcon />
                    </Box>
                </Box>
            )
          })
       }
       {/* <Popover placement="bottom" ml="8rem">
         <PopoverTrigger>
            <Button ml={8}>Add an item</Button>
                </PopoverTrigger>
                    <PopoverContent ml="8rem">
                        <PopoverArrow />
                        <PopoverBody><Input placeholder="Add an item..." onChange={(e) => changeHandler(e)} /></PopoverBody>
                        <Box >
                        <PopoverBody><Button bg="#026AA7" onClick={createCheckItems} color="white">Add</Button></PopoverBody>
                        <PopoverCloseButton mt="4rem" mr="1rem" fontSize={18} />
                        </Box>
                </PopoverContent>
        </Popover> */}
        {flag &&
            <Box>
                
                <Input placeholder="Add an item..." padding={10} m={2} fontSize={30} onChange={(e) => changeHandler(e)}/>
                <Button colorScheme='blue'm={2} onClick={createCheckItems}>Add</Button>
                <Button m={2} onClick={closeTab}>cancel</Button>
            </Box>
        }
        {!flag && <Button colorScheme='yellow' mt={3} onClick={adding}>Add an item</Button>}
    </Box>
  )
}

export default CheckItems
