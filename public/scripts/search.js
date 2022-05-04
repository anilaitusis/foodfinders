var form = document.getElementById("search")
var rand_form = document.getElementById("random")

if (form) {
    form.addEventListener("submit", function (e) {

        let cuisine = document.getElementById("cuisine").value.replaceAll(" ", "+")
        let zipcode = document.getElementById("zipcode2").value.replaceAll(", ", "+")
        

        e.preventDefault();

        // console.log(query)

        window.location = `results.html?query=${cuisine}&zipcode=${zipcode}`;
    })
}

if (rand_form) {
    var foods = ["French", "Chinese", "Japanese", "Italian", "Greek", "Spanish",
        "Mediterranean", "Lebanese", "Moroccan", "Turkish", "Thai", "Indian",
        "Korean", "Cajun", "American", "Mexican", "Caribbean", "German", "Russian",
        "Hungarian"]

    rand_form.addEventListener("submit", function (e) {
        var cuisine = foods[Math.floor(Math.random() * foods.length)]
        console.log(cuisine)
        var zipcode = document.getElementById("zipcode").value.replaceAll(", ", "+")

        e.preventDefault();

        // console.log(query)

        window.location = `results.html?query=${cuisine}&zipcode=${zipcode}`;
    })
}