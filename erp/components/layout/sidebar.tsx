import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Building, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebaritem";
import { MenuDto } from "@/lib/entities/menuDto";
interface AppSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function AppSidebar({ isCollapsed = false, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSubmenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isMenuOpen = (menu: string) => !!openMenus[menu];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/menu.json"); // Ajuste o caminho conforme sua estrutura
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderMenuItems = (items: MenuDto[], parentPath = "", level = 0) =>
    items.map((item, index) => {
      const currentPath = `${parentPath}/${item.title.toLowerCase()}-${index}`;
      const fullHref = !parentPath
        ? item.href
        : `${parentPath}${item.href}`;

      return (
        <SidebarItem
          key={currentPath}
          title={item.title}
          icon={item.icon}
          href={fullHref}
          isActive={
            item.hasSubmenu
              ? pathname.startsWith(
                  fullHref === "#" ? `/${item.title.toLowerCase()}` : fullHref
                )
              : pathname === fullHref
          }
          isCollapsed={isCollapsed}
          hasSubmenu={item.hasSubmenu}
          isOpen={item.hasSubmenu && isMenuOpen(currentPath)}
          onClick={
            item.hasSubmenu ? () => toggleSubmenu(currentPath) : undefined
          }
          level={level}
        >
          {item.submenu && renderMenuItems(item.submenu, fullHref, level + 1)}
        </SidebarItem>
      );
    });

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-sidebar border-r border-sidebar-border",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center px-4 border-b border-sidebar-border",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-white" />
            <span className="font-bold text-white">PREFEITURA</span>
          </Link>
        )}
        {isCollapsed && <Building className="h-6 w-6 text-white" />}
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-auto p-3">
        <ul className="space-y-1">{renderMenuItems(menuItems)}</ul>
      </nav>

      <div className="p-3 mt-auto">
        <Button
          variant="outline"
          className="w-full bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border hover:bg-sidebar-accent/80"
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              <span>Recolher menu</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
