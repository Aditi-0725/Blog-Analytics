const express = require('express');
const app = express();
const port = 5500; // You can use any port you prefer

// Define middleware and routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
