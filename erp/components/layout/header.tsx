"use client";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function HeaderLayot() {
  const [notificationCount, setNotificationCount] = useState(3);
  const userName = "João Silva";
  const userRole = "Gestor de Suprimentos";
  return (
    <header className="z-30 w-full border-b border-municipal-border">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex-1"></div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative border-none hover:bg-municipal-background"
              >
                <Bell className="h-5 w-5 text-municipal-muted" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-municipal-accent text-white text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {notificationCount > 0 ? (
                  Array(notificationCount)
                    .fill(0)
                    .map((_, i) => (
                      <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">
                            Nova solicitação de suprimentos
                          </p>
                          <p className="text-xs text-municipal-muted mt-1">
                            Departamento de Saúde
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))
                ) : (
                  <div className="py-4 text-center text-municipal-muted">
                    <p>Nenhuma notificação</p>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-none hover:bg-municipal-background"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-municipal-primary text-white flex items-center justify-center font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-municipal-muted">{userRole}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-municipal-muted" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/home/profile"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/home/settings"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/logout"
                  className="flex items-center gap-2 cursor-pointer text-municipal-accent"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
