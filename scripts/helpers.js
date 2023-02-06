function convertArrayToString(arr) {
    return arr.filter((v, i, a) => a.indexOf(v) === i).join(', ');
}

function showSuccessModal() {
    $('#successModal').modal('show');
    setTimeout(function () {
        $('#successModal').modal('hide');
    }, 3000);
}

function showErrorModal() {
    $('#errorModal').modal('show');
    setTimeout(function () {
        $('#errorModal').modal('hide');
    }, 3000);
}

function showModalDeleteError() {
    $('#modalDeleteError').modal('show');
    setTimeout(function () {
        $('#modalDeleteError').modal('hide');
    }, 3000);
}

function showModalDeleteSuccess() {
    $('#modalDeleteSuccess').modal('show');
    setTimeout(function () {
        $('#modalDeleteSuccess').modal('hide');
    }, 3000);
}