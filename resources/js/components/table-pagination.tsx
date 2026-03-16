import { Pagination } from "@/types/pagination";
import { Link } from "@inertiajs/react";

export default function TablePagination({ links, total, to, from }: Pagination) {
    return (
        <div className="flex flex-col items-center justify-between gap-4 border-t bg-white px-8 py-5 sm:flex-row dark:bg-gray-950">
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold">{from}</span> to{" "}
                <span className="font-semibold">{to}</span> of{" "}
                <span className="font-semibold">{total}</span> results
            </div>

            <div className="flex items-center gap-1">
                {links.map((link, index) =>
                    link.url !== null && (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )
                )}
            </div>
        </div>
    );
}