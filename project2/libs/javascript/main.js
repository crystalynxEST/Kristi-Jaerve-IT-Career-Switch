/*FIXME: Personnel: When not choosing a department, should ask to choose a department - Think done?
TODO: Check a personnel does not already exists when adding a new one; (see insertDepartment.php) - Think done?
TODO: Validation when adding a location or department, e.g. Department if no location is shown, show a message. - Think done?
TODO: Validation on personnel, check e-mail address is valid and other fields are entered. - think done?
TODO: Probably could do with disabling department and location filter when on Locations/Department pane - Maybe gray it out or something like that
// ABOVE - currently very buggy. Need to work on it.
TODO: Check responsive joy...
TODO: htaccess file
TODO: No error logs on console


*/
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

function initialiseData() {
  console.log("loading");

  getAllPersonnel();
  populateDepartmentDropdown();
  populateLocationDropdown();
  getAllLocations();
  getAllDepartments();
}
var pageSize;
var allPersonnel;
var allDepartments;
var allLocations;

var filterResults;
var personnelTableBody;


function updateLocationDropdown(dropdownSelect, data)
{
  const selectDropdown = $(dropdownSelect).empty();

  selectDropdown.append(
    $("<option>", {
      value: "",
      text: "Select Location",
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



// Populates location dropdowns
function populateLocationDropdown() {
  $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {

        // Filter location dropdown when viewing the personnel tab
        updateLocationDropdown("#locationFilter", result.data);

        // Add New Department Location dropdown
        updateLocationDropdown("#addLocationID", result.data);


      } else {
        console.error("Error: Result code is not 200");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Error:", textStatus, errorThrown);
    },
  });
}

function updateDepartmentDropdown(dropdownSelect, data)
{
  const selectDropdown = $(dropdownSelect).empty();

  selectDropdown.append(
    $("<option>", {
      value: "",
      text: "Select Department",
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

function populatePersonnelTableWithPagination(data) {
  populatePersonnelTable(data);

  pageSize = 15;
  var totalRows = data.length;
  var totalPages = Math.ceil(totalRows / pageSize);

  addPagination(totalPages);

  showPage(1, pageSize);
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
      '<button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="' +
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
      '<button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="' +
      department.id +
      '"><i class="fa-solid fa-trash fa-fw"></i></button>' +
      "</td>" +
      "</tr>";

    tableBody.append(row);
  });
}


// ----------- POPULATE PERSONNEL TABLE -----------
function populatePersonnelTable(data) {
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
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#viewPersonnelModal" data-id="' +
      person.id +
      '"><i class="fa-solid fa-search fa-fw"></i></button>' +
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="' +
      person.id +
      '"><i class="fa-solid fa-pencil fa-fw"></i></button>' +
      '<button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="' +
      person.id +
      '"><i class="fa-solid fa-trash fa-fw"></i></button>' +
      "</td>" +
      "</tr>";

    personnelTableBody.append(row);
  });
}

function addPagination(totalPages) {
  var paginationContainer = $("#pagination");
  paginationContainer.html("");

  for (var i = 1; i <= totalPages; i++) {
    var pageLink =
      '<li class="page-item"><a class="page-link" href="#" data-page="' +
      i +
      '">' +
      i +
      "</a></li>";
    paginationContainer.append(pageLink);
  }

  paginationContainer.find("a").on("click", function (e) {
    e.preventDefault();
    var page = $(this).data("page");
    showPage(page, pageSize);
  });
}


// -------------- SHOW PAGE PERSONNEL ------------------------------
function showPage(page, pageSize) {
  var start = (page - 1) * pageSize;
  var end = start + pageSize;
  $("#personnelTableBody tr").hide();

  allPersonnel.slice(start, end).forEach(function (person) {
    var row =
      "<tr>" +
      '<td class="align-middle text-nowrap">' +
      person.lastName +
      ", " +
      person.firstName +
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
      '<button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="' +
      person.id +
      '"><i class="fa-solid fa-trash fa-fw"></i></button>' +
      "</td>" +
      "</tr>";

    $("#personnelTableBody").append(row);
  });
}


// ------------- SEARCH 
$("#searchInp").on("keyup", function () {
  var activeTabId = $(".nav-tabs .nav-link.active").attr("id");

  var activeGlobalVariable;
  switch (activeTabId) {
    case "personnelBtn":
      activeGlobalVariable = allPersonnel;
      break;
    case "departmentsBtn":
      activeGlobalVariable = allDepartments;
      break;
    case "locationsBtn":
      activeGlobalVariable = allLocations;
      break;

    default:
      break;
  }


  var searchTerm = $(this).val().toLowerCase();
  var filteredData = activeGlobalVariable.filter(function (item) {
    if (activeTabId === "departmentsBtn") {
      return item.name.toLowerCase().includes(searchTerm);
    }

    if (activeTabId === "locationsBtn") {
      return item.name.toLowerCase().includes(searchTerm);
    }
    if (activeTabId === "personnelBtn") {
      return (
        item.firstName.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm) ||
        item.jobTitle.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm)
      );
    }
  });

  if (activeTabId === "departmentsBtn") {
    populateDepartmentTable(filteredData);
  } else if (activeTabId === "locationsBtn") {
    populateLocationTable(filteredData);
  } else {
    populatePersonnelTable(filteredData);
  }
});


//---------------- REFRESH SETTINGS ----------------
$("#refreshBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    initialiseData();
    $("#departmentFilter").prop('disabled', 'false');
    $("#locationFilter").prop('disabled', 'false');
    $("#searchInp").val("");
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      initialiseData();
      $("#departmentFilter").prop('disabled', 'true');
      $("#locationFilter").prop('disabled', 'true');
      $("#searchInp").val("");
    } else {
      initialiseData();
      $("#departmentFilter").prop('disabled', 'true');
      $("#locationFilter").prop('disabled', 'true');
      $("#searchInp").val("");
    }
  }
});


$("#departmentFilter, #locationFilter").change(function () {

  var selectedDepartment = $("#departmentFilter").val();
  var selectedLocation = $("#locationFilter").val();

  var filteredData = filterPersonnelData(selectedDepartment, selectedLocation);

  populatePersonnelTable(filteredData);

});

function filterPersonnelData(selectedDepartment, selectedLocation) {

  var filteredData = allPersonnel.filter(function (person) {
    return (
      (selectedDepartment === "" ||
        person.departmentID == selectedDepartment) &&
      (selectedLocation === "" || person.locationID == selectedLocation)
    );
  });

  return filteredData;
}

// ----------------------------- SANITIZE INPUTS -----------------------------
function sanitizeInput(input) {
  var sanitized = input.replace(/[^a-zA-Z0-9 \-_@.]/g, '');
  return sanitized;
}


//  ---------------------------------- ADD PERSONNEL MODAL --------------------------------

$("#addBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    $("#addPersonnelModal").modal("show");
  }
});

$("#addPersonnelForm").submit(function (e) {
  e.preventDefault();

  var firstname = sanitizeInput($("#addPersonnelFirstName").val());
  var lastname = sanitizeInput($("#addPersonnelLastName").val());
  var jobTitle = sanitizeInput($("#addPersonnelJobTitle").val());
  var email = $("#addPersonnelEmailAddress").val();
  var departmentID = $("#addPersonnelDepartment").val();

      // Email validation
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          return;
      }
  
      // Check all fields are entered
      if (!firstname || !lastname || !jobTitle || !email) {
          alert("Please fill out all fields.");
          return;
      }
  
      // Department selection validation
      if (!departmentID) {
          alert("Please select a department.");
          return;
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
    success: function (data) {
      $("#addPersonnelModal").modal("hide");
      $("#addPersonnelForm")[0].reset(); // Clear the form fields

      initialiseData();

      if (data.status && data.status.code !== "200") {
        alert(data.data); // or update the DOM to display the message
    } 

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});


$("#viewPersonnelModal").on("show.bs.modal", function (e) {
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
        console.log(result.data);

        var person = result.data.personnel[0];

        
        $("#viewPersonnelModal .modal-body").html("");
        $("#viewPersonnelModal .modal-title").html(person.firstName + " " + person.lastName);
        var personnel =
          "<table>" +
        "</tr>" +
        '<tr><td class="align-middle text-nowrap d-none d-md-table-cell"><strong>Job Title</strong>: ' +
        person.jobTitle +
        "</td></tr>" +
        '<tr><td class="align-middle text-nowrap d-none d-md-table-cell"><strong>Department</strong>: ' +
        person.department +
        "</td></tr>" +
        '<tr><td class="align-middle text-nowrap d-none d-md-table-cell"><strong>Location</strong>: ' +
        person.location +
        "</td></tr>" +
        '<tr><td class="align-middle text-nowrap d-none d-md-table-cell"><strong>Email</strong>: ' +
        person.email +
        "</td>" +
          "</tr>" +
        "</table>";
  
        $("#viewPersonnelModal .modal-body").append(personnel);
        

      } else {
        $("#viewPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#viewPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

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
$("#addBtn").click(function () {
  if ($("#locationsBtn").hasClass("active")) {
    $("#addLocationModal").modal("show");
  }
});

$("#addLocationForm").submit(function (e) {
  e.preventDefault();

  var name = sanitizeInput($("#addLocationName").val());

      // Check if location name is entered
      if (!addLocationName) {
        alert("Please enter a location name.");
        return;
    }

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
        initialiseData(); // Refresh the location data on the page
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
$("#addBtn").click(function () {
  if ($("#departmentsBtn").hasClass("active")) {
    $("#addDepartmentModal").modal("show");
  }
});

$("#addDepartmentForm").submit(function (e) {
  e.preventDefault();

  var departmentName = sanitizeInput($("#addDepartmentName").val());
  var locationID = $("#addLocationID").val();

  // Check if department name is entered
  if (!departmentName) {
    alert("Please enter a department name.");
    return;
  }

  // Check if location ID is selected
  if (!locationID) {
      alert("Please select a location.");
      return;
  }

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

      if (resultCode == 401)
      {
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

$(document).on('click', '.deletePersonnelBtn', function() {
  var personnelId = $(this).attr('data-id');
  $('#confirmDeleteModal').modal('show');
  $('#confirmDeleteBtn').data('id', personnelId); // Store the ID in the confirm button for later use
  $('#confirmDeleteBtn').data('source', 'personnel'); // Store the source - what are we deleting
});

// ------- LOCATION
$(document).on('click', '.deleteLocationBtn', function() {
  var locationId = $(this).attr('data-id');
  $('#confirmDeleteModal').modal('show');
  $('#confirmDeleteBtn').data('id', locationId); 
  $('#confirmDeleteBtn').data('source', 'location');   
});

// ------- DEPARTMENT
$(document).on('click', '.deleteDepartmentBtn', function() {
  var departmentId = $(this).attr('data-id');
  $('#confirmDeleteModal').modal('show');
  $('#confirmDeleteBtn').data('id', departmentId); 
  $('#confirmDeleteBtn').data('source', 'department'); 
});

// ONE DELETE MODAL FOR ALL
$('#confirmDeleteBtn').click(function() {
  var id = $(this).data('id'); // The ID of what we are deleting
  var source = $(this).data('source'); // This is what we are deleting e.g. personnel, department, location
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
        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

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

  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Check all fields are entered
  if (!firstname || !lastname || !jobTitle || !email) {
      alert("Please fill out all fields.");
      return;
  }

  // Department selection validation
  if (!departmentID) {
      alert("Please select a department.");
      return;
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
        $("#editLocationID").val(result.data.location[0].id);
        $("#editLocation").val(result.data.location[0].name);
        

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

// ----------------- DEPARTMENT METHOD
$("#editDepartmentModal").on("show.bs.modal", function (e) {
  // var departmentId = $(e.relatedTarget).attr("data-id");

  // First, ensure allLocations is populated
  if (!allLocations || allLocations.length === 0) {
    console.error("Locations data not available");
    return;
  }

  // Populate the location dropdown
  $("#editDepartmentLocation").empty();
  $.each(allLocations, function () {
    $("#editDepartmentLocation").append(
      $("<option>", {
        value: this.id,
        text: this.name,
      })
    );
  });

  // Fetch department details and set other fields
  $.ajax({
    url: "./libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200 && result.data && result.data.length > 0) {
        $("#editDepartmentID").val(result.data[0].id);
        $("#editDepartmentName").val(result.data[0].name);
        
        // Set the selected value for the location
      if (result.data.location && result.data.location.length > 0) {
          $("#editDepartmentLocation").val(result.data.location[0].locationID);
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
  });
          

$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  var departmentId = $("#editDepartmentID").val();
  var name = sanitizeInput($("#editDepartmentName").val());
  var locationID = $("#editDepartmentLocation").val();

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

// $(document).ready(function() {
//   // Function to disable filters
//   function disableFiltersPersonnel() {
//       $('#departmentFilter').prop('disabled', true);
//       $('#locationFilter').prop('disabled', true);
//   }


//   // Function to enable filters
//   function enableFilters() {
//       $('#departmentFilter').prop('disabled', false);
//       $('#locationFilter').prop('disabled', false);
//   }

//   // Disable filters initially
//   disableFiltersPersonnel();

//   // Trigger when the Personnel tab is shown
//   $('#personnelBtn').on('shown.bs.tab', function() {
//     disableFiltersPersonnel();
//   });

//   // Trigger when either the Departments or Locations tab is shown
//   $('#departmentsBtn, #locationsBtn').on('shown.bs.tab', function() {
//       enableFilters();
//   });




//   $('#departmentsBtn').on('click', function() {
//     $('#searchInp').prop('disabled', true);
//     $('#locationFilter').prop('disabled', true);
// });

// // When the Departments or Locations tab is clicked
// $('#searchInp, #locationsBtn').on('click', function() {
//     $('#searchInp').prop('disabled', false);
//     $('#locationFilter').prop('disabled', false);
// });


// $('#locationsBtn').on('click', function() {
//   $('#searchInp').prop('disabled', true);
//   $('#departmentFilter').prop('disabled', true);
// });

// // When the Departments or Locations tab is clicked
// $('#departmentFilter, #searchInp').on('click', function() {
//   $('#searchInp').prop('disabled', false);
//   $('#departmentFilter').prop('disabled', false);
// });
// });
