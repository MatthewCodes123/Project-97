const firebaseConfig = {
    apiKey: "AIzaSyDQWq6oYX2ms3Fq6Y_0F5c4XuMT4wijEmw",
    authDomain: "project-97-5a41a.firebaseapp.com",
    databaseURL: "https://project-97-5a41a-default-rtdb.firebaseio.com",
    projectId: "project-97-5a41a",
    storageBucket: "project-97-5a41a.appspot.com",
    messagingSenderId: "1084518287373",
    appId: "1:1084518287373:web:38c60026102e71c9a5ed44"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  user_name = localStorage.getItem("kwittername");

document.getElementById("username").innerHTML = "Welcome " + user_name + "!";

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(
                  function (childSnapshot) {
                        childKey = childSnapshot.key;
                        Room_names = childKey;
                        console.log("roomname" + Room_names);
                        div = document.createElement("div");
                        div.innerHTML = Room_names;
                        div.id = Room_names;
                        div.className = "room_name";
                        div.onclick = redirectToRoom;
                        document.getElementById("output").appendChild(div);
                        //End code
                  });
      });
}
getData();

function addRoom(e) {
      room_name = document.getElementById("roomName").value;
      firebase.database().ref("/").child(room_name).update
            ({
                  purpose: "adding room name"
            });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function redirectToRoom(e) {
      rname = e.target.id
      console.log(rname)
      localStorage.setItem("room_name", rname)
      window.location = "kwitter_page.html"
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html"; }