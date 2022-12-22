
const express = require("express");
const {createAdmin, getAllAdmins}  = require("../controllers/admin/index");

const router = express.Router();


// localhost:3000/admin/
router.get("/", async(req, res, next)=>{
    const result = await getAllAdmins();

    if (result) {
        return res.send({ success: true, result: result });
    }
    res.send({ success: false, result: {} })
})
router.get("/check-session", (req, res, next) => {
  if (req.session.user) {
    res.send({ session: true, user: req.session.user });
  }
  res.send({ session: false, user: null });
});

module.exports =  router;