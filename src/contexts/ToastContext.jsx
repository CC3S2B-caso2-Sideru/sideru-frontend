/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo, useRef } from "react";
import Toast from "../components/Toast";

export const ToastContext = createContext();

let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const addToast = useCallback(
    (message, type = "success") => {
      const id = ++_id;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  const toast = useMemo(() => ({
      success: (message) => addToast(message, "success"),
      error: (message) => addToast(message, "error"),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
