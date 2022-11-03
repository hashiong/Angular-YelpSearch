const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(
	cors({
		origin: "*",
	})
);

const port = 8000;

const axios_config = {
	headers: {
		Authorization:
			"Bearer PLH4gFnQn3pDWz6Whj6HIwxqibdJg50BvZbHKzZ8t5zPt29j0XKVzBd4qBvocfovSKvIoDXgOoY1zZmQRZHL40uRIktxrEIUiBY--NVYOi5gZdVs5qqTH19nGLwiY3Yx",
	},
};

// let test ="http://localhost:8000/getyelpresults?term=food&latitude=34&longitude=-118&categories=all&radius=10000"

app.listen(port, () => {
	console.log("Listening on port " + port);
});

//API for term autocomplete
app.get("/yelpautocomplete", async (req, res) => {
	try {
		let text = req.query.text;
		let url = `https://api.yelp.com/v3/autocomplete?text=${text}`;

		let response = await axios.get(url, axios_config);
		let response_data = await response.data;
		let output = { businesses: [] };

		for (let i = 0; i < response_data["terms"].length; i++) {
			output["businesses"].push(response_data["terms"][i]["text"]);
		}

		for (let i = 0; i < response_data["categories"].length; i++) {
			output["businesses"].push(response_data["categories"][i]["title"]);
		}

		res.json(output);
	} catch (err) {
		res.status(400).send({ message: err });
	}
});

//API for getting the Yelp search results
app.get("/getyelpresults", async (req, res) => {
	try {
		let req_query = req.query;
		let term = req_query.term;
		let latitude = req_query.latitude;
		let longitude = req_query.longitude;
		let categories = req_query.categories;
		let radius = Number(req_query.radius) * 1609;

		let yelp_search_url = `https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&categories=${categories}&radius=${radius}&limit=10`;
		let yelp_response = await axios.get(yelp_search_url, axios_config);
		let response_data = await yelp_response.data;
		var response = {};

		if (response_data["total"] != 0) {
			response_data = response_data["businesses"];

			let businesses = [];

			for (let i = 0; i < response_data.length; i++) {
				let business = {};
				business["id"] = response_data[i]["id"];
				business["name"] = response_data[i]["name"];
				business["url"] = response_data[i]["url"];
				business["image_url"] = response_data[i]["image_url"];
				business["rating"] = response_data[i]["rating"];
				business["distance"] = Number(
					response_data[i]["distance"] / 1609
				).toFixed(2);
				businesses.push(business);
			}

			response["businesses"] = businesses;
		}

		res.json(response);
	} catch (err) {
		// console.error(err);
		res.status(400).send({ message: err });
	}
});

//API for getting geographic coordinates
app.get("/getgeocoordinates", async (req, res) => {
	try {
		let address = req.query.location;
		let key = "AIzaSyAsQx1LcwHDjKc0lAoW3LFJqdBTis1oNb0";
		let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;

		let response = await axios.get(url);
		let response_data = await response.data;
		let output = response_data["results"][0]["geometry"]["location"];

		return res.json(output);
	} catch (err) {
		res.status(400).send({ message: err });
	}
});

//API for getting yelp business details
app.get("/getbusinessdetails", async (req, res) => {
	try {
		let id = req.query.id;
		let url = "https://api.yelp.com/v3/businesses/" + id;
		let response = await axios.get(url, axios_config);
		let response_data = await response.data;
		let business = {};
		if ("name" in response_data) {
			business["name"] = response_data["name"];
		} else {
			business["name"] = "N/A";
		}
		if ("photos" in response_data) {
			business["photos"] = response_data["photos"];
		} else {
			business["photos"] = "N/A";
		}
		if ("coordinates" in response_data) {
			let coordinates = {};
			coordinates["lat"] = response_data["coordinates"]["latitude"];
			coordinates["lng"] = response_data["coordinates"]["longitude"];
			business["coordinates"] = coordinates;
		} else {
			business["coordinates"] = {};
		}

		if ("hours" in response_data) {
			if (response_data["hours"][0]["is_open_now"] == true) {
				business["status"] = "Open now";
			} else {
				business["status"] = "Closed";
			}
		} else {
			business["status"] = "N/A";
		}
		if ("display_phone" in response_data) {
			business["display_phone"] = response_data["display_phone"];
		} else {
			business["display_phone"] = "N/A";
		}

		if ("price" in response_data) {
			business["price"] = response_data["price"];
		} else {
			business["price"] = "N/A";
		}

		if ("url" in response_data) {
			business["url"] = response_data["url"];
		} else {
			business["url"] = "N/A";
		}

		let category = "N/A";
		if ("categories" in response_data) {
			category = "";
			let len = response_data["categories"].length;

			for (let i = 0; i < len; i++) {
				category += response_data["categories"][i]["title"];

				if (i != len - 1) {
					category += " | ";
				}
			}
		}
		let location = "N/A";
		if ("location" in response_data) {
			location = "";
			len = response_data["location"]["display_address"].length;
			for (let i = 0; i < len; i++) {
				location += response_data["location"]["display_address"][i];
				if (i != len - 1) {
					location += " ";
				}
			}
		}
		let transactions = "N/A";
		if ("location" in response_data) {
			transactions = "";
			len = response_data["transactions"].length;
			for (let i = 0; i < len; i++) {
				transactions += response_data["transactions"][i];
				if (i != len - 1) {
					transactions += " | ";
				}
			}
		}

		business["category"] = category;
		business["location"] = location;
		business["transactions"] = transactions;

		return res.json(business);
	} catch (err) {
		res.status(400).send({ message: err });
	}
});

//API for getting yelp business reviews
app.get("/getbusinessreviews", async (req, res) => {
	try {
		let id = req.query.id;
		let url = `https://api.yelp.com/v3/businesses/${id}/reviews`;
		let response = await axios.get(url, axios_config);
		let response_data = await response.data;

		let output = [];
		if ("reviews" in response_data) {
			response_data = response_data["reviews"];

			for (let i = 0; i < response_data.length; i++) {
				let review = {};
				review["name"] = response_data[i]["user"]["name"];
				review["rating"] = response_data[i]["rating"];
				review["text"] = response_data[i]["text"];
				review["time"] = response_data[i]["time_created"];
				output.push(review);
			}
			return res.json(output);
		}
	} catch (err) {
		res.status(400).send({ message: err });
	}
});
