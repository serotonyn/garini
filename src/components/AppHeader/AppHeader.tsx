import React, { useState } from "react";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  HeaderMenuButton,
  SideNav,
  HeaderSideNavItems,
  SideNavItems,
} from "carbon-components-react";
import { Notification20, UserAvatar20 } from "@carbon/icons-react";
import { Link } from "react-router-dom";
import { User } from "../../App";

type Path = string;
type Item = string;

const AppHeader = ({
  user,
  hasReceptionistParking,
}: {
  user: User;
  hasReceptionistParking: boolean;
}) => {
  const [isSidebarExpanded, expandSidebar] = useState(false);
  const menuItems = new Map<Path, Item>();
  if (user === User.Receptionist) {
    hasReceptionistParking
      ? menuItems.set("/my-parking", "My Parking")
      : menuItems.set("/create", "Create");
  } else {
    menuItems.set("/explore", "Explore");
  }
  return (
    <HeaderContainer
      render={() => (
        <Header aria-label="Garini">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={() => {
              expandSidebar(!isSidebarExpanded);
            }}
            isActive={isSidebarExpanded}
          />
          {/* @ts-ignore */}
          <HeaderName element={Link} to="/" prefix="🅿">
            Garini
          </HeaderName>

          <HeaderNavigation aria-label="Garini">
            {Array.from(menuItems).map(([path, item]) => (
              // @ts-ignore
              <HeaderMenuItem key={item} element={Link} to={path}>
                {item}
              </HeaderMenuItem>
            ))}
          </HeaderNavigation>

          <SideNav
            aria-label="Side navigation"
            expanded={isSidebarExpanded}
            isPersistent={false}>
            <SideNavItems>
              <HeaderSideNavItems>
                {Array.from(menuItems).map(([path, item]) => (
                  // @ts-ignore
                  <HeaderMenuItem key={item} element={Link} to={path}>
                    {item}
                  </HeaderMenuItem>
                ))}
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>

          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User Avatar">
              <UserAvatar20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};
export default AppHeader;
