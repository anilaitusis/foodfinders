var form = document.getElementById("random")
var foods = ["French","Chinese", "Japanese", "Italian", "Greek", "Spanish",
    "Mediterranean", "Lebanese", "Moroccan", "Turkish", "Thai", "Indian",
    "Korean", "Cajun", "American", "Mexican", "Caribbean","German", "Russian",
    "Hungarian"]

    console.log(foods.length)

if(form){
    form.addEventListener("submit", function(e){
        localStorage.clear()
        var cuisine = foods[Math.floor(Math.random()*foods.length)]
        console.log(cuisine)
        var zipcode = document.getElementById("zipcode").value
        var query = {
            "cuisine": cuisine,
            "zipcode": zipcode
        }
        
        e.preventDefault();

        console.log(query)

        localStorage.setItem("query", JSON.stringify(query))

        // alert("change")

        window.location = "results.html";
    })
}

// function searchRestaurant() {
    

// }