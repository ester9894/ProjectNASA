const router = require("express").Router(); 
const user = require("../controllers/user");
const auth = require("../middleware/auth");
const picture= require("../controllers/picture")

router.post("/newUser", user.newUser);
router.post("/login", user.login);
router.get("/getPicture", auth, picture.getPicture)
router.get("/allPictures", auth, picture.allPictures)
router.post("/saveNewPicture",auth, picture.saveNewPicture)


module.exports = router;