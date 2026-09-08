import { Sidebar } from "./components/Sidebar";
import { SearchBox } from "./components/SearchBox";

const recentChats = [
  {
    id: "1",
    title: "Build an AI agent",
  },
  {
    id: "2",
    title: "Research competitor APIs",
  },
  {
    id: "3",
    title: "Create landing page",
  },
  {
    id: "4",
    title: "Analyze market data",
  },
  {
    id: "5",
    title: "Build AgentX",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <Sidebar recentChats={recentChats} />

      {/* Main content */}
      <section className="flex min-h-screen flex-1 items-center justify-center px-6">
        <div className="flex w-full max-w-[770px] flex-col items-center">
          {/* Heading */}
          <h1 className="mb-8 text-center text-[24px] font-normal tracking-[-0.02em] text-neutral-900">
            What&apos;s on your mind today?
          </h1>

          {/* Search */}
          <SearchBox />
        </div>
      </section>
    </main>
  );
}