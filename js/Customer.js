
    // Search (GET) method when the Enter key is pressed inside the ID field
    $('#id').keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            // Get the customer ID from the form
            let custId = $("#id").val();

            // Send the AJAX request to the backend using the GET method
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/demo1/customer?id=" + custId, // Replace with the actual URL of your backend API endpoint for getting customer data
                dataType: "json",
                success: function (customerData) {
                    // Populate the form with the received JSON data
                    $("#name").val(customerData.name);
                    $("#address").val(customerData.address);
                    $("#salary").val(customerData.salary);

                    console.log("Customer data retrieved successfully:", customerData);
                },
                error: function (error) {
                    // Handle any errors that occurred during the AJAX request (if needed)
                    console.error("Error while retrieving customer data: ", error);
                }
            });
        }
    });

//===============================================================================
$('#add_customer').on('click', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data and convert it to a JSON object
        let formData = {
            "id": $("#id").val(),
            "name": $("#name").val(),
            "address": $("#address").val(),
            "salary": $("#salary").val()
        };

        console.log(JSON.stringify(formData));

        // Send the AJAX request to the backend using the POST method
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/demo1/customer", // Replace with the actual URL of your backend API endpoint
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
                // Handle the response from the backend (if needed)
                console.log("Save successful!");
                $("#customer_form")[0].reset();
            },
            error: function (error) {
                // Handle any errors that occurred during the AJAX request (if needed)
                console.error("Save failed: ", error);
            }
        });
    });

// ===========================================================================
$('#update_customer').on('click',(e)=> {
    e.preventDefault(); // Prevent the default form submission
    // Get form data and convert it to a JSON object
    let formData = {
        "id": $("#id").val(),
        "name": $("#name").val(),
        "address": $("#address").val(),
        "salary": $("#salary").val()
    };

    console.log(JSON.stringify(formData));

    // Send the AJAX request to the backend using the doPut method
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/demo1/customer", // Replace with the actual URL of your backend API endpoint
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
            // Handle the response from the backend (if needed)
            console.log("Update successful!");
            $("#customer_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Update failed: ", error);
        }
    });
});

// ===========================================================================
$('#delete_customer').on('click',(e)=> {
    e.preventDefault(); // Prevent the default form submission
    // Get form data and convert it to a JSON object
    let formData = {
        "id": $("#id").val(),
        "name": $("#name").val(),
        "address": $("#address").val(),
        "salary": $("#salary").val()
    };

    console.log(JSON.stringify(formData));

    // Send the AJAX request to the backend using the doPut method
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/demo1/customer", // Replace with the actual URL of your backend API endpoint
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
            // Handle the response from the backend (if needed)
            console.log("Delete successful!");
            $("#customer_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Delete failed: ", error);
        }
    });
});

