import { useEffect, useState } from 'react';
import type { UserDto } from '@/types/bff-api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

export default function UsersPage() {
    const [users, setUsers] = useState<UserDto[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/users`)
            .then((response) => response.json())
            .then((data: UserDto[]) => setUsers(data))
            .catch((err) => console.error('Failed to fetch users:', err));
    }, []);

    return (
        <div className="border border-gray-700 bg-[#0b1220] p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                USERS
            </h3>

            <table className="w-full border-separate border-slate-900 border-spacing-1 text-left text-xs">
                <thead className="border-slate-9700">
                    <tr className="text-xs uppercase">
                        <th className="px-3 py-2">Username</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-3 py-2">{user.username}</td>
                            <td className="px-3 py-2">{user.email}</td>
                            <td className="px-3 py-2">{user.name}</td>
                            <td className="px-3 py-2"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
