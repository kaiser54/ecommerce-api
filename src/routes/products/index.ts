import { Router } from "express";

const productRouter = Router()

productRouter.get("/", (req, res) => {
  res.send('Get list of products')
});

productRouter.get("/:id", (req, res) => {
  console.log(req.params)
  res.send('A product details for' + ' ' + req.params.id)
});

productRouter.post('/', (req, res) => {
  res.send('Create a product' + ' ' + req.body)
})

productRouter.put("/:id", (req, res) => {
  console.log(req.params)
  res.send('Update a product')
});

productRouter.delete("/:id", (req, res) => {
  console.log(req.params)
  res.send('Delete a product')
})

export default productRouter