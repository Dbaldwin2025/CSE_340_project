const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" ></a>'
      grid += '<div class="namePrice">'
      grid += '<hr >'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildDetailView = async function(data2){
  let detailView 
  if(data2.length > 0){
    detailView = '<div class="detail_page">'
    detailView += '<div class="detail_view">'
    detailView += '<img src="' + data2[0].inv_image
    +'" alt="Image of '+ data2[0].inv_make + ' ' + data2[0].inv_model 
    +' on CSE Motors" /> </div>'
    detailView += '<div class="detail_data">'
    detailView +=  '<h2>'+ data2[0].inv_make + ' '+ data2[0].inv_model 
    + '</h2>' 
    detailView += '<span> <span class="bold1">Price: </span> $' 
    + new Intl.NumberFormat('en-US').format(data2[0].inv_price) + '</span>'
    detailView += '<p class="description">' + '<span class="bold1">Descripton: </span>' + data2[0].inv_description + '</p>'
    detailView += '<p class="color">' + '<span class="bold1">Color: </span>' + data2[0].inv_color + '</p>'
    detailView += '<p class="miles">' + '<span class="bold1">Miles: </span>' + data2[0].inv_miles + '</p>'
    detailView += '</div>'
    detailView += '</div>'
} else { 
  detailView += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
}
  return detailView
}
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

