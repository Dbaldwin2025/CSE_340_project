const pool2 = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool2.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool2.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get all vehicle data
 * ************************** */
async function getInventoryByInvId(inv_id){
  try {
  const data2 = await pool2.query('SELECT * FROM public.inventory WHERE inv_id =$1', [inv_id])

  return data2.rows
} catch (error) {
   console.error("getInventoryByInvId error " + error)
}
}

async function newClassification(classification_name){
  try {
    const sql1 = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool2.query(sql1, [classification_name])
    
  } catch (error) {
    return error.message
  }
}

async function newVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const sql2 = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool2.query(sql2, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
  } catch (error) {
    return error.message
  }
}
/*
async function updateVehicle(inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const sql3 = "UPDATE inventory (inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE inv_id =$1 "
    return await pool2.query(sql3, [inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
  } catch (error) {
    return error.message
  }
}
  */

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_id = $1, inv_make = $2, inv_model = $3, inv_year = $4, inv_description = $5, inv_image = $6, inv_thumbnail = $7, inv_price = $8, inv_miles = $9, inv_color = $10, classification_id = $11 WHERE inv_id = $1 RETURNING *"
    const data = await pool2.query(sql, [
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}
/* ***************************
 *  Update Inventory Data
 * ************************** */
async function deleteInventory(inv_id) {
  try {
    const sql =
      "DELETE  FROM public.inventory WHERE inv_id = $1 RETURNING *"
    const data = await pool2.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInvId, newClassification, newVehicle, updateInventory, deleteInventory};

