MongoDB Bookstore Assignment
📖 Overview

This assignment demonstrates how to design, populate, and query a MongoDB database using the insert_books.js script. The database stores information about books, including details such as title, author, genre, price, and stock availability. The tasks cover CRUD operations, advanced queries, aggregation pipelines, and indexing to improve query performance.

🛠️ Setup Instructions

Install MongoDB locally or connect to a MongoDB Atlas cluster.

Install Node.js dependencies:

npm install mongodb


Run the script to insert book data:

node insert_books.js


This will insert at least 10 book documents into the plp_bookstore database, inside the books collection.

Database Schema

Each book document has the following fields:

title (string) → Title of the book

author (string) → Author’s name

genre (string) → Genre (Fiction, Fantasy, Romance, etc.)

published_year (number) → Year the book was published

price (number) → Book price in USD

in_stock (boolean) → Availability (true = available, false = out of stock)

pages (number) → Total number of pages

publisher (string) → Name of publisher

📝 Task 2: Basic Queries

Find all books in a specific genre:

db.books.find({ genre: "Fiction" })


Find books published after a certain year:

db.books.find({ published_year: { $gt: 2000 } })


Find books by a specific author:

db.books.find({ author: "George Orwell" })


Update the price of a specific book:

db.books.updateOne({ title: "1984" }, { $set: { price: 12.99 } })


Delete a book by its title:

db.books.deleteOne({ title: "The Hobbit" })

📝 Task 3: Advanced Queries

Find books in stock and published after 2010:

db.books.find({ in_stock: true, published_year: { $gt: 2010 } })


Use projection (only return title, author, price):

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })


Sorting by price:

Ascending:

db.books.find().sort({ price: 1 })


Descending:

db.books.find().sort({ price: -1 })


Pagination (5 books per page):

// Page 1
db.books.find().limit(5)

// Page 2
db.books.find().skip(5).limit(5)

📝 Task 4: Aggregation Pipeline

Average price of books by genre:

db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])


Find the author with the most books:

db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])


Group books by publication decade and count them:

db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

📝 Task 5: Indexing

Create an index on the title field:

db.books.createIndex({ title: 1 })


Create a compound index on author and published_year:

db.books.createIndex({ author: 1, published_year: -1 })


Use explain() to check performance:

db.books.find({ title: "1984" }).explain("executionStats")
