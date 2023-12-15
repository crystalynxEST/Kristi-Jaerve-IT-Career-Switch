$(window).on("load", function () {
  initialiseData();
  if ($("#preloader").length) {
    $("#preloader")
      .delay(1000)
      .fadeOut("slow", function () {
        $("#preloader").remove();
      });
  }
});

// Loads all personnel, locations and departments from the database
// Populate all department and location dropdowns

initialiseData();

function initialiseData() {
  getAllPersonnel();
  getAllLocations();
  getAllDepartments();
  populateDepartmentDropdown();
  // Call with all the selectors to populate
  populateLocationDropdown(["#locationFilter", "#addLocationID", "#editDepartmentLocation", "#editPersonnelLocation"]);
}

// Global variables for personnel, departments and locations
var allPersonnel;
var allDepartments;
var allLocations;

// Update Location Dropdown
function updateLocationDropdown(dropdownSelect, data)
{
  const selectDropdown = $(dropdownSelect).empty();

  selectDropdown.append(
    $("<option>", {
      value: "",
      text: "All",
    })
  );

  data.forEach(function (location) {
    selectDropdown.append(
      $("<option>", {
        value: location.id,
        text: location.name,
      })
    );
  });
}

function populateLocationDropdown(selectors) {
  $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
        if (result.status.code == 200) {
          // Update each dropdown specified in the selectors array
          selectors.forEach(function(selector) {
            updateLocationDropdown(selector, result.data);
          });
      } else {
        console.error("Error: Result code is not 200");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Error:", textStatus, errorThrown);
    },
  });
}

function updateDepartmentDropdown(dropdownSelect, data) {

  const selectDropdown = $(dropdownSelect).empty();

  selectDropdown.append(
    $("<option>", {
      value: "",
      text: "All",
    })
  );

  data.forEach(function (department) {
    selectDropdown.append(
      $("<option>", {
        value: department.id,
        text: department.name,
      })
    );
  });
}

// ------ POPULATE DEPARTMENT DROPDOWN ----------------------
function populateDepartmentDropdown() {

  $.ajax({
    url: "./libs/php/getAllDepartments.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {

        // Edit Personnel Modal 
        updateDepartmentDropdown('#editPersonnelDepartment', result.data);
        
        // Add new personnel modal
        updateDepartmentDropdown('#addPersonnelDepartment', result.data);
        
        // Department filter when on the personnel tab pane
        updateDepartmentDropdown('#departmentFilter', result.data);

      } else {
        console.error("Error: Result code is not 200");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Error:", textStatus, errorThrown);
    },
  });
}

// ------------------- GET ALL LOCATIONS -------------------
function getAllPersonnel() {
  $.ajax({
    url: "./libs/php/getAll.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      allPersonnel = result.data;
      populatePersonnelTable(allPersonnel);
    },
    error: function () {
      console.error("Error fetching data from the API");
    },
  });
}

function getAllDepartments() {
  $.ajax({
    url: "./libs/php/getAllDepartments.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      allDepartments = result.data;
      populateDepartmentTable(allDepartments);
    },
    error: function () {
      console.error("Error fetching data from the API");
    },
  });
}

function getAllLocations() {
  $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      allLocations = result.data;
      populateLocationTable(allLocations);
    },
    error: function () {
      console.error("Error fetching data from the API");
    },
  });
}

// ----------- POPULATE LOCATION TABLE -----------
function populateLocationTable(data) {

  var tableBody = $("#locationTableBody");
  tableBody.html("");

  data.forEach(function (location) {
    var row =
      "<tr>" +
      '<td class="align-middle text-nowrap">' +
      location.name +
      "</td>" +
      '<td class="text-end text-nowrap">' +
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id="' +
      location.id +
      '"><i class="fa-solid fa-pencil fa-fw"></i></button>' +
      '<button type="button" class="btn btn-primary btn-sm ms-1 deleteLocationBtn" data-id="' +
      location.id +
      '"><i class="fa-solid fa-trash fa-fw"></i></button>' +
      "</td>" +
      "</tr>";

    tableBody.append(row);
  });
}

// ----------- POPULATE DEPARTMENT TABLE -----------
function populateDepartmentTable(data) {

  var tableBody = $("#departmentTableBody");
  tableBody.html("");

  data.forEach(function (department) {
    var row =
      "<tr>" +
      '<td class="align-middle text-nowrap">' +
      department.name +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      department.location_name +
      "</td>" +
      '<td class="text-end text-nowrap">' +
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="' +
      department.id +
      '"><i class="fa-solid fa-pencil fa-fw"></i></button>' +
      '<button type="button" class="btn btn-primary btn-sm ms-1 deleteDepartmentBtn" data-id="' +
      department.id +
      '"><i class="fa-solid fa-trash fa-fw"></i></button>' +
      "</td>" +
      "</tr>";

    tableBody.append(row);
  });
}

// ----------- POPULATE PERSONNEL TABLE -----------
function populatePersonnelTable(data) {
  
  var personnelTableBody;
  
  personnelTableBody = $("#personnelTableBody");
  personnelTableBody.html('');

  data.forEach(function (person) {
    var row =
      "<tr>" +
      '<td class="align-middle text-nowrap">' +
      person.lastName +
      ", " +
      person.firstName +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      person.jobTitle +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      person.department +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      person.location +
      "</td>" +
      '<td class="text-end text-nowrap">' +
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="' +
      person.id +
      '"><i class="fa-solid fa-pencil fa-fw"></i></button>' +
      '<button type="button" class="btn btn-primary btn-sm ms-1 deletePersonnelBtn" data-id="' +
      person.id +
      '"><i class="fa-solid fa-trash fa-fw"></i></button>' +
      "</td>" +
      "</tr>";

    personnelTableBody.append(row);
  });
}

// ------------- SEARCH  ----------------------
$("#searchInp").on("keyup", function () {
  var activeTabId = $(".nav-tabs .nav-link.active").attr("id");
  var searchTerm = $(this).val().toLowerCase();

  var filteredData;

  switch (activeTabId) {

    case "personnelBtn":
      // Use existing data for filtering
      filteredData = allPersonnel.filter(function (item) {
        return item.firstName.toLowerCase().includes(searchTerm) ||
              item.lastName.toLowerCase().includes(searchTerm) ||
              item.jobTitle.toLowerCase().includes(searchTerm) ||
              item.email.toLowerCase().includes(searchTerm);
      });

      populatePersonnelTable(filteredData);
      break;

    case "departmentsBtn":
      // Use existing data for filtering
      filteredData = allDepartments.filter(function (item) {
        return item.name.toLowerCase().includes(searchTerm);
      });
      populateDepartmentTable(filteredData);
      break;

    case "locationsBtn":
      // Use existing data for filtering
      filteredData = allLocations.filter(function (item) {
        return item.name.toLowerCase().includes(searchTerm);
      });
      populateLocationTable(filteredData);
      break;

    default:
      break;
  }
});


//---------------- REFRESH SETTINGS ----------------
$("#refreshBtn").click(function () {

  $("#searchInp").val("");  // reset search input

  if ($("#personnelBtn").hasClass("active")) {
    getAllPersonnel();
  } else {

    if ($("#departmentsBtn").hasClass("active")) {
      getAllDepartments();

    } else {
      getAllLocations();
    }
  }
});


//--------------- FILTER SETTINGS ----------------
$("#departmentFilter").change(function() {

  var selectedDepartment = $(this).val();

  $("#locationFilter").val(""); // Reset location filter
  filterAndPopulatePersonnel(selectedDepartment, "");
});

$("#locationFilter").change(function() {

  var selectedLocation = $(this).val();
  $("#departmentFilter").val(""); // Reset department filter
  filterAndPopulatePersonnel("", selectedLocation);
});

function filterAndPopulatePersonnel(departmentId, locationId) {
  var filteredData = allPersonnel.filter(function(person) {
      var matchesDepartment = departmentId === "" || person.departmentID == departmentId;
      var matchesLocation = locationId === "" || person.locationID == locationId;
      return matchesDepartment && matchesLocation;
  });
  populatePersonnelTable(filteredData);
}

// ----------------------------- SANITIZE INPUTS -----------------------------
function sanitizeInput(input) {
  var sanitized = input.replace(/[^a-zA-Z0-9 \-_@.]/g, '');
  return sanitized;
}

// ----------------------------- VALIDATION FUNCTIONS ------------------------

// Display Validation Error Message
function displayValidationErrorMessage(inputId, errorMessage) {

  $('#' + inputId).closest('.form-group').addClass('has-error');
  $(`#${inputId}-error`).text(errorMessage);
}

// Clear Validation Error Message
function clearValidationErrorMessage(inputId) {

  $('#' + inputId).closest('.form-group').removeClass('has-error');
  $(`#${inputId}-error`).text('');
}

// Validate Input Fields
function validateFields(fields) {

  for (const field of fields) {
      const value = $(`#${field.id}`).val();
      if (!sanitizeInput(value)) {
          displayValidationErrorMessage(field.id, `${field.name} is required.`);
          return false;
      } else {
          clearValidationErrorMessage(field.id);
      }
    }
  return true;
}

// ---------------------------- ADD BUTTONS ----------------------------
$("#addBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    // Show add Personnal Modal
    $("#addPersonnelModal").modal("show");
  } else {
    // Show add Location Modal
    if ($("#locationsBtn").hasClass("active")) {
      $("#addLocationModal").modal("show");
    } else {
      // Show add Department Modal
      $("#addDepartmentModal").modal("show");
    }
  }
});

//  ---------------------------------- ADD PERSONNEL MODAL --------------------------------

$("#addPersonnelForm").submit(function (e) {
  e.preventDefault();
  
  var firstname = sanitizeInput($("#addPersonnelFirstName").val());
  var lastname = sanitizeInput($("#addPersonnelLastName").val());
  var jobTitle = sanitizeInput($("#addPersonnelJobTitle").val());
  var email = $("#addPersonnelEmailAddress").val();
  var departmentID = $("#addPersonnelDepartment").val();

  const firstnameInput = { id: 'addPersonnelFirstName', name: 'First name' };
  const lastnameInput = { id: 'addPersonnelLastName', name: 'Last name' };
  const jobTitleInput = { id: 'addPersonnelJobTitle', name: 'Job title' };
  const departmentInput = { id: 'addPersonnelDepartment', name: 'Department' };

  // Check all fields are entered
  if (!validateFields([firstnameInput, lastnameInput, jobTitleInput, departmentInput])) 
    return;
  
  // Email validation
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    displayValidationErrorMessage('addPersonnelEmailAddress', 'Email is not valid');
    return;
  } else {
    clearValidationErrorMessage('addPersonnelEmailAddress');
  }

  const apiUrl = "./libs/php/insertPersonnel.php";

  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      jobTitle: jobTitle,
      departmentID: departmentID,
    },
    success: function (result) {

      var resultCode = result.status.code;

      if (resultCode == 200) {
        
        $("#addPersonnelModal").modal("hide");
        $("#addPersonnelForm")[0].reset(); // Clear the form fields
        initialiseData(); // Refresh the location data
      }

      if (resultCode == 401) { 
        $("#addPersonnelModal").modal("hide");
        $("#addPersonnelForm")[0].reset(); // Clear the form fields
        $("#errorModal .modal-title").html('Insert failed');
        $("#errorModal .modal-body").html(result.data);
        $("#errorModal").modal('show');
      }

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});

function validateData(data, placeholder) {

  if (data && data.trim().length > 0) {
    // If data is not null, undefined, and not just whitespace
    return data;
  }
  return placeholder; // Return placeholder if data is invalid
}


// --------------- GET ALL INFO BUTTONS --------------------
$("#personnelBtn").click(function () {
  getAllPersonnel();
  $('#searchInp').val('');
});

$("#departmentsBtn").click(function () {
  getAllDepartments();
  $('#searchInp').val('');
});

$("#locationsBtn").click(function () {
  getAllLocations();
  $('#searchInp').val('');
});

//------------------------------------------- ADD LOCATION MODAL--------------------------------

$("#addLocationForm").submit(function (e) {
  e.preventDefault();

  var name = sanitizeInput($("#addLocationName").val());

  const locationInput = { id: 'addLocationName', name: 'Location' };

  // Check all fields are entered
  if (!validateFields([ locationInput])) 
    return;
  
  const apiUrl = "./libs/php/insertLocation.php";

  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      name:name,
    },
    success: function (result) {

      resultCode = result.status.code;

      if (resultCode == 200) {
        $("#addLocationModal").modal("hide");
        $("#addLocationForm")[0].reset(); // Clear the form fields
        initialiseData(); // Refresh the location data
      }

      if (resultCode == 401) { // REMEMBER. This won't happen on a personnel, but will on a location and department 
        $('#addLocationModal').modal('hide');
        $("#addLocationForm")[0].reset(); // Clear the form fields
        $("#errorModal .modal-title").html('Insert failed');
        $("#errorModal .modal-body").html(result.data);
        $("#errorModal").modal('show');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});

// ------------------------------------ ADD DEPARTMENT MODAL --------------------------------

$("#addDepartmentForm").submit(function (e) {
  e.preventDefault();

  var departmentName = sanitizeInput($("#addDepartmentName").val());
  var locationID = $("#addLocationID").val();

  const locationInput = { id: 'addLocationID', name: 'Location' };
  const departmentInput = { id: 'addDepartmentName', name: 'Department' };

  // Check all fields are entered
  if (!validateFields([ departmentInput, locationInput])) 
    return;
  
  const apiUrl = "./libs/php/insertDepartment.php";

  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      departmentName: departmentName,
      locationID: locationID,
    },
    success: function (result) {
      
      resultCode = result.status.code;

      if (resultCode == 200) {
      
        $("#addDepartmentModal").modal("hide");
        $("#addDepartmentForm")[0].reset(); // Clear the form fields
        initialiseData();
      }

      if (resultCode == 401) {
        $('#addDepartmentModal').modal('hide');
        $("#addDepartmentForm")[0].reset(); // Clear the form fields
        $("#errorModal .modal-title").html('Insert failed');
        $("#errorModal .modal-body").html(result.data);
        $("#errorModal").modal('show');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});


function capitalizeFirstLetter(str) {

  return str.charAt(0).toUpperCase() + str.slice(1);
}


// -------------------------------- DELETE MODALS --------------------------------
// ------- PERSONNEL

$(document).on('click', '.deletePersonnelBtn', function () {
  
  var id = $(this).attr('data-id');
  var source = 'personnel';

  var checkUrl = './libs/php/get' + capitalizeFirstLetter(source) + 'ByID.php'; // PHP files are consistently named.
  // delete the entry
  $.ajax({
    url: checkUrl,
    type: 'POST',
    dataType: 'json',
    data: { id: id },
    success: function (result) {

      resultCode = result.status.code;

      if (resultCode == 200) {
          if ($("#confirmDeleteEntry").hasClass("d-none")) { // if this div was previously hidden, remove the class d-none
            $("#confirmDeleteEntry").removeClass("d-none");
          }
          if ($("#confirmDeleteBtn").hasClass("d-none")) { // if this div was previously hidden, remove the class d-none
            $("#confirmDeleteBtn").removeClass("d-none");
          }
        
          var title = result.data.personnel[0].firstName + ' ' + result.data.personnel[0].lastName;

          $("#confirmDeleteModal .modal-title").html('Remove ' + title + '?' ); // Set Modal Title
          $('#confirmDeleteStatementFor').text('Are you sure that you want to remove the entry for ');
          $("#confirmDeleteForTable").text(source); 
          $("#confirmDeleteForEntry").text(result.data.personnel[0].firstName + ' ' + result.data.personnel[0].lastName); // retrieved from Ajax Request
          $('#confirmDeleteBtn').data('id', id); 
          $('#confirmDeleteBtn').data('source', source); 
          
          $('#secondaryDeleteBtn').text('No'); // set button text to No
          $('#confirmDeleteEntryDenied').addClass('d-none'); // Hide Delete Entry Denied (when count <> 0) div
          $("#confirmDeleteModal").modal("show");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${url}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    }
  });
});

// ------- LOCATION
$(document).on('click', '.deleteLocationBtn', function () {
  
  var locationId = $(this).attr('data-id');
  checkSourceUsage(locationId, 'location');

});

// ------- DEPARTMENT
$(document).on('click', '.deleteDepartmentBtn', function () {

  var departmentId = $(this).attr('data-id');
  checkSourceUsage(departmentId, 'department');

});

// ------- FUNCTION TO CALL API'S TO RETRIEVE COUNT AND NAME FOR CONFIRM DELETE MODAL

function checkSourceUsage(id, source) {

  var checkUrl = './libs/php/check' + capitalizeFirstLetter(source) + 'Usage.php';

  // AJAX Request to Check Usage for a Source (department, location)
  $.ajax({
      url: checkUrl,
      type: 'POST',
      dataType: 'json',
      data: { id: id },
      success: function (result) {
          if (result.data.count == 0) {
              // No dependencies, proceed with standard deletion confirmation
              prepareDeleteModal(id, source, result.data.name, false);
          } else {
              // Dependencies exist, skip confirmation and show denial message
              prepareDeleteModal(id, source, result.data.name, true, result.data.count);
          }
          $("#confirmDeleteModal").modal("show");
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.error("AJAX call failed: " + textStatus + ", " + errorThrown);
      }
  });
}

// Function to Prepare and Display the Delete Modal

function prepareDeleteModal(id, source, name, denied, count = 0) {

  var title = denied ? `Cannot remove ${name}` : `Remove ${name}?`;
  $("#confirmDeleteModal .modal-title").html(title);

  if (denied) {
      // Show denied message
      $('#confirmDeleteStatement').text('You cannot remove the entry for ');
      $("#confirmDeleteForTable").text(name);
      $("#confirmDeleteForCount").text(count);
      $('#confirmDeleteForReason').text('assigned to it');
      $('#secondaryDeleteBtn').text('Ok');
      $('#confirmDeleteBtn').addClass('d-none');
      $('#confirmDeleteEntry').addClass('d-none');
      $('#confirmDeleteEntryDenied').removeClass('d-none');

  } else {
      // Show standard delete confirmation
      $('#confirmDeleteStatementFor').text('Are you sure that you want to remove the entry for ');
      $("#confirmDeleteForEntry").text(name);
      $('#confirmDeleteBtn').data('id', id).data('source', source).removeClass('d-none');
      $('#secondaryDeleteBtn').text('No');
      $('#confirmDeleteEntryDenied').addClass('d-none');
      $('#confirmDeleteEntry').removeClass('d-none');
  }
}

// ONE DELETE MODAL FOR ALL

$('#confirmDeleteBtn').click(function () {

  var id = $(this).data('id'); // the ID of what we are deleting
  var source = $(this).data('source'); // This is what we are deleting - personnel, department, location
  var url = './libs/php/delete' + capitalizeFirstLetter(source) + 'ByID.php'; // PHP files are consistently named.
 
  // delete the entry
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: { id: id },
    success: function (result) {

      resultCode = result.status.code;

      if (resultCode == 200) {
        $('#confirmDeleteModal').modal('hide');
        initialiseData(); // Refresh data
      }

      if (resultCode == 401) { // REMEMBER. This won't happen on a personnel, but will on a location and department 
        $('#confirmDeleteModal').modal('hide');
        $("#errorModal .modal-title").html('Delete failed');
        $("#errorModal .modal-body").html(result.data);
        $("#errorModal").modal('show');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${url}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    }
    });
});


$("#addPersonnelModal").on("show.bs.modal", function (e) {

  // reloads Department Drop Down for Add Personnel Modal
  populateDepartmentDropdown();
});

// -------------------------------- EDIT MODALS --------------------------------
// ---------------------- PERSONNEL METHOD

$("#editPersonnelModal").on("show.bs.modal", function (e) {

  $.ajax({
    url: "./libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        var person = result.data.personnel[0];
        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        // Update the modal title
        $("#editPersonnelModal .modal-title").text("Edit " + person.firstName + " " + person.lastName);

        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        $("#editPersonnelDepartment").val(
          result.data.personnel[0].departmentID
        );
      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

$("#editPersonnelForm").on("submit", function (e) {

  e.preventDefault();

  var personnelId = $("#editPersonnelEmployeeID").val();

  var firstname = sanitizeInput($("#editPersonnelFirstName").val());
  var lastname = sanitizeInput($("#editPersonnelLastName").val());
  var jobTitle = sanitizeInput($("#editPersonnelJobTitle").val());
  var email = $("#editPersonnelEmailAddress").val();

  var departmentID = $("#editPersonnelDepartment").val();

  const firstnameInput = { id: 'editPersonnelFirstName', name: 'First name' };
  const lastnameInput = { id: 'editPersonnelLastName', name: 'Last name' };
  const jobTitleInput = { id: 'editPersonnelJobTitle', name: 'Job title' };
  const departmentInput = { id: 'editPersonnelDepartment', name: 'Department' };

  // Check all fields are entered
  if (!validateFields([firstnameInput, lastnameInput, jobTitleInput, departmentInput])) 
    return;
  
  // Email validation
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    displayValidationErrorMessage('editPersonnelEmailAddress', 'Email is not valid');
    return;
  } else {
    clearValidationErrorMessage('editPersonnelEmailAddress');
  }

  const apiUrl = `./libs/php/updatePersonnelByID.php`;

  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      jobTitle: jobTitle,
      departmentID: departmentID,
      id: personnelId,
    },
    crossOrigin: "",
    success: function (result) {
      $("#editPersonnelModal").modal("hide");

      initialiseData();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});

// --------------------- LOCATION METHOD
$("#editLocationModal").on("show.bs.modal", function (e) {

  $.ajax({
    url: "./libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        var location = result.data.location[0];
        $("#editLocationID").val(result.data.location[0].id);
        $("#editLocation").val(result.data.location[0].name);

        $("#editLocationModal .modal-title").text("Edit " + location.name);
      } else {
        $("#editLocationModal.modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editLocationModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

$("#editLocationForm").on("submit", function (e) {
  e.preventDefault();

  var locationId = $("#editLocationID").val();

  var name = sanitizeInput($("#editLocation").val());

  const locationInput = { id: 'editLocation', name: 'Location' };

  // Check all fields are entered
  if (!validateFields([locationInput])) 
    return;
  
  const apiUrl = `./libs/php/updateLocationByID.php`;

  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      name:name,
      id: locationId,
    },
    crossOrigin: "",
    success: function (result) {
      $("#editLocationModal").modal("hide");

      initialiseData();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});


// ----------------- ADD DEPARTMENT MODAL SHOW METHOD
$("#addDepartmentModal").on("show.bs.modal", function () {

  // Retrieve locations from database and populates location dropdown
  populateLocationDropdown(["#addLocationID"]);
});

// ----------------- EDIT DEPARTMENT MODAL SHOW METHOD
$("#editDepartmentModal").on("show.bs.modal", function (e) {

  var departmentId = $(e.relatedTarget).attr("data-id");
  // Fetch department details and set other fields

  $.ajax({
    url: "./libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: departmentId
  },
  success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200 && result.data && result.data.length > 0) {
        var department = result.data[0];

        $("#editDepartmentModal .modal-title").text("Edit " + department.name);

        $("#editDepartmentID").val(department.id);
        $("#editDepartmentName").val(department.name);

      // Set the selected value for the location
      if (department.locationID) {
        $("#editDepartmentLocation").val(department.locationID);
      }
        } else {
          $("#editDepartmentModal.modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#editDepartmentModal.modal-title").replaceWith(
          "Error retrieving data"
        );
      },
    });
    // Populate the location dropdown
    populateLocationDropdown(["#editDepartmentLocation"]);
  });

$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  var departmentId = $("#editDepartmentID").val();
  var name = sanitizeInput($("#editDepartmentName").val());
  var locationID = $("#editDepartmentLocation").val();
  
  const departmentInput = { id: 'editDepartmentName', name: 'Department' };
  const locationInput = { id: 'editDepartmentLocation', name: 'Location' };

  // Check all fields are entered
  if (!validateFields([departmentInput, locationInput])) 
    return;
  
  const apiUrl = `./libs/php/updateDepartmentByID.php`;
  
  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      name: name,
      locationID: locationID,
      id: departmentId,
    },
    crossOrigin: "",
    success: function (result) {
      $("#editDepartmentModal").modal("hide");
      initialiseData();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});

  // ---------------------- DISABLE FILTERS --------------------
  // Departments tab is clicked
  $('#departmentsBtn').on('click', function() {
    resetFiltersAndSearch();
    $('#searchInp').prop('disabled', true);
    $("#filterBtn").attr("disabled", true);
    filterDepartmentData();    
});

// Locations tab is clicked
$('#locationsBtn').on('click', function() {
    resetFiltersAndSearch();
  $('#searchInp').prop('disabled', true);
  $("#filterBtn").attr("disabled", true);
    filterLocationData();    
});

    // Personnel tab is clicked
    $('#personnelBtn').on('click', function() {
      resetFiltersAndSearch();
      $('#searchInp').prop('disabled', false);
      $("#filterBtn").attr("disabled", false);
  });

  // ------ FILTERS TO WORK WHEN TAB IS CLICKED -----------------
  $('#departmentFilter').change(function() {
    if ($('#departmentsBtn').hasClass('active')) {
        filterDepartmentData();
    }
});

$('#locationFilter').change(function() {
    if ($('#locationsBtn').hasClass('active')) {
        filterLocationData();
    }
});


// ------------- RESET FILTERS WHEN CLICKING NEW TAB ------
function resetFiltersAndSearch() {
  // Clear the search input
  $('#searchInp').val('');

  // Reset dropdowns
  $('#departmentFilter').prop('selectedIndex', 0);
  $('#locationFilter').prop('selectedIndex', 0);
}

// --------------- FILTER DEPARTMENT AND LOCATION --------------------
  function filterDepartmentData() {
    var selectedDepartmentId = $('#departmentFilter').val();
    var filteredDepartments;

    if (selectedDepartmentId === "") {
        // If no department is selected, display all departments
        filteredDepartments = allDepartments;
    } else {
        // Filter the departments based on the selected ID
        filteredDepartments = allDepartments.filter(function(department) {
            return department.id == selectedDepartmentId;
        });
    }

    populateDepartmentTable(filteredDepartments);
}

function filterLocationData() {
  var selectedLocationId = $('#locationFilter').val();
  var filteredLocations;

  if (selectedLocationId === "") {
      // If no location is selected, display all locations
      filteredLocations = allLocations;
  } else {
      // Filter the locations based on the selected ID
      filteredLocations = allLocations.filter(function(location) {
          return location.id == selectedLocationId;
      });
  }

  populateLocationTable(filteredLocations);
}
