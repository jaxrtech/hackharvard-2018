import { IconName } from '@blueprintjs/core';

export interface RouteActive {
  active?: boolean;
}

export interface RoutePath {
  path: string;
}

export interface RouteText {
  text: string;
}

export interface RouteIcon {
  icon?: IconName;
}

export interface RouteExact {
  exact?: boolean;
}

export interface RouteComponent {
  main: React.SFC | React.ComponentClass;
}

export interface RouteSubRoutes {
  routes?: RouteSpec[];
}

export interface RouteHidden {
  hidden?: boolean;
}

export type RouteSpec
  = RoutePath
  & RouteHidden
  & RouteExact
  & RouteComponent
  & RouteSubRoutes
  & RouteText
  & RouteIcon;

