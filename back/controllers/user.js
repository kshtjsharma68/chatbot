// utils
var makeValidation = require('@withvoid/make-validation');
// models
var UserModel =  require('../models/User.js');

// class users {

//   constructor () {
//   }
  
  exports.onGetAllUsers = async (req, res) => {
      return res.status(200).json({status: true});
   };


  exports.loginUser = async function(req, res) {  
    let { email, password } = req.body; 
    try{
      await UserModel.findUserForLogin(email, password, function(err, user) {
        // if(!user.success) return res.status(400).json({success: false, error: 'user not found'});
        
        if (!err) {
          if (user) {
            return res.status(200).json({success: true, user: {email: user.email, id: user._id}});
          }
        } 
        return res.status(400).json({success: 400});
      });
    } catch( err ){
      return res.status(400).json({success: 400});
    }
    // return res.status(400).json({success: 400});
  }
  const onGetUserById = async (req, res) => {
      return res.status(200).json({status: true});
    };
  exports.onCreateUser = async (req, res) => { 
      try {
        const validation = makeValidation(types => ({
          payload: req.body,
          checks: {
            name: { type: types.string },
            email: { type: types.string },
            password: { type: types.string},
          }
        }))
        if ( !validation.success ) return res.status(400).json(validation)
        let { name, email, password } = req.body;
        const user = await UserModel.createUser(name, email, password);
        return res.status(200).json({success: true, user})  
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    }
  exports.onDeleteUserById = async(req, res) => {

   }
// }

// export defaul  t { onGetAllUsers, onCreateUser };

// module.exports = { onGetAllUsers, onCreateUser };
