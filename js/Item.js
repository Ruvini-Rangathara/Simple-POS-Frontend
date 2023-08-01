$('#item_code').keydown(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        let code = $("#item_code").val();

        // Send the AJAX request to the backend using the GET method
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/demo1/item?code=" + code,
            dataType: "json",
            success: function (itemData) {
                console.log(itemData);
                // Populate the form with the received JSON data
                $("#description").val(itemData.description);
                $("#unit_price").val(itemData.unitPrice);
                //unitPrice -> variable name in Item.java in server
                $("#qty_on_hand").val(itemData.qtyOnHand);

                console.log("Item data retrieved successfully:", itemData);
            },
            error: function (error) {
                // Handle any errors that occurred during the AJAX request (if needed)
                console.error("Error while retrieving item data: ", error);
            }
        });
    }
});

// ==============================================================================================
$('#add_item').on('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data and convert it to a JSON object
    let formData = {
        "code": $("#item_code").val(),
        "description": $("#description").val(),
        "unitPrice": $("#unit_price").val(),
        "qtyOnHand": $("#qty_on_hand").val()
    };

    console.log(JSON.stringify(formData));

    // Send the AJAX request to the backend using the POST method
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/demo1/item",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
            // Handle the response from the backend (if needed)
            console.log("Save successful!");
            clearItemsTable();
            loadAllItems();
            $("#item_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Save failed: ", error);
        }
    });
});

// ===========================================================================
$('#update_item').on('click',(e)=> {
    e.preventDefault(); // Prevent the default form submission
    // Get form data and convert it to a JSON object
    let formData = {
        "code": $("#item_code").val(),
        "description": $("#description").val(),
        "unitPrice": $("#unit_price").val(),
        "qtyOnHand": $("#qty_on_hand").val()
    };

    console.log(JSON.stringify(formData));

    // Send the AJAX request to the backend using the doPut method
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/demo1/item",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
            // Handle the response from the backend (if needed)
            clearItemsTable();
            loadAllItems();
            console.log("Update successful!");
            $("#item_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Update failed: ", error);
        }
    });
});

// ===========================================================================
$('#delete_item').on('click',(e)=> {
    e.preventDefault(); // Prevent the default form submission
    // Get form data and convert it to a JSON object
    let formData = {
        "code": $("#item_code").val(),
        "description": $("#description").val(),
        "unitPrice": $("#unit_price").val(),
        "qtyOnHand": $("#qty_on_hand").val()
    };

    console.log(JSON.stringify(formData));

    // Send the AJAX request to the backend using the doPut method
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/demo1/item",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
            // Handle the response from the backend (if needed)
            console.log("Delete successful!");
            clearItemsTable();
            loadAllItems();
            $("#item_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Delete failed: ", error);
        }
    });
});

// ===========================================================================

function loadAllItems() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/demo1/item",
        dataType: "json",
        success: function (itemsData) {
            // Loop through the received JSON array of customers and add rows to the table
            for (let i = 0; i < itemsData.length; i++) {
                let item = itemsData[i];
                // Replace the following line with your desired logic to populate the customer table
                // For example, you can use jQuery to add a row to an existing table
                $("#itemTable tbody").append("<tr><td>" + item.code+ "</td><td>" + item.description + "</td><td>" + item.unitPrice + "</td><td>" + item.qtyOnHand + "</td></tr>");
            }
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Error while retrieving item data: ", error);
        }
    });
}

// Call the function to load all items when the page loads
loadAllItems();

// =========================================================
function clearItemsTable() {
    // Clear the table rows from the <tbody> element
    $("#itemTable tbody").empty();
}