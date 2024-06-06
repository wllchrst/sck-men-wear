import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import useFetchCategories from "../../hooks/use-fetch-categories";
import Loading from "../global/loading";
import filterIcon from "../../assets/filter-icon.png";
import { FilterProduct } from "../../interfaces/filter-products-interface";
import { ChangeEvent, useState } from "react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";

interface I {
  setFilter: React.Dispatch<React.SetStateAction<FilterProduct>>;
  resetFilter: () => void;
}

export default function ProductFilter({ resetFilter, setFilter }: I) {
  const { categories, isLoading } = useFetchCategories();
  const [localFilter, setLocalFilter] = useState({
    categoriesId: "",
    search: "",
  } as FilterProduct);

  function reset() {
    resetFilter();
    localFilter.categoriesId = "";
    localFilter.search = "";
  }

  function buttonHandle() {
    setFilter(localFilter);
  }

  const changeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalFilter({ ...localFilter, [event.target.name]: event.target.value });
  };

  if (isLoading) return <Loading />;
  return (
    <Flex width={""} paddingTop={4}>
      <div className="flex gap-4">
        <Select
          placeholder="Categories"
          name="categoriesId"
          onChange={(e) => changeHandle(e)}
          value={localFilter.categoriesId}
        >
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          value={localFilter.search}
          placeholder="Search"
          type="text"
          name="search"
          onChange={(e) => changeHandle(e)}
        />
        <Tooltip label="Filter Products!">
          <Button padding={1} onClick={() => buttonHandle()}>
            <Image src={filterIcon} width={"25px"} />
          </Button>
        </Tooltip>

        {localFilter.categoriesId != "" || localFilter.search != "" ? (
          <Tooltip label="Reset Filter">
            <Button
              as={Icon}
              colorScheme="red"
              padding={2.5}
              onClick={() => reset()}
            >
              <RepeatIcon />
            </Button>
          </Tooltip>
        ) : null}
      </div>
    </Flex>
  );
}
