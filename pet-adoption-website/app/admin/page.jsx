import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { getUserFromSession } from "../../lib/auth.js";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const user = await getUserFromSession(cookieStore);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-[#fcf7ee] min-h-screen px-6 py-12">

      <h1 className="text-4xl font-bold text-gray-800">
        Welcome {user.name}!
      </h1>

            <p className="text-gray-600 mt-2">{user.email}</p>

            <p className="text-sm text-[#ff9c6b] font-semibold mt-1">Brave Paws Administrator</p>

            <div className="mt-6 mb-10">
                <a href="/auth/logout" className="bg-[#ffb38a] hover:bg-[#ff9c6b] text-white font-bold py-3 px-8 rounded-full transition shadow-md">
                Logout
            </a>
            </div>

    <AdminDashboard />
    </div>
    )
}