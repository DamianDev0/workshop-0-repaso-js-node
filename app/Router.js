import { NavBarLayout } from "./components/navbar";
import { routes } from "./routes";

export function Router() {
  const path = window.location.pathname;
  const publicRoute = routes.public.find((route) => route.path === path);

  if (publicRoute) {
    const { $content, logic } = publicRoute.page();
    NavBarLayout($content, logic);
  }
}

export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}

// Listen to popstate events for browser navigation
window.addEventListener('popstate', Router);
