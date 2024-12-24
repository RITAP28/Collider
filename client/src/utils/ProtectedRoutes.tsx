import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks/hook";

interface ProtectedRoutesProps {
    children: React.ReactNode;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({children}) => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.user);
    
    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }
    return children;
}