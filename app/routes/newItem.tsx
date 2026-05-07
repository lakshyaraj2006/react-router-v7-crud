import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase-client";

export function meta() {
    return [
        { title: "Create Item | RRV7 Crud" },
        {
            name: "description",
            content: "Create a new item using our Supabase CRUD app.",
        },
    ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    return { error: "Title and content are required" };
  }

  const { error } = await supabase.from("items").insert({ title, description });

  if (error) {
    return { error: error.message };
  }

  return redirect("/");
}

export default function NewItem() {
    return (
        <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
                <h1 className="mb-2 text-4xl font-black tracking-tight">
                    Create Item
                </h1>

                <p className="mb-8 text-gray-500">
                    Add a new item to your collection.
                </p>

                <Form method="post" className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Title
                        </label>

                        <input
                            name="title"
                            type="text"
                            placeholder="Enter item title..."
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
                            placeholder="Write something amazing..."
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-200"
                    >
                        Create Item
                    </button>
                </Form>
            </div>
        </div>
    );
}