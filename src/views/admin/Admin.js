import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebars/Sidebar";
import { useEffect, useRef } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import routes from "./AdminRoutes";
import ReservationCalendar from "./ReservationCalendar";
import ReservationManager from "./ReservationManager";

const Admin = (props) => {
    const mainContent = useRef(null);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    });
    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/reservation-manager",
                    imgSrc: require("../../assets/img/brand/argon-react.png"),
                    imgAlt: "..."
                }}
            />
            <div className="main-content" ref={mainContent}>
                <AdminNavbar
                    {...props}
                    brandText="Reservations"
                />
                <Switch>
                    <Route 
                        path="/admin/reservation-manager"
                        render={(props) => <ReservationManager {...props} />}
                        key={0}
                    />
                    <Route 
                        path="/admin/reservation-calendar"
                        render={(props) => <ReservationCalendar {...props} />}
                        key={1}
                    />
                    <Redirect from="/admin/*" to="/admin/reservation-manager" />
                </Switch>
            </div>
        </>
    )
}

export default Admin;