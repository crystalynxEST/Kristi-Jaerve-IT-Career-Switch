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
  console.log("loading personnel");

  getAllPersonnel();
  populateDepartmentDropdown();
  populateLocationDropdown();
}
var pageSize;
var allPersonnel;
var allDepartments;
var allLocations;

var filterResults;
var personnelTableBody;

function populateLocationDropdown() {
  $.ajax({
    url: "./libs/php/getAllLocations.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#locationFilter").empty();

        $("#locationFilter").append(
          $("<option>", {
            value: "",
            text: "Please choose location",
          })
        );

        result.data.forEach(function (location) {
          $("#locationFilter").append(
            $("<option>", {
              value: location.id,
              text: location.name,
            })
          );
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

function populateDepartmentDropdown() {
  $.ajax({
    url: "./libs/php/getAllDepartments.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editPersonnelDepartment").empty();

        $("#editPersonnelDepartment").append(
          $("<option>", {
            value: "",
            text: "Please choose Department",
          })
        );

        result.data.forEach(function (department) {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: department.id,
              text: department.name,
            })
          );
        });

        $("#addPersonnelDepartment").empty();

        $("#addPersonnelDepartment").append(
          $("<option>", {
            value: "",
            text: "Please choose Department",
          })
        );

        result.data.forEach(function (department) {
          $("#addPersonnelDepartment").append(
            $("<option>", {
              value: department.id,
              text: department.name,
            })
          );
        });

        $("#departmentFilter").empty();

        $("#departmentFilter").append(
          $("<option>", {
            value: "",
            text: "Please choose Department",
          })
        );

        result.data.forEach(function (department) {
          $("#departmentFilter").append(
            $("<option>", {
              value: department.id,
              text: department.name,
            })
          );
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

function populateTableWithPagination(data) {
  populateTable(data);

  pageSize = 15;
  var totalRows = data.length;
  var totalPages = Math.ceil(totalRows / pageSize);

  addPagination(totalPages);

  showPage(1, pageSize);
}

function getAllPersonnel() {
  $.ajax({
    url: "./libs/php/getAll.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      allPersonnel = result.data;

      populateTable(allPersonnel);
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
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteLocationModal" data-id="' +
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
      '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="' +
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

function populateTable(data) {
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
      person.location +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      person.email +
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
      person.jobTitle +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      person.location +
      "</td>" +
      '<td class="align-middle text-nowrap d-none d-md-table-cell">' +
      person.email +
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
    populateTable(filteredData);
  }
});

$("#refreshBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    getAllPersonnel();
    $("#searchInp").val("");
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      getAllDepartments();

      $("#searchInp").val("");
    } else {
      getAllLocations();

      $("#searchInp").val("");
    }
  }
});

$("#filterBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    $("#filterModal").modal("show");
  }
});


$("#filterForm").submit(function (e) {
  e.preventDefault();

  var selectedDepartment = $("#departmentFilter").val();
  var selectedLocation = $("#locationFilter").val();

  if (!selectedDepartment && !selectedLocation) {
    alert("Please choose a department or a location.");
    return;
  }

  var filteredData = filterPersonnelData(selectedDepartment, selectedLocation);

  populateTable(filteredData);

  var paginationContainer = $("#pagination");
  paginationContainer.html("");
 

  $("#filterModal").modal("hide");
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

// ...

$("#addBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    $("#addPersonnelModal").modal("show");
  }
});

$("#addPersonnelForm").submit(function (e) {
  e.preventDefault();

  var firstname = $("#addPersonnelFirstName").val();
  var lastname = $("#addPersonnelLastName").val();
  var jobTitle = $("#addPersonnelJobTitle").val();
  var email = $("#addPersonnelEmailAddress").val();
  var departmentID = $("#addPersonnelDepartment").val();

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
      $("#addPersonnelModal").modal("hide");

      initialiseData();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});

$("#personnelBtn").click(function () {
  getAllPersonnel();
});

$("#departmentsBtn").click(function () {
  getAllDepartments();
});

$("#locationsBtn").click(function () {
  getAllLocations();
});

$(document).on("click", ".deletePersonnelBtn", function (e) {
  console.log($(this).attr("data-id"));

  const apiUrl = `./libs/php/deletePersonnelByID.php`;
  $.ajax({
    url: apiUrl,
    type: "POST",
    dataType: "json",
    data: {
      id: $(this).attr("data-id"),
    },
    crossOrigin: "",
    success: function (result) {
      console.log(result);
      $("#deletePersonnelModal").modal("hide");

      initialiseData();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        `${apiUrl}: ajax call failed ${textStatus}. ${errorThrown}. ${jqXHR}`
      );
    },
  });
});

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

  var firstname = $("#editPersonnelFirstName").val();
  var lastname = $("#editPersonnelLastName").val();
  var jobTitle = $("#editPersonnelJobTitle").val();
  var email = $("#editPersonnelEmailAddress").val();

  var departmentID = $("#editPersonnelDepartment").val();

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
