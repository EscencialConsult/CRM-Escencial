import { Import, Settings, User, Users } from "lucide-react";
import { CanAccess, useTranslate, useUserMenu } from "ra-core";
import type { ComponentType } from "react";
import { Link } from "react-router";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { ImportPage } from "../misc/ImportPage";

const UserMenuLink = ({
  to,
  Icon,
  label,
}: {
  to: string;
  Icon: ComponentType;
  label: string;
}) => {
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<UserMenuLink> must be used inside <UserMenu>");
  }
  return (
    <DropdownMenuItem asChild onClick={userMenuContext.onClose}>
      <Link to={to} className="flex items-center gap-2">
        <Icon />
        {label}
      </Link>
    </DropdownMenuItem>
  );
};

/** Entries of the user dropdown menu (profile, users, settings, import). */
export const UserMenuItems = () => {
  const translate = useTranslate();
  return (
    <>
      <UserMenuLink
        to="/profile"
        Icon={User}
        label={translate("crm.profile.title")}
      />
      <CanAccess resource="sales" action="list">
        <UserMenuLink
          to="/sales"
          Icon={Users}
          label={translate("resources.sales.name", { smart_count: 2 })}
        />
      </CanAccess>
      <CanAccess resource="configuration" action="edit">
        <UserMenuLink
          to="/settings"
          Icon={Settings}
          label={translate("crm.settings.title")}
        />
      </CanAccess>
      <UserMenuLink
        to={ImportPage.path}
        Icon={Import}
        label={translate("crm.header.import_data")}
      />
    </>
  );
};
