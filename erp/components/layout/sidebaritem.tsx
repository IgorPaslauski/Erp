"use client";

import {
  ArrowRight,
  BarChart4,
  Building,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Database,
  FileText,
  Folder,
  LayoutDashboard,
  MapPin,
  PackageOpen,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  title: string;
  icon: string; // Alterado para string, já que iconMap usa strings como chaves
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  hasSubmenu?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  level?: number;
}

const iconMap = {
  LayoutDashboard,
  Database,
  Users,
  Building,
  PackageOpen,
  TrendingUp,
  ClipboardCheck,
  BarChart4,
  FileText,
  ShieldCheck,
  Settings,
  MapPin,
  Folder,
};

export default function SidebarItem({
  title,
  icon,
  href,
  isActive,
  isCollapsed,
  hasSubmenu = false,
  isOpen = false,
  onClick,
  children,
  level = 0,
}: SidebarItemProps) {
  const Icon = iconMap[icon] || null;

  // Cores para os níveis (pode personalizar ou usar uma cor fixa)
  const levelColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
  ];
  const barColor = "bg-gray-500";

  return (
    <li className="relative text-sm" title={title}>
      {/* Barrinha indicadora de nível */}
      {!isCollapsed && (
        <span
          className={`absolute left-0 top-0 h-full w-1 rounded-r ${barColor} ${
            isActive ? "opacity-100" : "opacity-50"
          }`}
          style={{ transform: `translateX(${level * 8}px)` }}
        />
      )}

      {hasSubmenu ? (
        <>
          <button
            onClick={onClick}
            className={`w-full flex items-center p-1 rounded-r-lg ${
              isActive
                ? "bg-gray-100 dark:bg-gray-700"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            style={{
              paddingLeft: isCollapsed ? undefined : `${level * 16 + 12}px`, // Ajustado para a barrinha
            }}
          >
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {!isCollapsed && (
              <span className="text-sm font-medium text-left flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </span>
            )}
            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {isOpen && !isCollapsed && (
            <ul className="ml-4 mt-1 space-y-1">{children}</ul>
          )}
        </>
      ) : (
        <Link
          href={href}
          className={`flex items-center p-1 rounded-r-lg ${
            isActive
              ? "bg-gray-100 dark:bg-gray-700"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          style={{
            paddingLeft: isCollapsed ? undefined : `${level * 16 + 12}px`, // Ajustado para a barrinha
          }}
        >
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          {!isCollapsed && (
            <span className="text-sm font-medium text-left flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </span>
          )}
        </Link>
      )}
    </li>
  );
}
