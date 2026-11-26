
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
    //fetches a list of items from the API given query and variables, returns a collection of campsite objects
    //this is built to be used with the query helper class kinda like, fetchSites(Query.query, Query.variables)
    const url = `https://bcparks.api.gov.bc.ca/graphql`;
    const res = await fetch(url, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({query, variables})
      }
    );
    
    const jason = await res.json();
    var siteList = [];

    //populate siteList with campsites and return siteList
    jason.data.sites.forEach(object=>{
      siteList.push(
        new CampSite(
          object.documentId,
          object.siteName,
          this.parsePhotos(object.parkPhotos),
          [],
          this.parseActivties(object.parkActivities),
          this.parseFacilities(object.parkFacilities),
          object.protectedArea.hasCampfireBan
        )
      );
    })

    return(siteList);
  }
  parseFacilities(facilities=[]){
    //hey whats this?! another putride method.. who would've guessed...
    var facilityList = [];
    facilities.forEach(facility=>{
      facilityList.push(facility.facilityType.facilityName);
    })
    return(facilityList);
  }

  parsePhotos(photos=[]){
    //another disgusting methods
    //parses response object for image url's
    var photoList = [];
    photos.forEach(photo=>{
      photoList.push(photo.imageUrl);
    })
    return(photoList);
  }

  parseActivties(activities=[]){
    //probably the ugliest method you've ever seen
    //parse response objects for thier activity types
    var activityList = [];
    activities.forEach(activityType => {
      activityList.push(activityType.activityType.activityName);
    })
    return(activityList);
  }
}


class Query{
  //helper class that simplifies passing params into the API call's query
  //please excuse the disgusting queries, flip this crud 
  constructor(campingTypes=[], activityTypes=[], facilityTypes=[], hasCampfireBan=null){
    this.filters = {}
    //if the params have length then add their contents as filters
    if(campingTypes.length){
        this.filters.parkCampingTypes =  {"campingType": {"campingTypeName": {"in": null}}};
        }
    if(activityTypes.length){
        this.filters.parkActivities = {"activityType": {"activityName": {"in": activityTypes}}};
        }
    if(facilityTypes.length){
        this.filters.parkFacilities = {"facilityType": {"facilityName": {"in": null}}};
        }
    //if it's not null then add hasCampfireBan
    if(hasCampfireBan != null){
        this.filters.protectedArea = {"hasCampfireBan": {"eq": hasCampfireBan}};
        }

    this.variables = {"filters": this.filters}
    this.query = 
            `query Sites($filters: SiteFiltersInput) {
        sites(filters: $filters) {
            documentId
            siteName
            parkPhotos {
            imageUrl
            }
            parkActivities {
            activityType {
                activityName
            }
            }
            parkFacilities {
            facilityType {
                facilityName
            }
            }
            protectedArea {
            hasCampfireBan
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
var testList = await inter.fetchSites(query.query, query.variables)

console.log(testList)

