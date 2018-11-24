console.log('loading nodeDataArray ')

var nodeDataArray = [


    { "key": "Thing", "text": "Thing", "color": "orange" },

    { "key": "Concept", "text": "Concept", "color": "orange" },
    { "key": "Event", "text": "Event", "color": "orange" },
    { "key": "Organization", "text": "Organization", "color": "orange" },
    { "key": "Person", "text": "Person", "color": "orange" },
    { "key": "Place", "text": "Place", "color": "orange" },

    { "key": "Capability", "text": "Capability" },
    { "key": "Activty", "text": "Activty" },

    { "key": "Tools", "text": "Tools" },

    { "key": "Technology components", "text": "Technology components" },
    { "key": "Technology", "text": "Technology" },

    { "key": "Teams", "text": "Teams" },
    { "key": "Team", "text": "Team" },

    // { "key": "Software Developer", "text": "Software Developer" },
    { "key": "Skill maturity model", "text": "Skill maturity model" },
    // { "key": "Sales Engineer", "text": "Sales Engineer" },
    // { "key": "SaaS", "text": "SaaS" },

    { "key": "Process workflow map", "text": "Process workflow map" },
    { "key": "Process", "text": "Process" },
    { "key": "Position role responsibility", "text": "Position role responsibility" },

    // { "key": "PIM/CMS", "text": "PIM/CMS" },

    { "key": "People", "text": "People" },

    // { "key": "Marketing Manager", "text": "Marketing Manager" },
    // { "key": "Manage Product Data", "text": "Manage Product Data" },
    // { "key": "Manage Customization Content", "text": "Manage Customization Content" },
    // { "key": "Manage Customer", "text": "Manage Customer" },

    { "key": "Logic model indicators", "text": "Logic model indicators" },
    { "key": "Information system services", "text": "Information system services" },

    { "key": "Group", "text": "Group" },
    { "key": "Flows", "text": "Flows" },

    // { "key": "CRM/CIM", "text": "CRM/CIM" },

    { "key": "Competency behavior matrix", "text": "Competency behavior matrix" },



    // { "key": "CA/CM", "text": "CA/CM" },



    { "key": "Activity enabling features", "text": "Activity enabling features" },
    { "key": "Action plan checklist", "text": "Action plan checklist" }

]

var linkDataArray = [


    { "from": "Thing", "to": "schema:Thing", "text": "owl:equivalentClass" },
    { "from": "Thing", "to": "owl:Thing", "text": "owl:equivalentClass" },
    { "from": "Thing", "to": "Concept", "text": "superClassOf" },
    { "from": "Thing", "to": "Event", "text": "superClassOf" },
    { "from": "Thing", "to": "Organization", "text": "superClassOf" },
    { "from": "Thing", "to": "Person", "text": "superClassOf" },
    { "from": "Thing", "to": "Place", "text": "superClassOf" },


    { "from": "Concept", "to": "Activty", "text": "superClassOf" },
    { "from": "Activty", "to": "Concept", "text": "subClassOf" },

    { "from": "Concept", "to": "Capability", "text": "superClassOf" },
    { "from": "Capability", "to": "Concept", "text": "subClassOf" },




    { "from": "Capability", "to": "People", "text": "hasPart" },
    { "from": "People", "to": "Capability", "text": "partOf" },

    { "from": "Competency behavior matrix", "to": "People", "text": "componentOf" },
    { "from": "Position role responsibility", "to": "People", "text": "componentOf" },
    { "from": "Skill maturity model", "to": "People", "text": "componentOf" },


    { "from": "Capability", "to": "Process", "text": "hasPart" },
    { "from": "Process", "to": "Capability", "text": "partOf" },

    { "from": "Process workflow map", "to": "Process", "text": "componentOf" },

    { "from": "Process", "to": "Flows", "text": "subClassOf" },
    { "from": "Action plan checklist", "to": "Process", "text": "componentOf" },
    { "from": "Logic model indicators", "to": "Process", "text": "componentOf" },


    { "from": "Capability", "to": "Technology", "text": "hasPart" },
    { "from": "Technology", "to": "Capability", "text": "partOf" },

    { "from": "Technology components", "to": "Technology", "text": "componentOf" },
    { "from": "Activity enabling features", "to": "Technology", "text": "componentOf" },
    { "from": "Information system services", "to": "Technology", "text": "componentOf" },


    // { "from": "Software Developer", "to": "Manage Customer Data", "text": "actorIn" },
    // { "from": "Software Developer", "to": "CRM/CIM", "text": "maintains" },
    // { "from": "Software Developer", "to": "Team", "text": "memberOf" },
    //   { "from": "Sales Enginner", "to": "Manage Product Information", "text": "actorIn" },
    // { "from": "Sales Enginner", "to": "Team", "text": "memberOf" },
    // { "from": "Sales Enginner", "to": "PIM/CMS", "text": "updates" },
    // { "from": "SaaS", "to": "Tools", "text": "subClassOf" },



    // { "from": "PIM/CMS", "to": "Manage Product Information", "text": "dataFor" },
    // { "from": "PIM/CMS", "to": "SaaS", "text": "typeOf" },



    // { "from": "Marketing Manager", "to": "Manage Customization Content", "text": "actorIn" },
    // { "from": "Marketing Manager", "to": "Team", "text": "memberOf" },
    // { "from": "Marketing Manager", "to": "CA/CM", "text": "userOf" },
    // { "from": "Manage Product Data", "to": "Process", "text": "isA" },
    // { "from": "Manage Customization Content", "to": "Process", "text": "isA" },
    // { "from": "Manage Customer", "to": "Process", "text": "isA" },


    // { "from": "Group", "to": "Person", "text": "subClassOf" },
    // { "from": "Group", "to": "Teams", "text": "superClassOf" },
    // { "from": "Person", "to": "People", "text": "superClassOf" },
    // { "from": "Flows", "to": "Tools", "text": "dataGen" },
    // { "from": "Flows", "to": "Process", "text": "superClassOf" },
    // { "from": "CRM/CIM", "to": "Manage Customer Data", "text": "dataFor" },
    // { "from": "CRM/CIM", "to": "SaaS", "text": "typeOf" },



    // { "from": "CA/CM", "to": "Manage Customization Content", "text": "dataFor" },
    // { "from": "CA/CM", "to": "SaaS", "text": "typeOf" },



    { "from": "Activty", "to": "Flows", "text": "superClassOf" },
    { "from": "Flows", "to": "Activty", "text": "subClassOf" },

    { "from": "Activty", "to": "Tools", "text": "superClassOf" },
    { "from": "Tools", "to": "Activty", "text": "subClassOf" },

    { "from": "Activty", "to": "Teams", "text": "superClassOf" },
    { "from": "Teams", "to": "Activty", "text": "subClassOf" },

    // { "from": "Tools", "to": "SaaS", "text": "superClassOf" },
    { "from": "Tools", "to": "Teams", "text": "usedBy" },
    { "from": "Teams", "to": "Flows", "text": "actorIn" },
    // { "from": "Teams", "to": "Group", "text": "subClassOf" },
    // { "from": "Teams", "to": "Team", "text": "superClassOf" },
    // { "from": "Teams", "to": "Group", "text": "superClassOf" },
    // { "from": "Team", "to": "Teams", "text": "subClassOf" },

    ]
