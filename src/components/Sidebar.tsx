import { Sidebar } from "flowbite-react";
import {
  ArrowRightOnRectangleIcon,
  BellAlertIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/solid";
import { useClustersStore, useDarkThemeStore } from "@states";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/vite.svg";

export function AppSidebar() {
  const darkTheme = useDarkThemeStore((state) => state.dark);
  const toggleDarkTheme = useDarkThemeStore((state) => state.toggle);
  const clusters = useClustersStore((state) => state.clusters);
  const [clusterExpand, setClusterExpand] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("VINH", clusters);
  }, [clusters]);

  return (
    <Sidebar aria-label='Default sidebar example' className='fb-sidebar w-64'>
      <div className='flex flex-col h-full'>
        <div className='flex-none'>
          <Link to={`/clusters`}>
            <Sidebar.Logo href='#' img={Logo} imgAlt='Logo'>
              BKTracker
            </Sidebar.Logo>
          </Link>
        </div>

        <Sidebar.Items className='flex flex-col justify-between h-full'>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              icon={Squares2X2Icon}
              label='Clusters'
              open={clusterExpand}
              onClick={(e) => {
                navigate("/clusters");
                e.preventDefault();
                if ("/clusters" === location.pathname) {
                  setClusterExpand(!clusterExpand);
                }
              }}
            >
              {clusters.map((cluster) => (
                <Link to={`/clusters/${cluster.id}`}>
                  <Sidebar.Item key={cluster.id}>{cluster.name}</Sidebar.Item>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Link to={"/notifications"}>
              <Sidebar.Item icon={BellAlertIcon} label='3'>
                Notifications
              </Sidebar.Item>
            </Link>
            <Link to={"/settings"}>
              <Sidebar.Item icon={WrenchScrewdriverIcon}>Settings</Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>

          <div>
            <Sidebar.ItemGroup onClick={toggleDarkTheme}>
              <Sidebar.Item href='#' icon={darkTheme ? SunIcon : MoonIcon}>
                {"Use " + (darkTheme ? "light" : "dark") + " theme"}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href='#' icon={ArrowRightOnRectangleIcon}>
                Sign out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </div>
        </Sidebar.Items>
      </div>
    </Sidebar>
  );
}
