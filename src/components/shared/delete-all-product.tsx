import { Button } from "@chakra-ui/react";
import { deleteAllProduct } from "../../functions/product";
import { ToastBuilder } from "../../builder/toast-builder";

export default function DeleteAllProduct(){
    const toast = new ToastBuilder("Delete Semua Produk")

    function clickHandle(){
        const confirmation = confirm("Yakin delete semua produk?")
        if(!confirmation) return
        
        toast.infoToast("Mohon tunggu sebentar")
        deleteAllProduct().then((result) => {
            toast.closeAllToast()
            if(result.success) toast.successToast(result.message)
            else toast.failedToast(result.message)
        })
    }
    return <>
        <Button colorScheme="red" onClick={() => clickHandle() }>Delete Semua Produk</Button>
    </>
}