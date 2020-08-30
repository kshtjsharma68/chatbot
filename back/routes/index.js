var express = require('express')
// controllers
var users = require('../controllers/user.js');
// middlewares
var { encode } =  require('../middlewares/jwt.js');

const router = express.Router();

router
  .get('/', users.onGetAllUsers)
router
  .post('/login', users.loginUser)
router  
  .post('/register', users.onCreateUser)
router
  .post('/login/:userId', encode, (req, res, next) => { });
// router
//   .get('/logout', )

// export default router;
module.exports = router