const nodemailer = require("nodemailer");

const sendApplicationEmail = async (applicationData) => {
  const {
    fullName = "Not Provided",
    email = "Not Provided",
    phone = "Not Provided",
    country = "Not Provided",
    skillLevel = "Not Provided",
    experience = "Not Provided",
    whyJoin = "No message provided"
  } = applicationData;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // 🔎 Verify transporter connection (Delivery check)
  try {
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send emails");
  } catch (error) {
    console.error("❌ SMTP Verification Failed:", error);
    throw error;
  }

  // ===============================
  // 📩 EMAIL TO ADMIN (YOU)
  // ===============================
  const adminMail = {
    from: `"YoungDevs Application" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🚀 New YoungDevs Application from ${fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:30px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:12px; padding:25px; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
          
          <h2 style="color:#0072ff; text-align:center;">
            🚀 New YoungDevs Application
          </h2>

          <hr style="margin:20px 0;" />

          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Skill Level:</strong> ${skillLevel}</p>
          <p><strong>Experience:</strong> ${experience} years</p>

          <h3 style="margin-top:20px;">Why Join YoungDevs?</h3>
          <div style="background:#f1f3f6; padding:15px; border-radius:8px;">
            ${whyJoin}
          </div>

          <hr style="margin:25px 0;" />
          <p style="font-size:12px; color:gray;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `
  };

  // ===============================
  // 📩 CONFIRMATION EMAIL TO APPLICANT
  // ===============================
  const userMail = {
    from: `"YoungDevs Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Your YoungDevs Application Has Been Received!",
    html: `
      <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#1e293b; border-radius:12px; padding:25px; color:white; text-align:center;">
          
          <h2 style="color:#38bdf8;">Welcome to YoungDevs 🚀</h2>
          
          <p style="margin-top:15px;">
            Hi <strong>${fullName}</strong>,
          </p>

          <p>
            Thank you for applying to join YoungDevs!  
            Our team will review your application and get back to you soon.
          </p>

          <div style="margin-top:20px; padding:15px; background:#334155; border-radius:8px;">
            <p><strong>Your Skill Level:</strong> ${skillLevel}</p>
            <p><strong>Experience:</strong> ${experience} years</p>
          </div>

          <p style="margin-top:25px;">
            Stay innovative. Stay building. 💻🔥
          </p>

          <p style="font-size:12px; color:#94a3b8; margin-top:20px;">
            © ${new Date().getFullYear()} YoungDevs Community
          </p>
        </div>
      </div>
    `
  };

  try {
    // Send both emails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    console.log("✅ Admin and User emails sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = { sendApplicationEmail };