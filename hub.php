<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Índice de Pastas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #212121;
      color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .folder-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .folder {
      width: 200px;
      height: 200px;
      background-color: #f44336;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .folder:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
    }
    .folder-link {
      text-decoration: none;
      color: #fff;
      font-size: 24px;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: color 0.3s;
    }
    .folder-link:hover {
      color: #ffeb3b;
    }
    .folder-link::before {
      content: "\f114";
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      margin-right: 10px;
      transition: transform 0.3s;
    }
    .folder:hover .folder-link::before {
      transform: rotate(360deg);
    }
  </style>
</head>
<body>
  <div class="folder-container">
    <div class="folder">
      <a href="/PortfolioV2/" class="folder-link">PORTFOLIO</a>
    </div>
  </div>
</body>
</html>
