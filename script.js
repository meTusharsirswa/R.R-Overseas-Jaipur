document.addEventListener('DOMContentLoaded', (event) => {
    loadData();
});

document.getElementById('addRowBtn').addEventListener('click', function() {
    addRow();
});

document.getElementById('savePdfBtn').addEventListener('click', function() {
    saveAsPDF();
});

document.getElementById('resetTableBtn').addEventListener('click', function() {
    resetTable();
});

function addRow(data = []) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const headers = table.parentNode.querySelectorAll('th');

    for (let i = 0; i < headers.length; i++) {
        const newCell = newRow.insertCell(i);
        const input = document.createElement('input');
        input.type = 'text';
        input.value = data[i] || '';
        input.addEventListener('input', saveData);
        newCell.appendChild(input);
        newCell.setAttribute('data-th', headers[i].getAttribute('data-th'));
    }

    saveData();
}

function saveData() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    let tableData = [];

    for (let row of rows) {
        let rowData = [];
        const inputs = row.getElementsByTagName('input');
        for (let input of inputs) {
            rowData.push(input.value);
        }
        tableData.push(rowData);
    }

    localStorage.setItem('partyData', JSON.stringify(tableData));
}

function loadData() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing rows
    const tableData = JSON.parse(localStorage.getItem('partyData')) || [];
    for (let rowData of tableData) {
        addRow(rowData);
    }
}

async function saveAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById('dataTable');
    const headers = Array.from(table.getElementsByTagName('th')).map(th => th.textContent);
    const rows = Array.from(table.getElementsByTagName('tr')).slice(1); // Exclude header row
    let pdfData = rows.map(row => Array.from(row.getElementsByTagName('td')).map(td => td.getElementsByTagName('input')[0].value));

    doc.autoTable({
        head: [headers],
        body: pdfData,
        styles: {
            fontSize:5,
            // cellWidth: 'wrap',
            minCellHeight: 10,
            halign: 'center',
            valign: 'middle',
        },
        columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 'auto' },
            3: { cellWidth:'auto' },
            4: { cellWidth:'auto' },
            5: { cellWidth: 'auto' },
            6: { cellWidth: 'auto' },
            7: { cellWidth: 'auto' },
            8: { cellWidth: 'auto' },
            9: { cellWidth: 'auto' },
            10: { cellWidth: 'auto' },
            11: { cellWidth: 'auto' },
            12: { cellWidth: 'auto' },
            13: { cellWidth: 'auto' },
        },
        margin: { top: 30 },
        theme: 'striped',
        didDrawPage: function (data) {
            doc.setFontSize(20);
            doc.text('R R OVERSEAS JAIPUR New firm', data.settings.margin.left, 20);
        },
    });

    doc.save('R-R Overseas Jaipur.pdf');
}

function resetTable() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing rows
    localStorage.removeItem('partyData');
}
