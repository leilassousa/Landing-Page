<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link rel="stylesheet" href="styles2.css">
</head>
<body>
  <header>
    <h1>Welcome to My Portfolio</h1>
    <p>Your one-stop shop for business-focused design and development services.</p>
  </header>

  <main>
    <section class="service" id="web-development">
      <h2>Web Development</h2>
      <p>Custom-built landing pages, full websites, or mini apps tailored to your business needs.</p>
      <button class="add-to-basket" data-service="Web Development">Select</button>
    </section>

    <section class="service" id="visual-assets">
      <h2>Visual Assets</h2>
      <p>High-quality banners, profile pictures, and more, customized to fit your brand.</p>
      <button class="add-to-basket" data-service="Visual Assets">Select</button>
    </section>

    <section class="service" id="video-editing">
      <h2>Video Editing</h2>
      <p>Engaging product demos and short videos that showcase your offerings in style.</p>
      <button class="add-to-basket" data-service="Video Editing">Select</button>
    </section>

    <section class="service" id="motion-graphics">
      <h2>Motion Graphics</h2>
      <p>Eye-catching animations that bring your ideas to life.</p>
      <button class="add-to-basket" data-service="Motion Graphics">Select</button>
    </section>

    <section class="service" id="brand-identity">
      <h2>Brand Identity</h2>
      <p>A cohesive brand package, including logos, color palettes, and typography.</p>
      <button class="add-to-basket" data-service="Brand Identity">Select</button>
    </section>
  </main>

  <footer>
    <h2>Contact Me</h2>
    <form id="contact-form">
      <div id="basket">
        <h3>Selected Services:</h3>
        <ul id="basket-list"></ul>
      </div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="message">Message:</label>
      <textarea id="message" name="message"></textarea>

      <button type="submit">Submit</button>
    </form>
  </footer>

  <script src="script.js"></script>
</body>
</html>
