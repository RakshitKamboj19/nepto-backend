import asyncHandler from "../middlewares/asyncHandler.js";
import { sendContactFormEmail } from "../utils/emailService.js";

// Handle contact form submissions
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  
  try {
    // Send the contact form email
    const emailSent = await sendContactFormEmail(name, email, subject, message);
    
    if (emailSent) {
      res.status(200).json({ 
        message: "Your message has been sent. We'll get back to you soon!",
        success: true 
      });
    } else {
      res.status(500);
      throw new Error("Failed to send your message. Please try again later.");
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    throw new Error(error.message || "Failed to send your message");
  }
});

export { submitContactForm };
