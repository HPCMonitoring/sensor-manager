import { SidebarWidth } from "@constants";
import { Route, Routes } from "react-router-dom";
import { AppSidebar } from "@components";
import { ClusterDetailPage, ClustersPage, NotificationPage, SettingPage } from "@pages";
import { useClustersStore, useDarkThemeStore } from "@states";
import { useEffect } from "react";

export default function App() {
  const fetchClusters = useClustersStore((state) => state.fetch);
  const loadTheme = useDarkThemeStore((state) => state.loadTheme);
  useEffect(() => {
    loadTheme();
    fetchClusters();
    console.log("Asdasd");
  }, []);

  return (
    <div>
      <div className='fixed top-0 left-0 h-screen'>
        <AppSidebar />
      </div>

      <div className='p-4' style={{ marginLeft: `${SidebarWidth.EXPAND}px` }}>
        <Routes>
          <Route path='/' element={<ClustersPage />} />
          <Route path='/clusters' element={<ClustersPage />} />
          <Route path='/clusters/:clusterId' element={<ClusterDetailPage />} />
          <Route path='/notifications' element={<NotificationPage />} />
          <Route path='/settings' element={<SettingPage />} />
        </Routes>
      </div>
    </div>
  );
}
