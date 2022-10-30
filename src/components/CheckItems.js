import React, { useEffect, useState } from 'react'
import * as API from '../API'
import {Box,Button,Input} from '@chakra-ui/react'
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
        })
    }

    const deleteCheckListItems1 =(checkListId,checkItemId) => {
        API.deleteCheckItems(checkListId,checkItemId)
        .then((res) => {
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

    const hello = 'hello'
  return (
    <Box>
    
       { 
          checkItems.checkItems1.map((checkItem) => {
            return(
                <Box key={checkItem.id} display='flex'>
                    <Box ml={5} mr={7} fontSize={18}>
                    <input type='checkbox'/> <lable className="strikethrough">{checkItem.name}</lable>
                    </Box>
                    <Box ml={8} onClick={() => deleteCheckListItems1(checklistId,checkItem.id)} cursor="pointer">
                    <DeleteIcon />
                    </Box>
                </Box>
            )
          })
       }
       <Popover placement="bottom" ml="8rem">
         <PopoverTrigger>
            <Button ml={8}>Add an item</Button>
                </PopoverTrigger>
                    <PopoverContent ml="8rem">
                        <PopoverArrow />
                        <PopoverBody><Input placeholder="Add an item..." onChange={(e) => changeHandler(e)} /></PopoverBody>
                        <Box >
                        <PopoverBody><Button ml="5rem" bg="#026AA7" onClick={createCheckItems} color="white">Add</Button></PopoverBody>
                        <PopoverCloseButton mt="4.2rem" mr="5rem" fontSize={18} />
                        </Box>
                </PopoverContent>
        </Popover>
    </Box>
  )
}

export default CheckItems
