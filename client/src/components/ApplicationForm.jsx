import React, { useState } from "react";
import axios from "axios";
import "./ApplicationForm.css";
import confetti from "canvas-confetti";
const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    skillLevel: "",
    experience: "",
    whyJoin: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ NEW STATE

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await axios.post(
        "https://youngdevs.onrender.com",
        formData
      );

      setStatusMessage(response.data.message);
      setSubmitted(true); // ✅ Show success screen
// 🎊 Fire real confetti
confetti({
  particleCount: 150,
  spread: 120,
  origin: { y: 0.6 },
});
      // Reset form AFTER 4 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          skillLevel: "",
          experience: "",
          whyJoin: "",
        });
      }, 4000);

    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to submit application. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (submitted) {
  return (
    <div className="success-page">
      <div className="success-card">

        <div className="checkmark-wrapper glow">
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14 27l7 7 16-16"
            />
          </svg>
        </div>

        <h2>Congratulations, {formData.fullName}! 🎉</h2>
        <p>Welcome to YoungDevs 🚀</p>
        <p>Your application was submitted successfully.</p>

      </div>
    </div>
  );
}

  return (
    <div className="app-container">
      <div className="overlay"></div>
      <div className="form-wrapper">
        <h1 className="header-text">
          <span className="tech-font">WELCOME TO</span>{" "}
          <span className="animated-text">YOUNGDEVS</span>
        </h1>

        <form className="application-form" onSubmit={handleSubmit}>
          <h2>Join YoungDevs</h2>
          <p>Be part of a vibrant professional developer community.</p>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="Ghana">Ghana</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Kenya">Kenya</option>
            <option value="India">India</option>
            <option value="Germany">Germany</option>
          </select>

          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
          >
            <option value="">Skill Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="">Years of Experience</option>
            <option value="0-1">0-1</option>
            <option value="2-3">2-3</option>
            <option value="4-5">4-5</option>
            <option value="5+">5+</option>
          </select>

          <textarea
            name="whyJoin"
            placeholder="Why do you want to join?"
            value={formData.whyJoin}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <span className="spinner-wrapper">
                <span className="spinner"></span>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>

          {statusMessage && (
            <p className="status-message">{statusMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;