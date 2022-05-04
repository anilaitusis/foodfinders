function initAutoComplete(id) {

  const input = $(id)[0]

  const options = {
    componentRestrictions: { country: "us" },
    // fields: ["address_components", "geometry", "icon", "name"],
    types: ["locality"]
  }

  const autocomplete1 = new google.maps.places.Autocomplete(input, options)
}