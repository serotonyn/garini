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

const AppHeader = () => {
  const [isSidebarExpanded, expandSidebar] = useState(false);
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
            {/* @ts-ignore */}
            <HeaderMenuItem element={Link} to="/explore">
              Explore
            </HeaderMenuItem>
          </HeaderNavigation>

          <SideNav
            aria-label="Side navigation"
            expanded={isSidebarExpanded}
            isPersistent={false}>
            <SideNavItems>
              <HeaderSideNavItems>
                {/* @ts-ignore */}
                <HeaderMenuItem element={Link} to="/explore">
                  Explore
                </HeaderMenuItem>
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
