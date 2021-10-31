const Category = require('../../models/Category');

// Crear categorías de cursos
module.exports = async (req, res, next) => {
    const { name } = req.body
    try {
        const category = new Category({
            name: name,
            // courses:courses   saque el curso porque no anda sin relaciones
        });
        await category.save();
        res.json({msg: "Category created", category});
    } catch(err) {
        next(err)
    }
}