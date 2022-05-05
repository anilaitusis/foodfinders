var local_history

function updateHistory(name) {
    if (getCookie("history") === null || getCookie("history") === undefined) {
        addCookie("history", [], "array")
    }
    else if (!JSON.parse(getCookie("history")).length) {
        addCookie("history", [], "array")
    }

    // Parse History and store in object
    local_history = JSON.parse(getCookie("history"))

    // Check if history length is longer than 10
    if (local_history.length > 10) {
        while (local_history.length > 10) {
            var deleted = local_history.shift()
            deleteCookie(deleted)
        }
    }

    if (local_history.includes(name)) {
        delete local_history[local_history.indexOf(name)]
        local_history = local_history.filter(element => {
            return element !== null;
        });
    }

    local_history.push(name)
    addCookie("history", local_history, "array")
    console.log(document.cookie)
}

function existsInStorage(name) {
    return getCookie(name)
}

function storeResultsLocally(name, results, isBest) {
    if (!isBest) {
        updateHistory(name)
    }
    document.cookie = name + "=" + JSON.stringify(results) + ";"
                    + (new Date().getTime() + (7 * 24 * 60 * 60 * 1000)) + ";"
    
}

function loadLastResults() {
    return JSON.parse(getCookie("history"))
}

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()

}

function deleteCookie(name) {
    document.cookie = name + "=;expires=" + new Date(0).toUTCString()
    console.log(document.cookie)
}

// TODO: Determine if needed
// Check if a cookie with that name exists and 
// if do reload best in your area json
function cookieExists(name) {
    let cookies = document.cookie.split(';')
    for (var c in cookies) {
        if (name === c.split("=")[0]) {
            return true;
        }
    }
    return false;
}