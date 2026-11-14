class interface{
  constructor(){
    this.baseUrl = "https://bcparks.api.gov.bc.ca/api";
    this.campSites = [];
  }

  async populateCampSites(){
    var page = 1;
    const param = {
        "populate": "*",                            
        "filters[campingType][$notNull]": "true",
        "pagination[page]": page,
        "pagination[pageSize]": 100,
    }
    do{

    }while
  }


}

class campzone{
  constructor(parkName, parkPhotos, campingTypes, activityTypes, facilityTypes, hasFireBan, region){
    this.parkName = parkName;
    this.parkPhotos = parkPhotos;
    this.campingTypes = campingTypes;
    this.activityTypes = activityTypes;
    this.facilityTypes = facilityTypes;
    this.hasFireBan = hasFireBan;
    this.region = region;
    Object.freeze(this);
  }
}