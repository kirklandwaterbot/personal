"use client";

import type {
  ComponentType,
  FormEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Code2,
  Contact,
  ExternalLink,
  FileText,
  FolderKanban,
  Grid2X2,
  LaptopMinimal,
  Mail,
  MapPin,
  Maximize2,
  Minus,
  Power,
  Search,
  Phone,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wifi,
  X,
} from "lucide-react";
import type { PortfolioData } from "@/data/portfolio";

type AppId = "about" | "projects" | "resume" | "skills" | "contact" | "terminal";

export type OsAppDefinition = {
  id: AppId;
  title: string;
  icon: ComponentType<{ className?: string }>;
  defaultSize: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
};

type WindowState = OsAppDefinition["defaultSize"] & {
  open: boolean;
  minimized: boolean;
  z: number;
};

type DragState = {
  appId: AppId;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
} | null;

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  appId: AppId;
  icon: ComponentType<{ className?: string }>;
};

const BOOT_KEY = "revos-boot-complete";

const APPS: OsAppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    icon: CircleUserRound,
    defaultSize: { width: 620, height: 440, x: 88, y: 74 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderKanban,
    defaultSize: { width: 760, height: 520, x: 184, y: 112 },
  },
  {
    id: "resume",
    title: "Resume",
    icon: FileText,
    defaultSize: { width: 640, height: 480, x: 260, y: 96 },
  },
  {
    id: "skills",
    title: "Skills",
    icon: Code2,
    defaultSize: { width: 620, height: 430, x: 132, y: 160 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: Contact,
    defaultSize: { width: 560, height: 380, x: 340, y: 170 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: Terminal,
    defaultSize: { width: 680, height: 420, x: 220, y: 220 },
  },
];

function createInitialWindows(): Record<AppId, WindowState> {
  return APPS.reduce(
    (acc, app, index) => {
      acc[app.id] = {
        ...app.defaultSize,
        open: app.id === "about",
        minimized: false,
        z: index + 1,
      };
      return acc;
    },
    {} as Record<AppId, WindowState>,
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatLongDate(date: Date) {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function PortfolioDesktop({ data }: { data: PortfolioData }) {
  const [phase, setPhase] = useState<"boot" | "lock" | "desktop" | "shutdown" | "blackout">(
    "boot",
  );
  const [bootProgress, setBootProgress] = useState(0);
  const [loggingIn, setLoggingIn] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [startMenuClosing, setStartMenuClosing] = useState(false);
  const [closingWindows, setClosingWindows] = useState<Set<AppId>>(() => new Set());
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(createInitialWindows);
  const [, setZCounter] = useState(APPS.length + 1);
  const [now, setNow] = useState(() => new Date());
  const dragRef = useRef<DragState>(null);
  const startMenuCloseTimerRef = useRef<number | null>(null);
  const windowCloseTimersRef = useRef<Partial<Record<AppId, number>>>({});

  const visibleWindows = useMemo(
    () =>
      APPS.filter((app) => windows[app.id].open && !windows[app.id].minimized).sort(
        (a, b) => windows[a.id].z - windows[b.id].z,
      ),
    [windows],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    const alreadyBooted = window.localStorage.getItem(BOOT_KEY) === "true";
    let frame = 0;

    if (alreadyBooted) {
      frame = window.requestAnimationFrame(() => {
        setBootProgress(100);
        setPhase("desktop");
      });
    }

    return () => {
      window.clearInterval(timer);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "boot") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        setBootProgress(100);
        setPhase("lock");
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const timer = window.setInterval(() => {
      setBootProgress((current) => {
        const next = Math.min(current + 8, 100);
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase("lock"), 260);
        }
        return next;
      });
    }, 55);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "shutdown") {
      return;
    }

    const clearBootFlagTimer = window.setTimeout(() => {
      window.localStorage.removeItem(BOOT_KEY);
      setBootProgress(0);
      setWindows(createInitialWindows());
      setZCounter(APPS.length + 1);
    }, 950);

    const blackoutTimer = window.setTimeout(() => {
      setPhase("blackout");
    }, 2200);

    return () => {
      window.clearTimeout(clearBootFlagTimer);
      window.clearTimeout(blackoutTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "blackout") {
      return;
    }

    const restartTimer = window.setTimeout(() => {
      setPhase("boot");
    }, 3000);

    return () => window.clearTimeout(restartTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "lock") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => setLoggingIn(true),
      prefersReducedMotion ? 0 : 2800,
    );

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!loggingIn) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        window.localStorage.setItem(BOOT_KEY, "true");
        setPhase("desktop");
        setLoggingIn(false);
      },
      prefersReducedMotion ? 0 : 460,
    );

    return () => window.clearTimeout(timer);
  }, [loggingIn]);

  useEffect(() => {
    const closeTimers = windowCloseTimersRef.current;

    return () => {
      if (startMenuCloseTimerRef.current) {
        window.clearTimeout(startMenuCloseTimerRef.current);
      }

      Object.values(closeTimers).forEach((timer) => {
        if (timer) {
          window.clearTimeout(timer);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      const taskbar = 92;
      const maxX = Math.max(12, window.innerWidth - 80);
      const maxY = Math.max(12, window.innerHeight - taskbar);
      const nextX = Math.min(maxX, Math.max(12, drag.originX + event.clientX - drag.startX));
      const nextY = Math.min(maxY, Math.max(12, drag.originY + event.clientY - drag.startY));

      setWindows((current) => ({
        ...current,
        [drag.appId]: {
          ...current[drag.appId],
          x: nextX,
          y: nextY,
        },
      }));
    };

    const handlePointerUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const focusApp = useCallback((appId: AppId) => {
    setZCounter((current) => {
      const next = current + 1;
      setWindows((existing) => ({
        ...existing,
        [appId]: {
          ...existing[appId],
          z: next,
          minimized: false,
        },
      }));
      return next;
    });
  }, []);

  const closeStartMenu = useCallback(() => {
    if (!startOpen) {
      return;
    }

    if (startMenuCloseTimerRef.current) {
      window.clearTimeout(startMenuCloseTimerRef.current);
    }

    setStartMenuClosing(true);
    startMenuCloseTimerRef.current = window.setTimeout(() => {
      setStartOpen(false);
      setStartMenuClosing(false);
      startMenuCloseTimerRef.current = null;
    }, 180);
  }, [startOpen]);

  const openStartMenu = useCallback(() => {
    if (startMenuCloseTimerRef.current) {
      window.clearTimeout(startMenuCloseTimerRef.current);
      startMenuCloseTimerRef.current = null;
    }

    setStartMenuClosing(false);
    setStartOpen(true);
  }, []);

  const toggleStartMenu = () => {
    if (startOpen) {
      closeStartMenu();
      return;
    }

    openStartMenu();
  };

  const openApp = useCallback(
    (appId: AppId) => {
      closeStartMenu();
      setClosingWindows((current) => {
        const next = new Set(current);
        next.delete(appId);
        return next;
      });
      setZCounter((current) => {
        const next = current + 1;
        setWindows((existing) => ({
          ...existing,
          [appId]: {
            ...existing[appId],
            open: true,
            minimized: false,
            z: next,
          },
        }));
        return next;
      });
    },
    [closeStartMenu],
  );

  const closeApp = useCallback((appId: AppId) => {
    if (windowCloseTimersRef.current[appId]) {
      window.clearTimeout(windowCloseTimersRef.current[appId]);
    }

    setClosingWindows((current) => new Set(current).add(appId));
    windowCloseTimersRef.current[appId] = window.setTimeout(() => {
      setWindows((current) => ({
        ...current,
        [appId]: {
          ...current[appId],
          open: false,
          minimized: false,
        },
      }));
      setClosingWindows((current) => {
        const next = new Set(current);
        next.delete(appId);
        return next;
      });
      delete windowCloseTimersRef.current[appId];
    }, 180);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (startOpen) {
        closeStartMenu();
        return;
      }

      const topmost = visibleWindows[visibleWindows.length - 1];
      if (topmost) {
        closeApp(topmost.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startOpen, closeStartMenu, visibleWindows, closeApp]);

  const minimizeApp = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        minimized: true,
      },
    }));
  };

  const maximizeApp = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        x: 16,
        y: 16,
        width: Math.max(320, window.innerWidth - 32),
        height: Math.max(320, window.innerHeight - 92),
      },
    }));
    focusApp(appId);
  };

  const replayBoot = () => {
    closeStartMenu();
    setPhase("shutdown");
  };

  const enterDesktop = () => {
    window.localStorage.setItem(BOOT_KEY, "true");
    setPhase("desktop");
  };

  const startDrag = (appId: AppId, event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    focusApp(appId);
    dragRef.current = {
      appId,
      startX: event.clientX,
      startY: event.clientY,
      originX: windows[appId].x,
      originY: windows[appId].y,
    };
  };

  if (phase === "boot") {
    return (
      <main className="screen-fade-in flex min-h-screen items-center justify-center bg-black text-white">
        <button
          type="button"
          onClick={enterDesktop}
          className="absolute right-6 top-6 rounded-md border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Skip intro →
        </button>
        <section className="flex flex-col items-center gap-8" aria-label={`${data.osName} startup`}>
          <div className="grid size-20 grid-cols-2 gap-1.5" aria-hidden="true">
            <span className="rounded-sm bg-cyan-300" />
            <span className="rounded-sm bg-sky-400" />
            <span className="rounded-sm bg-blue-500" />
            <span className="rounded-sm bg-indigo-400" />
          </div>
          <div className="boot-spinner" aria-hidden="true" />
          <div className="w-56 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-1.5 rounded-full bg-white transition-all duration-150"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
          <p className="font-mono text-sm tracking-[0.2em] text-white/72">
            STARTING {data.osName.toUpperCase()}
          </p>
        </section>
      </main>
    );
  }

  if (phase === "lock") {
    return (
      <main
        className={`desktop-wallpaper relative min-h-screen overflow-hidden text-white ${
          loggingIn ? "screen-fade-out" : "screen-fade-in"
        }`}
      >
        <div className="absolute inset-0 bg-black/18" />
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-7xl font-semibold tabular-nums sm:text-8xl">{formatTime(now)}</p>
          <p className="mt-4 text-lg text-white/86">{formatLongDate(now)}</p>
          <button
            type="button"
            onClick={() => setLoggingIn(true)}
            disabled={loggingIn}
            className="glass-panel mt-12 flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-medium transition hover:bg-white/18 disabled:opacity-70"
          >
            <CircleUserRound className="size-5" />
            {loggingIn ? `Signing in…` : `Sign in to ${data.osName}`}
          </button>
        </section>
      </main>
    );
  }

  if (phase === "shutdown") {
    return (
      <main className="shutdown-screen relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_42%)] opacity-80" />
        <section
          className="relative z-10 flex flex-col items-center gap-8 text-center"
          aria-label={`${data.osName} shutting down and restarting`}
        >
          <div className="grid size-16 animate-pulse grid-cols-2 gap-1.5" aria-hidden="true">
            <span className="rounded-sm bg-cyan-200" />
            <span className="rounded-sm bg-sky-300" />
            <span className="rounded-sm bg-blue-400" />
            <span className="rounded-sm bg-indigo-300" />
          </div>
          <div className="boot-spinner" aria-hidden="true" />
          <div>
            <p className="text-lg font-medium">Shutting down</p>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "blackout") {
    return (
      <main
        className="blackout-screen min-h-screen bg-black"
        aria-label={`${data.osName} restart blackout transition`}
      />
    );
  }

  return (
    <main className="desktop-wallpaper desktop-enter relative h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_50%)]" />
      <DesktopShortcuts apps={APPS} openApp={openApp} />

      <section aria-label="Open application windows">
        {visibleWindows.map((app) => {
          const state = windows[app.id];
          const isActive = state.z === Math.max(...Object.values(windows).map((item) => item.z));

          return (
            <article
              key={app.id}
              className={`os-window window-surface fixed flex min-h-72 min-w-80 resize overflow-hidden rounded-lg transition-shadow ${
                closingWindows.has(app.id) ? "window-close" : "window-open"
              }`}
              style={{
                left: state.x,
                top: state.y,
                width: state.width,
                height: state.height,
                zIndex: state.z,
              }}
              onPointerDown={() => focusApp(app.id)}
              role="dialog"
              aria-label={`${app.title} window`}
            >
              <div className="flex min-h-0 flex-1 flex-col">
                <div
                  className={`flex cursor-grab items-center justify-between border-b border-white/12 px-3 py-2 ${
                    isActive ? "bg-white/12" : "bg-white/6"
                  }`}
                  onPointerDown={(event) => startDrag(app.id, event)}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <app.icon className="size-4 shrink-0 text-sky-200" />
                    <span className="truncate text-sm font-medium">{app.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <WindowButton label={`Minimize ${app.title}`} onClick={() => minimizeApp(app.id)}>
                      <Minus className="size-4" />
                    </WindowButton>
                    <WindowButton label={`Maximize ${app.title}`} onClick={() => maximizeApp(app.id)}>
                      <Maximize2 className="size-4" />
                    </WindowButton>
                    <WindowButton label={`Close ${app.title}`} onClick={() => closeApp(app.id)}>
                      <X className="size-4" />
                    </WindowButton>
                  </div>
                </div>
                <div className="min-h-0 flex-1 overflow-auto p-5">
                  <AppContent appId={app.id} data={data} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {startOpen ? (
        <StartMenu
          data={data}
          apps={APPS}
          openApp={openApp}
          replayBoot={replayBoot}
          closing={startMenuClosing}
        />
      ) : null}

      <Taskbar
        osName={data.osName}
        apps={APPS}
        windows={windows}
        now={now}
        startOpen={startOpen}
        toggleStart={toggleStartMenu}
        openApp={openApp}
        focusApp={focusApp}
      />
    </main>
  );
}

function DesktopShortcuts({
  apps,
  openApp,
}: {
  apps: OsAppDefinition[];
  openApp: (appId: AppId) => void;
}) {
  return (
    <nav className="desktop-shortcuts-enter absolute left-5 top-5 z-10 hidden w-24 gap-4 sm:grid" aria-label="Desktop shortcuts">
      {apps.slice(0, 5).map((app) => (
        <button
          key={app.id}
          type="button"
          onDoubleClick={() => openApp(app.id)}
          onClick={() => openApp(app.id)}
          className="group flex h-20 flex-col items-center justify-center gap-2 rounded-md p-2 text-center text-xs text-white drop-shadow transition hover:bg-white/14"
        >
          <span className="grid size-10 place-items-center rounded-md bg-sky-300/24 ring-1 ring-white/20">
            <app.icon className="size-6 text-white" />
          </span>
          <span className="line-clamp-2 leading-tight">{app.title}</span>
        </button>
      ))}
    </nav>
  );
}

function StartMenu({
  data,
  apps,
  openApp,
  replayBoot,
  closing,
}: {
  data: PortfolioData;
  apps: OsAppDefinition[];
  openApp: (appId: AppId) => void;
  replayBoot: () => void;
  closing: boolean;
}) {
  const [query, setQuery] = useState("");
  const [showAllApps, setShowAllApps] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const sortedApps = useMemo(
    () => [...apps].sort((first, second) => first.title.localeCompare(second.title)),
    [apps],
  );

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!normalizedQuery) {
      return [];
    }

    const matches = (...parts: string[]) =>
      parts.join(" ").toLowerCase().includes(normalizedQuery);

    const appResults = apps
      .filter((app) => matches(app.title, app.id))
      .map((app) => ({
        id: `app-${app.id}`,
        title: app.title,
        subtitle: "Open app",
        appId: app.id,
        icon: app.icon,
      }));

    const projectResults = data.projects
      .filter((project) =>
        matches(project.title, project.description, project.status, ...project.tags),
      )
      .map((project) => ({
        id: `project-${project.title}`,
        title: project.title,
        subtitle: `Project - ${project.status}`,
        appId: "projects" as const,
        icon: FolderKanban,
      }));

    const skillResults = data.skills
      .flatMap((group) =>
        group.items.map((skill) => ({
          group: group.category,
          skill,
        })),
      )
      .filter((item) => matches(item.group, item.skill))
      .map((item) => ({
        id: `skill-${item.group}-${item.skill}`,
        title: item.skill,
        subtitle: `Skill - ${item.group}`,
        appId: "skills" as const,
        icon: Code2,
      }));

    const experienceResults = data.experience
      .filter((item) => matches(item.role, item.organization, item.period, item.summary, ...item.highlights))
      .map((item) => ({
        id: `experience-${item.organization}-${item.role}`,
        title: item.role,
        subtitle: `${item.organization} - Resume`,
        appId: "resume" as const,
        icon: FileText,
      }));

    const profileResult = matches(
      data.profile.name,
      data.profile.title,
      data.profile.location,
      data.profile.summary,
      ...data.profile.highlights,
    )
      ? [
          {
            id: "profile-about",
            title: data.profile.name,
            subtitle: "Profile - About Me",
            appId: "about" as const,
            icon: CircleUserRound,
          },
        ]
      : [];

    const contactResults = [
      data.contact.email,
      data.contact.phone,
      data.contact.location,
      ...data.contact.links.map((link) => link.label),
    ]
      .filter((item) => matches(item))
      .map((item) => ({
        id: `contact-${item}`,
        title: item,
        subtitle: "Contact detail",
        appId: "contact" as const,
        icon: Contact,
      }));

    return [
      ...appResults,
      ...profileResult,
      ...projectResults,
      ...skillResults,
      ...experienceResults,
      ...contactResults,
    ].slice(0, 8);
  }, [apps, data, normalizedQuery]);

  const openSearchResult = (result: SearchResult) => {
    openApp(result.appId);
  };

  return (
    <section
      className={`start-menu-panel glass-panel fixed bottom-20 left-1/2 z-[900] w-[min(620px,calc(100vw-24px))] -translate-x-1/2 rounded-lg p-5 ${
        closing ? "start-menu-out" : "start-menu-in"
      }`}
      role="dialog"
      aria-label={`${data.osName} Start menu`}
    >
      <label className="flex items-center gap-3 rounded-md bg-white/12 px-3 py-2 text-sm text-white/78 focus-within:bg-white/16 focus-within:ring-2 focus-within:ring-sky-200/70">
        <Search className="size-4 shrink-0" />
        <span className="sr-only">Search portfolio</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && searchResults[0]) {
              openSearchResult(searchResults[0]);
            }
          }}
          autoFocus
          placeholder="Search portfolio, projects, skills, and contact"
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
        />
      </label>

      {normalizedQuery ? (
        <div className="mt-5 rounded-md bg-white/8 p-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Search results</h2>
            <p className="text-xs text-white/56">{searchResults.length} found</p>
          </div>
          <div className="mt-3 grid max-h-72 gap-2 overflow-auto pr-1">
            {searchResults.length ? (
              searchResults.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => openSearchResult(result)}
                  className="flex items-center gap-3 rounded-md p-2 text-left transition hover:bg-white/12"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white/12">
                    <result.icon className="size-5 text-cyan-200" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{result.title}</span>
                    <span className="block truncate text-xs text-white/60">{result.subtitle}</span>
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-md border border-white/10 bg-black/12 p-4 text-sm text-white/62">
                No matches for <span className="font-medium text-white/78">{query}</span>.
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {showAllApps ? (
            <>
              <div className="mt-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold">All apps</h2>
                <button
                  type="button"
                  onClick={() => setShowAllApps(false)}
                  className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-xs transition hover:bg-white/16"
                >
                  <ChevronRight className="size-3.5 rotate-180" />
                  Back
                </button>
              </div>

              <div className="mt-3 grid max-h-80 gap-2 overflow-auto pr-1">
                {sortedApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => openApp(app.id)}
                    className="flex items-center gap-3 rounded-md p-2 text-left transition hover:bg-white/12"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white/12">
                      <app.icon className="size-5 text-sky-100" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{app.title}</span>
                      <span className="block truncate text-xs text-white/60">Open app window</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Pinned</h2>
                <button
                  type="button"
                  onClick={() => setShowAllApps(true)}
                  className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-xs transition hover:bg-white/16"
                  aria-expanded={showAllApps}
                >
                  All apps
                  <ChevronRight className="size-3.5" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => openApp(app.id)}
                    className="flex h-20 flex-col items-center justify-center gap-2 rounded-md text-xs transition hover:bg-white/14"
                  >
                    <span className="grid size-10 place-items-center rounded-md bg-white/12">
                      <app.icon className="size-5 text-sky-100" />
                    </span>
                    <span className="max-w-full truncate px-1">{app.title}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-md bg-white/8 p-3">
                <h3 className="text-sm font-semibold">Recommended</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {data.projects.slice(0, 2).map((project) => (
                    <button
                      key={project.title}
                      type="button"
                      onClick={() => openApp("projects")}
                      className="flex items-start gap-3 rounded-md p-2 text-left transition hover:bg-white/12"
                    >
                      <FolderKanban className="mt-1 size-5 shrink-0 text-cyan-200" />
                      <span>
                        <span className="block text-sm font-medium">{project.title}</span>
                        <span className="line-clamp-1 text-xs text-white/64">
                          {project.description}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-white/12 pt-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-white/16">
            <CircleUserRound className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium">{data.profile.name}</p>
            <p className="text-xs text-white/62">{data.profile.title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={replayBoot}
          className="grid size-9 place-items-center rounded-md bg-white/10 transition hover:bg-white/16"
          aria-label="Shut down and restart"
          title="Shut down and restart"
        >
          <Power className="size-4" />
        </button>
      </div>
    </section>
  );
}
function Taskbar({
  osName,
  apps,
  windows,
  now,
  startOpen,
  toggleStart,
  openApp,
  focusApp,
}: {
  osName: string;
  apps: OsAppDefinition[];
  windows: Record<AppId, WindowState>;
  now: Date;
  startOpen: boolean;
  toggleStart: () => void;
  openApp: (appId: AppId) => void;
  focusApp: (appId: AppId) => void;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const clockButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!calendarOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        calendarRef.current?.contains(target) ||
        clockButtonRef.current?.contains(target)
      ) {
        return;
      }
      setCalendarOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCalendarOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [calendarOpen]);

  return (
    <>
      {calendarOpen ? (
        <div
          ref={calendarRef}
          className="calendar-flyout glass-panel fixed bottom-[calc(var(--taskbar-height)+12px)] right-3 z-[960] w-[min(320px,calc(100vw-24px))] rounded-lg p-4"
          role="dialog"
          aria-label="Calendar"
        >
          <CalendarFlyout now={now} />
        </div>
      ) : null}

      <footer className="glass-panel taskbar-enter fixed inset-x-0 bottom-0 z-[950] flex h-[var(--taskbar-height)] items-center justify-between px-3">
      <div className="hidden min-w-32 items-center gap-2 text-xs text-white/70 md:flex">
        <Sparkles className="size-4 text-cyan-200" />
        <span>{osName} Desktop</span>
      </div>

      <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1" aria-label="Taskbar">
        <button
          type="button"
          onClick={toggleStart}
          className={`grid size-10 place-items-center rounded-md transition sm:size-11 ${
            startOpen ? "bg-white/20" : "hover:bg-white/12"
          }`}
          aria-label="Open Start menu"
        >
          <Grid2X2 className="size-5 text-sky-100" />
        </button>
        {apps.map((app) => {
          const appWindow = windows[app.id];
          const isOpen = appWindow.open && !appWindow.minimized;
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => (appWindow.open ? focusApp(app.id) : openApp(app.id))}
              className={`relative grid size-10 place-items-center rounded-md transition sm:size-11 ${
                isOpen ? "bg-white/18" : "hover:bg-white/12"
              }`}
              aria-label={`${appWindow.open ? "Focus" : "Open"} ${app.title}`}
              title={app.title}
            >
              <app.icon className="size-5 text-white" />
              {appWindow.open ? (
                <span className="absolute bottom-1 h-1 w-4 rounded-full bg-sky-200" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-3 text-right text-xs text-white/78">
        <div className="hidden items-center gap-2 sm:flex">
          <Wifi className="size-4" />
          <ShieldCheck className="size-4" />
        </div>
        <button
          ref={clockButtonRef}
          type="button"
          onClick={() => setCalendarOpen((open) => !open)}
          className={`rounded-md px-2 py-1 text-right tabular-nums transition hover:bg-white/12 ${
            calendarOpen ? "bg-white/12" : ""
          }`}
          aria-label="Show date and calendar"
          aria-expanded={calendarOpen}
        >
          <span className="block">{formatTime(now)}</span>
          <span className="block">{now.toLocaleDateString()}</span>
        </button>
      </div>
    </footer>
    </>
  );
}

type CalendarLevel = "days" | "months" | "years" | "decades";

function CalendarFlyout({ now }: { now: Date }) {
  const [level, setLevel] = useState<CalendarLevel>("days");
  const [view, setView] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const decadeStart = Math.floor(year / 10) * 10;
  const centuryStart = Math.floor(year / 100) * 100;

  const headerLabel =
    level === "days"
      ? view.toLocaleDateString([], { month: "long", year: "numeric" })
      : level === "months"
        ? String(year)
        : level === "years"
          ? `${decadeStart} – ${decadeStart + 9}`
          : `${centuryStart} – ${centuryStart + 99}`;

  const zoomOut = () => {
    if (level === "days") setLevel("months");
    else if (level === "months") setLevel("years");
    else if (level === "years") setLevel("decades");
  };

  const shift = (direction: number) => {
    if (level === "days") setView(new Date(year, month + direction, 1));
    else if (level === "months") setView(new Date(year + direction, month, 1));
    else if (level === "years") setView(new Date(year + direction * 10, month, 1));
    else setView(new Date(year + direction * 100, month, 1));
  };

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayCells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const yearCells = Array.from({ length: 12 }, (_, index) => decadeStart - 1 + index);
  const decadeCells = Array.from({ length: 12 }, (_, index) => centuryStart - 10 + index * 10);

  const cellBase =
    "grid aspect-square place-items-center rounded-lg text-sm tabular-nums transition hover:bg-white/12";

  return (
    <div>
      <div className="border-b border-white/12 pb-3">
        <p className="text-2xl font-semibold tabular-nums">{formatTime(now)}</p>
        <p className="mt-0.5 text-sm text-white/70">
          {now.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={zoomOut}
          disabled={level === "decades"}
          className="rounded-md px-2 py-1 text-sm font-medium transition hover:bg-white/12 disabled:cursor-default disabled:hover:bg-transparent"
        >
          {headerLabel}
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            className="grid size-7 place-items-center rounded-md transition hover:bg-white/12"
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            className="grid size-7 place-items-center rounded-md transition hover:bg-white/12"
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div key={level} className="calendar-view mt-3">
        {level === "days" ? (
          <>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/50">
              {weekdays.map((day) => (
                <span key={day} className="py-1">
                  {day}
                </span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
              {dayCells.map((day, index) =>
                day === null ? (
                  <span key={`empty-${index}`} aria-hidden="true" />
                ) : (
                  <span
                    key={day}
                    aria-current={isCurrentMonth && day === now.getDate() ? "date" : undefined}
                    className={`grid aspect-square place-items-center rounded-full tabular-nums ${
                      isCurrentMonth && day === now.getDate()
                        ? "bg-sky-400 font-semibold text-slate-950"
                        : "text-white/78"
                    }`}
                  >
                    {day}
                  </span>
                ),
              )}
            </div>
          </>
        ) : level === "months" ? (
          <div className="grid grid-cols-4 gap-1 text-center">
            {monthNames.map((name, index) => {
              const isNow = year === now.getFullYear() && index === now.getMonth();
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setView(new Date(year, index, 1));
                    setLevel("days");
                  }}
                  className={`${cellBase} ${
                    isNow ? "bg-sky-400 font-semibold text-slate-950" : "text-white/78"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        ) : level === "years" ? (
          <div className="grid grid-cols-4 gap-1 text-center">
            {yearCells.map((cellYear) => {
              const outside = cellYear < decadeStart || cellYear > decadeStart + 9;
              const isNow = cellYear === now.getFullYear();
              return (
                <button
                  key={cellYear}
                  type="button"
                  onClick={() => {
                    setView(new Date(cellYear, month, 1));
                    setLevel("months");
                  }}
                  className={`${cellBase} ${
                    isNow
                      ? "bg-sky-400 font-semibold text-slate-950"
                      : outside
                        ? "text-white/35"
                        : "text-white/78"
                  }`}
                >
                  {cellYear}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1 text-center">
            {decadeCells.map((cellDecade) => {
              const outside = cellDecade < centuryStart || cellDecade > centuryStart + 90;
              const isNow =
                now.getFullYear() >= cellDecade && now.getFullYear() <= cellDecade + 9;
              return (
                <button
                  key={cellDecade}
                  type="button"
                  onClick={() => {
                    setView(new Date(cellDecade, month, 1));
                    setLevel("years");
                  }}
                  className={`flex aspect-square flex-col items-center justify-center rounded-lg leading-tight transition hover:bg-white/12 ${
                    isNow
                      ? "bg-sky-400 font-semibold text-slate-950"
                      : outside
                        ? "text-white/35"
                        : "text-white/78"
                  }`}
                >
                  <span className="text-sm tabular-nums">{cellDecade}</span>
                  <span
                    className={`text-[10px] tabular-nums ${
                      isNow ? "text-slate-900/70" : "text-white/40"
                    }`}
                  >
                    –{cellDecade + 9}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function WindowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-8 place-items-center rounded-md text-white/76 transition hover:bg-white/14 hover:text-white"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function AppContent({ appId, data }: { appId: AppId; data: PortfolioData }) {
  switch (appId) {
    case "about":
      return <AboutApp data={data} />;
    case "projects":
      return <ProjectsApp data={data} />;
    case "resume":
      return <ResumeApp data={data} />;
    case "skills":
      return <SkillsApp data={data} />;
    case "contact":
      return <ContactApp data={data} />;
    case "terminal":
      return <TerminalApp data={data} />;
  }
}

function AboutApp({ data }: { data: PortfolioData }) {
  return (
    <div className="grid gap-5 md:grid-cols-[180px_1fr]">
      <div className="rounded-lg border border-white/12 bg-white/8 p-4">
        <div className="grid aspect-square place-items-center rounded-md bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-500">
          <CircleUserRound className="size-20 text-white" />
        </div>
        <p className="mt-4 text-lg font-semibold">{data.profile.name}</p>
        <p className="text-sm text-white/68">{data.profile.title}</p>
        <p className="mt-2 text-xs text-white/54">{data.profile.location}</p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">User profile</p>
        <h1 className="mt-2 text-3xl font-semibold">{data.profile.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{data.profile.summary}</p>
        <div className="mt-6 grid gap-3">
          {data.profile.highlights.map((highlight) => (
            <div key={highlight} className="flex gap-3 rounded-md bg-white/8 p-3">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-200" />
              <p className="text-sm leading-6 text-white/78">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsApp({ data }: { data: PortfolioData }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Pinned work</p>
          <h1 className="mt-2 text-3xl font-semibold">Projects</h1>
        </div>
        <p className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/68">
          {data.projects.length} items
        </p>
      </div>
      <div className="mt-5 grid gap-4">
        {data.projects.map((project) => (
          <article key={project.title} className="rounded-lg border border-white/12 bg-white/8 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-cyan-200">{project.status}</p>
                <h2 className="mt-1 text-xl font-semibold">{project.title}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/72">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-md bg-sky-300/16 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-300/24"
                >
                  {link.label}
                  <ExternalLink className="size-3.5" />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ResumeApp({ data }: { data: PortfolioData }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Resume file</p>
      <h1 className="mt-2 text-3xl font-semibold">{data.resume.filename}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72">{data.resume.summary}</p>

      <section className="mt-6 rounded-lg border border-white/12 bg-white/8 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Education</p>
            <h2 className="mt-1 text-lg font-semibold">{data.education.school}</h2>
            <p className="mt-1 text-sm text-white/70">{data.education.degree}</p>
          </div>
          <div className="text-right text-xs text-white/64">
            <p>{data.education.expected}</p>
            <p>{data.education.location}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
            GPA: {data.education.gpa}
          </span>
          {data.education.honors.map((honor) => (
            <span key={honor} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
              {honor}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-3">
        {data.experience.map((item) => (
          <article key={`${item.organization}-${item.role}`} className="rounded-lg border border-white/12 bg-white/8 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">{item.role}</h2>
                <p className="text-sm text-white/64">{item.organization}</p>
              </div>
              <p className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/64">{item.period}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/72">{item.summary}</p>
            <ul className="mt-3 grid gap-2">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm leading-6 text-white/72">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <a
        href={data.resume.href}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-100"
      >
        <FileText className="size-4" />
        Open resume PDF
      </a>
    </div>
  );
}

function SkillsApp({ data }: { data: PortfolioData }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Control panel</p>
      <h1 className="mt-2 text-3xl font-semibold">Skills</h1>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {data.skills.map((group) => (
          <section key={group.category} className="rounded-lg border border-white/12 bg-white/8 p-4">
            <div className="flex items-center gap-2">
              <Settings className="size-5 text-cyan-200" />
              <h2 className="text-lg font-semibold">{group.category}</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span key={skill} className="rounded-md bg-white/10 px-3 py-2 text-sm text-white/76">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ContactApp({ data }: { data: PortfolioData }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Network</p>
      <h1 className="mt-2 text-3xl font-semibold">Contact</h1>
      <p className="mt-4 text-sm leading-6 text-white/72">
        Contact details from the resume.
      </p>

      <div className="mt-6 grid gap-3">
        <a
          href={`mailto:${data.contact.email}`}
          className="flex items-center justify-between rounded-lg border border-white/12 bg-white/8 p-4 transition hover:bg-white/12"
        >
          <span className="flex items-center gap-3">
            <Mail className="size-5 text-cyan-200" />
            <span>{data.contact.email}</span>
          </span>
          <ExternalLink className="size-4 text-white/52" />
        </a>
        <a
          href={`tel:${data.contact.phone.replaceAll("-", "")}`}
          className="flex items-center justify-between rounded-lg border border-white/12 bg-white/8 p-4 transition hover:bg-white/12"
        >
          <span className="flex items-center gap-3">
            <Phone className="size-5 text-cyan-200" />
            <span>{data.contact.phone}</span>
          </span>
          <ExternalLink className="size-4 text-white/52" />
        </a>
        <div className="flex items-center justify-between rounded-lg border border-white/12 bg-white/8 p-4">
          <span className="flex items-center gap-3">
            <MapPin className="size-5 text-cyan-200" />
            <span>{data.contact.location}</span>
          </span>
        </div>
        {data.contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center justify-between rounded-lg border border-white/12 bg-white/8 p-4 transition hover:bg-white/12"
          >
            <span className="flex items-center gap-3">
              {link.label === "GitHub" ? (
                <Code2 className="size-5 text-cyan-200" />
              ) : (
                <LaptopMinimal className="size-5 text-cyan-200" />
              )}
              <span>{link.label}</span>
            </span>
            <ExternalLink className="size-4 text-white/52" />
          </a>
        ))}
      </div>
    </div>
  );
}

type TerminalEntry = { command: string; output: string[] };

const TERMINAL_COMMANDS = [
  "help",
  "about",
  "whoami",
  "projects",
  "skills",
  "experience",
  "education",
  "contact",
  "resume",
  "ls",
  "clear",
] as const;

function TerminalApp({ data }: { data: PortfolioData }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runCommand = useCallback(
    (raw: string): string[] => {
      const command = raw.trim().toLowerCase();

      switch (command) {
        case "":
          return [];
        case "help":
          return [
            "Available commands:",
            ...TERMINAL_COMMANDS.filter((item) => item !== "clear").map(
              (item) => `  ${item}`,
            ),
            "  clear",
          ];
        case "about":
        case "whoami":
          return [`${data.profile.name} — ${data.profile.title}`, "", data.profile.summary];
        case "projects":
          return data.projects.map(
            (project) => `- ${project.title} [${project.status}] :: ${project.tags.join(", ")}`,
          );
        case "skills":
          return data.skills.map((group) => `${group.category}: ${group.items.join(", ")}`);
        case "experience":
          return data.experience.map(
            (item) => `- ${item.role} @ ${item.organization} (${item.period})`,
          );
        case "education":
          return [
            `${data.education.degree}`,
            `${data.education.school}`,
            `${data.education.expected} · GPA ${data.education.gpa}`,
          ];
        case "contact":
          return [
            `email:  ${data.contact.email}`,
            `phone:  ${data.contact.phone}`,
            ...data.contact.links.map((link) => `${link.label.toLowerCase()}: ${link.href}`),
          ];
        case "resume":
          if (typeof window !== "undefined") {
            window.open(data.resume.href, "_blank", "noopener,noreferrer");
          }
          return [`Opening ${data.resume.filename}…`];
        case "ls":
          return ["about", "projects", "skills", "experience", "education", "contact", "resume.pdf"];
        case "clear":
          return [];
        default:
          return [`command not found: ${command}. Type "help" for options.`];
      }
    },
    [data],
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim();

    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((current) => [...current, { command, output: runCommand(command) }]);
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  return (
    <div
      className="flex h-full min-h-0 flex-col font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4 flex items-center gap-2 text-xs text-white/52">
        <span className="size-3 rounded-full bg-red-400" />
        <span className="size-3 rounded-full bg-yellow-300" />
        <span className="size-3 rounded-full bg-green-400" />
        <span className="ml-2">{data.osName.toLowerCase()}.exe</span>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-auto">
        <p className="text-white/60">
          {data.osName} shell. Type <span className="text-cyan-200">help</span> to get started.
        </p>
        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`} className="space-y-1">
            <p className="text-cyan-200">
              <span className="text-white/40">visitor@{data.osName.toLowerCase()}:~$ </span>
              {entry.command}
            </p>
            {entry.output.map((line, lineIndex) => (
              <p key={lineIndex} className="whitespace-pre-wrap text-white/78">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-3 flex items-center gap-2 border-t border-white/12 pt-3">
        <span className="shrink-0 text-white/40">visitor@{data.osName.toLowerCase()}:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label={`${data.osName} terminal input`}
          className="min-w-0 flex-1 bg-transparent text-cyan-100 caret-cyan-200 outline-none"
        />
      </form>
    </div>
  );
}
