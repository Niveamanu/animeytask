//creating a division called div
let div = document.createElement("div");

//creating a division called div1
let div1 = document.createElement("div");
div1.className = " jumbotron display-4 ";
div1.innerHTML = "The Animey List";

//creating a paragraph called p
let p = document.createElement("p");
p.className = "navbar  navbar-light bg-dark";
p.style.cssText = "margin-top:-3%;color:white";
p.textContent = 'Animey Search';

//adding div to the body
document.body.appendChild(div);

//creating a division called div2
let div2 = document.createElement("div");
div2.className = "row justify-content-center p-3";

//creating a input control called inputbox
let inputbox = document.createElement("input");
inputbox.id = "input";
inputbox.className = "form-control col-6"
inputbox.setAttribute("type", "text");
inputbox.setAttribute("placeholder", "search Anime...");

//creating a button called btn
let btn = document.createElement("button");
btn.className = "form-control btn btn-success  col-2 ml-2";
btn.textContent = "View all";
btn.style.cssText = "color:white";
btn.id = "myBtn";


//adding inputbox and btn to div2
div2.append(inputbox, btn);


//creating a table called table
let table = document.createElement("table");
table.id = "tab";
table.style.cssText = "border:1px solid grey;width:100%;";
table.className = "justify-content-center text-center";
table.setAttribute("border", "1");

//creating a row inside the table
let tr = document.createElement("tr");


//creating theadings inside the table row
let th1 = document.createElement("th");
th1.innerHTML = "Poster";
th1.style.cssText = "background-color:#dddede";
let th2 = document.createElement("th");
th2.innerHTML = "Title of the Series";
th2.style.cssText = "background-color:#dddede";
let th3 = document.createElement("th");
th3.style.cssText = "background-color:#dddede";
th3.innerHTML = "Start date of the series";
let th4 = document.createElement("th");
th4.style.cssText = "background-color:#dddede";
th4.innerHTML = "End date of the series";
let th5 = document.createElement("th");
th5.style.cssText = "background-color:#dddede";
th5.innerHTML = "Series Type";
let th6 = document.createElement("th");
th6.style.cssText = "background-color:#dddede";
th6.innerHTML = "IMDB Rating";


//adding all theadings to the row
tr.append(th1, th2, th3, th4, th5, th6);

//adding row into the table
table.appendChild(tr);

//adding all the elements into the div
div.append(div1, p, div2, table);



//fetching the api link and converting into json object
async function searchAnimey() {
    const response = await fetch("https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&limit=50");
    data = await response.json();
    console.log(data.results.length);
    return data;
}

document.getElementById("myBtn").onclick = function() {
    displayAnimey()
};


//displaying the json objects in the table
async function displayAnimey() {
    let table_result = document.getElementById("tab");
    let result_set = await searchAnimey();
    var c = 1;

    for (e = 0; e <= result_set.results.length; e++) {
        let row = table_result.insertRow(1);

        var t1 = row.insertCell(0);
        t1.className = "t1";
        var t2 = row.insertCell(1);
        var t3 = row.insertCell(2);
        var t4 = row.insertCell(3);
        var t5 = row.insertCell(4);
        var t6 = row.insertCell(5);

        var i = document.createElement("img");
        i.setAttribute("height", "220px");
        i.setAttribute("src", result_set.results[e].image_url);
        t1.className = "justify-content-center";
        t1.appendChild(i);
        t2.innerHTML = result_set.results[e].title;
        t3.innerHTML = result_set.results[e].start_date;
        t4.innerHTML = result_set.results[e].end_date;
        t5.innerHTML = result_set.results[e].type;
        t6.innerHTML = result_set.results[e].rated;

    }


}



document.getElementById("input").onkeyup = function() {
    displaySearchAnimey()
};

//onkeyup event triggered when typing in the input box
function displaySearchAnimey() {
    var input, filter, table1, trr, txtValue;
    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    table1 = document.getElementById("tab");
    trr = table1.getElementsByTagName("tr");
    for (i = 1; i < trr.length; i++) {
        a = trr[i].getElementsByTagName("td")[1];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            trr[i].style.display = "";
        } else {
            trr[i].style.display = "none";
        }
    }
}