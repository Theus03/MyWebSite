import type { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
}

/** Lista de abas controlada — o painel de cada aba fica por conta de quem usa (renderiza condicionalmente por activeId). */
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
    <div role="tablist" className={`flex flex-wrap gap-1 border-b border-border ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeId}
          onClick={() => onChange(tab.id)}
          className={`rounded-t-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
            tab.id === activeId
              ? "border border-b-0 border-border bg-surface text-text"
              : "text-text-muted hover:text-text"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
