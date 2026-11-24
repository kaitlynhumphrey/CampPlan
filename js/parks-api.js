
// Data returned (one object per park)
// documentId
// parkName
// parkPhotos { imageUrl }: maximum one photo, URL or 'null'
// campingTypes: list of names
// activityTypes: list of names
// facilityTypes: list of names
// hasCampfireBan: boolean
// region: region name? If it exists

// Filters
// campingTypes: string[ ]  *MUST NOT BE NULL
// activityTypes: string[ ]
// facilityTypes: string[ ]
// hasCampfireBan: bool
// Different filters combine with AND, values within one list combine with OR 
// ^ ur requesting protected areas
// lmk if you have any questions

class ApiInterace{
  constructor(){
    return(0);
  }
  async fetchSites(query, variables){
    const url = `https://bcparks.api.gov.bc.ca/graphql`;
    const res = await fetch(url, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({query, variables})
      }
    )
    var jason = await res.json()
    console.log(jason)
  }
}


class Query{
  //helper class that simplifies passing params into the API call's query
  constructor(campingTypes=null, activityTypes=null, facilityTypes=null, hasCampfireBan=null){
    this.queryVariables= {
  "filters": {
    "parkPhotos": {
      "imageUrl": {
        "notNull": true
      }
    },
    "parkCampingTypes": {
      "campingType": {
        "campingTypeName": {
          "contains": campingTypes
        }
      }
    },
    "parkActivities": {
      "activityType": {
        "activityName": {
          "contains": activityTypes
        }
      }
    },
    "parkFacilities": {
      "facilityType": {
        "facilityName": {
          "contains": facilityTypes
        }
      }
    },
    "protectedArea": {
      "hasCampfireBan": {
        "contains": hasCampfireBan
      }
    }
  }
  }
  this.body = `query ($filters: SiteFiltersInput) {
    sites(filters: $filters) {
      documentId
      siteName
      parkPhotos {
        imageUrl
        photographer
      }
      parkCampingTypes {
        campingType {
          campingTypeName
        }
      }
      parkActivities {
        activityType {
          activityName
        }
      }
      parkFacilities {
        isFacilityOpen
        name
      }
      protectedArea {
        hasCampfireBanOverride
        campfireBanEffectiveDate
        campfireBanRescindedDate
      }
    }
  }`
  }
}


class CampSite{
  //this is a helper class to represent a campsite
  constructor(documentId, parkName, parkPhotos,
     campingTypes, activityTypes, facilityTypes, hasCampfireBan, region){
    this.documentId = documentId;
    this.parkName = parkName;
    this.parkPhotos = parkPhotos;
    this.campingTypes = campingTypes;
    this.activityTypes = activityTypes;
    this.facilityTypes = facilityTypes;
    this.hasCampfireBan = hasCampfireBan;
    this.region = region;
    Object.freeze(this);
  }
}

var query = new Query()
var inter = new ApiInterace()
inter.fetchSites(query.body, query.queryVariables)