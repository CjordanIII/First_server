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
          .replace("#message#", "<h1>" + option.message + "</h1>")
          .replace("#content#","<div>"+option.content+"</div>");
          console.log(rendered)
          return callback(null,rendered)
    })
})

app.set('views','./views')

app.get("/",(req,res)=>{
    res.render('template',{title:'This is title',message:"first template engin",content:'node js and express'})
})

app.set('view engine',"madeline")

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})









// app.listen(port,()=>console.log(`server running on ${port}`))
