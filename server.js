// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a schema
const schema = buildSchema(`
type About {
  message: String!
}

type Meal {
	description: String!
}

enum MealTime {
    breakfast
    lunch 
    dinner
  }

type Query {
    getAbout: About
      getmeal(time: String!): Meal
  }`)

// Define a resolver
const root = {
    getAbout: () => {
      return { message: 'Hello World' }
    },
      getmeal: ({ time }) => {
          const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
          const meal = allMeals[time]
          return { description: meal }
      }
  }

// Create an express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))

// Start this app
const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})
