import express, { json, urlencoded } from "express";
import productRouter from "./routes/products";

const port = 3000

const app = express();

// this must be about the router middleware
app.use(json());
app.use(urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send('Home route')
});

app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
