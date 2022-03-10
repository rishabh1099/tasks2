
var obj = [];
$("#formDiv").css("display", "none");
$("#search-movie").css("display", "none"); // for search movie section
   $(document).ready(function(){
    $.ajax({
        url: "https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/top-rated-indian-movies-01.json",
        method: "GET",
        success: function (result) {
            obj = JSON.parse(result);
            printTable();
        }
        
    });
    
   })

function printTable(){
    $("#search-movie").css("display", "none"); // for search movie section
    $("#formDiv").css("display", "none");  // section for adding of movie
    $("#contentDiv").css("display", "block");
    var div = "<table id='table'>";
    div += `<tr id="first">`;
    div += `<th><span>SNo.</span></th>`;
    div += `<th><span>Title</span></th>`;
    div += `<th><span>Duration</span></th>`;
    div += `<th><span>Year</span></th>`;
    div += `<th><span>Poster</span></th>`;
    div += `<th><span>Imd Ratings</span></th>`;
    div += `</tr>`;
    for (i = 0; i < obj.length; i++) {
        div += `<tr id="row${i}">`;
        div += `<td><span>${i + 1}</span></td>`;
        div += `<td><span>${obj[i].title}</span></td>`;
        div += `<td><span>${obj[i].duration}</span></td>`;
        div += `<td><span>${obj[i].year}</span></td>`;
        div += `<td><span><img src="${obj[i].posterurl}" width="200px" height="200px"></span></td>`;
        div += `<td><span>${obj[i].imdbRating}</span></td>`;
        div += `</tr>`;
    }
    div += "</table>";
    $("#contentDiv").html(div);
}

// ----------------------------use to add movie-------------------------------------
function form() {
    $("#search-movie").css("display", "none"); // for search movie section
    $("#contentDiv").css("display", "none");
    $("#formDiv").css("display", "block"); // section for adding of movie
}
function validate(){
     
    var text = $("#title").val();
    var duration = $("#duration").val();
    var year = $("#year").val();
    var imd = $("#imd").val();
    var poster = $("#poster").val(); 
    
    var n = poster.lastIndexOf('\\');
    poster = poster.substr(n+1);
    
    var newMovie = {
        "title" : text,
        "duration" : duration,
        "year" : year,
        "posterurl" : "posters/"+poster,
        "imdbRating" : imd
    }
   
    if(imd <= 10){ 
        obj.push(newMovie);
        
        for (i = 117; i < obj.length; i++) {
            var row = "<tr id='row${i}'>";
                    row += `<td><span>${i + 1}</span></td>`;
                    row += `<td><span>${obj[i].title}</span></td>`;
                    row += `<td><span>${obj[i].duration}</span></td>`;
                    row += `<td><span>${obj[i].year}</span></td>`;
                    row += `<td><span><img src="${obj[i].posterurl}" width="200px" height="200px"></span></td>`;
                    row += `<td><span>${obj[i].imdbRating}</span></td>`;
             row += "</tr>";
             $("table>tr:last-child").after("row");
             alert(' Updated');
             $("input").val(" ");
        }
    }else{
        alert(' rating should be out of 10');
        $("input").val(" ");
    }
  
}
// ----------------------Use to remove -----------movie-----------------
function remove(){
    $("#contentDiv").css("display", "block");
    $("#formDiv").css("display", "none"); // section for adding of movie
    $("#search-movie").css("display", "none"); // for search movie section
    $("#contentDiv").html(" ");
    $("#contentDiv").html(`<br><input type="text" id='title' placeholder="Enter title of movie"><button type="button" onclick="removechild()" id="btn">Click</button>`);
}
function removechild(){
    
    var title = $("#title").val();
    for(i=0; i<obj.length; i++){
        if(obj[i].title == title){
            obj.splice(i,1);
        }
    }
    printTable();
    
}
 
// ----------------------Use to search movie--------------------------

function search() 
{
   
    tbl="<br><table id='searchTbl'><tr><th>S.no</th><th>Title</th><th>Duration</th><th>Year</th><th>Poster</th><th>IMD Ratings</th></tr>";

    var ttl=$('#tittle').val();
    ttl=ttl.toLowerCase();
    var year=$('#year').val();
    for (i in obj){
   if(year==""){
       if(obj[i].title.toLowerCase().match(ttl)!=null)
       {
        j=parseInt(i);
        tbl+= `<tr><td>${j+1}</td><td>${obj[i].title}</td><td>${obj[i].duration}</td><td>${obj[i].year}</td><td><img src="${obj[i].posterurl}"></td><td>${obj[i].imdbRating}</td></tr>`;

       }
   }
  else if(ttl==""){
    if(obj[i].year.match(year)!=null)
    {
     tbl+= `<tr><td>${obj[i].id}</td><td>${obj[i].title}</td><td>${obj[i].duration}</td><td>${obj[i].year}</td><td><img src="${obj[i].posterurl}"></td><td>${obj[i].imdbRating}</td></tr>`;

    }
}
else{
    if((obj[i].year.match(year)!=null)&&(obj[i].title.toLowerCase().match(ttl)!=null)){
        tbl+= `<tr><td>${obj[i].id}</td><td>${obj[i].title}</td><td>${obj[i].duration}</td><td>${obj[i].year}</td><td><img src="${obj[i].posterurl}"></td><td>${obj[i].imdbRating}</td></tr>`;

    }
}
       
    }
    tbl=tbl+"</table>";
    $('#moviesearch').html(tbl);
  
}










































function Search(){
    $("#contentDiv").css("display", "none");
    $("#formDiv").css("display", "none"); // section for adding of movie
    $("#search-movie").css("display", "block");
    
}

// function searchMovie(){
//     var search = $("#tittle").val();
//     for(i=0; i<obj.length; i++){
//         if(obj[i].title == search){
//             var row = "<table>";
//                 row += "<tr>";
//                 row += `<td><span>${i + 1}</span></td>`;
//                 row += `<td><span>${obj[i].title}</span></td>`;
//                 row += `<td><span>${obj[i].duration}</span></td>`;
//                 row += `<td><span>${obj[i].year}</span></td>`;
//                 row += `<td><span><img src="${obj[i].posterurl}" width="200px" height="200px"></span></td>`;
//                 row += `<td><span>${obj[i].imdbRating}</span></td>`;
//                 row += "</tr>";
//                 row += "</table>";
//         }
//     }
//     $("#search-movie").html(row);
// }