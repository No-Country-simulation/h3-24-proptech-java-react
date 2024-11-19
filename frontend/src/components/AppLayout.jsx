import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";

function AppLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
