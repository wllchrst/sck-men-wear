import { Category } from "../interfaces/category-interface";
import { NavbarLink, PageLink } from "../interfaces/navbar-interface";
import { SubCategory } from "../interfaces/sub-category-interface";
import FirebaseHelper from "../services/firebase-helper";
import { categoryCollection, subCategoryCollection } from "./firebase-config";

const categoryHelper: FirebaseHelper<Category> = new FirebaseHelper()
const subCategoryHelper: FirebaseHelper<SubCategory> = new FirebaseHelper()

const pages: NavbarLink[] = [
  {
    pageLink: { display: "About Us", link: "/about-us", adminAuth: false },
    subLinks: [],
  },
  {
    pageLink: { display: "Celana", link: "/products", adminAuth: false },
    subLinks: [
      { display: "Celana Dalam", link: "/products", adminAuth: false },
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
    subLinks: [],
  },
];

// const categories: Category[] = await categoryHelper.getAll(categoryCollection)
// const subCategories : SubCategory[] = await subCategoryHelper.getAll(subCategoryCollection)

// const map: { [key:string]: boolean } = {};

// for(const category of categories) {
//   if(map[category.id] != undefined) continue
//   map[category.id] = true
//   const navLink: NavbarLink = {
//     pageLink: {
//       adminAuth: false,
//       display: category.name,
//       link: "#"
//     },
//     subLinks: []
//   }

//   for(const subCategory of subCategories) {
//     if(subCategory.categoryId == category.id) {
//       const pageLink: PageLink = {
//         adminAuth: false,
//         display: subCategory.name,
//         link: "#"
//       }
//       navLink.subLinks.push(pageLink)
//     }
//   }

//   pages.push(navLink)
// }


export {pages}
