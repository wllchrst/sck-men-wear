import { PhoneIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { Settings } from "../../settings/settings";
import { BiLocationPlus } from "react-icons/bi";

export default function UpperNavbar() {
  return (
    <div className="w-full py-1 px-10 bg-blue-200 flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <PhoneIcon />
        <Text>{Settings.NOMOR_TELEPON}</Text>
      </div>
      <div className="flex gap-3 items-center">
        <BiLocationPlus height={"20px"} />
        <Text>{Settings.lokasi_jualan_top_navbar}</Text>
      </div>
    </div>
  );
}
