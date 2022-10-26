import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';
import loginController from '../controller/loginController';
import checkUser from '../middleware/checkUser'
import passportController from '../controller/passportController'
import passport from "passport";
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //path, handler
  router.get("/", checkUser.checkLogin, homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDelteUser)
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);
  router.get("/login", checkUser.checkLogin, loginController.getLoginPage);


  //rest api
  //GET - R, POST- C, PUT - U, DELETE - D
  router.get("/api/test-api", apiController.testApi);
  // router.post('/login', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login'
  // }));
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if(error) {
            return res.status(500).json(error);
        }
        if(!user) {
            return res.status(401).json(info.message);
        }
        req.login(user,function(err){
          console.log(42,req.user);
          if(err) return err;
          return res.status(200).json({...user,redirectURL:req.body.serviceURL})
        })
    })(req, res, next);
});
  router.post('/logout',passportController.handleLogout );
  router.post('/verify-token',loginController.verifySSOToken)
  return app.use("/", router);
}

export default initWebRoutes;