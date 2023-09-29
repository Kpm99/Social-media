const express=require('express');

const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');//access user_controller using users.js route
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/signUP',usersController.signup);
router.get('/signIN',usersController.signin);

router.post('/create',usersController.create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signIN'},
),usersController.createsession);
router.get('/signOUT',usersController.destroy)

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signIN'}),usersController.createsession)

module.exports=router;