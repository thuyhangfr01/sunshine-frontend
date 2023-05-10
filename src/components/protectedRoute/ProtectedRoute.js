import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const {user: currentUser} = useSelector((state) => (state.auth));
    const userRole = currentUser.roles;

    if(isAdminRoute && userRole.includes("ROLE_ADMIN")) 
        {
            return (<>{props.children}</>)
        } else{
            return (<NotPermitted />)
        }
    }


const ProtectedRoute = (props) => {
    const {isLoggedIn} = useSelector(state => state.auth)

    return (
        <>
            {isLoggedIn === true ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRoute;

