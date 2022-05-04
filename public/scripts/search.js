var form = document.getElementById("search")

if(form){
    form.addEventListener("submit", function(e){
        localStorage.clear()
        var cuisine = document.getElementById("cuisine").value
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