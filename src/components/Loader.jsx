import { Loader2 } from "lucide-react";

const Loader = ({ size = 32, className = "" }) => (
  <Loader2
    size={size}
    className={`animate-spin text-primary ${className}`}
  />
);

export default Loader;
