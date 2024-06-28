import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

interface I {
  url: string;
}
export default function TestimoniItem({ url }: I) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Image src={url} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={url} onClick={onOpen} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
