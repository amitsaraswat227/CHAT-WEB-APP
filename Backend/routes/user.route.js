import express from "express";
import { allUsers, login , logout, logUsers, signup } from "../controller/user.controller.js";
import SecureRoute from "../middleware/secureRoute.js";
import { upload } from "../middleware/multer.js";


const router=express.Router();

router.post('/signup',upload.single('file'),signup);


router.post('/login',login);
router.post('/logout',logout);
router.get('/allusers',SecureRoute, allUsers);
router.get('/logUsers',SecureRoute,logUsers);


export default  router;




