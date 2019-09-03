$(document).ready(function(){
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        upload(fileName);
        // alert('The file "' + fileName +  '" has been selected.');
    });
});



function upload(fileName)
{
    // var id = document.getElementById("btn");
    // var reader = new FileReader(id);

 
    var xhr = new XMLHttpRequest();

    xhr.open('POST','http://127.0.0.1:5500/upload');

    // xhr.onload = function(){
    //     console.log("Sent to server");
    // }
    console.log(fileName);
    var blob = new Blob([fileName], {type: 'image/jpg'});

        // xhr.setRequestHeader('Content-type','application/text');

        // xhr.onreadystatechange = function() {
        //     if(xhr.readyState == 4 && xhr.status == 200) {
        //         alert("success");
        //     }
        // }
        var ob= {};
        console.log(blob);
        // blob.forEach((key, value) => {
        //     ob[key] =value;
            
        // });
        // console.log(ob);
        console.log(JSON.stringify(blob));
        xhr.send(blob);

    // var fs = new FileReader();
    // fs.onload = function(){
        
    // }
}