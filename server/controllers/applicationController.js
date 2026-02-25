const { sendApplicationEmail } = require('../services/emailService');

exports.submitApplication = async (req, res) => {
  try {
    await sendApplicationEmail(req.body);
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit application.' });
  }
};