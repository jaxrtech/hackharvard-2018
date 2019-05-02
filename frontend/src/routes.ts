import { CheckoutPage } from './pages/checkout/checkout';
import { OrderPage } from './pages/orders/index';
import { RouteSpec } from './util/routing';

import { HomePage } from './pages/home';
import { SearchPage } from './pages/search';
import { BusinessPage } from './pages/business';
import { ShoppingCartPage } from './pages/shoppingCart';
import { ExperiencePage} from './pages/experience';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { CheckoutSuccessPage } from './pages/checkout/success';

export const routes: RouteSpec[] = [
  {
    path: "/",
    text: "Home",
    exact: true,
    main: HomePage,
    hidden: true,
  },
  {
    path: "/login",
    text: "Login",
    main: LoginPage,
    hidden: true,
  },
  {
    path: "/register",
    text: "Register",
    main: RegisterPage,
    hidden: true,
  },
  {
    path: "/checkout",
    text: "Checkout",
    main: CheckoutPage,
    hidden: true,
    exact: true
  },
  {
    path: "/checkout/success",
    text: "Checkout Success",
    main: CheckoutSuccessPage,
    hidden: true,
    exact: true
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
