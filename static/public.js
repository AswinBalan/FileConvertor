$(document).ready(function () {
    
    $("#btn").click(function(){ 
        $("img").fadeIn(1000, function () {
            console.log("yes faded out");
        });
        $(this).attr('disabled',true);
        
    });
 });  
function myFunction()
{

    var id = document.getElementById('fm');
    var data = new FormData(id);
    var xhr = new XMLHttpRequest();
    
        var object ={};

        data.forEach((value,key) =>{object[key] = value });

        var json = JSON.stringify(object);
        console.log(json);
        var js = JSON.parse(json);
        console.log(js);
       // console.log(js.password, js.confirmpassword);
        if(js.password== js.confirmpassword)
        {
            console.log("pass matched");
  
        
        xhr.open('POST','http://127.0.0.1:5500/post');

        xhr.setRequestHeader('Content-type','application/json');

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                alert("success");
            }
        }

        xhr.send(json);
       
    }
    else
     {
        //  var p = document.getElementById("status");
        // p.insertAdjacentHTML('beforeend','password doesnot match');
        id.reset();
        // var ps = document.getElementById("pl");
        // var cps = document.getElementById("cpl");
        // data.set(ps, " ");
        // data.set(cps, " ");
        alert("incorrect password");
     }

    
}