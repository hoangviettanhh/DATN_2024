const db = require("../config/db");

class Product {
    constructor(ProductID, ProductName, Description, Price, Quantity, Discount, CategoryID, SupplierID) {
        this.ProductID = ProductID;
        this.ProductName = ProductName;
        this.Description = Description;
        this.Price = Price;
        this.Quantity = Quantity;
        this.Discount = Discount;
        this.CategoryID = CategoryID;
        this.SupplierID = SupplierID;
    }


    static async findByCategoryAndPriceRange(categoryId, minPrice, maxPrice) {
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
              AND c.status = 'active' AND p.status = 'active'
              AND ((? IS NULL AND ? IS NULL) OR (p.price BETWEEN ? AND ?))
        `;

        return new Promise((resolve, reject) => {
            db.execute(query, [categoryId, categoryId, minPrice, maxPrice, minPrice, maxPrice], (err, rows) => {
                if (err) {
                    reject(new Error('Error executing query: ' + err.message));
                    return;
                }
                resolve(rows); // Trả về tất cả các dòng kết quả
            });
        });
    }





}

module.exports = Product;




