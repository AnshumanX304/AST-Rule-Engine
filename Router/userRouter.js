const router=require("express").Router();
const userCtrl=require('../Controller/userControl');

router.post("/create_rule",userCtrl.create_rule);

module.exports=router;
