"use client";

import { useEffect, useRef, useState } from "react";
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
  icon: React.ComponentType<{
    size?: number;
    stroke?: number;
    className?: string;
  }>;
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
  },
];

export function SearchBox() {
  const [showConnectors, setShowConnectors] = useState(false);
  const [selectedConnectors, setSelectedConnectors] = useState<Connector[]>(
    []
  );
  const [query, setQuery] = useState("");

  /*   Reference to the entire search component   */
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /*   Close connector menu when clicking outside   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowConnectors(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*    Select / deselect connector   */
  const toggleConnector = (connector: Connector) => {
    setSelectedConnectors((current) => {
      const exists = current.some((item) => item.id === connector.id);

      if (exists) {
        return current.filter((item) => item.id !== connector.id);
      }

      return [...current, connector];
    });
  };

  /*    Remove connector   */
  const removeConnector = (id: string) => {
    setSelectedConnectors((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  /*    Automatically grow textarea   */
  const handleQueryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;

    setQuery(value);

    const textarea = event.target;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  /*   Submit   */
  const handleSubmit = () => {
    if (!query.trim() && selectedConnectors.length === 0) {
      return;
    }

    console.log({
      query,
      connectors: selectedConnectors.map((connector) => connector.id),
    });
  };

  const hasContent =
    query.trim().length > 0 || selectedConnectors.length > 0;

  /*  Change shape depending on connector state  */
  const composerRadius =
    selectedConnectors.length > 0
      ? "rounded-[24px]"
      : showConnectors
        ? "rounded-[24px] rounded-b-[12px]"
        : "rounded-full";

  return (
 
    <div
      ref={searchBoxRef}
      className="relative w-full max-w-[770px]"
    >
      {/*  SEARCH COMPOSER */}

      <div
        className={`
          relative overflow-hidden
          border border-neutral-200
          bg-white
          shadow-[0_8px_35px_rgba(0,0,0,0.06)]
          transition-all duration-200
          ${composerRadius}
        `}
      >
        {/*  SELECTED CONNECTORS */}

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
                    px-3 py-1.5
                    text-[13px]
                    text-neutral-700
                  "
                >
                  <Icon
                    size={15}
                    stroke={1.8}
                    className="text-neutral-600"
                  />

                  <span className="whitespace-nowrap">
                    {connector.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeConnector(connector.id)}
                    className="
                      ml-0.5
                      flex h-4 w-4
                      items-center justify-center
                      rounded-full
                      text-neutral-400
                      transition
                      hover:bg-neutral-200
                      hover:text-neutral-700
                    "
                    aria-label={`Remove ${connector.name}`}
                  >
                    <IconX size={12} stroke={2} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/*  INPUT ROW */}

        <div className="flex min-h-[72px] items-end gap-2 px-4 pb-3 pt-3">
          {/* Plus button */}

          <button
            type="button"
            onClick={() => setShowConnectors((value) => !value)}
            className="
              mb-0.5
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              text-neutral-600
              transition
              hover:bg-neutral-100
              hover:text-neutral-900
            "
            aria-label="Add connector"
            aria-expanded={showConnectors}
          >
            <IconPlus size={22} stroke={1.7} />
          </button>

          {/* Textarea */}

          <textarea
            ref={textareaRef}
            value={query}
            onChange={handleQueryChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask what you want..."
            rows={1}
            className="
              max-h-[180px]
              min-h-[38px]
              flex-1
              resize-none
              overflow-y-auto
              border-0
              bg-transparent
              px-1
              py-2
              text-[15px]
              leading-6
              text-neutral-900
              outline-none
              placeholder:text-neutral-400
            "
          />

          {/* Send button */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasContent}
            className="
              mb-0.5
              flex h-9 w-9
              shrink-0
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
            <IconArrowNarrowRight
              size={21}
              stroke={2}
            />
          </button>
        </div>
      </div>

      {/*  CONNECTOR MENU */}

      {showConnectors && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
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
                    flex h-8 w-8
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    transition
                    ${
                      selected
                        ? "bg-blue-50 text-blue-500"
                        : "bg-neutral-50 text-neutral-700"
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
                  <div
                    className="
                      flex h-5 w-5
                      shrink-0
                      items-center justify-center
                      rounded-full
                      bg-blue-500
                      text-[11px]
                      font-medium
                      text-white
                    "
                  >
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