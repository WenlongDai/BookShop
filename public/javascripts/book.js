function getbook(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        var bookList = document.getElementsByClassName("bookList")[0];

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for(let i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                li.id = i;
                li.style.backgroundColor = "white";
                li.style.height = "280px";
                li.style.width = "120px";
                li.style.margin = "10px";
                li.style.display = "inline-block";

                var bookImg = document.createElement("img");
                bookImg.src = data[i].img;
                bookImg.style.width = "80px";
                bookImg.style.height = "120px";
                bookImg.style.marginLeft = "20px";
                li.append(bookImg);

                var bookName = document.createElement("p");
                bookName.innerText= data[i].book_name;
                bookName.style.width = "120px";
                bookName.style.height = "20px";
                bookName.style.marginTop = "13px";
                bookName.style.textAlign = "center";
                bookName.style.color = "black";
                bookName.style.fontSize = "13px";
                bookName.style.fontWeight= "bolder";
                li.append(bookName);

                var bookAuthor = document.createElement("p");
                bookAuthor.innerText= data[i].author;
                bookAuthor.style.width = "120px";
                bookAuthor.style.height = "20px";
                bookAuthor.style.marginTop = "0px";
                bookAuthor.style.textAlign = "center";
                bookAuthor.style.color = "black";
                bookAuthor.style.fontSize = "10px";
                li.append(bookAuthor);

                var bookPrice = document.createElement("p");
                bookPrice.innerText= "$"+data[i].price;
                bookPrice.style.width = "120px";
                bookPrice.style.height = "20px";
                bookPrice.style.marginTop = "0px";
                bookPrice.style.textAlign = "center";
                bookPrice.style.color = "black";
                bookPrice.style.fontSize = "10px";
                li.append(bookPrice);

                var buyBtn = document.createElement("button");
                buyBtn.textContent = "Buy";
                buyBtn.style.fontSize = "10px";
                buyBtn.style.width = "80px";
                buyBtn.style.height = "30px";
                buyBtn.style.marginTop = "0px";
                buyBtn.style.marginLeft = "20px";
                buyBtn.style.textAlign = "center";
                buyBtn.style.color = "white";
                buyBtn.style.backgroundColor = "red";
                buyBtn.style.textDecoration = "none";
                li.append(buyBtn);

                bookList.append(li);


            }

        }
    };
    xhttp.open("GET", '/getbooks', true);
    xhttp.send();
}

function refresh(data){

    var bookList = document.getElementsByClassName("bookList")[0];
    var child = bookList.lastElementChild;
        while (child) {
            bookList.removeChild(child);
            child = bookList.lastElementChild;
        }

            for(let i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                li.id = i;
                li.style.backgroundColor = "white";
                li.style.height = "280px";
                li.style.width = "120px";
                li.style.margin = "10px";
                li.style.display = "inline-block";

                var bookImg = document.createElement("img");
                bookImg.src = data[i].img;
                bookImg.style.width = "80px";
                bookImg.style.height = "120px";
                bookImg.style.marginLeft = "20px";
                li.append(bookImg);

                var bookName = document.createElement("p");
                bookName.innerText= data[i].book_name;
                bookName.style.width = "120px";
                bookName.style.height = "20px";
                bookName.style.marginTop = "13px";
                bookName.style.textAlign = "center";
                bookName.style.color = "black";
                bookName.style.fontSize = "13px";
                bookName.style.fontWeight= "bolder";
                li.append(bookName);

                var bookAuthor = document.createElement("p");
                bookAuthor.innerText= data[i].author;
                bookAuthor.style.width = "120px";
                bookAuthor.style.height = "20px";
                bookAuthor.style.marginTop = "0px";
                bookAuthor.style.textAlign = "center";
                bookAuthor.style.color = "black";
                bookAuthor.style.fontSize = "10px";
                li.append(bookAuthor);

                var bookPrice = document.createElement("p");
                bookPrice.innerText= "$"+data[i].price;
                bookPrice.style.width = "120px";
                bookPrice.style.height = "20px";
                bookPrice.style.marginTop = "0px";
                bookPrice.style.textAlign = "center";
                bookPrice.style.color = "black";
                bookPrice.style.fontSize = "10px";
                li.append(bookPrice);

                var buyBtn = document.createElement("button");
                buyBtn.textContent = "Buy";
                buyBtn.style.fontSize = "10px";
                buyBtn.style.width = "80px";
                buyBtn.style.height = "30px";
                buyBtn.style.marginTop = "0px";
                buyBtn.style.marginLeft = "20px";
                buyBtn.style.textAlign = "center";
                buyBtn.style.color = "white";
                buyBtn.style.backgroundColor = "red";
                buyBtn.style.textDecoration = "none";
                li.append(buyBtn);

                bookList.append(li);

    }
}

function searchBook() {
    const xhttp = new XMLHttpRequest();
    // var search ={
    //     author:document.getElementById("authorInput").innerText,
    //     book_name:document.getElementById("book_name").innerText,
    //     price:document.getElementById("price").value,
    //     img:document.getElementById("img").src
    // };
    var search={keyword:document.getElementById("searchInput").value};
    console.log(search);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            refresh(data);
            // console.log(data);
        }else{
            // console.log(this.status);
        }
    };
    xhttp.open("POST", "/searchBooks", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.send();
    xhttp.send(JSON.stringify(search));

  }

function filter() {
    const xhttp = new XMLHttpRequest();
    var categoryDiv = document.getElementById("filterSelect");
    var index1 = categoryDiv.selectedIndex;
    var category = categoryDiv.options[index1].text;
    var coverSelectDiv = document.getElementById("coverSelect");
    var index2 = coverSelectDiv.selectedIndex;
    var coverValue = coverSelectDiv.options[index2].text;

    var search ={
        cat:category,
        author:document.getElementById("authorInput").value,
        cover:coverValue,
        minPrice:document.getElementById("minPriceInput").value,
        maxPrice:document.getElementById("maxPriceInput").value,
    };
    // var search={keyword:document.getElementById("searchInput").value};
    console.log(search);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            refresh(data);
            // console.log(data);
        }else{
            // console.log(this.status);
        }
    };
    xhttp.open("POST", "/filterBooks", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.send();
    xhttp.send(JSON.stringify(search));

  }
