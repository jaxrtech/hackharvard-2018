import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { matchRoute, RouteActive, RoutePath, RouteText, RouteExact, RouteSpec, RouteIcon } from '../../util/routing';

import './index.css';
import { Navbar, NavbarGroup, Alignment, NavbarHeading, NavbarDivider, Button, Classes } from '@blueprintjs/core';

type NavbarLinkProps = RouteActive & RoutePath & RouteText & RouteIcon;
const NavbarLink = ({ active, path, text, icon }: NavbarLinkProps) => {
  return (
    <Link to={path} className='unify-nav-link'>
      <Button active={!!active} className={Classes.MINIMAL} icon={icon} text={text} />
    </Link>
  );
};

type HeaderProps = { routes: RouteSpec[]; };
export class Header extends React.Component<HeaderProps> {
  public render() {
    const { routes } = this.props;

    return (
      <>
        <Navbar className="bp3-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading><Link to="/">React Starter Kit</Link></NavbarHeading>
            <NavbarDivider />
            {routes.map((route, index) => (
              (route.hidden)
                ? <></>
                : <RouteNavbarLink
                  index={index}
                  key={index}
                  routes={routes}
                  {...route} />
            ))}
          </NavbarGroup>

          <NavbarGroup align={Alignment.RIGHT}>
            <Button className={Classes.MINIMAL} icon="user" />
            <Button className={Classes.MINIMAL} icon="notifications" />
            <Button className={Classes.MINIMAL} icon="cog" />
          </NavbarGroup>
        </Navbar>
      </>
    );
  }
}

type RouteNavbarLinkProps =
  NavbarLinkProps
  & RouteExact
  & { index: number; routes: RouteSpec[] }
  & RouteComponentProps<any>;

const RouteNavbarLinkInternal = (props: RouteNavbarLinkProps) => {
  const match = matchRoute(props.location.pathname, props.routes);

  let active = false;
  if (match) {
    // Check if the current location is the same route or a subroute of the current tab
    // i.e. the length of the indecies of the current route must be >= current tab indices
    const tabIdx = [props.index];
    const locationIdx = match.indices;

    let n = 0;
    for (let i = 0; i < Math.min(tabIdx.length, locationIdx.length); i++) {
      if (tabIdx[i] === locationIdx[i]) {
        n++;
      } else {
        break;
      }
    }

    active = (n >= tabIdx.length);
  }

  return <NavbarLink {...props} active={active} />;
};

const RouteNavbarLink = withRouter(RouteNavbarLinkInternal);
