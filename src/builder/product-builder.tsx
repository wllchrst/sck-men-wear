import { ICSVRow } from "../interfaces/csv-interface";
import { Product } from "../interfaces/product-interface";

function productBuilder(data: ICSVRow): Product {
    const product: Product = {
        productName: data['PRODJkbdwi']
    }
}
