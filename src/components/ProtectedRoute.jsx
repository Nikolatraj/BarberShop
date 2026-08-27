import { Navigate } from "react-router-dom";
import { getUser, isLoggedIn, logout } from "@/auth";

function ProtectedRoute({ role, children }) {
    const user = getUser();

    if (!user || !isLoggedIn()) {
        logout();

        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
