const db = require("../config/db");

class Category {
    constructor(id, categoryName, images, parentCategoryID, status, description, createdAt, updatedAt) {
        this.id = id;
        this.categoryName = categoryName;
        this.images = images;
        this.parentCategoryID = parentCategoryID;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Hàm lấy danh sách tất cả các danh mục
    static async getAllCategories() {
        const query = `
            SELECT id, category_name AS categoryName, images, parent_categoryID AS parentCategoryID, 
                   status, description, created_at AS createdAt, updated_at AS updatedAt
            FROM categories
            WHERE status = 'active'
        `;

        return new Promise((resolve, reject) => {
            db.execute(query, [], (err, rows) => {
                if (err) {
                    reject(new Error('Error executing query: ' + err.message));
                    return;
                }
                resolve(rows);
            });
        });
    }
}

module.exports = Category;
