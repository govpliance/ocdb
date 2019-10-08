import * as React from 'react';
import { SimpleAboutModal } from '@app/AppLayout/About'
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';

interface IAppLayout {
  children: React.ReactNode;
}

interface MyRoute {
    label: string;
    to: string;
}
interface RouterGroup {
    label: string;
    routes: MyRoute[];
}

interface NavigationState {
    activeGroup: string;
    activeItem: string;
    links: (MyRoute | RouterGroup)[];
}

const staticNavigation:(MyRoute | RouterGroup)[] = [
    {label: 'Getting Started', to: '/ato/getting_started'},
    {label: 'Documents', routes: [
        {label: 'Overview', to: '/ato/documents'},
        {label: 'Vulnerability Management Plan', to: '/ato/documents/vulnerability-management-plan'},
        {label: 'Training Plan', to: '/ato/documents/security-awareness-and-training-plan'}]},
    {label: 'Products', routes: [
        {label: 'Overview', to: '/ato/products'}]}
];


class Navigation extends React.Component<{}, NavigationState> {
    onSelect(result) {
        this.setState({
            activeGroup: result.groupId,
            activeItem: result.itemId
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            activeGroup: '',
            activeItem: 'itm-1',
            links: staticNavigation
        };
        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        const { activeGroup, activeItem } = this.state;
        return (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    { this.state.links.map((function(l1, i){
                          if ((l1 as any).to !== undefined) {
                              var id = 'itm-' + i;
                              return (
                                  <NavItem to={(l1 as MyRoute).to} itemId={id} isActive={activeItem === id} key={id}>
                                      {l1.label}
                                  </NavItem>
                              );
                          } else {
                              var groupId = 'grp-' + i;
                              return (
                                  <NavExpandable title={l1.label} groupId={groupId} isActive={activeGroup === groupId} key={groupId} isExpanded>
                                      {
                                          (l1 as RouterGroup).routes.map((function(l2, j) {
                                              var id = groupId + '_itm-' + j;
                                              return (
                                                  <NavItem to={l2.to} groupId={groupId} itemId={id} isActive={activeItem === id} key={id}>
                                                      {l2.label}
                                                  </NavItem>
                                              );
                                          }))
                                      }
                                  </NavExpandable>
                              );
                          }
                      }))}
                </NavList>
            </Nav>
        );
    }
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({children}) => {
  const logoProps = {
    href: '/',
    target: '_blank'
  };
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

    const pageToolbar = (
        <Toolbar>
            <ToolbarGroup>
                <ToolbarItem>
                    <SimpleAboutModal/>
                </ToolbarItem>
            </ToolbarGroup>
        </Toolbar>
    );

    const Header = (
        <PageHeader
            logo="Red Hat's ATO PathWays"
            logoProps={logoProps}
            toolbar={pageToolbar}
            showNavToggle={true}
            isNavOpen={isNavOpen}
            onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
        />
    );

  const Sidebar = (
    <PageSidebar
      nav={<Navigation/>}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} theme="dark" />
  );
  const PageSkipToContent = (
    <SkipToContent href="#primary-app-container">
      Skip to Content
    </SkipToContent>
  );
  return (
    <Page
      mainContainerId="primary-app-container"
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
}

export { AppLayout };
