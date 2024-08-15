import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { getFile, postImage } from "../../services/helper";
import { ToastBuilder } from "../../builder/toast-builder";
import { PopularCategory } from "../../interfaces/popular-category-interface";
import { changeImageLink } from "../../functions/popular-category";

interface I {
  popularCategory: PopularCategory;
}

export default function ChangeCategoryProductImage({ popularCategory }: I) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentFile, setCurrentFile] = useState<File>();
  const toast = new ToastBuilder("Updating highlight picture");

  function open(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onOpen();
  }

  function uploadFile(popularCategory: PopularCategory) {
    if (currentFile == undefined) {
      toast.failedToast("Pilih file terlebih dahulu");
      return;
    }

    toast.infoToast("Please wait for the process");
    postImage(currentFile).then((pictureLink) => {
      changeImageLink(pictureLink, popularCategory.id).then((result) => {
        toast.closeAllToast();
        if (result) toast.successToast("Update sukses");
        else
          toast.failedToast("Update gagal, tolong di coba beberapa saat lagi");

        onClose();
      });
    });
  }

  return (
    <>
      <Button onClick={open}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ganti Gambar Highlight</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center items-center gap-2">
              <Input
                type="file"
                onChange={(event) => getFile(event, setCurrentFile)}
              />
              <Button onClick={() => uploadFile(popularCategory)}>Edit</Button>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
