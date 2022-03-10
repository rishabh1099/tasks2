$(document).ready(function () {
    allproducts();

})
 var totalPrice = [];
function allproducts() { 
    $("#total").css("visibility", "hidden");
    array = [];
    totalPrice = [];
    for (i = 0; i < products.length; i++) {
        $("#item" + i).attr('onclick', 'myfun(' + i + ')');
        $("li").filter("#item" + i).css({ "background": "white" });
    }
    var t = `<table>`;
    for (i = 0; i < products.length; i++) {
        t += `<tr>`;
        products[i].filter(function (index) {
            t += `<td><img src="${index.img}" width="120px" height="100px"><br>Price - ${index.price}</td>`;
            totalPrice.push(parseInt(index.price));
        })
        t += `</tr>`;
    }
    t += `</table>`;
    $("li:first-child").css("background", "yellow");
    total(totalPrice);
    $("#main").html(t);
}

var array = [];
function myfun(i) {
    if (array.includes(i) == false) {
        array.push(i);
        $("li").filter("#item" + i).css({ "background": "yellow" });

    } else {
        $("li").filter("#item" + i).css({ "background": "white" });
        for (a = 0; a < array.length; a++) {
            if (array[a] == i) {
                array.splice(a, 1);

            }
        }

    }
    if (array.length > 0) {
        printItems();
        $("li:first-child").css("background", "white");
    } else {
        allproducts();
        
    }
}


function printItems() {
    $("#main").html(" ");
   totalPrice = [];
    var t = `<table>`;
    for (i in array) {
        t += `<tr>`;
        for (j in products[array[i]]) {
            t += `<td><img src="${products[array[i]][j].img}" width="120px" height="100px"><br>Price - ${products[array[i]][j].price}</td>`;
            totalPrice.push(parseInt(products[array[i]][j].price));
        }
        t += `</tr>`;
    } t += `</table>`;
    $("#main").html(t);
    total(totalPrice);
}

function total(totalPrice) {
    var sum = 0;
    for (i = 0; i < totalPrice.length; i++) {
        sum = sum + totalPrice[i];
    }
    $("#total").css("visibility", "visible");
    $("#sp").html(sum);
    totalPrice = [];
}


