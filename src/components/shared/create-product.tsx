import { Checkbox, Input, Select, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { Product } from "../../interfaces/product-interface";
import { getFile, postImage } from "../../services/helper";
import {
  createProduct,
  validateProductCreation,
} from "../../functions/product";
import { v4, validate } from "uuid";
import DrawerBuilder from "../../builder/drawer-builder";
import useFetchCategories from "../../hooks/use-fetch-categories";
import Loading from "../global/loading";
import { ToastBuilder } from "../../builder/toast-builder";

export default function CreateProduct() {
  const [product, setProduct] = useState<Product>({} as Product);
  const [file, setFile] = useState<File>();
  const { categories, isLoading } = useFetchCategories();
  const toastBuilder = new ToastBuilder("Creating Product");

  if (isLoading) return <Loading></Loading>;

  const changeHandle = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    console.log(product);
  };

  function createProductHandle() {
    if (file) {
      toastBuilder.infoToast("Please wait a moment");
      postImage(file).then((url) => {
        product.pictureLink = url;
        product.id = v4();
        product.discount = 0;
        const result = validateProductCreation(product);

        if (!result.isValid) {
          for (const err of result.errors) toastBuilder.failedToast(err);
          return;
        }
        toastBuilder.closeAllToast();
        createProduct(product).then((result) => {
          if (result) toastBuilder.successToast("Successful creating product");
          else toastBuilder.failedToast("Something went wrong");
        });
      });
    }
  }

  return (
    <>
      <DrawerBuilder
        buttonClick={createProductHandle}
        buttonText="Tambah Produk"
        title="Tambah Produk Baru"
        size="md"
      >
        <div className="flex flex-col gap-3">
          <Input
            name="name"
            placeholder="Nama Produk"
            onChange={changeHandle}
          />
          <Textarea
            name="description"
            placeholder="Deskripsi"
            rows={4}
            onChange={changeHandle}
          />
          <Input
            name="price"
            placeholder="Harga"
            type="number"
            onChange={changeHandle}
          />
          <Input
            name=""
            placeholder="Gambar Produk"
            type="file"
            onChange={(e) => getFile(e, setFile)}
          />
          <Input
            name="rating"
            placeholder="Rating"
            type="number"
            onChange={(e) => changeHandle(e)}
          />
          <Select
            placeholder="Pilih Category"
            name="categoryId"
            onChange={(e) => changeHandle(e)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Checkbox defaultChecked>Lagi Promo</Checkbox>
        </div>
      </DrawerBuilder>
    </>
  );
}
