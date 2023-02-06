const HOSTS = 'http://181.215.134.147:8017/api/v1/hosts/';
const HOST = 'http://181.215.134.147:8017/api/v1/host/';
const PACKAGES = 'http://181.215.134.147:8017/api/v1/packages/';
const PACKAGE = 'http://181.215.134.147:8017/api/v1/package/';
const UPDATESHISTORY = 'http://181.215.134.147:8017/api/v1/updateshistory/';
const UPDATEHISTORY = 'http://181.215.134.147:8017/api/v1/updatehistory/';


$(document).ready(async function () {
    const amountHosts = await getHosts();
    const amountPackages = await getPackages();
    const amountUpdateHistory = await getUpdatesHistory();
    await loadCharPie(amountHosts, amountPackages, amountUpdateHistory);
});

async function getHosts() {
    try {
        const response = await fetch(HOSTS);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        let amountHosts = Object.keys(data).length;
        $("#hosts-amount").append(amountHosts);
        return amountHosts;
    } catch (error) {
        console.error("Error fetching hosts:", error);
    }
}

async function getPackages() {
    try {
        const response = await fetch(PACKAGES);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        let amountPackages = Object.keys(data).length;
        $("#packages-amount").append(amountPackages);
        return amountPackages;
    } catch (error) {
        console.error("Error fetching packages:", error);
    }
}

async function getUpdatesHistory() {
    try {
        const response = await fetch(UPDATESHISTORY);
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.error);
        }
        let amountUpdateHistory = Object.keys(data).length;
        $("#updates-history-amount").append(amountUpdateHistory);
        return amountUpdateHistory;
    } catch (error) {
        console.error("Error fetching Update Historys:", error);
    }
}

async function loadCharPie(amountHosts, amountPackages, amountUpdateHistory) {

    // Create and render the chart
    new Chart(document.getElementById("myPieChart"), {
        type: 'doughnut',
        data: {
            labels: [`Hosts ${amountHosts}`, `Packages ${amountPackages}`, `Updates History ${amountUpdateHistory}`],
            datasets: [{
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                data: [amountHosts, amountPackages, amountUpdateHistory]
            }]
        },
        options: {
            title: {
                display: false,
                text: 'Donut Chart'
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontSize: 14,
                    fontColor: '#000'
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}