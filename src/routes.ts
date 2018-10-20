import { RouteSpec } from './util/routing';

import { HomePage } from './pages/home';
import { RegisterPage } from './pages/register';
import { SearchPage } from './pages/search';

export const routes: RouteSpec[] = [
  {
    path: "/",
    text: "Home",
    exact: true,
    main: HomePage,
    hidden: true,
  },
  {
    path: "/register",
    text: "Register",
    main: RegisterPage,
  },
  {
    path: "/search",
    text: "Search",
    main: SearchPage,
    hidden: true,
  }
  // {
  //   path: "/profiles",
  //   text: "Profiles",
  //   exact: true,
  //   main: ProfileListPage,
  //   routes: [
  //     {
  //       path: "/profiles/create",
  //       text: "Profile",
  //       main: ProfileCreatePage,
  //     },
  //     {
  //       path: "/profiles/:id",
  //       text: "Profile",
  //       main: ProfileDetailsPage
  //     },
  //   ]
  // },
];
