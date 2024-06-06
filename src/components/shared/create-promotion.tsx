import { AddIcon } from "@chakra-ui/icons";
import { Button, Icon, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { getFile, postImage } from "../../services/helper";
import { createPromotion } from "../../functions/promotion";
import { Promotion } from "../../interfaces/promotion-interface";
import { v4 } from "uuid";

export default function CreatePromotion() {
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState("");

  function uploadImage() {
    if (file)
      postImage(file).then((url) => {
        const promotion: Promotion = {
          description: description,
          id: v4(),
          pictureLink: url,
        };
        createPromotion(promotion).then((result) => {
          if (result) console.log("successful");
          else console.log("failed");
        });
      });
  }

  return (
    <div className="p-5 flex flex-col gap-3 w-1/2">
      <Text>Add Promotion</Text>
      <Textarea
        placeholder="Promotion Description"
        rows={4}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Input
        placeholder="Image File"
        type="file"
        className="flex items-center"
        onChange={(e) => {
          getFile(e, setFile);
        }}
      />
      <Button as={Icon} onClick={() => uploadImage()}>
        <AddIcon />
      </Button>
    </div>
  );
}
