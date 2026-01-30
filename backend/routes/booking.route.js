import { Router } from "express";
import { createBooking, getUserBookings, updateBookingStatus } from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// All booking routes require authentication
router.use(protect);

router.post('/create', createBooking);
router.get('/user', getUserBookings);
router.put('/:bookingId/status', updateBookingStatus);

export default router;
