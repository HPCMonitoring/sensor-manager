import { SidebarWidth } from "@constants";
import { Route, Routes } from "react-router-dom";
import { AppSidebar } from "@components";
import { HelloWorld } from "@pages";
import { Flowbite } from "flowbite-react";
import { useDarkTheme } from "@states";
import { useCallback } from "react";

export default function App() {
  const darkTheme = useDarkTheme((state) => state.dark);

  const DarkThemeRenderer = useCallback(() => {
    return <Flowbite theme={{ dark: darkTheme }}>{null}</Flowbite>;
  }, [darkTheme]);

  return (
    <div>
      <DarkThemeRenderer />

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
