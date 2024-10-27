'use strict'

const {BadRequestError, AuthFailureError, ForbiddenError} = require("../core/error.response");


const Product = require("../../models/product")

class ProductService {
    static getProductByCategoryAndPriceRange = async ({categoryId, minPrice, maxPrice}) => {
        const products =await Product.findByCategoryAndPriceRange(categoryId, minPrice, maxPrice);
        if (!products) {
            throw new BadRequestError('Bad request')
        }
        return {
            code: 200,
            metadata: {
                "products": products
            }
        }
    }
}