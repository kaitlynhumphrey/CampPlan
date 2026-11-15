class interface{
  constructor(){
    this.campSites = [];
  }

  async populateCampSites(){
    var page = 1;
    var pageCount = 0;
    const param = new URLSearchParams ({
        "populate": "*",                            
        "filters[campingType][$notNull]": "true",
        "pagination[page]": page,
        "pagination[pageSize]": 100, 
    });
    const url = `https://bcparks.api.gov.bc.ca/api/sites?${param.toString()}`;

    do{
      //fetch yo fucking info
      const results = await fetch(this.baseUrl);

      //gives ya da size of the fucking result yeah and the fucking data portion of da program, yeah bruv
      pageData = results["data"]

      for(let i=0; i<=pageData.length; i++){
        this.campSites.push(new Campzone(
          
        ))
      }

    }while (page <= pageCount);
  }


}

class Campzone{
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