function logged(user) {

    console.log(user);

    $.post('/new-user',user.providerData[0],function (data,status) {

        console.log("Hello");
        localStorage.setItem('username',user.providerData[0].email);
        localStorage.setItem('state','true');
        console.log(user.providerData[0].email);
        console.log("Hello. New user");
        console.log(user.providerData[0].email);
        //  window.location.href='index.html';
        //   window.location.reload();
        RefreshState();
    });
}

$('#google').click(function () {
    if(state)
    {
        alert("Already Logged in");
        return;
    }
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        logged(user);
        RefreshState();

    }).catch(function(error) {
        alert(error.message);
        RefreshState();
    });
});



$("#facebook").click(function () {
    if(state)

    {
        alert("Already Logged in");
        return;
    }
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        logged(user);
    }).catch(function(error) {
        alert(error.message);
    });
});



$("#twitter").click(function () {

    if(state)
    {
        alert("Already Logged in");
        return;
    }
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        logged(user);
    }).catch(function(error) {
        alert(error.message);
    });
});


/*
 $(function () {
 firebase.auth().signOut().then(function() {
 localStorage.removeItem('username');
 localStorage.removeItem('state');
 }, function(error) {
 console.log(error.code);
 console.log(error.message);
 });
 });*/