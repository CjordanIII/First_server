const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000


app.engine('madeline',(filePath,option,callback)=>{
    fs.readFile(filePath,(err,content)=>{
        if(err) return callback(err)
        const rendered = content
          .toString()
          .replace("#title#", "<title>" + option.title + "</title>")
          .replace("#message#", "<header>" + option.message + "</header>")
          .replace("#content#", "<div>" + option.content + "</div>")
          .replace("#messageToUser#", "<div> <a href=http://localhost:3000/98>" + option.messageToUser + "</a></div>");
          console.log(rendered)
          return callback(null,rendered)
    })
})



app.set('views','./views')



app.get("/",(req,res)=>{
    res.render('template',{title:'Week 11 day 2 homework',message:"Bear on the wall",content:'99 Bottles of bee on the wall',messageToUser:"Take one down , pass it around "})
})

app.get("/:number_of_bottles", (req, res) => {
  const bottles = parseInt(req.params.number_of_bottles); // Convert parameter to an integer
  const nextBottles = bottles - 1; // Calculate the next number of bottles
if(bottles!=0){
  res.send(`
        ${bottles} Bottles of beer on the wall
        <a href="http://localhost:3000/${nextBottles}">Take one down, pass it around</a>
    `);
}else{
      res.send(`
        ${bottles} Bottles of beer on the wall
        <a href="http://localhost:3000/bugs/127">Take one down, pass it around</a>
    `);
}

});

app.get('/bugs/:number_of_errors',(req,res)=>{
    const errors = parseInt(req.params.number_of_errors)
    const nextError = errors - 1;

    if (errors != 0) {
      res.send(`
        ${errors} bugs in the code
        <a href="http://localhost:3000/bugs/${nextError}">Patch it around</a>
    `);
    } else {
      res.send(`
        ${errors} bugs in the code
        <a href="http://localhost:3000/99">Patch it around</a>
    `);
    }
})


app.set('view engine',"madeline")



app.listen(port,()=>{
    console.log(`server running on ${port}`)
})








