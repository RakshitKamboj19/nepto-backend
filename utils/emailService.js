import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a simple transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Helps with some connection issues during development
  }
});

// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Enhanced function to send an email with spam prevention measures
const sendEmail = async (to, subject, htmlContent, textContent) => {
  try {
    console.log(`Attempting to send email to: ${to}`);
    console.log(`Subject: ${subject}`);
    
    // Add spam prevention headers and improve deliverability
    const mailOptions = {
      from: `"Nepto E-Commerce" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
      text: textContent || 'This is a fallback plain text version of the email.',
      headers: {
        'X-Priority': '1', // High priority
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
        'X-Mailer': 'Nepto E-Commerce System',
        'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=Unsubscribe>`,
        'Precedence': 'bulk'
      },
      // DKIM and SPF will be handled by Gmail automatically
      priority: 'high'
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully. Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Send welcome email to newly registered users
 * @param {string} username - User's name
 * @param {string} email - User's email address
 */
export const sendWelcomeEmail = async (username, email) => {
  console.log('Sending welcome email to:', email);
  
  const subject = 'Welcome to Nepto E-Commerce Store! 🎉';
  
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #3b82f6; margin: 0; font-size: 28px; font-weight: 700;">NEPTO</h1>
        <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium E-Commerce Store</p>
      </div>
      
      <div style="background-color: #3b82f6; height: 3px; width: 100px; margin: 0 auto 30px;"></div>
      
      <h2 style="color: #1f2937; text-align: center; font-size: 24px; margin-bottom: 20px;">Welcome to Nepto, ${username}!</h2>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Thank you for creating your account with us. We're thrilled to have you join our community of shoppers!</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
        <h3 style="color: #1f2937; font-size: 18px; margin-top: 0; margin-bottom: 15px;">Your account is now active and you can:</h3>
        <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
          <li style="margin-bottom: 8px;"><strong>Browse</strong> our exclusive collection of premium products</li>
          <li style="margin-bottom: 8px;"><strong>Save</strong> your favorite items to your wishlist</li>
          <li style="margin-bottom: 8px;"><strong>Shop</strong> securely with our protected checkout</li>
          <li style="margin-bottom: 8px;"><strong>Track</strong> your orders in real-time</li>
          <li style="margin-bottom: 0;"><strong>Manage</strong> your profile and preferences</li>
        </ul>
      </div>
      
      <div style="background-color: #dbeafe; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
        <p style="color: #1e40af; font-size: 16px; line-height: 1.6; margin: 0;">🎁 <strong>Welcome Gift:</strong> Use code <span style="background-color: #ffffff; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: bold;">WELCOME10</span> for 10% off your first purchase!</p>
      </div>
      
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="http://localhost:5174/shop" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">Start Shopping Now</a>
      </div>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">If you have any questions or need assistance, our customer support team is always ready to help!</p>
      
      <div style="text-align: center; margin-bottom: 20px;">
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Happy shopping,</p>
        <p style="color: #1f2937; font-size: 18px; font-weight: 600;">The Nepto Team</p>
      </div>
      
      <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">Connect with us:</p>
        <div style="margin-bottom: 20px;">
          <a href="#" style="display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none;">Facebook</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none;">Instagram</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none;">Twitter</a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
      </div>
    </div>
  `;
  
  const textContent = `Welcome to Nepto, ${username}! Your account is now active. Use code WELCOME10 for 10% off your first purchase! Start shopping at http://localhost:5174/shop`;
  
  return await sendEmail(email, subject, htmlContent, textContent);
};

/**
 * Send login notification email
 * @param {string} username - User's name
 * @param {string} email - User's email address
 */
export const sendLoginNotificationEmail = async (username, email) => {
  console.log('Sending login notification email to:', email);
  
  // Get device info (simplified version)
  const deviceInfo = {
    time: new Date().toLocaleString(),
    browser: 'Web Browser',
    os: 'Windows',
    location: 'Unknown Location'
  };
  
  const subject = '🔐 New Login to Your Nepto Account';
  
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #3b82f6; margin: 0; font-size: 28px; font-weight: 700;">NEPTO</h1>
        <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Account Security</p>
      </div>
      
      <div style="background-color: #3b82f6; height: 3px; width: 100px; margin: 0 auto 30px;"></div>
      
      <h2 style="color: #1f2937; text-align: center; font-size: 24px; margin-bottom: 20px;">New Account Login</h2>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Hi ${username},</p>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">We detected a new login to your Nepto account. Here are the details:</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
        <table style="width: 100%; color: #4b5563; font-size: 16px; line-height: 1.6;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Date & Time:</td>
            <td style="padding: 8px 0;">${deviceInfo.time}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Browser:</td>
            <td style="padding: 8px 0;">${deviceInfo.browser}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Device:</td>
            <td style="padding: 8px 0;">${deviceInfo.os}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Location:</td>
            <td style="padding: 8px 0;">${deviceInfo.location}</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #fee2e2; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
        <p style="color: #991b1b; font-size: 16px; line-height: 1.6; margin: 0;">⚠️ <strong>If this wasn't you</strong>, please secure your account immediately by changing your password and contacting our support team.</p>
      </div>
      
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="http://localhost:5174/profile" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block; margin-right: 10px;">Manage Account</a>
        <a href="http://localhost:5174/reset-password" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">Reset Password</a>
      </div>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">If this was you, you can safely ignore this email. We send these notifications to help keep your account secure.</p>
      
      <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 5px;">This is an automated message, please do not reply.</p>
      </div>
    </div>
  `;
  
  const textContent = `Hi ${username}, We detected a new login to your Nepto account on ${deviceInfo.time}. If this wasn't you, please reset your password immediately at http://localhost:5174/reset-password`;
  
  return await sendEmail(email, subject, htmlContent, textContent);
};

/**
 * Send order confirmation email
 * @param {string} username - User's name
 * @param {string} email - User's email address
 * @param {Object} order - Order details
 */
export const sendOrderConfirmationEmail = async (username, email, order) => {
  try {
    // Function to format price in Indian Rupees
    const formatPriceINR = (price) => {
      // Convert USD to INR (approximate conversion rate)
      const inrPrice = price * 82.5;
      
      // Format the price with Indian numbering system
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(inrPrice);
    };
    
    // Generate order items HTML
    const orderItemsHtml = order.orderItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center;">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
            <span>${item.name}</span>
          </div>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPriceINR(item.price)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPriceINR(item.qty * item.price)}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Nepto Order Confirmation #${order._id.substring(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Order Confirmation</h2>
          <p>Hello ${username},</p>
          <p>Thank you for your order! We're processing it now and will ship it as soon as possible.</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <h3 style="margin-top: 0;">Order Summary</h3>
            <p><strong>Order ID:</strong> ${order._id.substring(0, 8).toUpperCase()}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> ${order.isPaid ? 'Paid' : 'Not Paid'}</p>
          </div>
          
          <h3>Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Quantity</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Subtotal:</strong></td>
                <td style="padding: 10px; text-align: right;">${formatPriceINR(order.itemsPrice)}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Shipping:</strong></td>
                <td style="padding: 10px; text-align: right;">${formatPriceINR(order.shippingPrice)}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Tax:</strong></td>
                <td style="padding: 10px; text-align: right;">${formatPriceINR(order.taxPrice)}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">${formatPriceINR(order.totalPrice)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="margin-top: 20px;">
            <h3>Shipping Address</h3>
            <p>${order.shippingAddress.address}</p>
            <p>${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
            <p>${order.shippingAddress.country}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f8f8f8;">
            <p style="margin: 0; color: #777; font-size: 14px;">© ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

/**
 * Send password reset email with reset token
 * @param {string} username - User's name
 * @param {string} email - User's email address
 * @param {string} resetToken - Password reset token
 * @param {string} resetUrl - Frontend URL for password reset
 */
export const sendPasswordResetEmail = async (username, email, resetToken, resetUrl) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hello ${username},</p>
          <p>You requested a password reset for your Nepto E-Commerce Store account.</p>
          <p>Please click the button below to reset your password. This link is valid for 10 minutes.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}?token=${resetToken}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          </div>
          
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <p style="margin: 0; font-size: 14px;">If the button above doesn't work, copy and paste this URL into your browser:</p>
            <p style="margin: 10px 0 0; font-size: 12px; word-break: break-all;">${resetUrl}?token=${resetToken}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f8f8f8;">
            <p style="margin: 0; color: #777; font-size: 14px;">© ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

/**
 * Send contact form submission notification
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} subject - Email subject
 * @param {string} message - Email message
 */
export const sendContactFormEmail = async (name, email, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the store's email
      replyTo: email, // Set reply-to as the sender's email
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f8f8f8;">
            <p style="margin: 0; color: #777; font-size: 14px;">© ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      `
    };

    // Also send an acknowledgment to the user
    const acknowledgmentOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We Received Your Message - Nepto E-Commerce Store',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Thank You for Contacting Us</h2>
          <p>Hello ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>For your reference, here's a copy of your message:</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>If you have any additional questions, please don't hesitate to contact us again.</p>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f8f8f8;">
            <p style="margin: 0; color: #777; font-size: 14px;">© ${new Date().getFullYear()} Nepto E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(acknowledgmentOptions);
    console.log(`Contact form email received from ${email} and acknowledgment sent`);
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return false;
  }
};
