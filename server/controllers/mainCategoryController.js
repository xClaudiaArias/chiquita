const MainCategory = require("../models/MainCategory");
const asyncHandler = require('express-async-handler');

const getAllMainCategories = asyncHandler(async (req, res) => {
    const mainCategories = await MainCategory.find()
    
    if (!mainCategories?.length) {
        return res.status(400).json({message: "No main categories found"})
    }
    res.json(mainCategories)
})

const createMainCategory = asyncHandler(async(req, res) => {
    const { mainCategoryName } = req.body

    if (!mainCategoryName) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const mainCategoryObj = { mainCategoryName }

    const mainCategory = MainCategory.create(mainCategoryObj)

    res.json({message: "New main category created."})
})

const updateMainCategory = asyncHandler(async(req, res) => {
    const { id, mainCategoryName } = req.body

    if ( !id || !mainCategoryName ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const duplicateMainCategory = await MainCategory.findOne({mainCategoryName})

    if (duplicateMainCategory) {
        return res.status(400).json({message: "Main category already exists."})
    }


    const mainCategory = await MainCategory.findById(id)

    if (!mainCategory) {
        return res.status(400).json({message: "No main category found."})
    }

    mainCategory.mainCategoryName = mainCategoryName

    const updatedMainCategory = await mainCategory.save()

    res.json({message: `Main category with ID ${updatedMainCategory.id} updated.`})
})

const deleteMainCategory = asyncHandler(async(req, res) => {
    const { id } = req.body

    if ( !id ) {
        return res.status(400).json({message: "Fields can't be empty."})
    }

    const mainCategory = await MainCategory.findById(id)

    const deleteMainCategory = mainCategory.deleteOne()

    res.json({message: `category with ID ${deleteMainCategory.id} has been deleted.`})
})

module.exports = {
    getAllMainCategories,
    createMainCategory,
    updateMainCategory,
    deleteMainCategory
}