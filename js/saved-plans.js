
"use strict";

let savedTrips = JSON.parse(localStorage.getItem("savedTrips")) || [];

let savedPlansSection = document.getElementById("savedPlans");

if (savedTrips.length === 0) {
    savedPlansSection.innerHTML = "<p>You have no saved plans yet.</p>";
} else {
    for (let i = 0; i < savedTrips.length; i++) {
        let trip = savedTrips[i];

        let tripHTML = `
            <article class="saved-trip">
                <h3>${trip.name}</h3>
                <p>${trip.startDate} - ${trip.endDate}</p>
                <button type="button">Edit Plan</button>
        `;

        for (let j = 0; j < (trip.campgrounds || []).length; j++) {
            let campground = trip.campgrounds[j];

            tripHTML += `
                <h4>Campground: ${campground.name}</h4>
                <div class="campground-image">
                    Campground Image
                </div>
                <p>Arrive: ${campground.arrival}</p>
                <p>Depart: ${campground.departure}</p>

                

                <h4>Planned Activities</h4>

                <table>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
            `;

            for (let k = 0; k < (campground.activities || []).length; k++) {
                let activity = campground.activities[k];

                tripHTML += `
                    <tr>
                        <td>${activity.name}</td>
                        <td>${activity.date}</td>
                        <td>${activity.start}</td>
                        <td>${activity.end}</td>
                    </tr>
                `;
            }

            tripHTML += `</table>`;

        }

        tripHTML += `</article>`;

        savedPlansSection.innerHTML += tripHTML;
    }
}
