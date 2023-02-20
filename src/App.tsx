import { SidebarWidth } from "@constants";
import { Route, Routes } from "react-router-dom";
import { AppSidebar } from "@components";
import { HelloWorld } from "@pages";
import { useDarkTheme } from "@states";
import { useEffect } from "react";

export default function App() {
  const darkTheme = useDarkTheme((state) => state.dark);

  useEffect(() => {
    console.log(darkTheme);
    document.getElementById("App")?.classList.toggle("dark");
  }, [darkTheme]);

  return (
    <div id='App'>
      <div className='fixed top-0 left-0 h-screen'>
        <AppSidebar />
      </div>

      <div id='main' style={{ marginLeft: `${SidebarWidth.EXPAND}px` }}>
        <Routes>
          <Route path='/' element={<HelloWorld />} />
        </Routes>
      </div>
    </div>
  );
}
