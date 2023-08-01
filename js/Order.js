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

