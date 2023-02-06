const HOSTS = 'http://181.215.134.147:8017/api/v1/hosts/';
const HOST = 'http://181.215.134.147:8017/api/v1/host/';

$(document).ready(function () {
    if (document.URL.indexOf('hosts.php') > 0) {
        getHosts();
    }

    if (document.URL.indexOf('hosts_edit.php') > 0) {
        getHost();
    }

    $('#dataTable_wrapper > div:nth-child(1)').remove();
    $('#dataTable_wrapper > div:nth-child(2)').remove();

    $("#modalDelete").modal({
        keyboard: true,
        backdrop: "static",
        show: false,

    }).on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var hostId = button.data("id");
        $('#btnDelete').attr("data-id", hostId);
    })
});


function getId() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');
    return id;
}

/* GET METHOD */
function getHosts() {
    fetchHosts().then(data => {
        appendListToDom(data);
    }).catch(error => {
        console.error("Error fetching hosts:", error);
    });
}

async function fetchHosts() {
    try {
        const response = await fetch(HOSTS);
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

    var tblBody = document.getElementById('tbl-hosts-body');
    tblBody.innerHTML = '';


    Object.keys(data).forEach(function (key) {
        var row = ` 
                        <tr id="tr${data[key].id}">
                            <th><a href='hosts_edit.php?id=${data[key].id}'>${data[key].id}</a></th>
                            <th>${data[key].hostname}</th>
                            <th>${data[key].description}</th>
                            <th>${data[key].ipv4}</th>
                            <th>${data[key].ipv6}</th>
                            <th>${data[key].macaddress}</th>
                            <th>${data[key].packages}</th>
                            <th>${data[key].packages_hold}</th>
                            <th>${data[key].packages_upgradable}</th>
                            <th>${data[key].created_at}</th>
                            <th>${data[key].updated_at}</th>
                            <th>${data[key].uuid}</th>
                            <th>
                                <div class="btn-grid">
                                    <a href='hosts_edit.php?id=${data[key].id}' class="btn btn-info mr-2 mb-2"><i class="fa-solid fa-pen-to-square"></i></a>
                                    <button class="btn btn-danger" data-id="${data[key].id}" data-toggle="modal" data-target="#modalDelete"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </th>
                        </tr>                                            
                    `
        tblBody.innerHTML += row;
    });
}

function appendItemToDom(data, arrData) {
    if (!data) return false;

    var tblBody = document.getElementById('tbl-hosts-body');

    let packages = arrData.packages ? arrData.packages.join(",") : '';
    let packages_hold = arrData.packages_hold ? arrData.packages_hold.join(",") : '';
    let packages_upgradable = arrData.packages_upgradable ? arrData.packages_upgradable.join(",") : '';

    var row = ` 
                    <tr id="tr${data.id}">
                        <th><a href='hosts_edit.php?id=${data.id}'>${data.id}</a></th>
                        <th>${data.hostname ? data.hostname : ''}</th>
                        <th>${data.description ? data.description : ''}</th>
                        <th>${data.ipv4 ? data.ipv4 : ''}</th>
                        <th>${data.ipv6 ? data.ipv6 : ''}</th>
                        <th>${data.macaddress ? data.macaddress : ''}</th>
                        <th>${packages ? packages : ''}</th>
                        <th>${packages_hold ? packages_hold : ''}</th>
                        <th>${packages_upgradable ? packages_upgradable : ''}</th>
                        <th>${data.created_at}</th>
                        <th>${data.updated_at}</th>
                        <th>${data.uuid ? data.uuid : ''}</th>
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

function getHost() {
    const id = getId();

    if (!id) return false;

    fetchHost(id).then(data => {
        setHost(data);
        setPrevData(data);
    }).catch(error => {
        console.error("Error fetching host:", error);
    });
}

async function fetchHost(id) {
    try {
        const response = await fetch(`${HOST}${id}`);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

function setHost(data) {
    if (!data) return false;

    console.log(data)

    document.getElementById("hostname").value = data.hostname;
    document.getElementById("description").value = data.description;
    document.getElementById("ipv4").value = data.ipv4;
    document.getElementById("ipv6").value = data.ipv6;
    document.getElementById("macaddress").value = data.macaddress;
    document.getElementById("packages").value = convertArrayToString(data.packages);
    document.getElementById("packages_hold").value = convertArrayToString(data.packages_hold);
    document.getElementById("packages_upgradable").value = convertArrayToString(data.packages_upgradable);
    document.getElementById("uuid").value = data.uuid;
}

function setPrevData(dataset) {

    data = dataset;

    let prevDescription = data.description;
    let prevIpv4 = data.ipv4;
    let prevIpv6 = data.ipv6;
    let prevMacaddress = data.macaddress;
    let prevPackages = data.packages;
    let prevPackagesHold = data.packages_hold;
    let prevPackagesUpgradable = data.packages_upgradable;
    let prevUuid = data.uuid;
    let createdAt = data.created_at;
    let updatedAt = data.updated_at;
}

function getPrevData() {
    return data;
}

function determineRequestType() {
    console.log('Entrou');
    let prevData = getPrevData();

    var newData = {
        hostname: $('#hostname').val(),
        description: $('#description').val(),
        ipv4: $('#ipv4').val(),
        ipv6: $('#ipv6').val(),
        macaddress: $('#macaddress').val(),
        packages: $('#packages').val(),
        packages_hold: $('#packages_hold').val(),
        packages_upgradable: $('#packages_upgradable').val(),
    };

    console.log('determineRequestType', newData);

    if (newData.hostname != prevData.hostname &&
        newData.description != prevData.description &&
        newData.ipv4 != prevData.ipv4 &&
        newData.ipv6 != prevData.ipv6 &&
        newData.macaddress != prevData.macaddress &&
        newData.packages != prevData.packages &&
        newData.packages_hold != prevData.packages_hold &&
        newData.packages_upgradable != prevData.packages_upgradable) {
        putHost(newData)
    } else {
        patchHost(newData)
    }
}

function putHost(data) {
    console.log('PUT');
    const id = getId();
    let prevData = getPrevData();

    if (!id) return false;

    let hostname = data.hostname;
    let description = data.description;
    let ipv4 = data.ipv4;
    let ipv6 = data.ipv6;
    let macaddress = data.macaddress;
    let packages = data.packages;
    let packages_hold = data.packages_hold;
    let packages_upgradable = data.packages_upgradable;
    let uuid = data.uuid;
    let updated_at = new Date().toISOString();

    console.log('putHost', data);

    let newData = {};
    let arrData = {};

    if (hostname) {
        newData.hostname = hostname;
    }

    if (description) {
        newData.description = description;
    }

    if (macaddress) {
        newData.macaddress = macaddress;
    }

    if (ipv4) {
        newData.ipv4 = ipv4;
    }

    if (ipv6) {
        newData.ipv6 = ipv6;
    }

    if (packages) {
        arrData.packages = packages.split(',').map(n => parseInt(n));
    }

    if (packages_hold) {
        arrData.packages_hold = packages_hold.split(',').map(n => parseInt(n));
    }

    if (packages_upgradable) {
        arrData.packages_upgradable = packages_upgradable.split(',').map(n => parseInt(n));
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

    if (Array.isArray(arrData.packages)) {
        if (arrData.packages.length === 1) {
            dataString += `&packages=${encodeURIComponent(arrData.packages[0])}`;
        } else {
            arrData.packages.forEach(package => {
                dataString += `&packages=${encodeURIComponent(package)}`;
            });
        }
    }

    if (Array.isArray(arrData.packages_hold)) {
        if (arrData.packages_hold.length === 1) {
            dataString += `&packages_hold=${encodeURIComponent(arrData.packages_hold[0])}`;
        } else {
            arrData.packages_hold.forEach(package => {
                dataString += `&packages_hold=${encodeURIComponent(package)}`;
            });
        }
    }

    if (Array.isArray(arrData.packages_upgradable)) {
        if (arrData.packages_upgradable.length === 1) {
            dataString += `&packages_upgradable=${encodeURIComponent(arrData.packages_upgradable[0])}`;
        } else {
            arrData.packages_upgradable.forEach(package => {
                dataString += `&packages_upgradable=${encodeURIComponent(package)}`;
            });
        }
    }

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `${HOST}${id}`);
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

function patchHost(data) {
    console.log('PATCH');
    const id = getId();
    let prevData = getPrevData();

    console.log('data', data);

    if (!id) return false;

    let hostname = data.hostname;
    let description = data.description;
    let ipv4 = data.ipv4;
    let ipv6 = data.ipv6;
    let macaddress = data.macaddress;
    let packages = data.packages;
    let packages_hold = data.packages_hold;
    let packages_upgradable = data.packages_upgradable;
    let updated_at = new Date().toISOString();

    let newData = {};
    let arrData = {};

    if (hostname) {
        newData.hostname = hostname;
    }

    if (description) {
        newData.description = description;
    }

    if (macaddress) {
        newData.macaddress = macaddress;
    }

    if (ipv4) {
        newData.ipv4 = ipv4;
    }

    if (ipv6) {
        newData.ipv6 = ipv6;
    }

    if (packages) {
        arrData.packages = packages.split(',').map(n => parseInt(n));
    }

    if (packages_hold) {
        arrData.packages_hold = packages_hold.split(',').map(n => parseInt(n));
    }

    if (packages_upgradable) {
        arrData.packages_upgradable = packages_upgradable.split(',').map(n => parseInt(n));
    }

    if (uuid) {
        newData.uuid = uuid;
    }

    newData.created_at = prevData.created_at;
    newData.updated_at = updated_at;

    console.log('newData', newData);
    console.log('arrData', arrData);

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

    if (Array.isArray(arrData.packages)) {
        if (arrData.packages.length === 1) {
            dataString += `&packages=${encodeURIComponent(arrData.packages[0])}`;
        } else {
            arrData.packages.forEach(package => {
                dataString += `&packages=${encodeURIComponent(package)}`;
            });
        }
    }

    if (Array.isArray(arrData.packages_hold)) {
        if (arrData.packages_hold.length === 1) {
            dataString += `&packages_hold=${encodeURIComponent(arrData.packages_hold[0])}`;
        } else {
            arrData.packages_hold.forEach(package => {
                dataString += `&packages_hold=${encodeURIComponent(package)}`;
            });
        }
    }

    if (Array.isArray(arrData.packages_upgradable)) {
        if (arrData.packages_upgradable.length === 1) {
            dataString += `&packages_upgradable=${encodeURIComponent(arrData.packages_upgradable[0])}`;
        } else {
            arrData.packages_upgradable.forEach(package => {
                dataString += `&packages_upgradable=${encodeURIComponent(package)}`;
            });
        }
    }

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${HOST}${id}`);
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

function postHost() {

    let hostname = document.getElementById('hostname').value;
    let description = document.getElementById('description').value;
    let ipv4 = document.getElementById('ipv4').value;
    let ipv6 = document.getElementById('ipv6').value;
    let macaddress = document.getElementById('macaddress').value;
    let packages = document.getElementById('packages').value;
    let packages_hold = document.getElementById('packages_hold').value;
    let packages_upgradable = document.getElementById('packages_upgradable').value;
    let created_at = new Date().toISOString();
    let updated_at = new Date().toISOString();

    let data = {};
    let arrData = {};

    if (hostname) {
        data.hostname = hostname;
    }

    if (description) {
        data.description = description;
    }

    if (macaddress) {
        data.macaddress = macaddress;
    }

    if (ipv4) {
        data.ipv4 = ipv4;
    }

    if (ipv6) {
        data.ipv6 = ipv6;
    }

    if (packages) {
        arrData.packages = packages.split(',').map(n => parseInt(n));
    }

    if (packages_hold) {
        arrData.packages_hold = packages_hold.split(',').map(n => parseInt(n));
    }

    if (packages_upgradable) {
        arrData.packages_upgradable = packages_upgradable.split(',').map(n => parseInt(n));
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

    if (Array.isArray(arrData.packages)) {
        if (arrData.packages.length === 1) {
            dataString += `&packages=${encodeURIComponent(arrData.packages[0])}`;
        } else {
            arrData.packages.forEach(package => {
                dataString += `&packages=${encodeURIComponent(package)}`;
            });
        }
    }

    if (Array.isArray(arrData.packages_hold)) {
        if (arrData.packages_hold.length === 1) {
            dataString += `&packages_hold=${encodeURIComponent(arrData.packages_hold[0])}`;
        } else {
            arrData.packages_hold.forEach(package => {
                dataString += `&packages_hold=${encodeURIComponent(package)}`;
            });
        }
    }

    if (Array.isArray(arrData.packages_upgradable)) {
        if (arrData.packages_upgradable.length === 1) {
            dataString += `&packages_upgradable=${encodeURIComponent(arrData.packages_upgradable[0])}`;
        } else {
            arrData.packages_upgradable.forEach(package => {
                dataString += `&packages_upgradable=${encodeURIComponent(package)}`;
            });
        }
    }

    // Send the data via an XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${HOSTS}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
        if (xhr.status === 201) {
            console.log(xhr.response);
            let responseData = JSON.parse(xhr.response);
            data.id = responseData.id;
            data.uuid = responseData.uuid;
            appendItemToDom(data, arrData);
            showSuccessModal();
        } else {
            console.error(xhr.response);
            showErrorModal();
        }
    };
    xhr.send(dataString);
}




function deleteHost() {

    $('#modalDelete').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    var hostId = $('#btnDelete').data('id');

    if (!hostId) return false;

    const url = `${HOST}${hostId}`;

    fetch(url, {
        method: 'DELETE'
    }).then((response) => {
        if (response.ok) {
            showModalDeleteSuccess();
            console.log(response);
            $(`#tr${hostId}`).remove();
            return true;
        } else {
            showModalDeleteError();
            console.error(response);
            return false;
        }
    });
}