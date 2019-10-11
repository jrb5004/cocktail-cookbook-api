function makeCategoriesArray() {
    return [
      {
        id: 1,
        name: 'Category One',
        description: 'All about category one.'
      },
      {
        id: 2,
        name: 'Category Two',
        description: 'All about category two.'
      },
      {
        id: 3,
        name: 'Category Three ',
        description: 'All about category three.'
      }
    ]
  }
  
  function makeRecipeArray() {
    return [
        {
          id: 1,
          name: 'First Cocktail',
          category_id: 3,
          ingredients: [
              'first ingredient',
              'second ingredient',
              'this ingredient'
          ],
          steps: [
              'step one',
              'step two',
              'step three'
          ],
          reviews: [
              'sample review'
          ]
        },
        {
            id: 2,
            name: 'Second Cocktail',
            category_id: 3,
            ingredients: [
                'first ingredient',
                'second ingredient',
                'this ingredient'
            ],
            steps: [
                'step one',
                'step two',
                'step three'
            ],
            reviews: [
                'sample review'
            ]
          },
      ]
  }
  
  module.exports = {
    makeCategoriesArray,
    makeRecipeArray,
  }