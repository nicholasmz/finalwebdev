$(document).ready(function () {
    let data = [];

    // Load data dynamically using AJAX
    function loadData() {
        $.ajax({
            url: 'data.json', // Assuming your data is stored in a local JSON file
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                data = response;
                populateTable();
            },
            error: function () {
                alert('Failed to load data.');
            }
        });
    }

    // Populate Table
    function populateTable() {
        const tbody = $("#data-table tbody");
        tbody.empty();
        data.forEach((item, index) => {
            tbody.append(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Sort Table Columns
    $("#data-table th").click(function () {
        const column = $(this).data("column");
        const order = $(this).data("order");

        data.sort((a, b) => {
            if (a[column] < b[column]) return order === "asc" ? -1 : 1;
            if (a[column] > b[column]) return order === "asc" ? 1 : -1;
            return 0;
        });

        $(this).data("order", order === "asc" ? "desc" : "asc");
        populateTable();
    });

    // Add Entry Button
    $("#add-entry-btn").click(function () {
        $("#modal-title").text("Add Entry");
        $("#modal-name").val("");
        $("#modal-email").val("");
        $("#modal-form").data("edit-index", -1);
        $("#modal").removeClass("hidden");
    });

    // Close Modal
    $("#close-modal").click(function () {
        $("#modal").addClass("hidden");
    });

    // Save Entry
    $("#modal-form").submit(function (e) {
        e.preventDefault();
        const name = $("#modal-name").val().trim();
        const email = $("#modal-email").val().trim();
        const editIndex = $(this).data("edit-index");

        if (editIndex >= 0) {
            data[editIndex] = { id: data[editIndex].id, name, email };
        } else {
            const newEntry = { id: Date.now(), name, email };
            data.push(newEntry);
        }

        populateTable();
        $("#modal").addClass("hidden");
    });

    // Delete Entry
    $(document).on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        if (confirm("Are you sure you want to delete this entry?")) {
            data.splice(index, 1);
            populateTable();
        }
    });

    // Edit Entry
    $(document).on("click", ".edit-btn", function () {
        const index = $(this).data("index");
        const entry = data[index];
        $("#modal-title").text("Edit Entry");
        $("#modal-name").val(entry.name);
        $("#modal-email").val(entry.email);
        $("#modal-form").data("edit-index", index);
        $("#modal").removeClass("hidden");
    });

    // Search Filter
    $("#search").on("keyup", function () {
        const query = $(this).val().toLowerCase();
        $("#data-table tbody tr").each(function () {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.includes(query));
        });
    });

    loadData();
});
