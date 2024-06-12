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
  } from '@chakra-ui/react'

import Papa from 'papaparse'
import { useState } from 'react';

interface CSVRow {
    [key: string]: string;
}
  

export default function UpdateProductsCSV () {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [csvData, setCsvData] = useState<CSVRow[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        Papa.parse<CSVRow>(text, {
          header: true,
          complete: (result) => {
            // setCsvData(result.data);
            console.log(result.data);
          },
        });
      };
      reader.readAsText(file);
    }
  };

    return <>
        <Button onClick={onOpen} colorScheme='teal'>Ubah Produk</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Masukan File </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input type='file' accept='.csv' onChange={handleFileUpload}/>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
  </>
}