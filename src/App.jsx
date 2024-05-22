import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RequireAuth from "./components/RequireAuth";

//Layouts
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

//MainLayout Content
import DashBoard from "./pages/DashBoard";
import Request from "./pages/Request";
import PageNotFound from "./components/PageNotFound";

//Masters
import Access from "./pages/masters/Access";
import Department from "./pages/masters/Department";
import Position from "./pages/masters/Position";
import Personel from "./pages/masters/Personel";
import Branch from "./pages/masters/Branch";

//Products
import Brand from "./pages/products/Brand";
import Items from "./pages/products/Items";
import Tools from "./pages/products/Tools";
import Equipment from "./pages/products/Equipment";

//LoginLayout Content
import Login from "./pages/Login";

//Edit
import EditSingleField from "./pages/edit/EditSingleField";

//Public
import Unauthorized from "./components/Unauthorized";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/request" element={<Request />} />

            {/* Masters */}
            <Route path="/access" element={<Access />} />
            <Route path="/department" element={<Department />} />
            <Route path="/position" element={<Position />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/personel" element={<Personel />} />

            {/* Products */}
            <Route path="/brand" element={<Brand />} />
            <Route path="/items" element={<Items />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/equipment" element={<Equipment />} />

            {/* Edit */}
            <Route path="/edit/:path/:eID" element={<EditSingleField />} />
          </Route>
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
