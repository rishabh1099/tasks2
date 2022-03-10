//Show table
var obj;
$.ajax({
    url:"https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/top-rated-indian-movies-01.json",
   
    success: function(result){
    var obj=JSON.parse(result);
    $("#btn1").click(function(){
var tbl="<table><caption><h2>Movies</h2></caption><tr><th>S.No</th><th>Title</th><th>Duration</th><th>Year</th><th>Poster</th><th>IMD Ratings</th></tr>";

var j;
for(i in obj){
    j=parseInt(i);
    tbl+= `<tr><td>${j+1}</td><td>${obj[i].title}</td><td>${obj[i].duration}</td><td>${obj[i].year}</td><td><img src="${obj[i].posterurl}"></td><td>${obj[i].imdbRating}</td></tr>`;
}

tbl=tbl+"</table>";
$('.form-add').html("");
$('.main').html(tbl);
    });
   }});

$(document).ready(function(){
    //to add a movie
$("#btn2").click(function(){
    $('.main').html("");
    var frm=`<form name="add_form">
    <fieldset>
        <legend>Add a movie</legend>
        <table>
            <tr><td><label>Title</label></td><td><input id="ttl" type="text"></td></tr>
            <tr><td><label>Duration</label></td><td><input id="dtn" type="text"></td></tr>
            <tr><td><label>Year</label></td><td><input id="year" type="text"></td></tr>
            <tr><td><label>Poster</label></td><td><input id="pstr" type="file"></td></tr>
            <tr><td><label>IMD Rating</label></td><td><input id="rtng" type="text"></td></tr>
        </table><br>
       <input id="sbmt" type='submit'>
    
    </fieldset>
</form>`
$(".form-add").html(frm);
$("#sbmt").click(function(e){
  
    var t=$('#ttl').val();
    var d=$('#dtn').val();
    var y=$('#year').val();
    var p=$('#pstr').val();
    var rate=$('#rtng').val();
    var index=p.lastIndexOf("\\");
    var img_path="image"+p.substring(index);
    var add_obj={
        "title":t,
        "duration":d,
        "year":y,
        "posterurl":img_path,
        "imdbRating":rate
    };
objMovie.push(add_obj);
 
 var tbl="<table><tr><th>S.No</th><th>Title</th><th>Duration</th><th>Year</th><th>Poster</th><th>IMD Ratings</th></tr>";

 var j;
 for(var i in objMovie){
     j=parseInt(i);
     tbl+= `<tr><td>${j+1}</td><td>${objMovie[i].title}</td><td>${objMovie[i].duration}</td><td>${objMovie[i].year}</td><td><img src="${objMovie[i].posterurl}"></td><td>${objMovie[i].imdbRating}</td></tr>`;
 }
 tbl=tbl+"</table>";
 $('.main').html(tbl);
 $('#ttl').val("");
$('#dtn').val("");
 $('#year').val("");
$('#pstr').val("");
$('#rtng').val("");
e.preventDefault();
     });
});
$("#btn3").click(function(){
    var frm=`<form name="del_form">
    <fieldset>
        <legend>Remove a movie</legend>
        <label>ID</label><input id="movie_id" type="number">
       <input id="rmv" type='submit' Name="Remove">
      
    </fieldset>
</form>`
$(".form-add").html(frm);
var i;
for(i=1;i<=objMovie.length;i++){

Object.assign(objMovie[i-1], {id: i});

}
print_movie(objMovie);

//remove a movie
$("#rmv").click(function(e){
 
   var m_id=$('#movie_id').val();
   var i;
   for(i in objMovie){
       if(objMovie[i].id==m_id)
       {
objMovie.splice(i,1);

       }
   }
print_movie(objMovie);
$('#movie_id').val("");
e.preventDefault();
     });
});
//to print a movie function to be called
function print_movie(objmov){
   var tbl="<table><tr><th>S.no</th><th>Title</th><th>Duration</th><th>Year</th><th>Poster</th><th>IMD Ratings</th></tr>";
 
    var j;
    for(var i in objmov){
        
        tbl+= `<tr><td>${objmov[i].id}</td><td>${objmov[i].title}</td><td>${objmov[i].duration}</td><td>${objmov[i].year}</td><td><img src="${objmov[i].posterurl}"></td><td>${objmov[i].imdbRating}</td></tr>`;
    }
    tbl=tbl+"</table>";
    $('.main').html(tbl);
    
};
//to search a movie
$('#btn4').click(function(){
    var frm=`
    <fieldset><legend>Search a movie</legend><label>Title</label><input id="movie_ttl" oninput="search()" type="text"><br><br>
    <label>Year</label><input id="movie_year" oninput="search()" type="text"></fieldset><br>` ;
$(".form-add").html(frm);
var tbl="";
var tbl="<br><table><tr><th>S.no</th><th>Title</th><th>Duration</th><th>Year</th><th>Poster</th><th>IMD Ratings</th></tr>";
var j;
for(var i in objMovie){
    j=parseInt(i);
    tbl+= `<tr><td>${j+1}</td><td>${objMovie[i].title}</td><td>${objMovie[i].duration}</td><td>${objMovie[i].year}</td><td><img src="${objMovie[i].posterurl}"></td><td>${objMovie[i].imdbRating}</td></tr>`;
}
tbl=tbl+"</table>";

$('.main').html(tbl);
});
});

// $('#movie_ttl').blur(function() {
//     var x=$('#movie_ttl').val();
//     console.log("ud");
//   });
function search()
{
   
    tbl="<br><table><tr><th>S.no</th><th>Title</th><th>Duration</th><th>Year</th><th>Poster</th><th>IMD Ratings</th></tr>";

    var ttl=$('#movie_ttl').val();
    ttl=ttl.toLowerCase();
    var year=$('#movie_year').val();
    for (i in objMovie){
   if(year==""){
       if(objMovie[i].title.toLowerCase().match(ttl)!=null)
       {
        j=parseInt(i);
        tbl+= `<tr><td>${j+1}</td><td>${objMovie[i].title}</td><td>${objMovie[i].duration}</td><td>${objMovie[i].year}</td><td><img src="${objMovie[i].posterurl}"></td><td>${objMovie[i].imdbRating}</td></tr>`;

       }
   }
  else if(ttl==""){
    if(objMovie[i].year.match(year)!=null)
    {
     tbl+= `<tr><td>${objMovie[i].id}</td><td>${objMovie[i].title}</td><td>${objMovie[i].duration}</td><td>${objMovie[i].year}</td><td><img src="${objMovie[i].posterurl}"></td><td>${objMovie[i].imdbRating}</td></tr>`;

    }
}
else{
    if((objMovie[i].year.match(year)!=null)&&(objMovie[i].title.toLowerCase().match(ttl)!=null)){
        tbl+= `<tr><td>${objMovie[i].id}</td><td>${objMovie[i].title}</td><td>${objMovie[i].duration}</td><td>${objMovie[i].year}</td><td><img src="${objMovie[i].posterurl}"></td><td>${objMovie[i].imdbRating}</td></tr>`;

    }
}
       
    }
    tbl=tbl+"</table>";
    $('.main').html(tbl);
  
}