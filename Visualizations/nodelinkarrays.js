console.log('loading nodeDataArray ')

var nodeDataArray = [

    { "key": "thing", "text": "Things", "description": "Things Entity", "color": "orange" },

    { "key": "organization", "text": "Orgs", "description": "Organization Entity", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "person", "text": "Persons", "description": "Person Entity - A Person entity is the contact information, role status, profile information and profile completion status of an individual in a role in a group. An User can be associated with more than one role profile and therefore more than one person in a group or in multiple groups.", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "place", "text": "Places", "description": "Places Entity", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "concept", "text": "Concepts", "description": "Concept Entity", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "event", "text": "Events", "description": "Event Entity", "color": "orange", expanded: true, "parent": "thing" },


    { "key": "censustract", "text": "Census Tracts", "description": "The 'Census Tract' is an area roughly equivalent to a neighborhood established by the Bureau of Census for analyzing populations. ", "color": "Tan", "parent": "thing" },
    { "key": "township", "text": "Townships", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },
    { "key": "areacode", "text": "Area Codes", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },
    { "key": "address", "text": "Addresses", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },
    { "key": "zipcode", "text": "ZIP Codes", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },
    { "key": "city", "text": "Cities", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },
    { "key": "county", "text": "Counties", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },
    { "key": "state", "text": "States", "description": "", "color": "Tan", "everExpanded": true, "parent": "place" },


    { "key": "company", "text": "Company", color: "lightblue", expanded: true },

    { "key": "litteralC1", "text": "Literal", color: "yellow", expanded: true },


    { "key": "employee", "text": "Employee", "description": "Employee Entity", "color": "pink", "everExpanded": true, "parent": "person" },

    { "key": "litteralP1", "text": "Literal", "color": "yellow", "expanded": true },
    { "key": "litteralP2", "text": "Literal", "color": "yellow", "expanded": true },

    ]

var linkDataArray = [

    { "from": "thing", "to": "person", "text": "has subclass", "color": "blue", "thick": 2 },
    { "from": "thing", "to": "organization", "text": "has subclass", "color": "blue", "thick": 2 },
    { "from": "thing", "to": "place", "text": "has subclass", "color": "blue", "thick": 2 },
    { "from": "thing", "to": "concept", "text": "has subclass", "color": "blue", "thick": 2 },
    { "from": "thing", "to": "event", "text": "has subclass", "color": "blue", "thick": 2 },

    // { "from": "person      ", "to": "thing", "text": "subclass of", "color": "grey" },
    // { "from": "organization", "to": "thing", "text": "subclass of", "color": "grey" },
    // { "from": "place       ", "to": "thing", "text": "subclass of", "color": "grey" },
    // { "from": "concept     ", "to": "thing", "text": "subclass of", "color": "grey" },
    //{ "from": "event       ", "to": "thing", "text": "subclass of", "color": "grey" },


    // { "from": "person", "to": "employee", "text": "has subclass" },
    { "from": "employee", "to": "person", "text": "subclass of" },

    { "from": "person", "to": "literalP1", "text": "firstName", "description": "owl:DatatypeProperty firstName" },
    { "from": "person", "to": "literalP2", "text": "lastName", "description": "owl:DatatypeProperty lastName" },

    // { "from": "organization", "to": "company", "text": "has subclass" },
    { "from": "company", "to": "organization", "text": "subclass of" },

    { "from": "organization", "to": "literalC1", "text": "Name", "description": "owl:DatatypeProperty Name" },

    { "from": "place", "to": "state", "text": "has type" },
    { "from": "state", "to": "place", "text": "is a" },
    { "from": "place", "to": "county", "text": "has type" },
    { "from": "county", "to": "place", "text": "is a" },
    { "from": "place", "to": "city", "text": "has type" },
    { "from": "city", "to": "place", "text": "is a" },
    { "from": "place", "to": "zipcode", "text": "has type" },
    { "from": "zipcode", "to": "place", "text": "is a" },
    { "from": "place", "to": "areacode", "text": "has type" },
    { "from": "areacode", "to": "place", "text": "is a" },
    { "from": "place", "to": "township", "text": "has type" },
    { "from": "township", "to": "place", "text": "is a" },
    { "from": "place", "to": "towcensustractnship", "text": "has type" },
    { "from": "censustract", "to": "place", "text": "is a" },
    { "from": "place", "to": "address", "text": "has type" },
    { "from": "address", "to": "place", "text": "is a" },
    { "from": "place", "to": "district", "text": "has type" },
    { "from": "district", "to": "place", "text": "is a" },
    { "from": "county", "to": "state", "text": "in state" },
    { "from": "city", "to": "county", "text": "in region" },
    { "from": "city", "to": "state", "text": "in state" },
    { "from": "city", "to": "township", "text": "in township" },

    { "from": "address", "to": "district", "text": "in district" },
    { "from": "address", "to": "censustract", "text": "in district" },
    { "from": "address", "to": "zipcode", "text": "in zip code" },
    { "from": "address", "to": "city", "text": "in city" },
    { "from": "address", "to": "county", "text": "in county" },
    { "from": "address", "to": "state", "text": "in state" },

    { "from": "address", "to": "employee", "text": "address of" },




    ]
