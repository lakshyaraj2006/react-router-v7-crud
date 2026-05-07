import { useEffect, useState } from "react";
import { FaArrowUp, FaGithub, FaReact } from "react-icons/fa";
import { SiSupabase, SiTailwindcss } from "react-icons/si";

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {/* Scroll To Top Button */}
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-indigo-500 ${showScrollTop
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-10 opacity-0"
                    }`}
            >
                <FaArrowUp className="text-lg" />
            </button>

            {/* Footer */}
            <footer className="mt-24 border-t border-gray-200 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-center md:justify-between">

                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-indigo-600">
                            RRV7 CRUD
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
                            A modern CRUD application built with React Router v7,
                            Supabase, and Tailwind CSS.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
                        <a
                            href="/"
                            className="transition hover:text-indigo-600"
                        >
                            Home
                        </a>

                        <a
                            href="/new"
                            className="transition hover:text-indigo-600"
                        >
                            Create Item
                        </a>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 transition hover:text-indigo-600"
                        >
                            <FaGithub />
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="border-t border-gray-200">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-gray-500 md:flex-row">

                        <p>
                            © {new Date().getFullYear()} RRV7 CRUD. All rights reserved.
                        </p>

                        <div className="flex items-center gap-5 text-lg">
                            <div className="flex items-center gap-2">
                                <FaReact className="text-sky-500" />
                                <span className="text-sm">React</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <SiSupabase className="text-green-500" />
                                <span className="text-sm">Supabase</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <SiTailwindcss className="text-cyan-500" />
                                <span className="text-sm">Tailwind</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}