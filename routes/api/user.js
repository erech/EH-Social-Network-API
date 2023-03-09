const router = require("express").Router();
const 
{
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user.js");


router.route("/")
  .get(getAllUser)
  .post(createUser);

  router.route("#")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route("#")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;