import { useRouter } from 'next/router';
import Link from "next/link";

export async function getStaticPaths() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const paths = users.map((user) => ({
        params: { id: user.id.toString() },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);

        if (!response.ok) {
            return { props: { user: null } };
        }

        const user = await response.json();

        if (!user || !user.id) {
            return { props: { user: null } };
        }

        return { props: { user } };

    } catch (err) {
        console.error("Error fetching user data:", err); // log error untuk debugging
        return { props: { user: null } };
    }
}

const UserDetail = ({ user }) => {
    const router = useRouter();

    // Saat loading (fallback true)
    if (router.isFallback) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-yellow-50 text-yellow-700 p-6">
                <div className="text-center">
                    <h1 className="text-xl font-semibold">⏳ Sedang memuat data pengguna...</h1>
                </div>
            </div>
        );
    }

    // Kalau user tidak ditemukan
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 p-6">
                <div className="bg-white border border-red-300 rounded-xl shadow-md p-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Pengguna Tidak Ditemukan</h1>
                    <p className="mb-4">ID pengguna tidak valid atau sudah dihapus.</p>
                    <Link href="/users" className="text-blue-600 hover:underline">
                        ← Kembali ke Daftar Pengguna
                    </Link>
                </div>
            </div>
        );
    }

    // Jika user ditemukan
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white p-8 flex items-center justify-center">
            <div className="bg-white border border-yellow-300 rounded-2xl shadow-lg p-8 w-full max-w-xl">
                <h1 className="text-3xl font-bold text-yellow-700 mb-4">👤 {user.name}</h1>
                <div className="flex flex-col justify-between">
                    <div className="space-y-2 text-gray-700">
                        <p><strong>📧 Email:</strong> {user.email}</p>
                        <p><strong>📞 Phone:</strong> {user.phone}</p>
                        <p><strong>🌐 Website:</strong> {user.website}</p>
                        <p><strong>🏢 Company:</strong> {user.company.name}</p>
                        <p><strong>📍 Address:</strong> {user.address.street}, {user.address.city}</p>
                    </div>
                    <div className="text-right">
                        <Link href="/users" className="mt-6 inline-block text-blue-600 hover:underline">
                            ← Kembali ke Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;