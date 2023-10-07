const express = require('express');
const app = express();
const port = 5500; // You can use any port you prefer

// Define middleware and routes here

const axios = require('axios');
const _ = require('lodash');

// Middleware for analyzing blog data
app.use('/api/blog', async (req, res, next) => {
  try {
    // Fetch data from the third-party API (replace with your API URL)
    const response = await axios.get('https://api/blog-stats');

    // Process and analyze the data using Lodash (replace with your analysis logic)
    const totalBlogs = blogData.length;
    const longestTitleBlog = _.maxBy(blogData, (blog) => blog.title.length);
    const uniqueTitles = _.uniqBy(blogData, 'title');
    const blogsWordPrivacy = blogData.filter((blog) =>
  blog.title.toLowerCase().includes('privacy')
);
const numBlogsWordPrivacy = blogsWordPrivacy.length;

    // Attach the analysis to the request object for use in routes
    req.blogAnalytics = {
      totalBlogs,
      longestTitleBlog,
      uniqueTitles,
      numBlogsWordPrivacy
    };

    next(); // Proceed to the next middleware or route
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
});

// Add a route for blog search
app.get('/api/blog-search', (req, res) => {
  const { query } = req.query;
  const blogData = req.blogAnalytics; // Access the analyzed data from middleware

  // Filter the blog data by title containing the query string (case-insensitive)
  const matchingBlogs = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  res.json(matchingBlogs);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
