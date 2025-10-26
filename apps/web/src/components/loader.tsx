import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-transparent text-white/90">
      <Loader2 className="mb-3 h-8 w-8 animate-spin" />
      <span className="font-medium text-base">Loading...</span>
    </div>
  );
}
