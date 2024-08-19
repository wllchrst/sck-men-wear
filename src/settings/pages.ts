import { NavbarLink } from "../interfaces/navbar-interface";

const pages: NavbarLink[] = [
  {
    pageLink: { display: "About Us", link: "/about-us", adminAuth: false },
    subLinks: [],
  },
  {
    pageLink: { display: "Produk", link: "/products", adminAuth: false },
    subLinks: [],
  },
  {
    pageLink: { display: "Kelola", link: "/products", adminAuth: true },
    subLinks: [
      { display: "Promosi", link: "/manage-promotion", adminAuth: true },
      { display: "Produk", link: "/manage-product", adminAuth: true },
    ],
  },
  {
    pageLink: { display: "Kelola Chat", link: "/manage-chat", adminAuth: true },
    subLinks: [],
  },
];

export { pages };
