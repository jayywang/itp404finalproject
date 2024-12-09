import Header from "../header";
import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}
