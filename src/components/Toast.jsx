import { CheckCircle, XCircle, X } from "lucide-react";
import clsx from "clsx";

const configByType = {
  success: {
    icon: CheckCircle,
    className: "border-green-300 bg-green-50 text-green-800",
  },
  error: {
    icon: XCircle,
    className: "border-red-300 bg-red-50 text-red-800",
  },
};

const Toast = ({ toasts, onRemove }) => (
  <div className="pointer-events-none fixed right-4 top-20 z-50 flex flex-col gap-3">
    {toasts.map(({ id, message, type }) => {
      const { icon: Icon, className } = configByType[type] ?? configByType.success;
      return (
        <div
          key={id}
          className={clsx(
            "pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg animate-slide-in-right",
            className
          )}
        >
          <Icon size={20} className="mt-0.5 shrink-0" />
          <p className="flex-1 text-sm font-medium">{message}</p>
          <button
            type="button"
            className="-mr-1 shrink-0 rounded p-1 opacity-60 transition hover:opacity-100"
            onClick={() => onRemove(id)}
          >
            <X size={16} />
          </button>
        </div>
      );
    })}
  </div>
);

export default Toast;
