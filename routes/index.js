var express = require('express');
var router = express.Router();


router.get('/getbooks', function(req, res, next) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM Book";
        connection.query(query, function(err,rows,fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.post('/searchBooks', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if (err) {
        console.log("postErro1");
        res.sendStatus(500);
        return;
    }
    var search = req.body.keyword;
    search = "%" + search + "%";
    console.log("postSuccess");
    console.log(search);
    // var query = "select * from Book where Book.book_name like concat('%',#{search},'%')";
    var query = "SELECT * FROM Book WHERE book_name like ?";
    // var query = "SELECT * FROM Book";
    // var query = "SELECT book_name,author,img,price FROM Book WHERE book_name, author,img,price LIKE '%search%'";
    connection.query(query, [search],function(err,rows,fields) {
    connection.release();
    if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
    // console.log(rows);
     res.json(rows);
    //  res.send();
    });
});
});

router.post('/filterBooks', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if (err) {
        console.log("postErro1");
        res.sendStatus(500);
        return;
    }
    // var search = req.body;
    var ge = req.body.cat;
    ge = "%" + ge + "%";
    var au=req.body.author;
    au = "%" + au + "%";
    var co=req.body.cover;
    co = "%" + co + "%";
    var mi=req.body.minPrice;
    mi = "%" + mi + "%";
    var ma=req.body.maxPrice;
    ma = "%" + ma + "%";
    console.log(ge,au,co,mi,ma);

    var query =  "SELECT * FROM Book WHERE genre like ? And author like ? And cover_type like ? ";


    connection.query(query,[ge,au,co],function(err,rows,fields) {
    connection.release();
    if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }
    console.log(rows);
     res.json(rows);
    //  res.send();
    });


});
});
module.exports = router;
