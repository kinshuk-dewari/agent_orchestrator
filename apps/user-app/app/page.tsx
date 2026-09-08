import { Sidebar } from "./components/Sidebar";

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
    <div className="mx-auto w-full"> <Sidebar recentChats={recentChats} /> </div>
  );
}
