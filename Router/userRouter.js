const router=require("express").Router();
const userCtrl=require('../Controller/userControl');

router.post("/create_rule",userCtrl.create_rule);
router.post("/evaluate_rule",userCtrl.evaluate_rule);
router.post("/combine_rules",userCtrl.combine_rules);

module.exports=router;
