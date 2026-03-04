"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Link2,
  Database,
  Merge,
  ArrowRight,
  Activity,
  Code2,
  Users,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");
  const [healthStatus, setHealthStatus] = useState("Checking...");

  useEffect(() => {
    setBaseUrl(window.location.origin);
    fetch(`${baseUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus(data.status === "healthy" ? "Healthy" : "Unhealthy");
      })
      .catch(() => {
        setHealthStatus("Unhealthy");
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-50 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />

      <nav className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 max-w-7xl mx-auto w-full relative z-10 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-blue-500 to-cyan-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
            IdentityAPI
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <Activity
              className={`w-4 h-4 ${
                healthStatus === "Healthy"
                  ? "text-emerald-400"
                  : "text-slate-400 animate-pulse"
              }`}
            />
            <span className="hidden sm:inline text-slate-300">
              System Status:{" "}
              <span
                className={
                  healthStatus === "Healthy"
                    ? "text-emerald-400"
                    : "text-slate-400"
                }
              >
                {healthStatus}
              </span>
            </span>
          </div>
          <a
            href="https://github.com/JeetDas5/Identity-Reconciliation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-xl shadow-white/10 font-semibold"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center mt-20 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-slate-300 mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v1.0 is now live and serving requests
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Intelligent Data <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Identity Reconciliation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 flex-1"
          >
            A powerful backend service that centralizes user profiles by
            intelligently linking and evaluating emails and phone numbers to
            establish primary and secondary contacts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#try-now"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_var(--color-blue-500)]"
            >
              Use Endpoint <ArrowRight className="w-4 h-4 ml-1" />
            </a>
            <a
              href="https://github.com/JeetDas5/Identity-Reconciliation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" /> Docs
            </a>
          </motion.div>
        </div>

        <div
          id="features"
          className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 mb-20 text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.07] transition-colors relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-blue-500/20 p-4 rounded-2xl w-max mb-6">
              <Merge className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Smart Consolidation
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Automatically identifies related inputs and establishes
              primary-secondary contact relationships across your network.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.07] transition-colors relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-indigo-500/20 p-4 rounded-2xl w-max mb-6">
              <Users className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Deduplication
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Maintains data cleanliness by preventing independent fragmented
              entries for the same user entities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.07] transition-colors relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-emerald-500/20 p-4 rounded-2xl w-max mb-6">
              <Database className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              High Performance
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Built on Next.js 16 and Drizzle ORM pushing lightning-fast
              resolutions running securely on Neon PostgreSQL.
            </p>
          </motion.div>
        </div>

        <div
          id="try-now"
          className="w-full max-w-4xl mx-auto bg-[#0a0f18] rounded-3xl border border-white/10 overflow-hidden mb-32 shadow-2xl relative text-left"
        >
          <div className="flex items-center px-4 py-3 border-b border-white/5 bg-black/40">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-slate-400">
              POST /api/identity
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="text-slate-500 mb-4 font-sans font-medium text-xs tracking-wider uppercase">
                // Request Payload
              </div>

              <div className="text-slate-300">
                curl <span className="text-indigo-300">-X</span> POST{" "}
                <span className="text-emerald-300">{baseUrl}/api/identity</span>{" "}
                \
              </div>

              <div className="text-slate-300 pl-4">
                -H{" "}
                <span className="text-emerald-300">
                  "Content-Type: application/json"
                </span>{" "}
                \
              </div>

              <div className="text-slate-300 pl-4">
                -d <span className="text-emerald-300">'{"{"}</span>
              </div>

              <div className="text-slate-300 pl-8">
                <span className="text-blue-300">"email"</span>:{" "}
                <span className="text-emerald-300">"mcfly@hillvalley.edu"</span>
                ,
              </div>

              <div className="text-slate-300 pl-8">
                <span className="text-blue-300">"phoneNumber"</span>:{" "}
                <span className="text-emerald-300">"123456"</span>
              </div>

              <div className="text-slate-300 pl-4">
                <span className="text-emerald-300">{"}'"}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="bg-white/5 p-3 rounded-full border border-white/10">
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="text-slate-500 mb-4 font-sans font-medium text-xs tracking-wider uppercase">
                // Reconciled Response
              </div>
              <div className="text-blue-300">{"{"}</div>
              <div className="text-slate-300 pl-4">
                <span className="text-indigo-300">"contact"</span>: {"{"}
              </div>
              <div className="text-slate-300 pl-8">
                <span className="text-indigo-300">"primaryContactId"</span>:{" "}
                <span className="text-yellow-300">1</span>,
              </div>
              <div className="text-slate-300 pl-8">
                <span className="text-indigo-300">"emails"</span>: [
                <span className="text-emerald-300">"mcfly@hillvalley.edu"</span>
                ],
              </div>
              <div className="text-slate-300 pl-8">
                <span className="text-indigo-300">"phoneNumbers"</span>: [
                <span className="text-emerald-300">"123456"</span>],
              </div>
              <div className="text-slate-300 pl-8">
                <span className="text-indigo-300">"secondaryContactIds"</span>:
                []
              </div>
              <div className="text-slate-300 pl-4">{"}"}</div>
              <div className="text-blue-300">{"}"}</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 border-t border-white/5 text-sm z-10 w-full bg-slate-950/50 backdrop-blur-md">
        <p>
          Built with ❤️ by{" "}
          <Link
            href="https://github.com/JeetDas5"
            className="hover:underline text-white"
          >
            Jeet Das
          </Link>{" "}
          for Bitespeed Intern Assignment
        </p>
      </footer>
    </div>
  );
}
