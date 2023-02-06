const PACKAGES = 'http://181.215.134.147:8017/api/v1/packages/';
const PACKAGE = 'http://181.215.134.147:8017/api/v1/package/';

$(document).ready(function () {
    if (document.URL.indexOf('packages.php') > 0) {
        getPackages();
    }

    if (document.URL.indexOf('packages_edit.php') > 0) {
        getPackage();
    }

    $('#dataTable_wrapper > div:nth-child(1)').remove();
    $('#dataTable_wrapper > div:nth-child(2)').remove();

    $("#modalDelete").modal({
        keyboard: true,
        backdrop: "static",
        show: false,

    }).on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var packageId = button.data("id");
        $('#btnDelete').attr("data-id", packageId);
    })
});


function getId() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');
    return id;
}

/* GET METHOD */
function getPackages() {
    fetchPackages().then(data => {
        appendListToDom(data);
        console.log(data)
    }).catch(error => {
        console.error("Error fetching packages:", error);
    });
}

async function fetchPackages() {
    try {
        const response = await fetch(PACKAGES);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

function convertJSON(data, columns) {
    return data.map(item => {
        let newItem = {};
        columns.forEach(col => newItem[col] = item[col]);
        return newItem;
    });
}

function appendListToDom(data) {
    if (!data) return false;

    var tblBody = document.getElementById('tbl-packages-body');
    tblBody.innerHTML = '';


    Object.keys(data).forEach(function (key) {
        var row = ` 
                        <tr id="tr${data[key].id}">
                            <th><a href='packages_edit.php?id=${data[key].id}'>${data[key].id}</a></th>
                            <th>${data[key].name}</th>
                            <th>${data[key].uuid}</th>
                            <th>${data[key].version}</th>
                            <th>${data[key].created_at}</th>
                            <th>${data[key].updated_at}</th>
                            <th>
                                <div class="btn-grid">
                                    <a href='packages_edit.php?id=${data[key].id}' class="btn btn-info mr-2 mb-2 btn-action"><i class="fa-solid fa-pen-to-square"></i></a>
                                    <button class="btn btn-danger btn-action" data-id="${data[key].id}" data-toggle="modal" data-target="#modalDelete"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </th>
                        </tr>                                            
                    `
        tblBody.innerHTML += row;
    });
}

function appendItemToDom(data) {
    if (!data) return false;

    var tblBody = document.getElementById('tbl-packages-body');

    var row = ` 
                <tr id="tr${data.id}">
                    <th><a href='hosts_edit.php?id=${data.id}'>${data.id}</a></th>
                    <th>${data.name ? data.name : ''}</th>
                    <th>${data.uuid ? data.uuid : ''}</th>
                    <th>${data.version ? data.version : ''}</th>
                    <th>${data.created_at}</th>
                    <th>${data.updated_at}</th>
                    <th>
                        <div class="btn-grid">
                            <a href='hosts_edit.php?id=${data.id}' class="btn btn-info mr-2 mb-2 btn-action"><i class="fa-solid fa-pen-to-square"></i></a>
                            <button class="btn btn-danger btn-action" data-id="${data.id}" data-toggle="modal" data-target="#modalDelete"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </th>
                </tr>                                            
                `
    tblBody.innerHTML += row;
}

function getPackage() {
    const id = getId();

    if (!id) return false;

    fetchPackage(id).then(data => {
        setPackage(data);
        setPrevData(data);
    }).catch(error => {
        console.error("Error fetching package:", error);
    });
}

async function fetchPackage(id) {
    try {
        const response = await fetch(`${PACKAGE}${id}`);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

function setPackage(data) {
    if (!data) return false;

    document.getElementById("name").value = data.name;
    document.getElementById("version").value = data.version;
    document.getElementById("uuid").value = data.uuid;
}

function setPrevData(dataset) {

    data = dataset;

    let prevName = data.name;
    let prevVersion = data.version;
    let prevUuid = data.uuid;
    let createdAt = data.created_at;
    let updatedAt = data.updated_at;
}

function getPrevData() {
    return data;
}

function determineRequestType() {
    let prevData = getPrevData();

    var newData = {
        name: $('#name').val(),
        version: $('#version').val(),
        uuid: $('#uuid').val()
    };

    if (newData.name != prevData.name &&
        newData.version != prevData.version &&
        newData.uuid != prevData.uuid) {
        putPackage(newData)
    } else {
        patchPackage(newData)
    }
}

function putPackage(data) {
    console.log('PUT');
    const id = getId();
    let prevData = getPrevData();

    if (!id) return false;
    // Get the values from the form
    let name = document.getElementById('name').value;
    let version = document.getElementById('version').value;
    let uuid = document.getElementById('uuid').value;
    let updated_at = new Date().toISOString();

    let newData = {};

    if (name) {
        newData.name = name;
    }

    if (version) {
        newData.version = version;
    }

    if (uuid) {
        newData.uuid = uuid;
    }

    newData.created_at = prevData.created_at;
    newData.updated_at = updated_at;

    // Remove any null values
    Object.keys(newData).forEach(key => {
        if (newData[key] == null) {
            delete newData[key];
        }
    });

    // Encode the object as a URL string
    let dataString = Object.keys(newData).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(newData[key])
    ).join('&');

    console.log(dataString);

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `${PACKAGE}${id}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
        if (xhr.status === 200) {
            // Show success modal
            showSuccessModal();
        } else {
            // Show error modal
            showErrorModal();
        }
    };
    xhr.send(dataString);
}

function patchPackage(data) {
    console.log('PATCH');
    const id = getId();
    let prevData = getPrevData();

    if (!id) return false;
    // Get the values from the form
    let name = document.getElementById('name').value;
    let version = document.getElementById('version').value;
    let uuid = document.getElementById('uuid').value;
    let updated_at = new Date().toISOString();

    let newData = {};

    if (name) {
        newData.name = name;
    }

    if (version) {
        newData.version = version;
    }

    if (uuid) {
        newData.uuid = uuid;
    }

    newData.created_at = prevData.created_at;
    newData.updated_at = updated_at;

    // Remove any null values
    Object.keys(newData).forEach(key => {
        if (newData[key] == null) {
            delete newData[key];
        }
    });

    // Encode the object as a URL string
    let dataString = Object.keys(newData).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(newData[key])
    ).join('&');

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${PACKAGE}${id}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
        if (xhr.status === 200) {
            // Show success modal
            showSuccessModal();
        } else {
            // Show error modal
            showErrorModal();
        }
    };
    xhr.send(dataString);
}

/* POST */

function postPackage() {

    let name = document.getElementById('name').value;
    let version = document.getElementById('version').value;
    let created_at = new Date().toISOString();
    let updated_at = new Date().toISOString();

    let data = {};

    if (name) {
        data.name = name;
    }

    if (version) {
        data.version = version;
    }

    data.created_at = created_at;
    data.updated_at = updated_at;

    // Remove any null values
    Object.keys(data).forEach(key => {
        if (data[key] == null) {
            delete data[key];
        }
    });

    let dataString = Object.keys(data).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    ).join('&');

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${PACKAGES}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
        if (xhr.status === 201) {
            console.log(xhr.response);
            let responseData = JSON.parse(xhr.response);
            data.id = responseData.id;
            data.uuid = responseData.uuid;
            appendItemToDom(data);
            showSuccessModal();
        } else {
            console.error(xhr.response);
            showErrorModal();
        }
    };
    xhr.send(dataString);
}

function deletePackage() {

    $('#modalDelete').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    var packageId = $('#btnDelete').data('id');

    if (!packageId) return false;

    const url = `${PACKAGE}${packageId}`;

    fetch(url, {
        method: 'DELETE'
    }).then((response) => {
        if (response.ok) {
            showModalDeleteSuccess();
            console.log(response);
            $(`#tr${packageId}`).remove();
            return true;
        } else {
            showModalDeleteError();
            console.error(response)
            return false;
        }
    });
}