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
            $("#item_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Save failed: ", error);
        }
    });
});
