const Category = require("../models/Category");
const asyncHandler = require('express-async-handler');

const getAllCategories = asyncHandler(async(req, res) => {
    const categories = Category.find()

    if (!categories.length) {
        return res.status(400).json({message: "No categories found"})
    }

    res.json(categories)
})

const createCategory = asyncHandler(async(req, res) => {
    const { categoryName } = req.body

    if (!categoryName) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const categoryObj = { categoryName }

    const category = category.create(categoryObj)

    res.json({message: "New category created."})
})

const updateCategory = asyncHandler(async(req, res) => {
    const { id, categoryName } = req.body

    if ( !id || !categoryName ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const category = await category.findById(id).lean().exec()

    if (!category) {
        return res.status(400).json({message: "No category found."})
    }

    category.categoryName = categoryName

    const updatedCategory = await category.save()

    res.json({message: `category with ID ${updatedCategory.id} updated.`})
})

const deleteCategory = asyncHandler(async(req, res) => {
    const { id } = req.body

    if ( !id ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const category = await Category.findById(id)

    const deleteCategory = category.deleteOne()

    res.json({message: `category with ID ${deleteCategory.id} has been deleted.`})
})

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}