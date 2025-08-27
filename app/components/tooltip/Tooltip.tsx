export function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute start z-10 bottom-full mb-2 px-3 py-1 text-sm text-white bg-gray-900 rounded-lg opacity-0 transition-opacity ease-linear duration-200 group-hover:opacity-100">
      {children}
    </div>
  );
}
