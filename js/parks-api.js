'use strict';
// Hard coded query variables for park cards
// TODO: write a method to construct this.
const variables = {
  pagination: {
    limit: 1,
  },
  filters: {
    parkOperation: {
      hasDates: {
        notNull: true,
      },
    },
    parkCampingTypes: {
      campingType: {
        campingTypeCode: {
          notNull: true,
        },
      },
    },
    parkPhotos: {
      imageUrl: {
        notNull: true,
      },
    },
  },
};

//--------------------------------------
//  BC Parks API helper class.
//
//  Author: Kaitlyn Humphrey
//--------------------------------------
class ParksAPI {
  //--------------------------------------
  //  Retrieves data for park cards on Trip Planner page.
  //--------------------------------------
  static async fetchParkCardData(variables) {
    const query = `
      query GetParks($pagination: PaginationArg, 
        $filters: ProtectedAreaFiltersInput) {
        protectedAreas(filters: $filters) {
          parkPhotos(pagination: $pagination) {
            imageUrl
          }
          parkNames(pagination: $pagination) {
            parkName
          }
        }
      }
    `;

    const response = await fetch('https://bcparks.api.gov.bc.ca/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
    return data;
  }
}

//--------------------------------------
//  Returns flattened park card data from GraphQL query.
//--------------------------------------
function normalizeParkCardData(data) {
  return data.protectedAreas.map((area) => ({
    name: area.parkNames?.[0]?.parkName,
    photos: area.parkPhotos.map((p) => p.imageUrl),
  }));
}

//--------------------------------------
//  Returns new .park-card article element.
//--------------------------------------
function createParkCard(park) {
  const card = document.createElement('article');
  card.classList.add('park-card', 'container');

  // Park Name
  const title = document.createElement('h2');
  title.textContent = park.name;
  title.title = park.name; // Add full name to tooltip for truncated names.
  title.classList.add('park-name');
  card.appendChild(title);

  // Photos
  if (park.photos.length) {
    park.photos.forEach((url) => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = park.name;
      img.loading = 'lazy';
      card.appendChild(img);
    });
  }

  return card;
}

//--------------------------------------
//  Testing entry point.
//--------------------------------------
async function init() {
  try {
    const data = await ParksAPI.fetchParkCardData(variables);
    const parks = normalizeParkCardData(data);
    console.log(parks);

    const parksGrid = document.getElementById('parksGrid');

    parks.forEach((card) => {
      const cardElement = createParkCard(card);
      parksGrid.appendChild(cardElement);
    });
  } catch (err) {
    console.error("Couldn't load parks:", err);
  }
}

init();
