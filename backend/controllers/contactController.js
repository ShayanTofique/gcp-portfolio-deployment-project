const Contact = require('../models/contactModel');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("💾 New contact saved:", newContact);
    res.status(201).json({ message: "✅ Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error submitting form", error: error.message });
  }
};
