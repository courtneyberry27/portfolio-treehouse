const express = require('express');
const data = require('./Treehouse_project_6/data.json');
const router = express.Router();
const projects = data.projects.slice().reverse(); // show latest projects first
const port = process.env.PORT || 3000;
const app = express();

/*******************
 * MIDDLEWARE SECTION
 *******************/

//Set view engine to pug
app.set('view engine', 'pug');
app.engine('.pug', require('pug').__express);

//utilize express 
app.use(express.json());

//to create static route
app.use('/static', express.static('public'));

//home page
app.get('/', (req, res) => {
    const templateData = { projects }
    res.render('index', templateData);
});

//about page
app.get('/about', (req, res, next) => {
    res.render('about');
    next();
});

//projects route to home page
app.get('/projects', (req, res) => {
    res.redirect('/');
  });


//individual projects pages
app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const templateData = {
        project: projects[id]
    }

    //if valid project or not
    if (templateData.project) { 
        res.render('project', templateData);
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
    
});

//404 ERROR HANDLER
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});
  
  //PORT 3000
  app.listen(port, () => {
      console.log('The application is running on localhost:3000!')
  });

  module.exports = router;
