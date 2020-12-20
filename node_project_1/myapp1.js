const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();


// connect to mongodb
const dbURI = 'mongodb+srv://new-user_31:test1234@cluster0.oqwop.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//app.get("/add-blog", function(req, res) {
//  const blog = new Blog({
//    title: 'new blog 2',
//    snippet: 'about new blog',
//    body: 'more about my new blog'
//  });
//
//  blog.save()
//    .then((result) => {
//      res.send(result); 
//    })
//    .catch((err) => {
//      console.log(err);
//    });
//});
//
//app.get("/all-blogs", function(req, res) {
//  Blog.find()
//    .then((result) => {
//      res.send(result);
//    })
//    .catch((err) => {
//      console.log(err);
//    });
//});
//
//app.get("/single-blog", function(req, res) {
//  Blog.findById('5fde64695134144fa007ed9b')
//    .then((result) => {
//      res.send(result);
//    })
//    .catch((err) => {
//      console.log(err);
//    });
//});

app.get('/', (req, res) => {
  //res.send('<h1>Home Page</h1>');
  //res.sendFile('./views/index.html', { root: __dirname });
  // const blogs = [
  //  {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //  {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //  {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //];

  //res.render('index', { title: "Home", blogs: blogs } );
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //res.send('<h1>About Page</h1>');
  //res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: "About" } );
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result }); 
    })
    .catch((err) => {
      console.log(err); 
    });
}); 

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id', function(req, res) {
  const id = req.params.id;
  
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
     res.json({ redirect: '/blogs' }); 
    })
    .catch((err) => {
      console.log(err);
    });
});

//app.get('/about-us', (req, res) => {
//  res.redirect('/about');
//});

app.get('/create', (req, res) => {
  res.render('create', { title: "Create a new blog" } );
});

app.use((req, res) => {
  //res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: "404" } );
});

