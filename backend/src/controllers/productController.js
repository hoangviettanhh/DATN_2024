const db = require('../config/db');

exports.getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Error retrieving products', error: err});
        }
        res.json({
            message: 'Products retrieved successfully',
            products: results
        });
    });
};

exports.getAllCategory = (req, res) => {
    const query = `
        SELECT id,
               category_name     AS categoryName,
               images,
               parent_categoryID AS parentCategoryID,
               status,
               description,
               created_at        AS createdAt,
               updated_at        AS updatedAt
        FROM categories
        WHERE status = 'active'
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Error retrieving products', error: err});
        }
        res.json({
            status: 200,
            message: "Categorys retrieved successfully",
            metadata: {
                products: results
            }
        });
    });
};

exports.getProductById = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM products WHERE ProductID = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Error retrieving product', error: err});
        }
        if (results.length === 0) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.json({
            message: 'Product by id successfully',
            product: results[0]
        });
    });
};


exports.getProductsByCategoryAndPriceRange = (req, res) => {
    const {categoryId, minPrice, maxPrice} = req.query;


    const query = `
        SELECT p.id,
               p.name,
               p.price,
               p.image,
               p.description,
               p.discount,
               p.quantity,
               c.id AS category_id,
               c.category_name,
               c.description
        FROM products p
                 INNER JOIN categories c ON p.categories_id = c.id
        WHERE (c.id = ? OR ? IS NULL)
          AND c.status = 'active'
          AND p.status = 'active'
          AND ((? IS NULL AND ? IS NULL) OR (p.price BETWEEN ? AND ?))
    `;

    db.query(query, [categoryId, categoryId, minPrice, maxPrice, minPrice, maxPrice], (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Error retrieving product', error: err});
        }
        if (results.length === 0) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.json({
            message: 'Product by id successfully',
            product: results
        });
    });
};


exports.createProduct = (req, res) => {
    const {ProductName, Description, Price, Quantity, Discount, CategoryID, SupplierID} = req.body;
    const sql = 'INSERT INTO products (ProductName, Description, Price, Quantity, Discount, CategoryID, SupplierID) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [ProductName, Description, Price, Quantity, Discount, CategoryID, SupplierID], (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Error creating product', error: err});
        }
        res.status(201).json({
            message: 'Product created successfully',
            ProductID: results.insertId,
            ProductName,
            Description,
            Price,
            Quantity,
            Discount,
            CategoryID,
            SupplierID
        });
    });
};

exports.updateProduct = (req, res) => {
    const {id} = req.params;
    const {ProductName, Description, Price, Quantity, Discount, CategoryID, SupplierID} = req.body;
    const sql = 'UPDATE products SET ProductName = ?, Description = ?, Price = ?, Quantity = ?, Discount = ?, CategoryID = ?, SupplierID = ? WHERE ProductID = ?';

    db.query(sql, [ProductName, Description, Price, Quantity, Discount, CategoryID, SupplierID, id], (err) => {
        if (err) {
            return res.status(500).json({message: 'Error updating product', error: err});
        }
        res.json({
            message: 'Product updated successfully',
            ProductID: id,
            ProductName,
            Description,
            Price,
            Quantity,
            Discount,
            CategoryID,
            SupplierID
        });
    });
};

exports.deleteProduct = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM products WHERE ProductID = ?';

    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({message: 'Error deleting product', error: err});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    });
};


exports.Admin = (req, res) => {
    res.json({
        message: 'Accept access',
        status: 200
    });
    ;
};
