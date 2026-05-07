import { supabase } from "~/supabase-client";
import type { Route } from "./+types/items";
import { Link } from "react-router";

export function meta() {
    return [
        { title: `All Your Items | RRV7 Crud` },
        {
            name: "description",
            content:
                "Manage your items - view, create, and update items using our Supabase CRUD app.",
        },
    ];
}

export async function loader() {
    const { data, error } = await supabase.from("items").select("*");

    if (error) {
        return { error: error.message };
    }

    return { items: data };
}

export default function Items({ loaderData }: Route.ComponentProps) {
    const { error, items } = loaderData;

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tight text-gray-900">
                    Your Items
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage and organize your content beautifully.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items?.map((item) => (
                    <Link
                        key={item.id}
                        to={`/items/${item.id}`}
                        className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div className="h-3 w-3 rounded-full bg-indigo-500" />
                        </div>

                        <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                            {item.title}
                        </h2>

                        <p className="line-clamp-3 text-gray-600">
                            {item.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}