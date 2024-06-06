import { Button, Input } from "@chakra-ui/react";
import DrawerBuilder from "../../builder/drawer-builder";
import {
  createCategory,
  validateCategoryCreation,
} from "../../functions/category";
import { ChangeEvent, useState } from "react";
import { Category } from "../../interfaces/category-interface";
import { v4 } from "uuid";
import { ToastBuilder } from "../../builder/toast-builder";

export default function CreateCategory() {
  const [category, setCategory] = useState({} as Category);
  const toastBuilder = new ToastBuilder("Creating Category");

  const changeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  function createHandle() {
    category.id = v4();

    toastBuilder.infoToast("Please wait a moment");

    const validationResult = validateCategoryCreation(category);

    if (!validationResult.isValid) {
      toastBuilder.closeAllToast();
      for (const err of validationResult.errors) toastBuilder.failedToast(err);
      return;
    }
    createCategory(category).then((result) => {
      toastBuilder.closeAllToast();
      if (result) toastBuilder.successToast("Success creating new category");
      else toastBuilder.failedToast("Failed creating new category");
    });
  }

  return (
    <div>
      <DrawerBuilder
        size="md"
        title="Tambah Kategori Baru"
        buttonText="Tambah Category"
        buttonClick={createHandle}
      >
        <Input
          placeholder="Nama Kategori"
          name="name"
          onChange={(e) => changeHandle(e)}
        />
      </DrawerBuilder>
    </div>
  );
}
