function addUser(){
    var username =document.getElementById("username").value;
    localStorage.setItem("kwittername", username);
    window.location="kwitter_room.html"
}