"use client";

import Image from "next/image";
import { useState } from "react";

import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconPlus,
  IconSearch,
  IconFolder,
  IconSettings,
  IconUser,
  IconChevronDown
} from "@tabler/icons-react";

type Chat = {
  id: string;
  title: string;
  updatedAt?: Date;
};

interface SidebarProps {
  recentChats: Chat[];
}

export const Sidebar = ({ recentChats }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [recentChatsOpen, setRecentChatsOpen] = useState(true);

  return (
    <aside
      className={`
        relative flex h-screen flex-col
        border-r border-neutral-200
        bg-white
        text-neutral-900
        transition-all duration-200 ease-in-out
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* ================= HEADER ================= */}
      <div
        className={`
          flex h-14 items-center
          ${collapsed ? "justify-center" : "justify-between"}
          px-3
        `}
      >
        {/* Logo */}
        <button
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
            }
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className={`
            relative flex items-center
            rounded-lg
            transition-colors
            ${collapsed ? "h-10 w-10 justify-center" : "gap-2 px-2"}
            hover:bg-neutral-100
          `}
          aria-label={collapsed ? "Expand sidebar" : "AgentX"}
        >
          {/* Collapsed logo */}
          {collapsed ? (
            <>
              {logoHovered ? (
                <IconLayoutSidebarLeftExpand
                  size={21}
                  stroke={1.7}
                />
              ) : (
                <Image
                  src="/icon.png"
                  alt="AgentX"
                  width={28}
                  height={28}
                  priority
                />
              )}

              {/* Tooltip */}
              {logoHovered && (
                <div
                  className="
                    pointer-events-none
                    absolute left-full top-1/2
                    z-50 ml-5
                    -translate-y-1/2
                    whitespace-nowrap
                    rounded-full
                    border border-neutral-200
                    bg-white
                    px-2.5 py-1.5
                    text-xs font-medium
                    text-neutral-700
                    shadow-sm
                  "
                >
                  Open sidebar
                </div>
              )}
            </>
          ) : (
            /* Expanded logo + name */
            <>
              <Image
                src="/icon.png"
                alt="AgentX"
                width={28}
                height={28}
                priority
              />

              <span className="text-sm font-semibold tracking-tight">
                AgentX
              </span>
            </>
          )}
        </button>

        {/* Collapse button */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-neutral-500
              transition-colors
              hover:bg-neutral-100
              hover:text-neutral-900
            "
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <IconLayoutSidebarLeftCollapse
              size={20}
              stroke={1.7}
            />
          </button>
        )}
      </div>

      {/* ================= MAIN NAVIGATION ================= */}
      <div className="px-2">

        {/* New Chat */}
        <SidebarButton
          icon={<IconPlus size={20} stroke={1.8} />}
          label="New chat"
          collapsed={collapsed}
        />

        {/* Search */}
        <SidebarButton
          icon={<IconSearch size={20} stroke={1.8} />}
          label="Search"
          collapsed={collapsed}
        />

        {/* Projects */}
        <SidebarButton
          icon={<IconFolder size={20} stroke={1.8} />}
          label="Projects"
          collapsed={collapsed}
        />
      </div>

      {!collapsed && (
        <div className="mt-6 flex-1 overflow-y-auto px-3">
          
          {/* Recent Header */}
          <button
            onClick={() => setRecentChatsOpen(!recentChatsOpen)}
            className="mb-2 flex w-full items-center justify-start gap-2 text-neutral-400 hover:text-neutral-700"
          >
            <p className="pl-2 text-sm font-medium">
              Recent
            </p>

            <IconChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                recentChatsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Recent Chats */}
          {recentChatsOpen && (
            <div className="space-y-0.5">
              {recentChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  label={chat.title}
                />
              ))}
            </div>
          )}

        </div>
      )}

      {/* ================= BOTTOM ================= */}
      <div className="mt-auto border-t border-neutral-200 p-2">

        {/* Settings */}
        <SidebarButton
          icon={<IconSettings size={20} stroke={1.8} />}
          label="Settings"
          collapsed={collapsed}
        />

        {/* User */}
        <button
          className={`
            flex w-full items-center
            rounded-lg
            text-sm
            transition-colors
            hover:bg-neutral-100
            ${collapsed
              ? "justify-center px-2 py-2"
              : "gap-3 px-3 py-2"
            }
          `}
        >
          <div
            className="
              flex h-7 w-7 shrink-0
              items-center justify-center
              rounded-full
              bg-neutral-100
              text-xs font-medium
              text-neutral-700
              ring-1 ring-neutral-200
            "
          >
            <IconUser className="h-4 w-4" />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium text-neutral-800">
                Kinshuk
              </p>

              <p className="text-xs text-neutral-400">
                Free plan
              </p>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};


/* SIDEBAR BUTTON */

type SidebarButtonProps = {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
};

const SidebarButton = ({
  icon,
  label,
  collapsed,
}: SidebarButtonProps) => {
  return (
    <button
      className={`
        group relative
        flex w-full items-center
        rounded-lg
        text-sm
        text-neutral-600
        transition-colors
        hover:bg-neutral-100
        hover:text-neutral-900
        ${collapsed
          ? "justify-center px-2 py-2.5"
          : "gap-3 px-3 py-2.5"
        }
      `}
    >
      {icon}

      {!collapsed && (
        <span className="font-medium">
          {label}
        </span>
      )}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div
          className="
            pointer-events-none
            absolute left-full top-1/2
            z-50 ml-4
            -translate-y-1/2
            whitespace-nowrap
            rounded-full
            border border-neutral-200
            bg-white
            px-2.5 py-1.5
            text-xs font-medium
            text-neutral-700
            opacity-0
            shadow-sm
            transition-opacity
            group-hover:opacity-100
          "
        >
          {label}
        </div>
      )}
    </button>
  );
};


/* CHAT ITEM */

const ChatItem = ({ label }: { label: string }) => {
  return (
    <button
      className="
        w-full truncate
        rounded-lg
        px-2.5 py-2
        text-left
        text-sm
        text-neutral-600
        transition-colors
        hover:bg-neutral-100
        hover:text-neutral-900
      "
    >
      {label}
    </button>
  );
};