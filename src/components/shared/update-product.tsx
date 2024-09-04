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
  Input,
} from "@chakra-ui/react";
import { Product } from "../../interfaces/product-interface";
import { useState } from "react";
import FirebaseHelper from "../../services/firebase-helper";
import { productCollection } from "../../settings/firebase-config";
import { getFile, postImage } from "../../services/helper";
import { ToastBuilder } from "../../builder/toast-builder";

interface I {
  product: Product;
}

export default function UpdateProduct({ product }: I) {
  const toast = new ToastBuilder("Ganti Gambar Produk");
  const [file, setFile] = useState<File>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const helper = new FirebaseHelper();

  function clickHandle(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    onOpen();
  }

  function updateHandle() {
    if (file == null) {
      toast.failedToast("Pilih gambar terlebih dahulu");
      return;
    }

    postImage(file).then((link) => {
      product.pictureLink = link;
      helper.update(product.id, product, productCollection).then((result) => {
        if (result) {
          toast.successToast("Ganti gambar sukses");
          onClose();
          return;
        } else {
          toast.failedToast("Ganti gambar gagal");
          onClose();
          return;
        }
      });
    });
  }

  return (
    <div>
      <Button onClick={(event) => clickHandle(event)}>GAMBAR</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ganti Gambar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={(event) => getFile(event, setFile)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => updateHandle()}>
              Ganti
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
