//import { userState } from 'react';

interface UserProfileProps {
    name: string;
    userRole: string;
    roles: string[];
    onRoleChange: (newRole: string) => void;
};

export default function RoleDashboardPage({ name, userRole, roles, onRoleChange }: UserProfileProps) {

    return (
        <>
            <div>
                <h2>Role Dashboard</h2>
                <p>Welcome to the role dashboard. {name} Here you can manage your roles and permissions.</p>
                <p>Active Role: {userRole}</p>
                <p>{userRole == "admin" ? "Admin" : "User"}</p>
                <ul>
                    {roles.length > 0 && (
                        roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))
                    )
                    }
                </ul>
            </div>
        </>
    );
};