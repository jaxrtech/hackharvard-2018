import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { matchRoute, RouteActive, RoutePath, RouteText, RouteExact, RouteSpec, RouteIcon } from '../../util/routing';

import './index.css';
import { Navbar, NavbarGroup, Alignment, NavbarHeading, NavbarDivider, Button, Classes } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import { ChatStore } from 'src/stores/app';
import { LoginService } from 'src/services/login';
import { mockImageUrl } from 'src/util/mock';
import { LoginButton } from '../login-button/login-button';

type NavbarLinkProps = RouteActive & RoutePath & RouteText & RouteIcon;
const NavbarLink = ({ active, path, text, icon }: NavbarLinkProps) => {
  return (
    <Link to={path} className='unify-nav-link'>
      <Button active={!!active} className={Classes.MINIMAL} icon={icon} text={text} />
    </Link>
  );
};

type HeaderProps = {
  routes: RouteSpec[];
  chat: ChatStore,
  login: LoginService
};

@inject('chat')
@observer
export class Header extends React.Component<HeaderProps> {
  public render() {
    const { routes, login } = this.props;

    const user = login.user;
    const name = user ? user.name : '';

    const loginDisplay =
      (this.props.login.user)
        ? <><img width={32} height={32} src={mockImageUrl(32, 32, name)} className="avatar" /> {name}</>
        : <LoginButton login={this.props.login} onSuccess={() => null} />;

    const logoutButton = 
      (this.props.login.isLoggedIn)
        ? <Button className={Classes.MINIMAL} icon="log-out" onClick={() => this.props.login.logout()} />
        : <></>;

    return (
      <>
        <Navbar className="bp3-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>
              <img width={32} style={{verticalAlign:"middle", marginRight:"5px"}} src="/favicon-32x32.png" />
              <Link to="/">Grocery2Go</Link></NavbarHeading>
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
            {loginDisplay}
            {logoutButton}
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
