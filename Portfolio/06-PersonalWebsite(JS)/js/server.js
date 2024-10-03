console.log("Running the script");

document.getElementById('agenda-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Get the values from the form
    const date = document.getElementById('date').value;
    const timeStart = document.getElementById('time-start').value;
    const timeEnd = document.getElementById('time-end').value;
    const activity = document.getElementById('activity').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const notes = document.getElementById('notes').value;
    const flagColor = document.getElementById('flag').value;
    const freeBusy = document.getElementById('free-busy').checked ? 'Free' : 'Busy';

    // Create a new entry element
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('agenda-entry');

    // Populate the entry with the values
    entryDiv.innerHTML = `
        <strong>Date:</strong> ${date}<br>
        <strong>Time Start:</strong> ${timeStart}<br>
        <strong>Time End:</strong> ${timeEnd}<br>
        <strong>Activity:</strong> ${activity}<br>
        <strong>Place:</strong> ${place}<br>
        <strong>Type:</strong> ${type}<br>
        <strong>Notes:</strong> ${notes}<br>
        <strong>Flag Color:</strong> <span style="display:inline-block; width: 20px; height: 20px; background-color: ${flagColor}; border-radius: 50%;"></span><br>
        <strong>Status:</strong> ${freeBusy}
    `;

    // Append the new entry to the entries container
    document.getElementById('entries-container').appendChild(entryDiv);

    // Clear the form
    this.reset();
});
