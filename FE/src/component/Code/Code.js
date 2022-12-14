import { useEffect,useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Code=(props)=>{
    const [searchParams, setSearchParams]=useSearchParams()
    const firstRunRef=useRef(false)
    useEffect(()=>{
        const ssoToken=searchParams.get('ssoToken')
        if(ssoToken && firstRunRef.current===false){
            firstRunRef.current= true;
            axios.post(process.env.REACT_APP_BACKEND_VERIFY_TOKEN,{ssoToken},{withCredentials:true})
            .then(res=>{
                console.log(13,res);
            }).catch(err=>{
                console.log(15,err);
            })
        }
    },[])
    return(<>
        code
    </>)
}
export default Code