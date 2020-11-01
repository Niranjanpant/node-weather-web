const path = require("path");
const express = require("express");
const hbs = require("hbs");
const gecode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const port = process.env.PORT || 5000;

//defining paths for express config
const directory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebar engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(path.join(directory)));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Niranjan pant",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "niranjan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "Helping by joining hands",
    title: "Help",
  });
});


app.get("/weather", (req, res) => {
  if(!req.query.address) {
    res.send({
      error:"Please add the address"
    })
  } 
 
geocode(req.query.address,(error, { latitude ,longitude,location}= {} )=>{
  if(error){
    return res.send({error})
  }

  forecast(latitude,longitude,(error,forecastData)=>{
if(error){
return  res.send({error})
}
 res.send({
   forecast:forecastData,
   location,
   address:req.query.address
 })
  })
})

  
  
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "PAge Not Found",
  });
});

app.listen(port, () => {
  console.log("server is running wild " + port);
});