import {
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import DrawerBuilder from "../../builder/drawer-builder";
import { Product } from "../../interfaces/product-interface";
import { ChangeEvent, useState } from "react";
import FirebaseHelper from "../../services/firebase-helper";
import { productCollection } from "../../settings/firebase-config";

interface I {
  product: Product;
}
export default function UpdateProduct({ product }: I) {
  const [productUpdated, setProductUpdated] = useState(product);
  const helper = new FirebaseHelper();

  const changeHandle = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProductUpdated({
      ...productUpdated,
      [event.target.name]: event.target.value,
    });
  };

  function updateHandle() {
    console.log(productUpdated);
    helper
      .update(product.id, productUpdated, productCollection)
      .then((result) => {
        console.log(result);
      });
  }

  return (
    <div>
      <DrawerBuilder
        buttonText="U"
        size="md"
        title="Update Product"
        buttonClick={updateHandle}
      >
        <Card size={"md"}>
          <CardBody>
            <Image
              src={product.pictureLink}
              alt={product.name}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Editable
                defaultValue={product.name}
                fontWeight={"bold"}
                fontSize={"x-large"}
              >
                <EditablePreview />
                <EditableInput name="name" onChange={(e) => changeHandle(e)} />
              </Editable>
              <Editable defaultValue={product.description}>
                <EditablePreview />
                <EditableTextarea
                  name="description"
                  onChange={(e) => changeHandle(e)}
                  rows={4}
                />
              </Editable>
              <Text
                color="blue.600"
                fontSize="2xl"
                className="flex gap-1 items-center"
              >
                Rp.
                <Editable defaultValue={product.price.toString()}>
                  <EditablePreview />
                  <EditableInput
                    type="number"
                    onChange={(e) =>
                      setProductUpdated({
                        ...productUpdated,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </Editable>
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </DrawerBuilder>
    </div>
  );
}
