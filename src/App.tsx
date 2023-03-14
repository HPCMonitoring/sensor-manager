import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClustersStore, useDarkThemeStore } from '@states';
import { AppSidebar } from '@components';
import { ClusterDetailPage, ClustersPage, NotificationPage, SettingPage } from '@pages';
import { SidebarWidth } from '@constants';

export default function App() {
  const { loadTheme, dark } = useDarkThemeStore();

  const fetchClusters = useClustersStore((state) => state.fetch);
  useEffect(() => {
    fetchClusters();
  }, [fetchClusters]);
  useEffect(loadTheme, [loadTheme]);

  return (
    <div>
      <ToastContainer theme={dark ? 'dark' : 'light'} pauseOnHover={false} autoClose={2000} />
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
