import { supabase } from "~/supabase-client";
import type { Route } from "./+types/item";
import { Form, redirect, type ActionFunctionArgs } from "react-router";

export function meta({ params }: Route.MetaArgs) {
    return [
        { title: `Edit Item ${params.id} | RRV7 Crud` },
        {
            name: "description",
            content: "Edit or delete an item using our Supabase CRUD app.",
        },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params;

    if (!id) {
        return { error: "No item found." };
    }

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return { error: error.message };
    }

    return { item: data };
}

export async function action({
    request,
    params,
}: ActionFunctionArgs) {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const intent = formData.get("intent");

    if (intent === "delete") {
        const { error } = await supabase
            .from("items")
            .delete()
            .eq("id", params.id);

        if (error) {
            return { error: error.message };
        }

        return redirect("/");
    }

    if (intent === "update") {
        const { error } = await supabase
            .from("items")
            .update({
                title,
                description,
            })
            .eq("id", params.id);

        if (error) {
            return { error: error.message };
        }

        return { updated: true };
    }

    return {};
}

export default function Item({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    const { item, error } = loaderData;

    if (error) {
        return (
            <div className="mx-auto max-w-2xl">
                <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tight text-gray-900">
                    Edit Item
                </h1>

                <p className="mt-2 text-gray-500">
                    Update or remove this item from your collection.
                </p>
            </div>

            {actionData?.error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
                    {actionData.error}
                </div>
            )}

            {actionData?.updated && (
                <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 shadow-sm">
                    Item updated successfully!
                </div>
            )}

            <Form
                method="post"
                className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Title
                    </label>

                    <input
                        name="title"
                        type="text"
                        defaultValue={item.title}
                        className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        placeholder="Enter item title..."
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Content
                    </label>

                    <textarea
                        name="description"
                        rows={6}
                        defaultValue={item.description}
                        className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        placeholder="Write something..."
                        required
                    />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                        type="submit"
                        name="intent"
                        value="update"
                        className="flex-1 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-200"
                    >
                        Update Item
                    </button>

                    <button
                        type="submit"
                        name="intent"
                        value="delete"
                        className="flex-1 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-red-500 hover:shadow-lg hover:shadow-red-200"
                    >
                        Delete Item
                    </button>
                </div>
            </Form>
        </div>
    );
}