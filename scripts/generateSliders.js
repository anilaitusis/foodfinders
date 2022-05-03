function addCard(container_class, i) {
    let card = $("<div>", { "class": "swiper-slide card" })
    let content = $("<div>", { "id": "card-" + i, "class": "card-content" })
    let img_container = $("<div>", { "class": "image" })
    let img = $("<img>", { "src": "" })
    let info = $("<div>", { "class": "name-profession" })
    let name = $("<div>", { "class": "name" })
    let address = $("<div>", { "class": "address" })
    let rating = $("<div>", { "id": "rating-" + i, "class": "rating" })
    let star = $("<div>", { "class": "fas fa-star" })
    let vote = $("<div>", { "class": "vote" })
    let thumbs_up = $("<button>", {"onclick": "toggleYes()", "id": "upvote-" + i})
    let up_icon = $("<i>", {"class":"fa-regular fa-thumbs-up"})
    let thumbs_down = $("<button>", {"onclick": "toggleNo()", "id": "downvote-" + i,})
    let down_icon = $("<i>", {"class":"fa-regular fa-thumbs-down"})

    rating.append(star)
    info.append(name)
    info.append(address)
    img_container.append(img)
    thumbs_down.append(down_icon)
    thumbs_up.append(up_icon)
    vote.append(thumbs_up)
    vote.append(thumbs_down)
    content.append(img_container)
    content.append(info)
    content.append(rating)
    content.append(vote)
    card.append(content)

    // Final Append
    $(container_class).append(card)
}

function fillSliders(results, container) {
    var iters = results.length

    // TODO: Change based on search results
    // if (results.length > 9) {
    //     iters = results
    // }

    for (let i = 0; i < iters; i++) {
        addCard(container, i)

        if (results[i].photos) {
            var src = results[i].photos[0].getUrl()
            $('#card-' + i + ' .image img').attr("src", src)
        }
        else {
            $('#card-' + i + ' .image img').attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
        }

        $('#card-' + i + ' .name-profession .name').text(results[i].name)
        console.log(results[i].name)
        $('#card-' + i + ' .name-profession .address').text(results[i].vicinity)

        var rating = Math.floor(results[i].rating)

        // TODO: Update Star Ratings
        for (let j = 0; j < 5; j++) {
            // console.log(j + " " + rating)
            if (j < rating) {
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").addClass("fas")
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").removeClass("far")
            }
            else {
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").addClass("far")
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").removeClass("fas")
            }
        }
    }
}