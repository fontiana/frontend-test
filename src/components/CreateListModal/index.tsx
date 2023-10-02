import { useExchangeInfo } from '@/context/useExchangeInfo'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon,
  Text,
  FormControl,
  Input,
  FormLabel,
  useToast,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export function CreateListModal() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { createNewList, lists } = useExchangeInfo()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const verifyIfListAlreadyExists = (listName: string) => {
    const findedListIndex = lists.findIndex(
      (li) => li.name.toLowerCase() === listName.toLowerCase(),
    )
    if (findedListIndex === -1) return false
    return true
  }

  const handleCreateNewList = () => {
    if (!inputRef.current || inputRef.current.value.length <= 0) {
      toast({
        title: 'An error occur while creating new list',
        description: 'Please, enter a name for the new list',
        duration: 5000,
        status: 'error',
        isClosable: true,
      })
      return
    }
    const listAlreadyExists = verifyIfListAlreadyExists(inputRef.current?.value)
    if (listAlreadyExists) {
      toast({
        title: 'An error occur while creating new list',
        description:
          'A list with the provided name already exist. Please, choose another name.',
        duration: 5000,
        status: 'error',
        isClosable: true,
      })
      return
    }

    if (!listAlreadyExists) {
      createNewList(inputRef.current?.value || '')
      toast({
        title: 'New list created successfully',
        description:
          'Your new list has been created and is ready to receive new coins.',
        duration: 5000,
        status: 'success',
        isClosable: true,
      })
      onClose()
    }
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        <Icon as={AiOutlinePlusCircle} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new list</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Create a new list to group currencies that interest you. Just
              enter a name and, when confirmed, add new currencies.
            </Text>

            <FormControl mt="32px">
              <FormLabel>Choose a name for the new list</FormLabel>
              <Input ref={inputRef} placeholder="List for engaged coins" />
            </FormControl>
          </ModalBody>

          <ModalFooter mt="16px">
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleCreateNewList}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
