"use client";

import { Calendar, House, ListCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    const linkClass = (href: string) => {
        const isActive = pathname === href;
        return `flex gap-1 transition-colors font-medium ${
            isActive
                ? "text-red-600"
                : "text-foreground/80 hover:text-foreground"
        }`;
    };

    return (
        <nav className="bg-background border-b border-foreground/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex gap-6">
                <Link href="/" className={linkClass("/")}>
                    <House /> Home
                </Link>
                <Link href="/pages/todos" className={linkClass("/pages/todos")}>
                    <ListCheck /> Todos
                </Link>
                <Link href="/pages/calendar" className={linkClass("/pages/calendar")}>
                    <Calendar /> Calendar
                </Link>
            </div>
        </nav>
    )
};

export default Navbar;
