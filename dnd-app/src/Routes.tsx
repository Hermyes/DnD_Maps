export const ROUTES = {
    HOME: "/",
    CHARACTERS: "/Characters",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CHARACTERS: "Персонажи",
  };