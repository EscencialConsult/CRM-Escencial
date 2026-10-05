import {
  Building2,
  Handshake,
  LayoutDashboard,
  ListTodo,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslate } from "ra-core";
import { Link, matchPath, useLocation } from "react-router";
import { RefreshButton } from "@/components/admin/refresh-button";
import { ThemeModeToggle } from "@/components/admin/theme-mode-toggle";
import { UserMenu } from "@/components/admin/user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { useConfigurationContext } from "../root/ConfigurationContext";
import { useOverdueTasksCount } from "../tasks/useOverdueTasksCount";
import { UserMenuItems } from "./UserMenuItems";

interface NavItem {
  to: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
  badge?: number;
}

export const AppSidebar = () => {
  const { darkModeLogo, lightModeLogo, title } = useConfigurationContext();
  const { pathname } = useLocation();
  const translate = useTranslate();
  const overdueTasks = useOverdueTasksCount();

  const { toggleSidebar } = useSidebar();

  const logo = (
    <>
      <img
        className="[.light_&]:hidden h-8 shrink-0"
        src={darkModeLogo}
        alt={title}
      />
      <img
        className="[.dark_&]:hidden h-8 shrink-0"
        src={lightModeLogo}
        alt={title}
      />
    </>
  );

  const isIn = (path: string) => !!matchPath(`${path}/*`, pathname);

  const items: NavItem[] = [
    {
      to: "/",
      label: translate("ra.page.dashboard"),
      Icon: LayoutDashboard,
      isActive: pathname === "/",
    },
    {
      to: "/contacts",
      label: translate("resources.contacts.name", { smart_count: 2 }),
      Icon: Users,
      isActive: isIn("/contacts"),
    },
    {
      to: "/companies",
      label: translate("resources.companies.name", { smart_count: 2 }),
      Icon: Building2,
      isActive: isIn("/companies"),
    },
    {
      to: "/deals",
      label: translate("resources.deals.name", { smart_count: 2 }),
      Icon: Handshake,
      isActive: isIn("/deals"),
    },
    {
      to: "/tasks",
      label: translate("resources.tasks.name", { smart_count: 2 }),
      Icon: ListTodo,
      isActive: isIn("/tasks"),
      badge: overdueTasks,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between px-4 py-5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 no-underline text-sidebar-foreground group-data-[collapsible=icon]:hidden"
        >
          {logo}
          <span className="text-xl font-semibold truncate">{title}</span>
        </Link>
        <SidebarTrigger
          className="size-9 shrink-0 text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden"
          aria-label={translate("crm.sidebar.toggle")}
          title={translate("crm.sidebar.toggle")}
        />
        {/* Collapsed: the logo itself expands the sidebar */}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={translate("crm.sidebar.toggle")}
          title={translate("crm.sidebar.toggle")}
          className="hidden size-11 cursor-pointer items-center justify-center rounded-md hover:bg-sidebar-accent group-data-[collapsible=icon]:flex"
        >
          {logo}
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-3 py-2 group-data-[collapsible=icon]:px-2">
          <SidebarGroupContent>
            <SidebarMenu
              className="gap-2"
              aria-label={translate("crm.navigation.label")}
            >
              {items.map(({ to, label, Icon, isActive, badge }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={label}
                    className="h-12 gap-3 px-3 text-base font-medium relative [&>svg]:size-5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>svg]:size-6"
                  >
                    <Link to={to}>
                      <Icon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {label}
                      </span>
                      {!!badge && (
                        <span
                          aria-hidden
                          className="absolute right-2 top-2 hidden size-2.5 rounded-full bg-destructive ring-2 ring-sidebar group-data-[collapsible=icon]:block"
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {!!badge && (
                    <SidebarMenuBadge className="bg-destructive text-destructive-foreground rounded-full">
                      {badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center justify-between gap-1 group-data-[collapsible=icon]:flex-col-reverse group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-2 group-data-[collapsible=icon]:border-t group-data-[collapsible=icon]:pt-3 group-data-[collapsible=icon]:[&_button]:size-12 group-data-[collapsible=icon]:[&_button]:rounded-xl group-data-[collapsible=icon]:[&_svg]:size-5">
          <UserMenu>
            <UserMenuItems />
          </UserMenu>
          <div className="flex items-center group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
            <ThemeModeToggle />
            <RefreshButton />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
