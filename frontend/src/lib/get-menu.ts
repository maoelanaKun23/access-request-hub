import { SIDEBAR_MENU, SIDEBAR_MENU_GURU, SIDEBAR_MENU_ORTU } from "@/components/templates/layout/layout-sidebar-data";

export const getMenu = (menuAccessFromAPI: any[]) => {
  function getRoleFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role;
    } catch {
      return null;
    }
  }
  if (!menuAccessFromAPI || menuAccessFromAPI.length === 0) {
    const role = getRoleFromToken();
    if (role === "ADMIN") return SIDEBAR_MENU;
    if (role === "GURU") return SIDEBAR_MENU_GURU;
    if (role === "ORTU") return SIDEBAR_MENU_ORTU;
    return SIDEBAR_MENU;
  }

  const allowedTitles = new Set();

  menuAccessFromAPI.forEach((menu) => {
    allowedTitles.add(menu.title);
    if (menu.items) {
      menu.items.forEach((subItem: any) => {
        allowedTitles.add(subItem.title);
      });
    }
  });

  const filteredNavMain = SIDEBAR_MENU.navMain
    .map((menuItem) => {
      if (menuItem.title === "Dashboard") {
        return menuItem;
      }

      if (!allowedTitles.has(menuItem.title)) {
        return null;
      }

      if (menuItem.items && menuItem.items.length > 0) {
        const filteredSubItems = menuItem.items.filter((subItem) =>
          allowedTitles.has(subItem.title)
        );
        return {
          ...menuItem,
          items: filteredSubItems.length > 0 ? filteredSubItems : undefined,
        };
      }

      return menuItem;
    })
    .filter((item) => item !== null);

  return {
    navMain: filteredNavMain,
    info: SIDEBAR_MENU.info,
  };
};
