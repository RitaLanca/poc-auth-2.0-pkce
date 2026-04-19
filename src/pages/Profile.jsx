import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { jwtDecode } from "jwt-decode";


export const Profile = () => {
  const [name, setName] = useState(undefined);
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const exchangeCodeToToken = async () => {
    const authEndpoint = import.meta.env.VITE_AUTH0_DOMAIN; 
    const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;

    const codeVerifier = sessionStorage.getItem("verifier");
    const response = await fetch(`${authEndpoint}/oauth/token`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        grant_type:"authorization_code",
        client_id: clientId,
        code: code,
        code_verifier: codeVerifier,
        redirect_uri:"http://localhost:5173/profile",
      })
    })
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (!code) return;

    const fetchUserInfo = async () => {
      const data = await exchangeCodeToToken();
      sessionStorage.setItem("access_token", data?.access_token);
      console.log(data);
      const decodedUserInfo = jwtDecode(data?.id_token);
      setName(decodedUserInfo?.name);
    };

    fetchUserInfo();
  }, [code]);

  if(name) {
    return(
      <h1>Hello {name}</h1>
    )
  }

  return(
    <h1>I'm login. My profile page</h1>
  )
}