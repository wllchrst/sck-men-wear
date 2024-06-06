import { PageLink } from "./navbar-interface.d";
export interface PageLink {
  adminAuth: boolean;
  display: string;
  link: string;
}

export interface NavbarLink {
  pageLink: PageLink;
  subLinks: PageLink[];
}
