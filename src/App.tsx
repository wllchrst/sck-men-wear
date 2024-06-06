import MainLayout from "./layouts/main-layout";
import Home from "./pages/home-page";

import { Route, Routes } from "react-router-dom";
import Products from "./pages/product-page";
import Promotion from "./admin/promotion-page";
import ManageProduct from "./admin/manage-product-page";
import AboutUs from "./pages/about-us";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
import ProviderWrapper from "./components/shared/provider-wrapper";
import PageLayout from "./layouts/page-layout";
import AdminMiddleware from "./middleware/admin-middleware";
import ManageChat from "./admin/manage-chat-page";

// 1. tambahin link tree buat contact langsung ✅
// 2. location nya. ✅
// 3. why choose us
// 4. Testimoni
// 5. bikin jadi bahasa indonesia semuanya✅
// 6. gambar untuk contacts ✅
// 7. excel buat nambahin data-data product (rating, category, price, description)
// 8. Kecilin bagian category di home pas lagi di mobile ✅
// 9. Tambahin list customer service
// 10. Kasih logo new, sale, promo etc
// 11. Chat with us
// 12. Authentication and Authorization

export default function App() {
  return (
    <ProviderWrapper>
      <PageLayout>
        <Routes>
          {/* No need middleware */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Pages with Middleware */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/about-us"
            element={
              <MainLayout>
                <AboutUs />
              </MainLayout>
            }
          />
          {/* Admin Pages with Middleware */}

          <Route
            path="/manage-promotion"
            element={
              <MainLayout>
                <AdminMiddleware>
                  <Promotion />
                </AdminMiddleware>
              </MainLayout>
            }
          />
          <Route
            path="/manage-product"
            element={
              <MainLayout>
                <AdminMiddleware>
                  <ManageProduct />
                </AdminMiddleware>
              </MainLayout>
            }
          />
          <Route
            path="/manage-chat"
            element={
              <MainLayout>
                <AdminMiddleware>
                  <ManageChat />
                </AdminMiddleware>
              </MainLayout>
            }
          />
        </Routes>
      </PageLayout>
    </ProviderWrapper>
  );
}
