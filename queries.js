//Task 2: Basic Queries
//1. Find all books in a specific genre (e.g., Fantasy)
db.books.find({ genre: "Fantasy" });

//2. Find books published after a certain year (e.g., 2015)
db.books.find({ published_year: { $gt: 2015 } });

//3. Find books by a specific author (e.g., James Clear)
db.books.find({ author: "James Clear" });

//4. Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 12.5 } }
);

//5. Delete a book by its title
db.books.deleteOne({ title: "The Road" });

//Task 3: Advanced Queries
//1. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

//2. Use projection (only return title, author, price)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

//3. Sorting by price

//Ascending:

db.books.find().sort({ price: 1 });


//Descending:

db.books.find().sort({ price: -1 });

//4. Pagination (5 books per page)

//Page 1:

db.books.find().limit(5);


//Page 2:

db.books.find().skip(5).limit(5);

//Task 4: Aggregation Pipeline
//1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

//2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

//3. Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

//Task 5: Indexing
//1. Create an index on title
db.books.createIndex({ title: 1 });

//2. Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

//3. Use explain() to check performance
db.books.find({ title: "Dune" }).explain("executionStats");