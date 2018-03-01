        // Initialize Firebase
        var config = {
        	apiKey: "AIzaSyCxJxYwVIQW99AVj9NO46k3GPfn_GipH0I",
        	authDomain: "proj1-b26a7.firebaseapp.com",
        	databaseURL: "https://proj1-b26a7.firebaseio.com",
        	projectId: "proj1-b26a7",
        	storageBucket: "proj1-b26a7.appspot.com",
        	messagingSenderId: "931172121198"
        };
        firebase.initializeApp(config);
        var database = firebase.database();
        var search = "";

        function showResults() {
        	search = $("#search-input").val();
        	var fromDate = $("#fromDate").val();
        	var toDate = $("#toDate").val();
        	var queryURL;
        	var query2URL;
        	database.ref().push({
        		search: search,
        	});
                //Checks if search, from date and to date should be added to the URL
        	if (search !== "") {
        		if ((fromDate === null || fromDate === "") && (toDate === null || toDate === "")) {
        			queryURL = "https://content.guardianapis.com/search?q=" + search + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
        			query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
        			$(".warning").html("");
        			// console.log("1");
        			// console.log(fromDate);
        			// console.log(toDate);
        		} else if ((toDate === null || toDate === "") && (fromDate !== null || fromDate !== "")) {
        			queryURL = "https://content.guardianapis.com/search?q=" + search + "&from-date=" + fromDate + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
        			query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&begin_date=" + fromDate + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
        			$(".warning").html("");
        			// console.log("2");
        			// console.log(fromDate);
        			// console.log(toDate);
        		} else if ((fromDate === null || fromDate === "") && (toDate !== null || toDate !== "")) {
        			queryURL = "https://content.guardianapis.com/search?q=" + search + "&to-date=" + toDate + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
        			query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&end_date=" + toDate + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
        			$(".warning").html("");
        			//  console.log("3");         
        			//  console.log(fromDate);
        			// console.log(toDate);
        		} else {
        			queryURL = "https://content.guardianapis.com/search?q=" + search + "&from-date=" + fromDate + "&to-date=" + toDate + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
        			query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&begin_date=" + fromDate + "&end_date=" + toDate + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
        			$(".warning").html("");
        			// console.log("4");
        			// console.log(fromDate);
        			// console.log(toDate);
        		}
        	} else {
        		$(".warning").html("You Must Enter A Search Term");
        	}

                //makes the call to the Guardian API
        	$.ajax({
        		url: queryURL,
        		method: "GET"
        	}).done(function(anything) {
        		// console.log("Call was made");
        		for (var i = 0; i < 3; i++) {
        			$("#data-goes-here").append("<div id='web-title'>" + anything.response.results[i].webTitle + "</div><br>" + anything.response.results[i].webPublicationDate + "<br>" + "<a target='_blank' href=" + anything.response.results[i].webUrl + ">" + anything.response.results[i].webUrl + "</a><br><br>");
        		}
        	});

                //makes the call to the NYTimes API
        	$.ajax({
        		url: query2URL,
        		method: "GET"
        	}).done(function(status) {
        		// console.log("call 2 was made");
        		for (var j = 0; j < 3; j++) {
        			$("#data2-goes-here").append("<div id='web-title'>" + status.response.docs[j].snippet + "</div><br>" + status.response.docs[j].pub_date + "<br>" + "<a target='_blank' href=" + status.response.docs[j].web_url + ">" + status.response.docs[j].web_url + "</a><br><br>");
        		}
        	});
        	//closing function
        }

        //grabs data from Firebase and pushes the last five searches
        database.ref().limitToLast(5).on("child_added", function(snapshot) {
        	$("#topSearch").prepend(snapshot.val().search + "</br>");
        }, function(errorObject) {
        	//console.log("The read failed: " + errorObject.code);
        });

        //On click button for the submit button
        $("#submit").on("click", function(event) {
        	event.preventDefault();
        	// console.log("button was clicked");
        	clear();
        	showResults();
        }); //closing on click

        //enter key can be used to submit
        $("#search-input").keypress(function(event) {
        	if (event.which == 13) {
        		event.preventDefault();
        		clear();
        		showResults();
        	}
        });

        //clears the previous results HTML
        function clear() {
        	//console.log("clear")
        	$("#data-goes-here").empty();
        	$("#data2-goes-here").empty();
        }