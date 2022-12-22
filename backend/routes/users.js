var express = require('express');
var router = express.Router();
var sql = require("mysql2");
const {
  getAllUsers,
  getAccountInfo,
  getTransactionInfo,
  getUserCount
} = require("../controllers/admin");
const {addUser, loginUser} = require("../controllers/user/index");




/* GET users listing. */
router.get('/', async(req, res, next) => {
  const users = await getAllUsers();
  res.send({users: users});
});

router.get("/add-user", (req, res,next)=>{
  res.send('add user working');
})

router.get('/account-info', async(req, res, next)=>{
  const {id} = req.query;
  const accountInfo = await getAccountInfo(id);
  if(accountInfo){
     return res.send({ success: true, account: accountInfo });
  }
  res.send({ success: false });
})


router.get("/transaction-info", async (req, res, next) => {
  const { id } = req.query;
  const transactionInfo = await getTransactionInfo(id);
  if (transactionInfo) {
    return res.send({ success: true, transactions: transactionInfo });
  }
  res.send({ success: false });
});

router.get("/user-count", async (req, res, next) => {
  const { month, year } = req.query;
  const userCount = await getUserCount(month, year);
  if (userCount) {
    return res.send({ success: true, count: userCount });
  }
  res.send({ success: false });
});


router.post("/add-user", async(req, res, next)=>{
  //perform database things here
  const { email, password, name, address, phone, branch, type } = req.body;
  const result = await addUser(email, password, name, address, phone, branch, type );
  if (result) {
    return res.send({ success: true });
  }
  res.send({ success: false })
})

//come back to this for sessions
router.get("/check-session", (req, res, next) => {
  if (req.session.user) {
    res.send({ session: true, user: req.session.user });
  }
  res.send({ session: false, user: null });
});

router.post("/login-user", async(req, res, next)=>{
  //perform database things here
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  if (result) {
    req.session.user = result;
    return res.status(200).send({ success: true })
  }
  return res.status(500).send({ success: false })
})

module.exports = router;
