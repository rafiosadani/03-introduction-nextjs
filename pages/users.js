export async function getStaticProps() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    return {
        props: {
            users
        }
    }
}

export default function Users({ users }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-8 px-24">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">📋 Daftar Pengguna</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {users.map((user) => (
                    <a
                        key={user.id}
                        href={`/users/${user.id}`}
                        className="bg-white border border-blue-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-200 hover:scale-102 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">{user.name}</h2>
                            <p className="text-sm text-gray-600">📧 {user.email}</p>
                            <p className="text-sm text-gray-600">📞 {user.phone}</p>
                            <p className="text-sm text-gray-600">🌐 {user.website}</p>
                        </div>
                        <div className="mt-4 text-right">
                            <span className="inline-block text-xs text-white bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded-full">
                                Detail
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>

    );
};