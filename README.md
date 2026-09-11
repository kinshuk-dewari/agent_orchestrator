# Architecture Diagram
![alt text](image.png)

## Detailed flow
```text
                         ┌──────────────────────────┐
                         │          USER            │
                         └────────────┬─────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                                 FRONTEND                                     │
│                                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │ Landing Page │   │    Login     │   │  Dashboard   │   │ Task / Agent │   │
│  │              │   │ GitHub OAuth │   │  Projects    │   │    View      │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   └──────┬───────┘   │
│                                                                  │ SSE       │
└──────────────────────────────────────────────────────────────────┼───────────┘
                                                                   │
                                                                   ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND                                         │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                           API LAYER                                    │  │
│  │                              FastAPI                                   │  │
│  │                                                                        │  │
│  │  Auth  │  Projects  │  Tasks  │  GitHub  │  Events  │  Artifacts       │  │
│  └────────────────────────────────┬───────────────────────────────────────┘  │
│                                   │                                          │
│                                   ▼                                          │
│                         ┌───────────────────────┐                            │
│                         │     Redis Queue       │                            │
│                         │                       │                            │
│                         │ Queue │ Cache │ PubSub│                            │
│                         └──────────┬────────────┘                            │
│                                    │                                         │
│                                    ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                        AGENT ORCHESTRATOR                              │  │
│  │                                                                        │  │
│  │  Task State │ Planning │ Agent Handoff │ Retry │ Timeout │ Cancellation│  │
│  └───────────────────────────────┬────────────────────────────────────────┘  │
│                                  │                                           │
│                    ┌─────────────┼─────────────┐                             │
│                    │             │             │                             │
│                    ▼             ▼             ▼                             │
│             ┌────────────┐ ┌────────────┐ ┌────────────┐                     │
│             │  PLANNER   │ │ RESEARCHER │ │   CODER    │                     │
│             │   AGENT    │ │   AGENT    │ │   AGENT    │                     │
│             └─────┬──────┘ └─────┬──────┘ └─────┬──────┘                     │
│                   │              │              │                            │
│                   └──────────────┼──────────────┘                            │
│                                  │                                           │
│                                  ▼                                           │
│                         ┌───────────────────┐                                │
│                         │   TOOL REGISTRY   │                                │
│                         │                   │                                │
│                         │ Search            │                                │
│                         │ Filesystem        │                                │
│                         │ Shell             │                                │
│                         │ Git               │                                │
│                         │ GitHub            │                                │
│                         │ Testing           │                                │
│                         └─────────┬─────────┘                                │
│                                   │                                          │
│                                   ▼                                          │
│                         ┌───────────────────┐                                │
│                         │   SANDBOX LAYER   │                                │
│                         │      Docker       │                                │
│                         │                   │                                │
│                         │  Repository       │                                │
│                         │  Code Execution   │                                │
│                         │  Tests            │                                │
│                         │  Terminal         │                                │
│                         │  Resource Limits  │                                │
│                         └─────────┬─────────┘                                │
│                                   │                                          │
│                                   ▼                                          │
│                         ┌───────────────────┐                                │
│                         │     REVIEWER      │                                │
│                         │       AGENT       │                                │
│                         │                   │                                │
│                         │ Diff Review       │                                │
│                         │ Test Verification │                                │
│                         │ Bug Detection     │                                │
│                         └─────────┬─────────┘                                │
│                                   │                                          │
│                          ┌────────┴────────┐                                 │
│                          │                 │                                 │
│                    CHANGES NEEDED       APPROVED                             │
│                          │                 │                                 │
│                          ▼                 ▼                                 │
│                       CODER          ┌───────────────┐                       │
│                          ▲           │ GITHUB LAYER  │                       │
│                          │           │               │                       │
│                          └───────────│ Branch        │                       │
│                                      │ Commit        │                       │
│                                      │ Push          │                       │
│                                      │ Pull Request  │                       │
│                                      └───────┬───────┘                       │
│                                              │                               │
└──────────────────────────────────────────────┼───────────────────────────────┘
                                               │
                         ┌─────────────────────┼─────────────────────┐
                         │                     │                     │
                         ▼                     ▼                     ▼
                 ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
                 │  PostgreSQL  │      │    Redis     │      │    GitHub    │
                 │              │      │              │      │              │
                 │ Users        │      │ Queue        │      │ Repository   │
                 │ Projects     │      │ Cache        │      │ Branch       │
                 │ Tasks        │      │ Pub/Sub      │      │ Commit       │
                 │ Agent Runs   │      │ Events       │      │ Pull Request │
                 │ Tool Calls   │      │              │      │              │
                 │ Artifacts    │      │              │      │              │
                 └──────────────┘      └──────────────┘      └──────────────┘


                         ┌─────────────────────────────┐
                         │       OBSERVABILITY         │
                         │                             │
                         │ Logs │ Metrics │ Traces     │
                         │ Agent Runs │ Tool Calls     │
                         │ Token Usage │ Errors        │
                         └─────────────────────────────┘
                                      ▲
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                       API                     AGENT WORKER
```

## Core Execution Flow

```text
User Task
   │
   ▼
API
   │
   ▼
Redis Queue
   │
   ▼
Agent Orchestrator
   │
   ▼
Planner
   │
   ▼
Researcher
   │
   ▼
Coder
   │
   ▼
Tool Registry
   │
   ▼
Docker Sandbox
   │
   ├──────► Run Code
   ├──────► Run Tests
   └──────► Generate Diff
                │
                ▼
             Reviewer
                │
          ┌─────┴─────┐
          │           │
       Reject       Approve
          │           │
          ▼           ▼
        Coder      GitHub
          │           │
          └─────┐     ▼
                │   Pull Request
                │
                ▼
             Complete
```
## entity relationship diagram
![alt text](image-1.png)