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

import Papa from "papaparse";
import { ICSVRow } from "../../interfaces/csv-interface";
import useUpdateCSV from "../../hooks/use-update-csv";
import UpdateProductCSVHandler from "../../hooks/use-update-csv";

export default function UpdateProductsCSV() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handler = new UpdateProductCSVHandler();
  const { setCsvProducts, update } = handler.useUpdateCSV();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        Papa.parse<ICSVRow>(text, {
          header: true,
          complete: (result) => {
            setCsvProducts(result.data);
          },
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Ubah Produk
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Masukan File </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-row gap-3 items-center justify-center">
              <Input type="file" accept=".csv" onChange={handleFileUpload} />
              <Button onClick={() => update()}>Update</Button>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
