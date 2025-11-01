import { NavLink } from "react-router-dom";
import { LayoutDashboard, TrendingUp, Calculator, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Charts & Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Transaction Simulator", url: "/simulator", icon: Calculator },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 md:hidden border-t border-border bg-card z-50">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                <span className="text-[10px] font-medium truncate w-full text-center">
                  {item.title.split(" ")[0]}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}
