const express = require('express');
const app = express();
const port = 5500; 

//middleware

const axios = require('axios');
const _ = require('lodash');

// analyzing blog data
app.use('/api/blog', async (req, res, next) => {
  try {
    const response = await axios.get('https://api/blog-stats');

    // analyzing the data using Lodash
    const totalBlogs = blogData.length;
    const longestTitleBlog = _.maxBy(blogData, (blog) => blog.title.length);
    const uniqueTitles = _.uniqBy(blogData, 'title');
    const blogsWordPrivacy = blogData.filter((blog) =>
  blog.title.toLowerCase().includes('privacy')
);
const numBlogsWordPrivacy = blogsWordPrivacy.length;

    // Attaching the analysis
    req.blogAnalytics = {
      totalBlogs,
      longestTitleBlog,
      uniqueTitles,
      numBlogsWordPrivacy
    };

    next();
  } catch (error) {
    next(error); // error handler
  }
});

// blog search
app.get('/api/blog-search', (req, res) => {
  const { query } = req.query;
  const blogData = req.blogAnalytics; // Accessing the analyzed data from middleware

  // Filter the blog data by title containing the query string
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
