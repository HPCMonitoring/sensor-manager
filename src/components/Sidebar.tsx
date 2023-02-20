import { Sidebar } from "flowbite-react";
import {
  ArrowLeftOnRectangleIcon,
  ChartPieIcon,
  InboxIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserIcon,
  UserPlusIcon
} from "@heroicons/react/24/solid";

export function AppSidebar() {
  return (
    <Sidebar aria-label='Default sidebar example'>
      <Sidebar.Logo href='#' img='vite.svg' imgAlt='Logo'>
        BKTracker
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href='#' icon={ChartPieIcon}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={Squares2X2Icon} label='Pro' labelColor='alternative'>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={InboxIcon} label='3'>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={UserIcon}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={ShoppingBagIcon}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={ArrowLeftOnRectangleIcon}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={UserPlusIcon}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
