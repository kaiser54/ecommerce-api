import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "src/db";
import { ProductsTable } from "src/db/productSchema";

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(ProductsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [product] = await db
      .select()
      .from(ProductsTable)
      .where(eq(ProductsTable.id, id));

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(ProductsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { id: productId, ...updatedFields } = req.body;
    await db
      .update(ProductsTable)
      .set(updatedFields)
      .where(eq(ProductsTable.id, id))
      .returning()
      .then((updatedProduct) => {
        if (!updatedProduct) {
          return res.status(404).send({ message: "Product not found" });
        } else {
          res.json(updatedProduct);
        }
      });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(ProductsTable)
      .where(eq(ProductsTable.id, id))
      .returning();

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      res.status(204).json(deletedProduct);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
