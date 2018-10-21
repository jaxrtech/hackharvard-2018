import { OrderPage } from './pages/orders/index';
import { RouteSpec } from './util/routing';

import { HomePage } from './pages/home';
import { RegisterPage } from './pages/register';
import { SearchPage } from './pages/search';
import { BusinessPage } from './pages/business';
import { ShoppingCartPage } from './pages/shoppingCart';
import { ExperiencePage} from './pages/experience';

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
  },
  {
    path: "/business",
    text: "Business",
    main: BusinessPage,
  },
  {
    path: "/orders",
    text: "Orders",
    main: OrderPage
  },
  {
    path: "/shoppingCart",
    text: "Shopping Cart",
    main: ShoppingCartPage
  },
  {
    path: "/experience",
    text: "Experience",
    main: ExperiencePage
  },
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
