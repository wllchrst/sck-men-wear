import { BrowserRouter } from "react-router-dom";
import { IChildren } from "../../interfaces/children-interface";
import UserContextProvider from "../../context/user-context";

export default function ProviderWrapper({ children }: IChildren) {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </UserContextProvider>
    </>
  );
}
