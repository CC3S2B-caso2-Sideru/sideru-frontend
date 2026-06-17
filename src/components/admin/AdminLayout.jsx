import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  FileText,
  PackageCheck,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/cotizaciones", label: "Cotizaciones", icon: FileText },
  { to: "/admin/pedidos", label: "Pedidos", icon: PackageCheck },
  { to: "/admin/productos", label: "Productos", icon: Package },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={clsx(
          "flex shrink-0 flex-col border-r border-gray-200 bg-white transition-[width]",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <div
          className={clsx(
            "flex items-center border-b border-gray-200 px-4 py-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <span className="text-lg font-bold text-primary">Sideru</span>
          )}
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
          {links.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )
              }
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 px-3 py-4">
          <div
            className={clsx(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}
          >
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {user?.username}
                </p>
                <p className="truncate text-xs text-gray-500 capitalize">
                  {user?.rol}
                </p>
              </div>
            )}
            <button
              type="button"
              className={clsx(
                "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600",
                collapsed && "h-10 w-10"
              )}
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
