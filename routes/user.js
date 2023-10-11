import express from "express";
import { login, register, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.get("/logout", logout);



router.get("/",  (req,res) => {
    res.send("Nice Working ")
})
//Dynamic route should be at the end
// router.get("/userid/:id", getUserDetails);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

//If we have same routes then we can do this
router
.get("/me" , isAuthenticated ,getMyProfile)
    // .route("/userid/:id")
    // .put(updateUser)
    // .delete(deleteUser) 



export default router;