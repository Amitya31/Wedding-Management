import { Router } from "express";
import { createReview, getVenueReviews, getUserReviews, updateReviewHelpful } from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// All review routes require authentication except getVenueReviews
router.post('/create', protect, createReview);
router.get('/venue/:venueId', getVenueReviews);
router.get('/user', protect, getUserReviews);
router.put('/:reviewId/helpful', protect, updateReviewHelpful);

export default router;
