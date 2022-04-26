var form = document.getElementById("search")
// var urlParameters = new URLSearchParams(window.location.search);

if(form){
    form.addEventListener("submit", function(e){
        localStorage.clear()

        var cuisine = document.getElementById("cuisine").value
        var zipcode = document.getElementById("zipcode2").value
        var query = {
            "cuisine": cuisine,
            "zipcode": zipcode
        }
        
        e.preventDefault();

        console.log(query)

        // url.searchParams.append()


        localStorage.setItem("query", JSON.stringify(query))

        // alert("change")

        window.location = `results.html?query=${cuisine}&zipcode=${zipcode}`;
    })
}

// function searchRestaurant() {
    

// }