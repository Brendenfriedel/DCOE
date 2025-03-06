// Define a simple device structure
let devices = [];

// Add a new device
document.getElementById('addDevice').addEventListener('click', () => {
    const deviceName = prompt("Enter device name:");
    const inputChannels = parseInt(prompt("Enter number of input channels:"));
    const outputChannels = parseInt(prompt("Enter number of output channels:"));
    
    if (deviceName && inputChannels && outputChannels) {
        const newDevice = {
            name: deviceName,
            inputChannels: inputChannels,
            outputChannels: outputChannels
        };
        devices.push(newDevice);
        updateDeviceList();
        updatePatchMatrix();
    }
});

// Update the device list in the UI
function updateDeviceList() {
    const deviceList = document.getElementById('devices');
    deviceList.innerHTML = '';  // Clear the list
    devices.forEach(device => {
        const listItem = document.createElement('li');
        listItem.textContent = `${device.name} - Inputs: ${device.inputChannels}, Outputs: ${device.outputChannels}`;
        deviceList.appendChild(listItem);
    });
}

// Update the patch matrix in the UI
function updatePatchMatrix() {
    const matrixBody = document.getElementById('matrixBody');
    matrixBody.innerHTML = '';  // Clear the matrix
    devices.forEach((device, index) => {
        for (let i = 1; i <= device.inputChannels; i++) {
            for (let j = 1; j <= device.outputChannels; j++) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${device.name}</td>
                    <td>Input ${i}</td>
                    <td>Output ${j}</td>
                `;
                matrixBody.appendChild(row);
            }
        }
    });
}

// Export to XML (this can be expanded later)
document.getElementById('exportBtn').addEventListener('click', () => {
    const xmlContent = generateXML();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dante_config.xml';
    link.click();
});

// Generate a simple XML structure for the Dante configuration
function generateXML() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<DanteConfig>\n';
    devices.forEach(device => {
        xml += `  <Device name="${device.name}">\n`;
        xml += `    <InputChannels>${device.inputChannels}</InputChannels>\n`;
        xml += `    <OutputChannels>${device.outputChannels}</OutputChannels>\n`;
        xml += '  </Device>\n';
    });
    xml += '</DanteConfig>';
    return xml;
}
