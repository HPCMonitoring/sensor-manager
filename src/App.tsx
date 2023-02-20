import { SidebarWidth } from "@constants";
import { Route, Routes } from "react-router-dom";
import { AppSidebar } from "@components";
import { HelloWorld } from "@pages";
import { Flowbite } from "flowbite-react";

export default function App() {
  return (
    <Flowbite theme={{ dark: true }}>
      <div className='fixed top-0 left-0 h-screen'>
        <AppSidebar />
      </div>

      <div id='main' style={{ marginLeft: `${SidebarWidth.EXPAND}px` }}>
        <Routes>
          <Route path='/' element={<HelloWorld />} />
        </Routes>
      </div>
    </Flowbite>
  );
}
