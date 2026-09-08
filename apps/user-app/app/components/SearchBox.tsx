"use client";

import { useState } from "react";
import {
  IconPlus,
  IconPaperclip,
  IconWorld,
  IconFileSearch,
  IconArrowNarrowRight,  
  IconX,
} from "@tabler/icons-react";

type Connector = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
};

const connectors: Connector[] = [
  {
    id: "files",
    name: "Add photos & files",
    description: "Upload from computer",
    icon: IconPaperclip,
  },
  {
    id: "web",
    name: "Web search",
    description: "Find real-time news and info",
    icon: IconWorld,
  },
  {
    id: "research",
    name: "Deep research",
    description: "Get a detailed report",
    icon: IconFileSearch,
  }
];

export function SearchBox() {
  const [showConnectors, setShowConnectors] = useState(false);
  const [selectedConnectors, setSelectedConnectors] = useState<Connector[]>([]);
  const [query, setQuery] = useState("");
  const [think, setThink] = useState(false);

  const toggleConnector = (connector: Connector) => {
    setSelectedConnectors((current) => {
      const exists = current.some((item) => item.id === connector.id);

      if (exists) {
        return current.filter((item) => item.id !== connector.id);
      }

      return [...current, connector];
    });
  };

  const removeConnector = (id: string) => {
    setSelectedConnectors((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="relative w-full max-w-[770px]">
      {/* Search Box */}
      <div
        className={`
          relative overflow-hidden rounded-full
          border border-neutral-200
          bg-white
          shadow-[0_8px_35px_rgba(0,0,0,0.06)]
          transition-all duration-200
          ${showConnectors ? "rounded-b-[12px]" : ""}
        `}
      >
        {/* Selected connectors */}
        {selectedConnectors.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-4">
            {selectedConnectors.map((connector) => {
              const Icon = connector.icon;

              return (
                <div
                  key={connector.id}
                  className="
                    flex items-center gap-2
                    rounded-lg
                    border border-neutral-200
                    bg-neutral-50
                    px-2.5 py-1.5
                    text-sm text-neutral-700
                  "
                >
                  <Icon size={15} stroke={1.8} />

                  <span>{connector.name}</span>

                  <button
                    type="button"
                    onClick={() => removeConnector(connector.id)}
                    className="
                      ml-0.5
                      rounded-full
                      p-0.5
                      text-neutral-400
                      hover:bg-neutral-200
                      hover:text-neutral-700
                    "
                  >
                    <IconX size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Input */}
        <div className="flex min-h-[72px] items-end gap-2 px-4 pb-3 pt-3">
          {/* Plus button */}
          <button
            type="button"
            onClick={() => setShowConnectors((value) => !value)}
            className="
              mb-0.5
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              text-neutral-600
              transition
              hover:bg-neutral-100
              hover:text-neutral-900
            "
            aria-label="Add connector"
          >
            <IconPlus size={22} stroke={1.7} />
          </button>

          {/* Text input */}
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything"
            rows={1}
            className="
              max-h-[180px]
              min-h-[38px]
              flex-1
              resize-none
              border-0
              bg-transparent
              px-1
              py-2
              text-[15px]
              text-neutral-900
              outline-none
              placeholder:text-neutral-400
            "
          />
           
            {/* Send */}
            <button
              type="button"
              disabled={!query.trim() && selectedConnectors.length === 0}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-blue-500
                text-white
                shadow-sm
                transition
                hover:bg-blue-600
                disabled:cursor-not-allowed
                disabled:bg-neutral-200
                disabled:text-neutral-400
              "
              aria-label="Send"
            >
              <IconArrowNarrowRight  className="h-7 w-7" stroke={2} />
            </button>
          
        </div>
      </div>

      {/* Connector Menu */}
      {showConnectors && (
        <div
          className="
            absolute left-0 right-0 top-full z-50
            mt-2
            overflow-hidden
            rounded-[20px]
            border border-neutral-200
            bg-white
            p-2
            shadow-[0_12px_40px_rgba(0,0,0,0.10)]
          "
        >
          {connectors.map((connector) => {
            const Icon = connector.icon;

            const selected = selectedConnectors.some(
              (item) => item.id === connector.id
            );

            return (
              <button
                key={connector.id}
                type="button"
                onClick={() => toggleConnector(connector)}
                className="
                  group
                  flex w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  transition
                  hover:bg-neutral-50
                "
              >
                {/* Icon */}
                <div
                  className={`
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    ${
                      selected
                        ? "bg-blue-50 text-blue-500"
                        : "text-neutral-700"
                    }
                  `}
                >
                  <Icon size={19} stroke={1.7} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-neutral-800">
                    {connector.name}
                  </div>

                  <div className="text-[13px] text-neutral-400">
                    {connector.description}
                  </div>
                </div>

                {/* Selected indicator */}
                {selected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[11px] text-white">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}