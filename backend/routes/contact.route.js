import { Router } from "express";
import { createContact, getUserContacts, updateContactStatus } from "../controllers/contact.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// All contact routes require authentication
router.use(protect);

// Root route for /api/contact - redirect to create
router.post('/', createContact);
router.post('/create', createContact);
router.get('/user', getUserContacts);
router.put('/:contactId/status', updateContactStatus);

export default router;
