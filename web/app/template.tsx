/**
 * Route transition — a lime blade sweeps across on every top-level
 * navigation, then the page rises in beneath it. Pure CSS, no JS cost.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="mi-route flex min-h-full flex-1 flex-col">
      <span aria-hidden className="mi-route-blade" />
      {children}
    </div>
  );
}
