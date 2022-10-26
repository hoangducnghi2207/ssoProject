import {v4 as uuidv4} from 'uuid'
import LoginRegisterService from '../service/loginRegisterService'
import {createJWT} from "../middleware/JWTAction"

const getLoginPage=(req,res)=>{
    const serviceURL=req.query.serviceURL
    console.log(3,serviceURL);
    return res.render ('login.ejs',{
        redirectURL:serviceURL
    })
}
const verifySSOToken=async (req,res)=>{
    const ssoToken=req.body.ssoToken
    console.log(req.user)
    if(req.user && req.user.code && req.user.code===ssoToken){
        const refreshToken=uuidv4()
        await LoginRegisterService.updateRefreshToken(req.user.email,refreshToken)

        let payload={
            email:req.user.email,
            groupWithRoles: req.user.groupWithRoles,
            username:req.user.username
        }
        let token= createJWT(payload)
        const resData={
            access_token:token,
            refresh_token: refreshToken,
            email: req.user.email,
            groupWithRoles: req.user.groupWithRoles,
            username: req.user.username
        }
        console.log(32,resData);
        //destroy function
        req.session.destroy(function(err){
            req.logout()
        })
        return res.status(200).json({
            EM:'ok',EC:0, DT:resData
        })
    }
    return res.status(200).json({
        EM:'ok',
        EC:0,
        DT:req.body.ssoToken
    })
}

module.exports={getLoginPage,verifySSOToken}