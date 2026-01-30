import { Router } from "express";
import { addToFavourites, getFavourites, removeFromFavouritesByVenue } from "../controllers/favourite.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// All favourite routes require authentication
router.use(protect);

router.post('/add', addToFavourites);
router.get('/user', getFavourites);
router.delete('/remove', removeFromFavouritesByVenue); // Use query parameter instead

export default router;
