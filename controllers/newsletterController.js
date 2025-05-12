import asyncHandler from "../middlewares/asyncHandler.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using Gmail SMTP with improved configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // neptoecommerce24x7@gmail.com
    pass: process.env.EMAIL_PASSWORD // your app password
  },
  tls: {
    rejectUnauthorized: false // Helps with some connection issues during development
  },
  pool: true, // Use pooled connection for better performance
  maxConnections: 5, // Maximum number of simultaneous connections
  maxMessages: 100, // Maximum number of messages per connection
  rateDelta: 1000, // Define how many messages to send in rateDelta time
  rateLimit: 5 // Maximum number of messages to send in rateDelta milliseconds
});

// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
    console.log('Email configured with:', process.env.EMAIL_USER);
  }
});

// Subscribe to newsletter
const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  
  try {
    console.log('Processing newsletter subscription for:', email);
    
    // Send confirmation email to subscriber with improved design
    const subscriberMailOptions = {
      from: `"Nepto Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank You SO MUCH for Joining Our Nepto Family! 🎉❤️',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #3b82f6; margin: 0; font-size: 28px; font-weight: 700;">NEPTO</h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium E-Commerce Store</p>
          </div>
          
          <div style="background-color: #3b82f6; height: 3px; width: 100px; margin: 0 auto 30px;"></div>
          
          <h2 style="color: #1f2937; text-align: center; font-size: 24px; margin-bottom: 20px;">We're Incredibly Grateful You Joined Us! ❤️</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Dear Valued Subscriber,</p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">From the bottom of our hearts, <strong>THANK YOU</strong> for subscribing to the Nepto E-Commerce Store newsletter! Your decision to join our community means the world to us, and we're truly honored that you've chosen to be part of our journey.</p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">As a special subscriber, you'll now enjoy these exclusive benefits:</p>
          
          <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            <li><strong>VIP Access</strong> to our best deals before anyone else</li>
            <li><strong>First Look</strong> at exciting new product launches</li>
            <li><strong>Special Invitations</strong> to subscriber-only sales events</li>
            <li><strong>Personalized</strong> shopping recommendations just for you</li>
          </ul>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">🎁 <strong>Our Gift of Appreciation:</strong> Use code <span style="background-color: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: bold;">THANKYOU15</span> for 15% off your next purchase as our way of saying thanks!</p>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Your support means everything to us. We started Nepto with a vision to create an exceptional shopping experience, and it's subscribers like you who make this dream possible. We promise to work tirelessly to bring you the best products, deals, and content.</p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">We can't wait to embark on this journey with you and are committed to exceeding your expectations every step of the way!</p>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="http://localhost:5174/shop" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">Explore Our Collection Now</a>
          </div>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">With heartfelt gratitude,</p>
            <p style="color: #1f2937; font-size: 18px; font-weight: 600;">The Nepto Team ❤️</p>
          </div>
          
          <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">Connect with our community:</p>
            <div style="margin-bottom: 20px;">
              <a href="#" style="display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none;">Facebook</a>
              <a href="#" style="display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none;">Instagram</a>
              <a href="#" style="display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none;">Twitter</a>
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 5px;">If you wish to unsubscribe, <a href="#" style="color: #6b7280;">click here</a>.</p>
          </div>
        </div>
      `,
      // Add text alternative for email clients that don't support HTML
      text: `Thanks for subscribing to Nepto E-Commerce Store newsletter! You'll now receive updates about our latest products, exclusive offers, and promotions. Use code THANKYOU15 for 15% off your next purchase! Visit us at http://localhost:5174/shop`
    };

    // Send notification to admin with improved design and more information
    const adminMailOptions = {
      from: `"Nepto Store" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '🔔 New Newsletter Subscription',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #3b82f6; margin: 0; font-size: 28px; font-weight: 700;">NEPTO ADMIN</h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Subscription Notification</p>
          </div>
          
          <div style="background-color: #3b82f6; height: 3px; width: 100px; margin: 0 auto 30px;"></div>
          
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">New Newsletter Subscriber!</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Subscriber Details:</h3>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 10px;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 10px;"><strong>IP Address:</strong> [IP address not collected for privacy]</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;"><strong>Subscription Source:</strong> Newsletter form on homepage</p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Subscription Statistics:</h3>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">Your subscriber list is growing! Remember to send regular newsletters to keep your audience engaged.</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="http://localhost:5174/admin/dashboard" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">View Admin Dashboard</a>
          </div>
          
          <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      `,
      // Add text alternative for email clients that don't support HTML
      text: `New Newsletter Subscription! Email: ${email}, Date: ${new Date().toLocaleString()}. View your admin dashboard at http://localhost:5174/admin/dashboard`
    };

    try {
      // Send response immediately for better user experience
      res.status(200).json({ 
        message: "Successfully subscribed to the newsletter! Check your email inbox for a welcome message.",
        success: true
      });
      
      // Use Promise.all to send both emails in parallel
      console.log('Sending emails...');
      Promise.all([
        // Send welcome email to subscriber
        transporter.sendMail(subscriberMailOptions)
          .then(() => console.log('Welcome email sent successfully to', email))
          .catch(err => console.error('Error sending welcome email:', err)),
        
        // Send notification to admin
        transporter.sendMail(adminMailOptions)
          .then(() => console.log('Admin notification sent successfully to', process.env.EMAIL_USER))
          .catch(err => console.error('Error sending admin notification:', err))
      ])
      .then(() => console.log('All emails sent successfully'))
      .catch(err => console.error('Error in email sending:', err));
      
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(500).json({
        message: "Subscription recorded but email delivery failed. Please try again later.",
        error: emailError.message,
        success: false
      });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500);
    throw new Error("Failed to subscribe to the newsletter. Please try again later.");
  }
});

export { subscribeNewsletter };
