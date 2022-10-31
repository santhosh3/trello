import React, { useState } from "react";
import { useBoolean, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  Box,
  Input,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import * as API from "../API";
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
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function BasicUsage({ changeHandler, submitChecklist ,flag2,open}) {
  

  return (
    
    <Popover>
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
</Popover>

  );
}

export default BasicUsage;
