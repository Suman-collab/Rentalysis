
verification_template = f"""

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email address - Rentalysis</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }}

    .container {{
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      text-align: center;
    }}

    .card {{
      background-color: #ffffff;
      padding: 40px 50px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      margin-bottom: 20px;
    }}

    .logo {{
      height: 40px;
      margin-bottom: 30px;
    }}

    h1 {{
      color: #333333;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
      margin-top: 0;
    }}

    p {{
      color: #666666;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }}

    .btn {{
      display: inline-block;
      background-color: #4CAF50;
      color: #ffffff;
      font-weight: bold;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 4px;
      font-size: 16px;
      margin-bottom: 30px;
      transition: background-color 0.2s;
    }}

    .btn:hover {{
      background-color: #45a049;
    }}

    .link-text {{
      font-size: 14px;
      color: #999999;
      margin-bottom: 5px;
    }}

    .link {{
      color: #2196F3;
      text-decoration: none;
      font-size: 14px;
      word-break: break-all;
    }}

    .social-icons {{
      margin-top: 30px;
      color: #cccccc;
    }}

    .social-icons span {{
      margin: 0 10px;
      font-size: 20px;
      cursor: pointer;
    }}

    .footer {{
      color: #999999;
      font-size: 12px;
      margin-top: 20px;
    }}

    .footer-logo {{
      height: 25px;
      opacity: 0.5;
      filter: grayscale(100%);
      margin-top: 15px;
    }}
  </style>
</head>

<body>
  <div class="container">
    <!-- Main Card -->
    <div class="card">
      <!-- Brand Logo -->
      <img src="logo.png" alt="Rentalysis" class="logo">

      <!-- Title -->
      <h1>Verify your email address</h1>

      <!-- Description -->
      <p>
        Please confirm that you want to use this as your Rentalysis account email address.
        Once it's done you will be able to start renting equipments!
      </p>

      <!-- CTA Button -->
      <a href="{0}" class="btn">Verify my email</a>
      
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; 2024 Rentalysis Inc. All rights reserved.<br>
      123 Innovation Dr, Tech City, CA 94043
      <br>
      <img src="logo.png" alt="Rentalysis" class="footer-logo">
    </div>
  </div>
</body>

</html>
"""
