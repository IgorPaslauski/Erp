export interface MenuDto {
  id: string;
  title: string;
  icon: string;
  href: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  isOpen?: boolean;
  submenu?: MenuDto[];
  isCollapsed?: boolean;
}
