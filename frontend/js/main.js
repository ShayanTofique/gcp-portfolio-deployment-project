<script>
  const form = document.getElementById('contactForm');
  if (!form) {
    console.error("❌ Form not found!")
  } else {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log("✅ Form submit event captured");

      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Response data:", data);

        document.getElementById('responseMsg').textContent = data.message;
      } catch (err) {
        console.error("Fetch error:", err);
        document.getElementById('responseMsg').textContent = "❌ Failed to submit form.";
      }
    })
  }
</script>
