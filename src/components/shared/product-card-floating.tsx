import { Badge } from "@chakra-ui/react";
import { Product } from "../../interfaces/product-interface";

interface I {
    product: Product
}
export default function ProductCardFloating({product} : I){
    return <div className="p-2 absolute z-10 ">
        <div className="flex items-center justify-center gap-2">
            {product.onSale && <Badge colorScheme="cyan" variant={'solid'}>Sale</Badge> }
            {product.isNew && <Badge colorScheme="purple" variant={'solid'}>New</Badge> }
            {product.onPromo && <Badge colorScheme="green" variant={'solid'}>Promo</Badge> }
        </div>
    </div>
}