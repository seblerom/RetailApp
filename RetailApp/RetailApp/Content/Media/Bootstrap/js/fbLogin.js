﻿var token;
var likes;
var numOfPages = 0;
var found = 1;

window.fbAsyncInit = function () {
    FB.init({ appId: '444934948997589', status: true, cookie: true, xfbml: true, version: 2.1 });

};
(function () {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol +
      '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
}());

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function fetchUserDetail() {
    //FB.api('/me/likes?limit=900', function (response) {
    FB.api('/me/likes', function (response) {

        likes = response.data;
        alert(response.email);
        
        var category = [];
        category.push(new PopulateArray("Other", "0"));
        category.push(new PopulateArray("Entrepreneur", "0"));
        category.push(new PopulateArray("Government organization", "0"));
        category.push(new PopulateArray("Website", "0"));
        category.push(new PopulateArray("Local business", "0"));
        category.push(new PopulateArray("Company", "0"));
        category.push(new PopulateArray("Community", "0"));
        category.push(new PopulateArray("Consulting/business services", "0"));
        category.push(new PopulateArray("Tv show", "0"));
        category.push(new PopulateArray("Local/travel website", "0"));
        category.push(new PopulateArray("University", "0"));
        category.push(new PopulateArray("Entertainment website", "0"));
        category.push(new PopulateArray("Just for fun", "0"));
        category.push(new PopulateArray("Musician/band", "0"));
        category.push(new PopulateArray("Tv channel", "0"));
        category.push(new PopulateArray("Comedian", "0"));
        category.push(new PopulateArray("Athlete", "0"));
        category.push(new PopulateArray("Sports team", "0"));
        category.push(new PopulateArray("Media/news/publishing", "0"));
        category.push(new PopulateArray("Movie", "0"));
        category.push(new PopulateArray("Product/service", "0"));
        category.push(new PopulateArray("Comedian", "0"));

        var uno = 1;
        for (x in likes) {
         
            found = 1;
            for (index = 0; index < category.length; index++) {
                if (likes[x].category === category[index].categoryName) {
                    category[index].likeNumber = category[index].likeNumber + uno;
                    found = 0;
                }

            }
            if (Boolean(found)) {
                category.push(new PopulateArray(likes[x].category, "0"));
            }
        }
        
        //Loop the whole array looking for the max number of likes and category to display
        var maxLikes = 0;
        for (y in category) {
            if (maxLikes < category[y].likeNumber) {
                maxLikes = category[y].likeNumber;
                cat = category[y].categoryName;
            }
        }

        alert("You're a very " + cat + " Person...  :)");
    }, { access_token: token });
}

function PopulateArray(categoryName, likeNumber) {
    this.categoryName = categoryName;
    this.likeNumber = likeNumber;
};

function checkFacebookLogin(email) {
        FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            fetchUserDetail();
        }
        else {
            initiateFBLogin(email);          
        }
    });
}

function initiateFBLogin(email) {
    FB.login(function (response) {
        token = FB.getAuthResponse()['accessToken'];
        
        FB.api('/me', function (response) {
            var newemail = response.email;
            advanceUserStatus(email, newemail);

            
        }, { access_token: token });

        fetchUserDetail();
        sendDataToApi(token, readCookie("Token"));
    }, { scope: "public_profile,email,user_likes" });
}


function sendDataToApi(token, user_token){
    $.ajax(
        {
            url: "api/Engine/SendData",
            type: "GET",
            contentType: "text/json",
            data: { token: token , userToken: user_token },
            success: function (view) {             
                window.location.href = view;
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).message;
                console.log(err);
            }
        });
}

function advanceUserStatus(email, newEmail) {
    $.ajax(
        {
            url: "api/FBLogin/Login",
            type: "GET",
            contentType: "text/json",
            data: { Email: email, NewEmail: newEmail },
            success: function (result) {
                if (result = "Ok") {
                    alert("ok la api funciona")
                } else {
                    alert("Error algo anda mal")
                }
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).message;
                console.log(err);
            }
        });
}
