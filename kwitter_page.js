const firebaseConfig = {
    apiKey: "AIzaSyDQWq6oYX2ms3Fq6Y_0F5c4XuMT4wijEmw",
    authDomain: "project-97-5a41a.firebaseapp.com",
    databaseURL: "https://project-97-5a41a-default-rtdb.firebaseio.com",
    projectId: "project-97-5a41a",
    storageBucket: "project-97-5a41a.appspot.com",
    messagingSenderId: "1084518287373",
    appId: "1:1084518287373:web:38c60026102e71c9a5ed44"
  };
  

  firebase.initializeApp(firebaseConfig);

var username = localStorage.getItem("kwittername");
var room_name = localStorage.getItem("room_name");

function send(e) {
      message = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: message,
            like: 0
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}










function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log("currentRoom" + room_name);
                        console.log(message_data);
                        your_name = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];
                        /*nametag=document.createElement("h4");
                        nametag.innerHTML=your_name+"<img class='user_tick' src='tick.png'>";
                        document.body.appendChild(nametag);
                        likeButton= document.createElement("button");
                        likeButton.className="btn btn-warning";
                        likeButton.id=firebase_message_id;
                        likeButton.value=like;
                        //likeButton.onclick=updatelike;
                        document.body.appendChild(likeButton);
                        console.log(likeButton);
                        spantag = document.createElement("span");
                        spantag.classname='glyphicon glyphicon-thumbs-up';
                        spantag.innerHTML="Like"+like+"<hr>";
                        likeButton.appendChild(spantag);
                        document.getElementById("output").innerHTML+=nametag.innerHTML+likeButton.innerHTML;*/
                        name_with_tag = "<h4> " + your_name + "<img class='user_tick'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;

                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id; likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}