import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Tab = {
  id: string;
  title: string;
  url: string;
  isPinned?: boolean;
  icon: string;
};

const initialTabs: Tab[] = [
  { id: "1", title: "Dashboard", url: "/dashboard", icon: "/icons/dashboard.svg" },
  { id: "2", title: "Banking", url: "/banking", icon: "/icons/banking.svg" },
  { id: "3", title: "Telefonie", url: "/telefonie", icon: "/icons/telefonie.svg" },
  { id: "4", title: "Accounting", url: "/accounting", icon: "/icons/accounting.svg" },
  { id: "5", title: "Verkauf", url: "/verkauf", icon: "/icons/verkauf.svg" },
  { id: "6", title: "Statistik", url: "/statistik", icon: "/icons/statistik.svg" },
  { id: "7", title: "Post Office", url: "/postOffice", icon: "/icons/postoffice.svg" },
  { id: "8", title: "Administration", url: "/administration",icon: "/icons/administration.svg" },
  { id: "9", title: "Help", url: "/help", icon: "/icons/help.svg" },
  { id: "10", title: "Warenbestand", url: "/warenbestand", icon: "/icons/warenbestand.svg" },
  { id: "11", title: "Auswahllisten", url: "/auswahllisten", icon: "/icons/auswahllisten.svg" },
  { id: "12", title: "Einkauf", url: "/einkauf", icon: "/icons/einkauf.svg" },
  { id: "13", title: "Rechn", url: "/rechn", icon: "/icons/rechn.svg" },
];

const LOCAL_STORAGE_KEY = "tab-order";

const Tabs = () => {
  const navigate = useNavigate();
  const sensors = useSensors(useSensor(PointerSensor));

  const storedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialOrder = storedOrder
    ? (JSON.parse(storedOrder) as string[])
    : initialTabs.map((tab) => tab.id);

  const orderedTabs = initialOrder
    .map((id) => initialTabs.find((tab) => tab.id === id))
    .filter((tab): tab is Tab => !!tab);

  const [tabs, setTabs] = useState<Tab[]>(orderedTabs);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");
  const location = useLocation();
  useEffect(() => {
  const currentTab = tabs.find((tab) => tab.url === location.pathname);
  if (currentTab) {
    setActiveTab(currentTab.id);
  } else {

    setActiveTab(tabs[0].id);
    navigate(tabs[0].url, { replace: true });
  }
}, [location.pathname, tabs]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    navigate(tab.url);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over?.id);
      const newTabs = arrayMove(tabs, oldIndex, newIndex);
      setTabs(newTabs);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTabs.map((tab) => tab.id)));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tabs.map((tab) => tab.id)} strategy={verticalListSortingStrategy}>
        <div className="tabs">
          {tabs.map((tab) => (
            <SortableTab key={tab.id} tab={tab} activeTab={activeTab} onClick={handleTabClick} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Tabs;

type SortableTabProps = {
  tab: Tab;
  activeTab: string;
  onClick: (tab: Tab) => void;
};

const SortableTab: React.FC<SortableTabProps> = ({ tab, activeTab, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tab.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 8px",
    borderRadius: "4px",
    background: "#eee",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} className="tab-wrapper">
      {}
      <img
        src={tab.icon}
        alt={`${tab.title} icon`}
        width={18}
        height={18}
        {...listeners}
        {...attributes}
        style={{ cursor: "grab", userSelect: "none" }}
      />

      {}
      <button
        className={`tab ${activeTab === tab.id ? "active" : ""}`}
        onClick={() => onClick(tab)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          padding: 0,
        }}
      >
        {tab.title}
      </button>
    </div>
  );
};

