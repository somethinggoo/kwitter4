user_name = localStorage.getItem("UserName");
room_name = localStorage.getItem("RoomName");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        likes: 0
    });
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

    
                console.log(message_data);
                user_name = message_data['name'];
                message = message_data['message'];
                likes = message_data['likes'];

                name_with_tag = "<h4>" + user_name + "<img class='img_tick' src = 'tick.png'> </h4>";
                msg_with_tag = "<h4 class='msg_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id='>" + firebase_message_id + "' value='" + likes + "' onclick='updateLikes(this.id)'>";
                span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + likes + "</span></button><hr>";
                row = name_with_tag + msg_with_tag + like_button + span_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}