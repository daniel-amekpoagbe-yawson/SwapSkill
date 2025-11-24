import { Outlet } from "react-router-dom";
import { Navbar } from "../custom/NavBar";
import Footer from "../custom/Footer";

function AppLayOut() {
  return (
    <div className="min-h-screen flex flex-col bg-[#101822] text-white">
      <Navbar />
      <main className="flex grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayOut;
