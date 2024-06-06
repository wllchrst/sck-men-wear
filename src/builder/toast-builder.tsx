import { useToast } from "@chakra-ui/react";

export class ToastBuilder {
  toast: any;
  title: string;
  constructor(title: string) {
    this.toast = useToast();
    this.title = title;
  }
  successToast(description: string) {
    this.toast({
      title: this.title,
      description: description,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-left",
    });
  }

  failedToast(description: string) {
    this.toast({
      title: this.title,
      position: "top-left",
      description: description,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }

  infoToast(desc: string) {
    this.toast({
      title: this.title,
      description: desc,
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top-left",
    });
  }
  warningToast(desc: string) {
    this.toast({
      title: this.title,
      description: desc,
      status: "warning",
      duration: 2000,
      isClosable: true,
      position: "top-left",
    });
  }

  closeAllToast() {
    this.toast.closeAll();
  }

  closeToast() {}
}
