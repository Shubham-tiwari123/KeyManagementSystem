import React from "react";
import {GoogleLogout, useGoogleLogout} from "react-google-login";

export default function Logout({props}) {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const onLogoutSuccess = async (res) => {
        localStorage.removeItem("token")
        console.log("Logout success!! ")
        console.log("props:",props)
        props.history.push("/")
    }

    const onFailure = async (res)=>{
        console.log("Failed!!", res)
    }

    /*const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    })*/

    return (
        <div>
            <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={onLogoutSuccess}
                onFailure={onFailure}
                style={{marginTop:"300px"}}
            />
            {/*<button onClick={signOut} className="button">
                <span className="buttonText">Sign out</span>
            </button>*/}
        </div>
    );
}
