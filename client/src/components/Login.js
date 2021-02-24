import React, {useEffect} from "react";
import {GoogleLogin} from "react-google-login";
import {verify} from 'jsonwebtoken'

export default function Login(props) {

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token!==null){
            verify(token,'veryveryveryverysecret',(err,decoded)=>{
                console.log("err:",err)
                console.log("decoded:",decoded)
                props.history.push("/dashboard")
            })
        }
    },[])

    const onSuccess = async (googleData) => {
        console.log("Login success!! ",googleData)
        const result = await fetch("http://localhost:5000/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Result:",result)
        if (result.ok){
            const data = await result.json()
            console.log("Data:",data)
            localStorage.setItem("token",data.jwtToken)
            props.history.push("/dashboard")
        }

        // store returned user somehow
    }

    const onFailure = async (res) =>{
        console.log("Login failed!! ", res)
    }
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop:"100px"}}
            />
        </div>
    );
}
