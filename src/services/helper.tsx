import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent } from "react";
import { storage } from "../settings/firebase-config";
import { NavbarLink } from "../interfaces/navbar-interface";
import { User } from "../interfaces/user-interface";
import { Settings } from "../settings/settings";

function getFile(
  event: ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
) {
  if (event.target.files) {
    const currentFile = event.target.files[0];
    setFile(currentFile);
  }
}

function formatPrice(price: number): string {
  try {
    const rupiahStr = price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${rupiahStr}`;
  } catch (error) {
    console.log(error);
    return "";
  }
}

async function postImage(file: File) {
  const imageRef = ref(storage, file.name);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
}

function showingNavbar(page: NavbarLink, user: User | null): boolean {
  if (page.pageLink.adminAuth == false) return true;

  if (user == null) return false;

  return user.userRole == Settings.ADMIN;
}

function changeHandle<T>(
  data: T,
  setData: React.Dispatch<React.SetStateAction<T>>,
  event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
) {
  setData({ ...data, [event.target.name]: event.target.value });
}

export { getFile, postImage, changeHandle, showingNavbar, formatPrice };
