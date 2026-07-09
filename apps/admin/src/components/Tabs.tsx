import type { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
  /** Contador opcional (nº de pendências, ideias, etc.) mostrado como badge dentro do pill. */
  badge?: number;
}

/** Lista de abas em formato pill — o painel de cada aba fica por conta de quem usa (renderiza condicionalmente por activeId). */
export function Tabs({
  tabs,
  activeId,
  onChange,
  className = "",
}: {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div role="tablist" className={`flex flex-wrap gap-1.5 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
              isActive ? "bg-accent text-white" : "bg-surface2 text-text-muted hover:bg-border hover:text-text"
            }`}
          >
            {tab.label}
            {typeof tab.badge === "number" && tab.badge > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? "bg-white/25 text-white" : "bg-surface text-text-faint"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
