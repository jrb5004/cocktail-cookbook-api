const CocktailsService = {

    getAllCocktails(knex) {
        return knex.select('*').from('cocktails')
    },
   
    getById(knex, id) {
        return knex.from('cocktails').select('*').where('id', id).first()
    },

    insertRecipe(knex, newrecipe) {
        return knex
            .insert(newrecipe)
            .into('cocktails')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    updateRecipe(knex, id, newRecipeFields) {
        return knex('cocktails')
        .where({ id })
        .update(newRecipeFields)
    },

    addReview(knex, id, newReview) {
        return knex('cocktails')
        .where({ id })
        .update({reviews: knex.raw('array_append(reviews, ?)', [newReview])})
    },
}


module.exports = CocktailsService