// Function to load customer IDs into the combo box
function loadCustomerIDs() {
    // Send an AJAX GET request to the backend to retrieve customer data
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/demo1/customer", // Replace with the actual URL of your backend API endpoint to get all customers
        dataType: "json",
        success: function(customersData) {
            // Get the combo box element
            const customerComboBox = document.getElementById("customer_id_combo_box");

            // Clear existing options (if any)
            customerComboBox.innerHTML = "";

            // Iterate through the received JSON array of customers
            for (let i = 0; i < customersData.length; i++) {
                let customer = customersData[i];

                // Create a new option element for each customer ID
                const option = document.createElement("option");
                option.value = customer.id;
                option.text = customer.id;

                // Add the option to the combo box
                customerComboBox.appendChild(option);
            }
        },
        error: function(error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Error while retrieving customer data: ", error);
        }
    });
}

// Call the function to load customer IDs into the combo box when the page loads
loadCustomerIDs();


// ============================================================================


// Add event listener to the combo box to fetch customer data on value change
$(document).on("change", "#customer_id_combo_box", function(event) {
    console.log('trigger customer name method');
    // Get the customer ID from the selected option in the combo box
    let custId = $("#customer_id_combo_box").val();

    // Send the AJAX request to the backend using the GET method
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/demo1/customer?id=" + custId, // Replace with the actual URL of your backend API endpoint for getting customer data
        dataType: "json",
        success: function(customerData) {
            // Populate the form with the received JSON data
            $("#order_customer_name").val(customerData.name);

            console.log("Customer data retrieved successfully:", customerData);
        },
        error: function(error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Error while retrieving customer data: ", error);
        }
    });
});

// ===============================================================================

// Function to load customer IDs into the combo box
function loadItemCodes() {
    // Send an AJAX GET request to the backend to retrieve customer data
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/demo1/item",
        dataType: "json",
        success: function(itemsData) {
            // Get the combo box element
            const itemComboBox = document.getElementById("cart_item_code");

            // Clear existing options (if any)
            itemComboBox.innerHTML = "";

            // Iterate through the received JSON array of customers
            for (let i = 0; i < itemsData.length; i++) {
                let item = itemsData[i];

                // Create a new option element for each customer ID
                const option = document.createElement("option");
                option.value = item.code;
                option.text = item.code;

                // Add the option to the combo box
                itemComboBox.appendChild(option);
            }
        },
        error: function(error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Error while retrieving item data: ", error);
        }
    });
}

// Call the function to load customer IDs into the combo box when the page loads
loadItemCodes();

// =================================================================================


// Add event listener to the combo box to fetch customer data on value change
$(document).on("change", "#cart_item_code", function(event) {
    console.log('trigger item data method');
    // Get the item code from the selected option in the combo box
    let itemCode = $("#cart_item_code").val();

    // Send the AJAX request to the backend using the GET method
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/demo1/item?code=" + itemCode,
        dataType: "json",
        success: function(itemData) {
            // Populate the form with the received JSON data
            $("#cart_description").val(itemData.description);
            $("#cart_qty_on_hand").val(itemData.qtyOnHand);
            $("#cart_unit_price").val(itemData.unitPrice);

            console.log("Item data retrieved successfully:", itemData);
        },
        error: function(error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Error while retrieving item data: ", error);
        }
    });
    //
    // // Clear the values of other form fields when a new item code is selected
    // $("#cart_description").val("");
    // $("#cart_qty_on_hand").val("");
    // $("#cart_unit_price").val("");
});
