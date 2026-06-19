
interface UserProps {
    name: string;
    userRole: string;
    roles: string[];
}

export default function UserProfile({ name, userRole, roles = [] }: UserProps) {

    return (
        <div>
            <h4>{name}</h4>
            <p>{roles.indexOf("admin") >= 0 ? 'Admin' : 'User'}</p>
        </div>
    );
}