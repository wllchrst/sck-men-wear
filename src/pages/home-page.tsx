import {Spacer, Spinner } from "@chakra-ui/react";
import Carousel from "../components/global/carousel";
import useFetchPromotion from "../hooks/use-fetch-promotion";
import KategoriProdukUnggulan from "../components/shared/kategori-produk-unggulan";
import ProdukUnggulan from "../components/shared/produk-unggulan";

export default function Home() {
  const { promotions, isLoading } = useFetchPromotion();

  return (
    <div className="">
      {isLoading ? (
        <div className="p-4">
          <Spinner />
        </div>
      ) : (
        <Carousel slide={promotions} isAdmin={false} />
      )}
      <KategoriProdukUnggulan />
      <Spacer mt={"4rem"} />
      <ProdukUnggulan />
    </div>
  );
}
