import { NavbarLink } from "../interfaces/navbar-interface";

export const pages: NavbarLink[] = [
  {
    pageLink: { display: "About Us", link: "/about-us", adminAuth: false },
    subLinks: [],
  },
  {
    pageLink: { display: "Celana", link: "/products", adminAuth: false },
    subLinks: [
      { display: "Celana Dalam", link: "/products", adminAuth: false },
      { display: "Celana Dalam", link: "#", adminAuth: false },
      { display: "Celana Dalam", link: "#", adminAuth: false },
      { display: "Celana Dalam", link: "#", adminAuth: false },
      { display: "Celana Dalam", link: "#", adminAuth: false},
    ],
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
    subLinks: []
  },
];
