const express = require('express');
const ejs = require('ejs')
const path = require('path')
const app = express();
const qrcode = require('qrcode')
port = process.env.PORT || 4600; // Port number if not specified in env


app.use(express.urlencoded({extended:false})) //why we need this 
app.use(express.json()); // parse JSON data in the request body








app.set('view engine','ejs')//set a view-engine that can be use to generate the web-templates 
app.set('views',path.join(__dirname,'View'))

app.get('/',(req,res,next)=> //next is optional over there 
{
    res.render('index') //render the index.ejs file to the user 
}
)

app.post("/scan",(req,res)=>
{
    const input_text = req.body.text
    console.log(input_text)
    // res.send("generated")
    qrcode.toDataURL(input_text,(err,src)=>
    {
        res.render('scan',{
            qr_code: src,
        })
    })
})



app.listen(port,()=>
{
    console.log(`Server started on port:${port}`);
})
