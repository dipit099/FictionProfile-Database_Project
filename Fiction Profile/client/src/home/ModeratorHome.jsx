import Navbar from "../navbar/Navbar";
import { useLocation } from 'react-router-dom';

function ModeratorHome() {
    const location = useLocation();
    const email = location.state && location.state.email;
    const role = location.state && location.state.role;
    console.log("in homepage, email " + email + " role " + role);

    return (
        <div className="home-container">
            <Navbar role={role} />
            <div className="home-content">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Hello {email}</h1>
                <h1 style={{ color: 'white', textAlign: 'center' }}>Moderator</h1>
                
            </div>
        </div>
    )
}
export default ModeratorHome;