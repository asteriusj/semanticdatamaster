console.log('loading nodeDataArray ')

var nodeDataArray = [

//
// Common entities
//
    { "key": "Thing", "text": "Things", "description": "Things Entity", "color": "orange" },

    { "key": "Organization", "text": "Orgs", "description": "Organization Entity", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "Person", "text": "Persons", "description": "Person Entity - A Person entity is the contact information, role status, profile information and profile completion status of an individual in a role in a group. An User can be associated with more than one role profile and therefore more than one person in a group or in multiple groups.", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "Place", "text": "Places", "description": "Places Entity", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "Concept", "text": "Concepts", "description": "Concept Entity", "color": "orange", expanded: true, "parent": "thing" },
    { "key": "Event", "text": "Events", "description": "Event Entity", "color": "orange", expanded: true, "parent": "thing" },




    { "key": "Tools", "text": "Tools", "color": "cyan" },
    { "key": "Technology", "text": "Technology", "color": "cyan" },

    { "key": "Technology components", "text": "Technology components", "color": "cyan" },
    { "key": "Information system services", "text": "Information system services", "color": "cyan" },
    { "key": "Activity enabling features", "text": "Activity enabling features", "color": "cyan" },

    { "key": "SaaS", "text": "SaaS", "color": "cyan" },
    { "key": "PIM/CMS", "text": "PIM/CMS", "color": "cyan" },
    { "key": "CA/CM", "text": "CA/CM", "color": "cyan" },
    { "key": "CRM/CIM", "text": "CRM/CIM", "color": "cyan" },


    { "key": "Teams", "text": "Teams", "color": "magenta" },
    { "key": "People", "text": "People", "color": "magenta" },

    { "key": "Position role responsibility", "text": "Position role responsibility", "color": "magenta" },
    { "key": "Competency behavior matrix", "text": "Competency behavior matrix", "color": "magenta" },
    { "key": "Skill maturity model", "text": "Skill maturity model", "color": "magenta" },

    // { "key": "Staff", "text": "Staff" , "color":"magenta" },

    { "key": "Position", "text": "Position", "color": "magenta" },
    { "key": "Software Developer", "text": "Software Developer", "color": "magenta" },
    { "key": "Sales Enginner", "text": "Sales Enginner", "color": "magenta" },
    { "key": "Marketing Manager", "text": "Marketing Manager", "color": "magenta" },


    { "key": "Flows", "text": "Flows", "color": "yellow" },
    { "key": "Process", "text": "Process", "color": "yellow" },

    { "key": "Process workflow map", "text": "Process workflow map", "color": "yellow" },
    { "key": "Action plan checklist", "text": "Action plan checklist", "color": "yellow" },
    { "key": "Logic model indicators", "text": "Logic model indicators", "color": "yellow" },

    { "key": "SOP", "text": "SOP", "color": "yellow" },
    { "key": "Manage Product Data", "text": "Manage Product Data", "color": "yellow" },
    { "key": "Manage Customization Content", "text": "Manage Customization Content", "color": "yellow" },
    { "key": "Manage Customer Info", "text": "Manage Customer Info", "color": "yellow" },

    { "key": "Activty", "text": "Activty" },
    // { "key": "Group", "text": "Group" },
    { "key": "Capability", "text": "Capability" }


]

var linkDataArray = [


//
//Common node link relationships
//

    { "from": "Thing", "to": "schema:Thing", "text": "owl:equivalentClass", "color": "blue", "thick": 2 },
    { "from": "Thing", "to": "owl:Thing", "text": "owl:equivalentClass", "color": "blue", "thick": 2 },

    { "from": "Thing", "to": "Person", "text": "superClassOf", "color": "blue", "thick": 2 },
    { "from": "Thing", "to": "Organization", "text": "superClassOf", "color": "blue", "thick": 2 },
    { "from": "Thing", "to": "Place", "text": "superClassOf", "color": "blue", "thick": 2 },
    { "from": "Thing", "to": "Concept", "text": "superClassOf", "color": "blue", "thick": 2 },
    { "from": "Thing", "to": "Event", "text": "superClassOf", "color": "blue", "thick": 2 },

// Teams Tools Flows

    { "from": "Concept", "to": "Activty", "text": "superClassOf" },
    { "from": "Activty", "to": "Concept", "text": "subClassOf" },

    { "from": "Activty", "to": "Flows", "text": "superClassOf" },
    { "from": "Flows", "to": "Activty", "text": "subClassOf" },

    { "from": "Activty", "to": "Tools", "text": "superClassOf" },
    { "from": "Tools", "to": "Activty", "text": "subClassOf" },

    { "from": "Activty", "to": "Teams", "text": "superClassOf" },
    { "from": "Teams", "to": "Activty", "text": "subClassOf" },

    { "from": "Flows", "to": "Tools", "text": "dataGen" },
    { "from": "Tools", "to": "Flows", "text": "genData" },

    { "from": "Teams", "to": "Flows", "text": "actorIn" },
    { "from": "Flows", "to": "Teams", "text": "hasActor" },

    { "from": "Tools", "to": "Teams", "text": "usedBy" },
    { "from": "Teams", "to": "Tools", "text": "uses" },



// People Process Technology

    { "from": "Concept", "to": "Capability", "text": "superClassOf" },
    { "from": "Capability", "to": "Concept", "text": "subClassOf" },

    { "from": "Capability", "to": "People", "text": "hasPart" },
    { "from": "People", "to": "Capability", "text": "partOf" },

    { "from": "Capability", "to": "Process", "text": "hasPart" },
    { "from": "Process", "to": "Capability", "text": "partOf" },

    { "from": "Capability", "to": "Technology", "text": "hasPart" },
    { "from": "Technology", "to": "Capability", "text": "partOf" },




// types of flows tools teams

    { "from": "Flows", "to": "SOP", "text": "hasType" },
    { "from": "SOP", "to": "Flows", "text": "typeOf" },

    { "from": "Tools", "to": "SaaS", "text": "hasType" },
    { "from": "SaaS", "to": "Tools", "text": "typeOf" },

    { "from": "Teams", "to": "Position", "text": "hasType" },
    { "from": "Position", "to": "Teams", "text": "typeOf" },



// People Staff Process Tech    

    { "from": "Software Developer", "to": "Manage Customer Data", "text": "actorIn" },
    { "from": "Manage Customer Data", "to": "", "text": "hasActor" },

    { "from": "Software Developer", "to": "CRM/CIM", "text": "maintains" },
    { "from": "CRM/CIM", "to": "Software Developer", "text": "maintainedBy" },


    { "from": "Sales Enginner", "to": "Manage Product Information", "text": "actorIn" },
    { "from": "Manage Product Information", "to": "Sales Enginner", "text": "hasActor" },

    { "from": "Sales Enginner", "to": "PIM/CMS", "text": "updates" },
    { "from": "PIM/CMS", "to": "Sales Enginner", "text": "updatedBy" },


    { "from": "Marketing Manager", "to": "Manage Customization Content", "text": "actorIn" },
    { "from": "Manage Customization Content", "to": "Marketing Manager", "text": "hasActor" },

    { "from": "Marketing Manager", "to": "CA/CM", "text": "userOf" },
    { "from": "CA/CM", "to": "Marketing Manager", "text": "usedBy" },



// People model   
    { "from": "Skill maturity model", "to": "People", "text": "componentOf" },
    { "from": "People", "to": "Skill maturity model", "text": "hasComponent" },

    { "from": "Position role responsibility", "to": "People", "text": "componentOf" },
    { "from": "People", "to": "Position role responsibility", "text": "hasComponent" },

    { "from": "Competency behavior matrix", "to": "People", "text": "componentOf" },
    { "from": "People", "to": "Competency behavior matrix", "text": "hasComponent" },



// Process Model    
    { "from": "Process workflow map", "to": "Process", "text": "componentOf" },
    { "from": "Process", "to": "Process workflow map", "text": "hasComponent" },

    { "from": "Logic model indicators", "to": "Process", "text": "componentOf" },
    { "from": "Process", "to": "Logic model indicators", "text": "hasComponent" },

    { "from": "Action plan checklist", "to": "Process", "text": "componentOf" },
    { "from": "Process", "to": "Action plan checklist", "text": "hasComponent" },


// Technology Model    
    { "from": "Technology components", "to": "Technology", "text": "componentOf" },
    { "from": "Technology", "to": "Technology components", "text": "hasComponent" },

    { "from": "Information system services", "to": "Technology", "text": "componentOf" },
    { "from": "Technology", "to": "Information system services", "text": "hasComponent" },

    { "from": "Activity enabling features", "to": "Technology", "text": "componentOf" },
    { "from": "Technology", "to": "Activity enabling features", "text": "hasComponent" },


// instance of people    
    { "from": "Position", "to": "People", "text": "instanceOf" },
    { "from": "People", "to": "Position", "text": "hasInstacne" },

    { "from": "Software Developer", "to": "Position", "text": "subclassOf" },
    { "from": "Position", "to": "Software Developer", "text": "superclassOf" },

    { "from": "Sales Enginner", "to": "Position", "text": "subclassOf" },
    { "from": "Position", "to": "Sales Enginner", "text": "superclassOf" },

    { "from": "Marketing Manager", "to": "Position", "text": "subclassOf" },
    { "from": "Position", "to": "Marketing Manager", "text": "superclassOf" },


// instances of processes    
    { "from": "SOP", "to": "Process", "text": "instanceOf" },
    { "from": "Process", "to": "SaSOPaS", "text": "hasInstacne" },

    { "from": "Manage Product Data", "to": "SOP", "text": "subclassOf" },
    { "from": "SOP", "to": "Manage Product Data", "text": "superclassOf" },

    { "from": "Manage Customization Content", "to": "SOP", "text": "subclassOf" },
    { "from": "SOP", "to": "Manage Customization Content", "text": "superclassOf" },

    { "from": "Manage Customer Info", "to": "SOP", "text": "subclassOf" },
    { "from": "SOP", "to": "Manage Customer Info", "text": "superclassOf" },


// instance of technology
    { "from": "SaaS", "to": "Technology", "text": "instanceOf" },
    { "from": "Technology", "to": "SaaS", "text": "hasInstacne" },

    { "from": "CRM/CIM", "to": "SaaS", "text": "subclassOf" },
    { "from": "SaaS", "to": "CRM/CIM", "text": "superclassOf" },

    { "from": "CA/CM", "to": "SaaS", "text": "subclassOf" },
    { "from": "SaaS", "to": "SaaS", "text": "superclassOf" },

    { "from": "PIM/CMS", "to": "SaaS", "text": "subclassOf" },
    { "from": "SaaS", "to": "PIM/CMS", "text": "superclassOf" },



// people process and technology relationships
    { "from": "CRM/CIM", "to": "Manage Customer Data", "text": "dataFor" },
    { "from": "Manage Customer Data", "to": "CRM/CIM", "text": "dataFrom" },

    { "from": "CA/CM", "to": "Manage Customization Content", "text": "dataFor" },
    { "from": "Manage Customization Content", "to": "CA/CM", "text": "dataFrom" },

    { "from": "PIM/CMS", "to": "Manage Product Information", "text": "dataFor" },
    { "from": "Manage Product Information", "to": "PIM/CMS", "text": "dataFrom" },


// artifact interactions
    { "from": "Process workflow map", "to": "Position role responsibility", "text": "defines" },
    { "from": "Position role responsibility", "to": "Process workflow map", "text": "definedBy" },

    { "from": "Logic model indicators", "to": "Competency behavior matrix", "text": "monitors" },
    { "from": "Competency behavior matrix", "to": "Logic model indicators", "text": "monitoredBy" },

    { "from": "Action plan checklist", "to": "Skill maturity model", "text": "requires" },
    { "from": "Skill maturity model", "to": "Action plan checklist", "text": "requiredBy" },


    { "from": "Activity enabling features", "to": "Action plan checklist", "text": "executes" },
    { "from": "Action plan checklist", "to": "Activity enabling features", "text": "executedWith" },

    { "from": "Technology components", "to": "Process workflow map", "text": "enables" },
    { "from": "Process workflow map", "to": "Technology components", "text": "enabledBy" },

    { "from": "Information system services", "to": "Logic model indicators", "text": "dataFor" },
    { "from": "Logic model indicators", "to": "Information system services", "text": "dataFrom" },


    { "from": "Activity enabling features", "to": "Position role responsibility", "text": "assists" },
    { "from": "Position role responsibility", "to": "Activity enabling features", "text": "assistedBy" },

    { "from": "Technology components", "to": "Competency behavior matrix", "text": "enables" },
    { "from": "Competency behavior matrix", "to": "Technology components", "text": "enabledBy" },

    { "from": "Information system services", "to": "Skill maturity model", "text": "dataFor" },
    { "from": "Skill maturity model", "to": "Information system services", "text": "dataFrom" },





    { "from": "Thing", "to": "capability", "text": "parent of", "color": "blue", "thick": 2 },

    { "from": "capability", "to": "competency", "text": "parent of" },
    { "from": "competency", "to": "position", "text": "parent of" },
    { "from": "competency", "to": "skill", "text": "parent of" },
    { "from": "competency", "to": "behavior", "text": "parent of" },

    { "from": "capability", "to": "process", "text": "parent of" },
    { "from": "process", "to": "workflow", "text": "parent of" },
    { "from": "process", "to": "indicator", "text": "parent of" },
    { "from": "process", "to": "checklist", "text": "parent of" },

    { "from": "capability", "to": "technology", "text": "parent of" },
    { "from": "technology", "to": "application", "text": "parent of" },
    { "from": "technology", "to": "information", "text": "parent of" },
    { "from": "technology", "to": "component", "text": "parent of" }


    ]
