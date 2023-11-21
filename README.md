# BookShop

Individual Project about bookshop with <br>
Log in/out,sign up function;<br>
Book database;<br>
Select book through "Author,Price,Genre,material"


index.js:
This is a Node.js backend routing file created using the Express framework. Here are some of the main ones:

Router instance:

router is a Router instance of Express and is used to create routing handlers.
GET route '/getbooks' :

The handler is triggered when the client initiates a GET request to '/getbooks'.
Get the database connection using the connection pool (req.pool.getConnection).
Execute the query statement SELECT * FROM Book to get information about all books.
The query result is sent to the client in JSON format.
POST route '/searchBooks' :

When the client makes a POST request to '/searchBooks', the handler is triggered.
Obtain database connections using connection pools.
Gets the search keyword req.body.keyword sent by the client.
Run the query statement SELECT * FROM Book WHERE book_name LIKE? , fuzzy search using keywords.
The query result is sent to the client in JSON format.
POST route '/filterBooks' :

When the client initiates a POST request to '/filterBooks', the handler is triggered.
Obtain database connections using connection pools.
Gets filters sent by the client, such as category, author, cover type, minimum price, and maximum price.
Execute the query statement. SELECT * FROM Book WHERE genre LIKE? AND author LIKE ?  AND cover_type LIKE ? , using filters to query.
The query result is sent to the client in JSON format.
Connection pool use:

req.pool.getConnection is used to get the database connection from the connection pool.
connection release is done via connection.release() to ensure timely release of database connections and avoid connection leaks.
This routing file handles requests to get the book list, search for the book, and filter the book. In a practical application, you need to be consistent with the database configuration and ensure that a table named 'Book' exists in the database.
