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

                // Clear the selected value of the combo box
                $("#customer_id_combo_box").val("");

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

                // Clear the selected value of the combo box
                $("#cart_item_code").val("");

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

});

// ===================================================================================

    // Add event listener to the "Add to Cart" button
    $("#add_to_cart").on("click", function(event) {
        event.preventDefault();

        console.log("Add to cart Button clicked!");

        // Get the values from the form fields
        let itemCode = $('#cart_item_code').val();
        let description = $('#cart_description').val();
        let unitPrice = $('#cart_unit_price').val();
        let quantity = $('#cart_qty').val();

        // Create a new row for the cart table
        let newRow = "<tr><td>" + itemCode + "</td><td>" + description + "</td><td>" + unitPrice + "</td><td>" + quantity + "</td></tr>";

        // Append the new row to the table body
        $("#cartTable tbody").append(newRow);

        // Clear the form fields for the next entry
        $("#cart_item_code").val("");
        $("#cart_description").val("");
        $("#cart_unit_price").val("");
        $("#cart_qty").val("");
        $("#cart_qty_on_hand").val("");
    });

// ====================================================================================
// Function to get the item list from the cartTable
function getItemListFromTable() {
    let itemList = [];

    // Traverse through the rows of the table (excluding the header row)
    $("#cartTable tbody tr").each(function() {
        let itemCode = $(this).find("td:nth-child(1)").text();
        let quantity = parseInt($(this).find("td:nth-child(4)").text());

        // Create an item object with the extracted data
        let itemData = {
            "orderId" : $("#order_id").val(),
            "itemCode": itemCode,
            "qty": quantity
        };

        // Add the item object to the itemList array
        itemList.push(itemData);
    });

    return itemList;
}
// Event listener to confirm the order and send data to the backend
$("#confirm_order").on("click", function(event) {
    event.preventDefault();

    // Get the item list from the cartTable
    let itemList = getItemListFromTable();

    // Create the final order object with all the data
    let orderData = {
        "orderId": $("#order_id").val(),
        "customerId": $("#customer_id_combo_box").val(),
        "date": $("#date").val(),
        "itemList": itemList
    };

    console.log(orderData);

    // Send the orderData object to the backend using AJAX
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/demo1/order", // Replace with the actual URL of your backend API endpoint
        data: JSON.stringify(orderData),
        contentType: "application/json",
        success: function(response) {
            // Handle the response from the backend (if needed)
            console.log("Order confirmed successfully!");
            alert("Order confirmed successfully!");
            clearFields ();

        },
        error: function(error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Error while confirming order: ", error);
            alert("Error while confirming order");
        }
    });
});

function clearFields (){
    // Clear the form fields for the next entry
    $("#cart_item_code").val("");
    $("#cart_description").val("");
    $("#cart_unit_price").val("");
    $("#cart_qty").val("");

    // Clear the form fields after successful submission
    $("#order_id").val("");
    $("#customer_id_combo_box").val("");
    $("#date").val("");
    $("#order_customer_name").val("");

    // Clear the cart table after successful submission
    $("#cartTable tbody").empty();
}

//======================================================================================

// Highlight the clicked row in the cart table
$(document).on("click", "#cartTable tbody tr", function() {
    $(this).toggleClass("highlight");
});

// Add click event listener to the cart table rows
$('#cartTable tbody').on("click", "tr", function(event) {
    // Remove any previously selected rows' highlighting
    $("#cartTable tbody tr").removeClass("selected");

    // Add highlighting to the clicked row
    $(this).addClass("selected");
});

// Add click event listener to the "Remove from Cart" button
$("#remove_from_cart").on("click", function(event) {
    // Get the selected row from the cart table
    const selectedRow = $("#cartTable tbody tr.selected");

    if (selectedRow.length === 0) {
        alert("Please select a row to remove from the cart.");
        return;
    }

    // Remove the selected row from the cart table
    selectedRow.remove();
});
