import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Next.js Tutorial App</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        A full-stack deployment tutorial using Next.js 16, MongoDB Atlas,
        Tailwind CSS, shadcn/ui, and JWT authentication middleware.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Log In
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-2 border border-black rounded-md hover:bg-gray-100 transition"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
