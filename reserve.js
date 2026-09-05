const  form = document.getElementById("revform");
form.addEventListener("submit",function(event){
    event.preventDefault();
     const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    console.log("NAME:", name);
    console.log("PHONE:", phone);
    console.log("DATE:", date);
    console.log("TIME:", time);

});