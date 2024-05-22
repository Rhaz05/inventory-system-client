import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="relative flex-1 flex-col w-full overflow-auto">
          <TopBar />
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
