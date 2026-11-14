const FACILITIES = {
  'accessibility-information': 'Accessibility information',
  'boat-launch': 'Boat launch',
  'campfires': 'Campfires',
  'drinking-water': 'Drinking water',
  'electrical-hook-ups': 'Electrical hook-ups',
  'hotspring': 'Hot spring',
  'information': 'Information',
  'picnic-areas': 'Picnic areas',
  'picnic-shelters': 'Picnic shelters',
  'toilets': 'Pit or flush toilets',
  'playground': 'Playground',
  'bike-park': 'Bike park',
  'sani-station': 'Sani-station',
  'showers': 'Showers',
  'ev-charging': 'EV charging',
};

const ACTIVITIES = {
  'canoeing': 'Canoeing',
  'caving': 'Caving',
  'climbing': 'Climbing',
  'cycling': 'Cycling',
  'e-biking': 'E-Biking',
  'fishing': 'Fishing',
  'hiking': 'Hiking',
  'horseback-riding': 'Horseback riding',
  'hunting': 'Hunting',
  'interpretive-programs': 'Interpretive programs',
  'kayaking': 'Kayaking',
  'pets-on-leash': 'Pets on leash',
  'scuba-diving': 'Scuba diving',
  'swimming': 'Swimming',
  'waterskiing': 'Waterskiing',
  'wildlife-viewing': 'Wildlife viewing',
  'windsurfing': 'Windsurfing',
  'winter-recreation': 'Winter recreation',
  'disc-golf': 'Disc golf',
};

function createCheckbox(name, value, textContent) {
  let label = document.createElement('label');
  label.classList.add('checkbox-item');

  let input = document.createElement('input');
  input.type = 'checkbox';
  input.name = name;
  input.value = value;

  label.append(input, textContent);

  return label;
}

function createCheckboxList(listElement, name, lookupTable) {
  for (const [code, textContent] of Object.entries(lookupTable)) {
    checkbox = createCheckbox(name, code, textContent);
    listElement.appendChild(checkbox);
  }
}

function initCollapsibleLists(maxVisible = 3) {
  document.querySelectorAll('.collapse-toggle').forEach((btn) => {
    const list = btn.closest('.filter').querySelector('.collapsible-list');
    if (!list) return;

    if (list.children.length <= maxVisible) {
      btn.style.display = 'none';
      return;
    }

    btn.style.display = ''; // Ensure visible if run after filtering
    btn.addEventListener('click', () => {
      const isExpanded = list.classList.toggle('expanded');
      btn.textContent = isExpanded ? 'Show Less' : 'Show More';
    });
  });
}

let facilitiesList = document.getElementById('facilitiesList');
let activitiesList = document.getElementById('activitiesList');

createCheckboxList(facilitiesList, 'facilitiesList', FACILITIES);
createCheckboxList(activitiesList, 'activitiesList', ACTIVITIES);

initCollapsibleLists(3);
