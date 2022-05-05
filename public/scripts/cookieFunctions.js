function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=" + new Date(0).toUTCString()
    console.log(document.cookie)
}

function addCookie(name, data, storage_type) {
    if(storage_type === 'array' || storage_type === 'obj'){
        data = JSON.stringify(data)
    }
    document.cookie = name + "=" + data + ";"
                    + (new Date().getTime() + (7 * 24 * 60 * 60 * 1000)) + ";"
    console.log(name + "=" + getCookie(name) + " added")
}