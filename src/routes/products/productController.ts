import { Request, Response } from "express";

function getAllProducts(req: Request, res: Response) {
  res.send("List of products");
}

function getProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("A product details for" + " " + req.params.id);
}

function createProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send("Create a product" + " " + (req.body ?? 'NA'));
}

function updateProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update a product");
}

function deleteProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete a product");
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
