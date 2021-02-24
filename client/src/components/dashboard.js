import React from "react";
import Logout from "./Logout";

export default function Dashboard(props){
    return(
        <div>
            <h1>
                Welcome to dashboard
                <Logout props={props}/>
            </h1>
        </div>
    )
}