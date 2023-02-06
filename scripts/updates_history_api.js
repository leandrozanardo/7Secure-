const UPDATESHISTORY = 'http://181.215.134.147:8017/api/v1/updateshistory/';
const UPDATEHISTORY = 'http://181.215.134.147:8017/api/v1/updatehistory/';

$(document).ready(function () {
    if (document.URL.indexOf('updates_history.php') > 0) {
        getUpdatesHistory();
    }

    if (document.URL.indexOf('updates_history_edit.php') > 0) {
        getUpdateHistory();
    }

    $('#dataTable_wrapper > div:nth-child(1)').remove();
    $('#dataTable_wrapper > div:nth-child(2)').remove();

    $("#modalDelete").modal({
        keyboard: true,
        backdrop: "static",
        show: false,

    }).on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var updateHistoryId = button.data("id");
        $('#btnDelete').attr("data-id", updateHistoryId);
    })
});


function getId() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');
    return id;
}

/* GET METHOD */
function getUpdatesHistory() {
    fetchUpdatesHistory().then(data => {
        appendListToDom(data);
    }).catch(error => {
        console.error("Error fetching Update Historys:", error);
    });
}

async function fetchUpdatesHistory() {
    try {
        const response = await fetch(UPDATESHISTORY);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

function appendListToDom(data) {
    if (!data) return false;

    var tblBody = document.getElementById('tbl-updates-history-body');
    tblBody.innerHTML = '';


    Object.keys(data).forEach(function (key) {
        var row = ` 
                        <tr id="tr${data[key].id}">
                            <th><a href='updates_history_edit.php?id=${data[key].id}'>${data[key].id}</a></th>
                            <th>${data[key].uuid}</th>
                            <th>${data[key].status}</th>
                            <th>${data[key].result}</th>
                            <th>${data[key].progress}</th>
                            <th>${data[key].packages_before}</th>
                            <th>${data[key].packages_after}</th>
                            <th>${data[key].packages_diff}</th>
                            <th>${data[key].ansible_log}</th>
                            <th>${data[key].host}</th>
                            <th>${data[key].created_at}</th>
                            <th>${data[key].updated_at}</th>
                            <th>
                                <div class="btn-grid">
                                    <a href='updates_history_edit.php?id=${data[key].id}' class="btn btn-info mr-2 mb-2 btn-action"><i class="fa-solid fa-pen-to-square"></i></a>
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

    var tblBody = document.getElementById('tbl-updates-history-body');

    var row = ` 
                <tr id="tr${data.id}">
                    <th><a href='updates_history_edit.php?id=${data.id}'>${data.id}</a></th>
                    <th>${data.uuid ? data.uuid : ''}</th>
                    <th>${data.status ? data.status : ''}</th>
                    <th>${data.result ? data.result : ''}</th>
                    <th>${data.progress ? data.progress : ''}</th>
                    <th>${data.packages_before ? data.packages_before : ''}</th>
                    <th>${data.packages_after ? data.packages_after : ''}</th>
                    <th>${data.packages_diff ? data.packages_diff : ''}</th>
                    <th>${data.ansible_log ? data.ansible_log : ''}</th>
                    <th>${data.host ? data.host : ''}</th>
                    <th>${data.created_at ? data.created_at : ''}</th>
                    <th>${data.updated_at ? data.updated_at : ''}</th>
                    <th>
                        <div class="btn-grid">
                            <a href='updates_history_edit.php?id=${data.id}' class="btn btn-info mr-2 mb-2 btn-action"><i class="fa-solid fa-pen-to-square"></i></a>
                            <button class="btn btn-danger btn-action" data-id="${data.id}" data-toggle="modal" data-target="#modalDelete"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </th>
                </tr>                                            
                `
    tblBody.innerHTML += row;
}

function getUpdateHistory() {
    const id = getId();

    if (!id) return false;

    fetchUpdateHistory(id).then(data => {
        console.log(data);
        setUpdateHistory(data);
        setPrevData(data);
    }).catch(error => {
        console.error("Error fetching updateHistory:", error);
    });
}

async function fetchUpdateHistory(id) {
    try {
        const response = await fetch(`${UPDATEHISTORY}${id}`);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

function setUpdateHistory(data) {
    if (!data) return false;

    document.getElementById("uuid").value = data.uuid;
    document.getElementById("status").value = data.status;
    document.getElementById("result").value = data.result;
    document.getElementById("progress").value = data.progress;
    document.getElementById("packages_before").value = data.packages_before;
    document.getElementById("packages_after").value = data.packages_after;
    document.getElementById("packages_diff").value = data.packages_diff;
    document.getElementById("ansible_log").value = data.ansible_log;
    document.getElementById("host").value = data.host;
}

function setPrevData(dataset) {

    data = dataset;

    let prevUuid = data.uuid;
    let prevStatus = data.status;
    let prevResult = data.result;
    let prevProgress = data.progress;
    let prevPackagesBefore = data.packages_before;
    let prevPackagesAfter = data.packages_after;
    let prevPackagesDiff = data.packages_diff;
    let prevAnsibleLog = data.ansible_log;
    let prevHost = data.host;
    let createdAt = data.created_at;
    let updatedAt = data.updated_at;
}

function getPrevData() {
    return data;
}

function determineRequestType() {
    let prevData = getPrevData();

    var newData = {
        status: $('#status').val(),
        result: $('#result').val(),
        progress: $('#progress').val(),
        packages_before: $('#packages_before').val(),
        packages_after: $('#packages_after').val(),
        packages_diff: $('#packages_diff').val(),
        host: $('#host').val()
    };

    console.log('ok');

    if (newData.status != 0 && newData.status != 1) {
        console.log('status')
        alert('O campo status só aceita os valores 0 ou 1');
        $('#status').focus();
        return false;
    }

    if (newData.result != 0 && newData.result != 1 && newData.result != 2 && newData.result != 3) {
        console.log('result')
        alert('O campo result só aceita os valores 0, 1, 2, 3');
        $('#result').focus();
        return false;
    }

    if (newData.status != prevData.status &&
        newData.result != prevData.result &&
        newData.progress != prevData.progress &&
        newData.packages_before != prevData.packages_before &&
        newData.packages_after != prevData.packages_after &&
        newData.packages_diff != prevData.packages_diff &&
        newData.host != prevData.host) {
        putUpdateHistory(newData)
    } else {
        patchUpdateHistory(newData)
    }
}

function putUpdateHistory(data) {
    console.log('PUT');
    const id = getId();
    let prevData = getPrevData();

    if (!id) return false;
    let uuid = document.getElementById('uuid').value;
    let status = document.getElementById('status').value;
    let result = document.getElementById('result').value;
    let progress = document.getElementById('progress').value;
    let packages_before = document.getElementById('packages_before').value;
    let packages_after = document.getElementById('packages_after').value;
    let packages_diff = document.getElementById('packages_diff').value;
    let ansible_log = document.getElementById('ansible_log').value;
    let host = document.getElementById('host').value;
    let updated_at = new Date().toISOString();

    let newData = {};

    if (uuid) {
        newData.uuid = uuid;
    }

    if (status) {
        newData.status = status;
    }

    if (result) {
        newData.result = result;
    }

    if (progress) {
        newData.progress = progress;
    }

    if (packages_before) {
        newData.packages_before = packages_before;
    }

    if (packages_after) {
        newData.packages_after = packages_after;
    }

    if (packages_diff) {
        newData.packages_diff = packages_diff;
    }

    if (ansible_log) {
        newData.ansible_log = ansible_log;
    }

    if (host) {
        newData.host = host;
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
    xhr.open("PUT", `${UPDATEHISTORY}${id}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
            showSuccessModal();
        } else {
            console.error(xhr.response);
            showErrorModal();
        }
    };
    xhr.send(dataString);
}

function patchUpdateHistory(data) {
    console.log('PATCH');
    const id = getId();
    let prevData = getPrevData();

    if (!id) return false;

    let uuid = document.getElementById('uuid').value;
    let status = document.getElementById('status').value;
    let result = document.getElementById('result').value;
    let progress = document.getElementById('progress').value;
    let packages_before = document.getElementById('packages_before').value;
    let packages_after = document.getElementById('packages_after').value;
    let packages_diff = document.getElementById('packages_diff').value;
    let ansible_log = document.getElementById('ansible_log').value;
    let host = document.getElementById('host').value;
    let updated_at = new Date().toISOString();

    let newData = {};

    if (uuid) {
        newData.uuid = uuid;
    }

    if (status) {
        newData.status = status;
    }

    if (result) {
        newData.result = result;
    }

    if (progress) {
        newData.progress = progress;
    }

    if (packages_before) {
        newData.packages_before = packages_before;
    }

    if (packages_after) {
        newData.packages_after = packages_after;
    }

    if (packages_diff) {
        newData.packages_diff = packages_diff;
    }

    if (ansible_log) {
        newData.ansible_log = ansible_log;
    }

    if (host) {
        newData.host = host;
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
    xhr.open("PATCH", `${UPDATEHISTORY}${id}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
            showSuccessModal();
        } else {
            console.error(xhr.response);
            showErrorModal();
        }
    };
    xhr.send(dataString);
}

/* POST */

function postUpdateHistory() {
    // Get the values from the form
    let status = document.getElementById('status').value;
    let result = document.getElementById('result').value;
    let progress = document.getElementById('progress').value;
    let packages_before = document.getElementById('packages_before').value;
    let packages_after = document.getElementById('packages_after').value;
    let packages_diff = document.getElementById('packages_diff').value;
    let ansible_log = document.getElementById('ansible_log').value;
    let host = document.getElementById('host').value;
    let created_at = new Date().toISOString();
    let updated_at = new Date().toISOString();

    let data = {};

    if (status) {
        data.status = status;
    }

    if (result) {
        data.result = result;
    }

    if (progress) {
        data.progress = progress;
    }

    if (packages_before) {
        data.packages_before = packages_before;
    }

    if (packages_after) {
        data.packages_after = packages_after;
    }

    if (packages_diff) {
        data.packages_diff = packages_diff;
    }

    if (ansible_log) {
        data.ansible_log = ansible_log;
    }

    if (host) {
        data.host = host;
    }

    data.created_at = created_at;
    data.updated_at = updated_at;

    // Remove any null values
    Object.keys(data).forEach(key => {
        if (data[key] == null) {
            delete data[key];
        }
    });

    // Encode the object as a URL string
    let dataString = Object.keys(data).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    ).join('&');

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${UPDATESHISTORY}`);
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


function deleteUpdateHistory() {

    $('#modalDelete').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    var updateHistoryId = $('#btnDelete').data('id');

    if (!updateHistoryId) return false;

    const url = `${UPDATEHISTORY}${updateHistoryId}`;

    fetch(url, {
        method: 'DELETE'
    }).then((response) => {
        if (response.ok) {
            showModalDeleteSuccess();
            console.log(response);
            $(`#tr${updateHistoryId}`).remove();
            return true;
        } else {
            showModalDeleteError();
            console.error(response)
            return false;
        }
    });
}