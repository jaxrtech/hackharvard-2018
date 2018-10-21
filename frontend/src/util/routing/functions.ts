import { matchPath, match as Match } from 'react-router';
import { RouteSpec } from './types';

export type MatchRouteResult = { indices: number[], route: RouteSpec, match: Match<{}> };
export function matchRoute(path: string, routes: RouteSpec[]): MatchRouteResult | null {

  function f(indices: number[], rs: RouteSpec[]): MatchRouteResult | null {

    for (let i = 0; i < rs.length; i++) {
      const r = rs[i];
      const m = matchPath(path, r);
      if (m) {
        return { indices: [...indices, i], match: m, route: r };
      }

      if (r.routes) {
        const submatch = f([...indices, i], r.routes);
        if (submatch) { return submatch; }
      }
    }

    return null;
  }

  return f([], routes);
}