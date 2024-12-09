export const ROUTES = {
    HOME: "/",
    CHARACTERS: "/characters",
    AUTH: "/auth",
    REGISTER: "/register",
    MAP: "/map",
    MAPS: "/maps",
    PROFILEPAGE: "/profilepage"
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CHARACTERS: "Персонажи",
    AUTH: "Авторизация",
    REGISTER: "Регистрация",
    MAP: "Карта",
    MAPS: "Карты",
    PROFILEPAGE: "Профиль"
  };