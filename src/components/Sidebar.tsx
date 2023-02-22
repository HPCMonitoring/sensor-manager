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
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/vite.svg";

export function AppSidebar() {
  const darkTheme = useDarkThemeStore((state) => state.dark);
  const toggleDarkTheme = useDarkThemeStore((state) => state.toggleTheme);
  const clusters = useClustersStore((state) => state.clusters);
  const [clusterExpand, setClusterExpand] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar aria-label='Default sidebar example' className='fb-sidebar w-64'>
      <div className='flex flex-col h-full'>
        <div className='flex-none'>
          <Sidebar.Logo
            href='#'
            img={Logo}
            imgAlt='Logo'
            onClick={(e) => {
              e.preventDefault();
              navigate("/clusters");
            }}
          >
            BKTracker
          </Sidebar.Logo>
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
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/clusters/${cluster.id}`);
                  }}
                  key={cluster.id}
                >
                  <Sidebar.Item>{cluster.name}</Sidebar.Item>
                </div>
              ))}
            </Sidebar.Collapse>

            <div
              onClick={(e) => {
                e.preventDefault();
                navigate(`/notifications`);
              }}
            >
              <Sidebar.Item icon={BellAlertIcon} label='3'>
                Notifications
              </Sidebar.Item>
            </div>

            <div
              onClick={(e) => {
                e.preventDefault();
                navigate(`/settings`);
              }}
            >
              <Sidebar.Item icon={WrenchScrewdriverIcon}>Settings</Sidebar.Item>
            </div>
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
