import { Sidebar } from "flowbite-react";
import {
  ArrowRightOnRectangleIcon,
  BellAlertIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/solid";
import { useDarkTheme } from "@states";

export function AppSidebar() {
  const darkTheme = useDarkTheme((state) => state.dark);
  const toggleDarkTheme = useDarkTheme((state) => state.toggle);

  return (
    <Sidebar aria-label='Default sidebar example' className='fb-sidebar w-64'>
      <div className='flex flex-col h-full'>
        <div className='flex-none'>
          <Sidebar.Logo href='#' img='vite.svg' imgAlt='Logo'>
            BKTracker
          </Sidebar.Logo>
        </div>

        <Sidebar.Items className='flex flex-col justify-between h-full'>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse icon={Squares2X2Icon} label='Clusters'>
              <Sidebar.Item href='#'> BK HPC Laboratory </Sidebar.Item>
              <Sidebar.Item href='#'> UIT Cluster </Sidebar.Item>
              <Sidebar.Item href='#'> TickLab cloud </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href='#' icon={BellAlertIcon} label='3'>
              Notifications
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={WrenchScrewdriverIcon}>
              Setting
            </Sidebar.Item>
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
