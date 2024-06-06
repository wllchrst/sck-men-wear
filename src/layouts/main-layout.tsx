import Footer from "../components/global/footer";
import Navbar from "../components/global/navbar";
import TopLayer from "../components/global/top-layer";
import UpperNavbar from "../components/global/upper-navbar";
import { IChildren } from "../interfaces/children-interface";

export default function MainLayout({ children }: IChildren) {
  return (
    <div className="">
      <UpperNavbar></UpperNavbar>
      <Navbar></Navbar>
      <div>{children}</div>
      <Footer></Footer>
      <TopLayer />
    </div>
  );
}
