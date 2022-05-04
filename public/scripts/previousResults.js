var local_history

function updateHistory(name) {
    if (localStorage.getItem("history") === null || !JSON.parse(localStorage.getItem("history")).length) {
        localStorage.setItem("history", "[]")
    }

    // Parse History
    local_history = JSON.parse(localStorage.getItem("history"))

    // Check if history length is longer than 10
    if (local_history.length > 10) {
        while (local_history.length > 10) {
            var deleted = local_history.shift()
            localStorage.removeItem(deleted)
        }
    }

    if (local_history.includes(name)) {
        delete local_history[local_history.indexOf(name)]
        local_history = local_history.filter(element => {
            return element !== null;
        });
    }

    local_history.push(name)
    localStorage.setItem("history", JSON.stringify(local_history), 1)
    console.log(localStorage)
}

function existsInStorage(name) {
    return localStorage.getItem(name)
}

function storeResultsLocally(name, results, isBest) {
    if (!isBest) {
        updateHistory(name)
    }
    localStorage.setItem(name, JSON.stringify(results))
}

function loadLastResults(name, isBest) {
    if (!isBest) {
        updateHistory(name)
    }
    return JSON.parse(localStorage.getItem(name))
}

