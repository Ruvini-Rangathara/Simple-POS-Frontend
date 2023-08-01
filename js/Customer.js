
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
                clearCustomerTable();
                loadAllCustomers();
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
            clearCustomerTable();
            loadAllCustomers();
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
            clearCustomerTable();
            loadAllCustomers();
            $("#customer_form")[0].reset();
        },
        error: function (error) {
            // Handle any errors that occurred during the AJAX request (if needed)
            console.error("Delete failed: ", error);
        }
    });
});

// ===============================================================================

    function loadAllCustomers() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/demo1/customer", // Replace with the actual URL of your backend API endpoint for getting all customers
            dataType: "json",
            success: function (customersData) {
                // Loop through the received JSON array of customers and add rows to the table
                for (let i = 0; i < customersData.length; i++) {
                    let customer = customersData[i];
                    // Replace the following line with your desired logic to populate the customer table
                    // For example, you can use jQuery to add a row to an existing table
                    $("#customerTable tbody").append("<tr><td>" + customer.id+ "</td><td>" + customer.name + "</td><td>" + customer.address + "</td><td>" + customer.salary + "</td></tr>");
                }
            },
            error: function (error) {
                // Handle any errors that occurred during the AJAX request (if needed)
                console.error("Error while retrieving customer data: ", error);
            }
        });
    }

    // Call the function to load all customers when the page loads
    loadAllCustomers();

    // =========================================================
    function clearCustomerTable() {
        // Clear the table rows from the <tbody> element
        $("#customerTable tbody").empty();
    }
