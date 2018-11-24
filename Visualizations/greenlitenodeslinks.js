console.log('loading nodeDataArray ')
var nodeDataArray = [

//
// Common entities
//
{"key":"thing",             "text":"Things",  "description":"Things Entity",        "color":"orange" },

{"key":"organization",     "text":"Orgs",      "description":"Organization Entity",  "color":"orange",  expanded: true, "parent":"thing" },
{"key":"person",           "text":"Persons",   "description":"Person Entity - A Person entity is the contact information, role status, profile information and profile completion status of an individual in a role in a group. An User can be associated with more than one role profile and therefore more than one person in a group or in multiple groups.",        "color":"orange",  expanded: true, "parent":"thing" },
{"key":"place",            "text":"Places",    "description":"Places Entity",        "color":"orange",  expanded: true, "parent":"thing" },
{"key":"concept",          "text":"Concepts",  "description":"Concept Entity",       "color":"orange",  expanded: true, "parent":"thing" },
{"key":"event",            "text":"Events",    "description":"Event Entity",         "color":"orange",  expanded: true, "parent":"thing" },
{"key":"document",         "text":"Documents", "description":"Document Entity",      "color":"orange",  expanded: true, "parent":"thing" },
 

{"key":"profileinfo",           "text":"Profile Info", "color":"lightgreen", "expanded":true},

{"key":"censustract",       "text":"Census Tracts",     "description":"The 'Census Tract' is an area roughly equivalent to a neighborhood established by the Bureau of Census for analyzing populations. ",     "color":"Tan", "parent":"thing" },
{"key":"township",          "text":"Townships",         "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },
{"key":"areacode",          "text":"Area Codes",        "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },
{"key":"address",           "text":"Addresses",         "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },
{"key":"zipcode",           "text":"ZIP Codes",         "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },
{"key":"city",              "text":"Cities",            "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },
{"key":"county",            "text":"Counties",          "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },
{"key":"state",             "text":"States",            "description":"",  "color":"Tan", "everExpanded": true, "parent":"place" },

{"key":"sysappmodel",       "text":"System AppModel",   "description":"",  "color":"Khaki", parent:"concept" },
{"key":"applicationmap",        "text":"Application Page Map", "description":"",  "color":"DarkKhaki", parent:"sysappmodel" },
{"key":"applicationmappages",        "text":"Application Map Pages", "description":"",  "color":"DarkKhaki", parent:"applicationmap" },
{"key":"applicationmapcategories",        "text":"Application Map Categories", "description":"",  "color":"DarkKhaki", parent:"applicationmap" },
{"key":"applicationmapsections",        "text":"Application Map Sections", "description":"",  "color":"DarkKhaki", parent:"applicationmap" },
{"key":"applicationmapforms",        "text":"Application Map Forms", "description":"",  "color":"DarkKhaki", parent:"applicationmap" },

{"key":"activityformfield",     "text":"Activity Form Field", "description":"",  "color":"DarkKhaki", parent:"sysappmodel" },
{"key":"formelement",  "text":"Form Elements", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },
{"key":"fieldtype",  "text":"Field Types", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },
{"key":"fieldattribute",  "text":"Field Attributes", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },
{"key":"fieldrestriction",  "text":"Field Restrictions", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },
{"key":"fieldvalidation",  "text":"Field Validations", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },
{"key":"fieldtransform",  "text":"Field Transforms", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },
{"key":"fieldtrigger",  "text":"Field Triggers", "description":"",  "color":"DarkKhaki", parent:"activityformfield" },

{"key":"sessioncontenttree",       "text":"Session Content Tree",     "description":"",  "color":"DarkKhaki", parent:"sysappmodel" },
{"key":"sessioninfo",  "text":"Session Info", "description":"",  "color":"DarkKhaki", parent:"sessioncontenttree" },
{"key":"fieldnames",  "text":"Field Names", "description":"",  "color":"DarkKhaki", parent:"sessioncontenttree" },
{"key":"placeholdervalues",  "text":"Placeholder Values", "description":"",  "color":"DarkKhaki", parent:"sessioncontenttree" },


{"key":"roleprofile",      "text":"Role Profiles",      "description":"RoleProfile defines an association of role group attributes and an entity perspective of user and a person with that title or role in an organization or other entity type.", "color":"Cyan" },
{"key":"role",             "text":"Roles",              "description":"Role Entity - A user can have multiple RoleProfiles across multiple Entities (Organizations, Persons, Programs, Regions, ...) and Roles (RoleGroups) of RoleType (EmployedBy, ManagerOf,  ParticipantIn, LivesWith, ...) within entities.", "color":"LightCyan", "parent":"roleprofile"},
{"key":"roletype",         "text":"Role Types",         "description":"Role is an expression of a RoleType or a type of entity-to-entity relationship /  thing-to-thin relationship consisting of a role relationship name and subject- predicate-object of the relation between things", "color":"Cyan", "parent":"role"},
{"key":"rolegroup",        "text":"Role Groups",        "description":"", "color":"Cyan", "parent":"role"},
{"key":"rolesubject",      "text":"Role Subject",       "description":"", "color":"Cyan", "parent":"role"},
{"key":"rolepredicate",    "text":"Role Predicate",     "description":"", "color":"Cyan", "parent":"role"},
{"key":"roleobject",       "text":"Role Object",        "description":"", "color":"Cyan", "parent":"role"},
{"key":"roleprivilege",    "text":"Role Previleges",    "description":"Each Role has one or more RolePrevilege which defines permission and attribute assignments for application functions and data manipulation.", "color":"Cyan", "parent":"role"},


{"key":"user",             "text":"Users", "description":"User Entity - A User is an entity that defines an individual's identification and authentication in the system. The entity has a username, normally a unique email address or sms number, and an individual password that only the user knows or has access to.", "color":"LightCyan", "expanded":true},

{"key":"group",            "text":"Groups",             "description":"",  "color":"Cyan", "expanded":true},
{"key":"status",           "text":"Status",             "description":"",  "color":"LightCyan", "expanded":true},
{"key":"alert",            "text":"Alerts",             "description":"",  "color":"LightCyan", "expanded":true},
{"key":"recipients",       "text":"Recipients",         "description":"Touchpoint Recipients", "color":"Cyan", "expanded":true},
{"key":"workflow",         "text":"Workflows",          "description":"", "color":"SkyBlue", "expanded":true},
{"key":"touchpoint",       "text":"Touchpoints",        "description":"",  "color":"LightCyan", "expanded":true},

{"key":"touchpointmodel",               "text":"Touchpoint Models", "color":"LightCyan", "expanded":true},
{"key":"emailtouchpointmodel",          "text":"Email Touchpoint Model", "color":"Cyan", "expanded":true},
{"key":"printtouchpointmodel",          "text":"Print Touchpoint Model", "color":"Cyan", "expanded":true},
{"key":"webtouchpointmodel",            "text":"Web Touchpoint Model", "color":"Cyan", "expanded":true},
{"key":"triggeredemailtouchpointmodel", "text":"Triggered Touchpoint Model", "color":"Cyan", "expanded":true},
{"key":"inapptouchpointmodel",          "text":"In-App Touchpoint Model", "color":"Cyan", "expanded":true},

{"key":"touchpointelement",     "text":"Touchpoint Elements", "color":"Cyan", "expanded":true},
{"key":"touchpointevent",       "text":"Touchpoint Events",   "color":"Cyan", "expanded":true},
{"key":"touchpointtrigger",     "text":"Touchpoint Triggers", "color":"Cyan", "expanded":true},

{"key":"workflowmodel",     "text":"Workflow Models",   "color":"LightCyan", "expanded":true},
{"key":"workflowelement",   "text":"Workflow Elements", "color":"Cyan", "expanded":true},
{"key":"workflowevent",     "text":"Workflow Events",   "color":"Cyan", "expanded":true},
{"key":"workflowtrigger",   "text":"Workflow Triggers", "color":"Cyan", "expanded":true},

{"key":"calendarevent",    "text":"Calendar Event", "color":"Violet", "expanded":true},
{"key":"milestone",        "text":"Milestone", "color":"Violet", "expanded":true},
{"key":"deadline",         "text":"Deadline", "color":"Violet", "expanded":true},
{"key":"targetdate",       "text":"Target Date", "color":"Violet", "expanded":true},
{"key":"actualdate",       "text":"Actual Date", "color":"Violet", "expanded":true},

{"key":"content",          "text":"Content",   "color":"PaleVioletRed", "expanded":true},
{"key":"asset",            "text":"Assets",   "color":"PaleVioletRed", "expanded":true},
{"key":"file",             "text":"Files",   "color":"LightSkyBlue", "expanded":true},
{"key":"image",            "text":"Images",   "color":"LightSkyBlue", "expanded":true},
{"key":"photo",            "text":"Photos",   "color":"LightSkyBlue", "expanded":true},
{"key":"category",         "text":"Category Taxonomy",   "color":"LightSkyBlue", "expanded":true},
{"key":"keyword",          "text":"Keyword Tags",   "color":"LightSkyBlue", "expanded":true},

{"key":"strategy",            "text":"Strategy",             "color":"SkyBlue", "expanded":true},
{"key":"strategymap",         "text":"Strategy Map",         "color":"LightSkyBlue", "expanded":true},
{"key":"strategyscorecard",   "text":"Strategy Scorecard",   "color":"LightSkyBlue", "expanded":true},
{"key":"strategyobjective",   "text":"Strategy Objective",   "color":"LightSkyBlue", "expanded":true},
{"key":"strategyinitiative",  "text":"Strategy Initiative",  "color":"LightSkyBlue", "expanded":true},
{"key":"strategytask",        "text":"Strategy Task",        "color":"LightSkyBlue", "expanded":true},
{"key":"strategymeasure",     "text":"Strategy Measure",     "color":"LightSkyBlue", "expanded":true},



{"key":"actionactivity",            "text":"Action Activities",              "color":"RoyalBlue", "expanded":true},

{"key":"actionplan",                "text":"Activity Action Plan",              "color":"MediumBlue", "expanded":true},
{"key":"actionplanitem",            "text":"Activity Action Plan Item",         "color":"DeepSkyBlue", "expanded":true},
{"key":"actionplanitemstep",        "text":"Activity Action Plan Item Step",    "color":"DeepSkyBlue", "expanded":true},
{"key":"actionplanprogress",        "text":"Activity Action Plan Progress",     "color":"DeepSkyBlue", "expanded":true},

{"key":"organactionactivity",            "text":"Organization Action Activities",   "color":"RoyalBlue", parent:"actionactivity"},

{"key":"organactionplan",             "text":"Organization Action Plan",              "color":"MediumBlue", "expanded":true},
{"key":"organactionplanitem",         "text":"Organization Action Plan Item",         "color":"DeepSkyBlue", "expanded":true},
{"key":"organactionplanitemstep",     "text":"Organization Action Plan Item Step",    "color":"DeepSkyBlue", "expanded":true},
{"key":"organactionplanprogress",     "text":"Organization Action Plan Progress",     "color":"DeepSkyBlue", "expanded":true},

{"key":"personactionactivity",            "text":"Person Action Activities",    "color":"RoyalBlue", parent:"organactionactivity"},

{"key":"personactionplan",          "text":"Person Action Plan",                "color":"MediumBlue", "expanded":true},
{"key":"personactionplanitem",      "text":"Person Action Plan Item",           "color":"DeepSkyBlue", "expanded":true},
{"key":"personactionplanitemstep",  "text":"Person Action Plan Item Step",      "color":"DeepSkyBlue", "expanded":true},
{"key":"personactionplanprogress",  "text":"Person Action Plan Progress",       "color":"DeepSkyBlue", "expanded":true},




{"key":"message",               "text":"Toucpoint Message",     "color":"Cyan", "expanded":true},
{"key":"customizedmessage",     "text":"Customized Message",     "color":"SkyBlue", "expanded":true},
{"key":"personalizedmessage",   "text":"Personalized Message",     "color":"SkyBlue", "expanded":true},
{"key":"emotionalizedmessage",  "text":"Emotionalized Message",     "color":"SkyBlue", "expanded":true},

{"key":"template",       "text":"Touchpoint Design Templates", "color":"Cyan", "expanded":true},
{"key":"channel",        "text":"Touchpoint Media Channels", "color":"Cyan", "expanded":true},


{"key":"convomap",       "text":"Conversation Maps",   "description":"",  "color":"Coral", parent:"concept" },
{"key":"convomapeditor",    "text":"Conversation Map Editors", "description":"",  "color":"Tomato", parent:"convomap" },
{"key":"convomapchannel",   "text":"Conversation Map Channels", "description":"",  "color":"Tomato", parent:"convomap" },
{"key":"convomapconnector", "text":"Conversation Map Connectors", "description":"",  "color":"Tomato", parent:"convomap" },
{"key":"convomaptemplate",  "text":"Conversation Map Templates", "description":"",  "color":"Tomato", parent:"convomap" },
{"key":"convomapdialect",   "text":"Conversation Map Dialects", "description":"",  "color":"Tomato", parent:"convomap" },
{"key":"convomaprecipient",   "text":"Conversation Map Recipients", "description":"",  "color":"Tomato", parent:"convomap" },




//
// Greenlite specific entities
//

// {"category":"entity", "key":"client",  "text":"Clients",  "description":"",  "color":"lightblue",  expanded: true, parent: "organization"},


{"key":"partner",   "text":"Partner",   color: "lightblue",  expanded: true },
{"key":"library",   "text":"Library",   color: "lightgreen"},
{"key":"client",    "text":"Client",    color: "lightblue",  expanded: true },
{"key":"employee",  "text":"Employee",  color: "pink",  expanded: true },

{"key":"partnerinfo",       "text":"Partner Info",   "color":"lightgreen", "expanded":true},
{"key":"clientinfo",        "text":"Client Info",    "color":"lightgreen", "expanded":true},
{"key":"employeeprofile",   "text":"Employee Profile",  "color":"lightgreen", "expanded":true},

// {"key":"GoalPlan",  "text":"GoalPlan",  color: "green"},
// {"key":"Goal",      "text":"Goal",      color: "green"},
// {"key":"Step",      "text":"Step",      color: "green"},

// {"key":"Survey",    "text":"Survey",    color: "yellow"},
// {"key":"Question",  "text":"Question",  color: "yellow"},
// {"key":"Answer",    "text":"Answer",    color: "yellow"},

{"key":"Campaign",  "text":"Campaign",  color: "red"},
{"key":"Event",     "text":"Event",     color: "red"},
{"key":"EventType", "text":"EventType", color: "red"},
{"key":"Task",      "text":"Task",      color: "red"},
{"key":"Progress",  "text":"Progress",  color: "red"},


{"key":"employeeSurvey",    "text":"EmployeeSurvey",    color: "pink"},
{"key":"employeeQuestion",  "text":"EmployeeQuestion",  color: "pink"},
{"key":"employeeAnswer",    "text":"EmployeeAnswer",    color: "pink"},

{"key":"employeeGoalPlan",  "text":"EmployeeGoalPlan",  color: "pink"},
{"key":"employeeGoal",      "text":"EmployeeGoal",      color: "pink"},
{"key":"employeeStep",      "text":"EmployeeStep",      color: "pink"},

{"key":"employeeCampaign",  "text":"EmployeeCampaign",  color: "pink"},
{"key":"employeeEvent",     "text":"EmployeeEvent",     color: "pink"},
{"key":"employeeEventType", "text":"EmployeeEventType", color: "pink"},
{"key":"employeeTask",      "text":"EmployeeTask",      color: "pink"},
{"key":"employeeProgress",  "text":"EmployeeProgress",  color: "pink"},

//
// Logical component architecture diagram entities
//

//  { ccategory:"it4it", key: "ProcessDomain", text:"IT4IT Process Domains", description:"", isGroup: true } ,
//     { category:"domain", key: "MonitorEvaulateAssess",   text:"Monitor, Evaulate and Assess",  description:"",  isGroup: true,  group:"ProcessDomain"} ,
//         { category:"techcomp",  key:"BusinessProcessControlServices",  text:"Business Process Control Services",  description:"",  group:"MonitorEvaulateAssess" } ,
//         { category:"techcomp",  key:"BusinessProcessMonitoringServices",  text:"Business Process Monitoring Services",  description:"",  group:"MonitorEvaulateAssess" } ,
//         { category:"techcomp",  key:"ExternalProcessesReporting ",  text:"External Processes/Reporting ",  description:"",  group:"MonitorEvaulateAssess" } ,
//     { category:"domain", key: "AlignPlanOrganise",  text:"Align, Plan and Organise",  description:"",  isGroup: true,  group:"ProcessDomain"} ,
//         { category:"techcomp",  key:"CommunicationCoordinationServices",  text:"Communication & Coordination Services",  description:"",  group:"AlignPlanOrganise" } ,
//         { category:"techcomp",  key:"AnalyticsReportingServices",  text:"Analytics & Reporting Services",  description:"",  group:"AlignPlanOrganise" } ,
//         { category:"techcomp",  key:"ProcurementServices",  text:"Procurement Services",  description:"",  group:"AlignPlanOrganise" } ,
        
//     { category:"domain", key: "BuildAcquireImplement",  text:"Build, Acquire and Implement",  description:"",  isGroup: true,  group:"ProcessDomain"} ,
//         { category:"techcomp",  key:"DocumentContentServices",  text:"Document and Content Services",  description:"",  group:"BuildAcquireImplement" } ,
//         { category:"techcomp",  key:"KnowledgeInfomationSevices",  text:"Knowledge & Infomation Sevices",  description:"",  group:"BuildAcquireImplement" } ,
        
//         { category:"techcomp",  key:"InformationIntegrationServices",  text:"Information Integration Services",  description:"",  group:"BuildAcquireImplement" } ,
//         { category:"techcomp",  key:"ExternalParnterService",  text:"External Parnter Service",  description:"",  group:"BuildAcquireImplement" } ,

//     { category:"domain", key: "DeliverServiceSupport",  text:"Deliver, Service and Support",  description:"",  isGroup: true,  group:"ProcessDomain"} ,
//         { category:"techcomp",  key:"WorkflowServices",  text:"Workflow Services",  description:"",  group:"DeliverServiceSupport" } ,
//         { category:"techcomp",  key:"FinancialServices",  text:"Financial Services",  description:"",  group:"DeliverServiceSupport" } ,
//         { category:"techcomp",  key:"OrderManagementServices",  text:"Order Management Services",  description:"",  group:"DeliverServiceSupport" } ,
//         { category:"techcomp",  key:"WarehouseServices",  text:"Warehouse Services",  description:"",  group:"DeliverServiceSupport" } ,
//         { category:"techcomp",  key:"InventoryManagementServices",  text:"Inventory Management Services",  description:"",  group:"DeliverServiceSupport" } ,
      
//     { category:"domain", key: "InfrastructureServices",  text:"Infrastructure Services",  description:"",  isGroup: true,  group:"ProcessDomain"} ,
//         { category:"techcomp",  key:"ServiceProvisioningServices",  text:"Service & Provisioning Services",  description:"",  group:"InfrastructureServices" } ,
//         { category:"techcomp",  key:"SecurityPrivacyServices",  text:"Security & Privacy Services",  description:"",  group:"InfrastructureServices" } ,
//         { category:"techcomp",  key:"ConnectivityInteroperabilityServices",  text:"Connectivity & Interoperability Services",  description:"",  group:"InfrastructureServices" } 
     
    ]

var linkDataArray = [
  
//
//Common node link relationships
//
  
{"from":"thing", "to":"person",       "text":"has type", "color":"blue", "thick":2},
{"from":"thing", "to":"organization", "text":"has type", "color":"blue", "thick":2},
{"from":"thing", "to":"place",        "text":"has type", "color":"blue", "thick":2},
{"from":"thing", "to":"concept",      "text":"has type", "color":"blue", "thick":2},
{"from":"thing", "to":"event",        "text":"has type", "color":"blue", "thick":2},
{"from":"thing", "to":"document",     "text":"has type", "color":"blue", "thick":2},

{"from":"place",     "to":"state", "text":"has type"},
{"from":"state",     "to":"place", "text":"is a"},
{"from":"place",     "to":"county", "text":"has type"},
{"from":"county",    "to":"place", "text":"is a"},
{"from":"place",     "to":"city", "text":"has type"},
{"from":"city",      "to":"place", "text":"is a"},
{"from":"place",     "to":"zipcode", "text":"has type"},
{"from":"zipcode",   "to":"place", "text":"is a"},
{"from":"place",     "to":"areacode", "text":"has type"},
{"from":"areacode",   "to":"place", "text":"is a"},
{"from":"place",     "to":"township", "text":"has type"},
{"from":"township",  "to":"place", "text":"is a"},
{"from":"place",     "to":"towcensustractnship", "text":"has type"},
{"from":"censustract",  "to":"place", "text":"is a"},
{"from":"place",     "to":"address", "text":"has type"},
{"from":"address",   "to":"place", "text":"is a"},
{"from":"place",     "to":"district", "text":"has type"},
{"from":"district",  "to":"place", "text":"is a"},
{"from":"county",    "to":"state", "text":"in state"},
{"from":"city",      "to":"county", "text":"in region"},
{"from":"city",      "to":"state", "text":"in state"},
{"from":"city",      "to":"township", "text":"in township"},
{"from":"address",   "to":"district", "text":"in district"},
{"from":"address",   "to":"censustract", "text":"in district"},
{"from":"address",   "to":"zipcode", "text":"in zip code"},
{"from":"address",   "to":"areacode", "text":"in area code"},

{"from":"address",   "to":"client", "text":"address of"},

{"from":"person", "to":"user", "text":"part of"},

{"from":"person", "to":"profileinfo", "text":"part of"},

{"from":"group",                "to":"recipients",      "text":"has type"},

{"from":"profileinfo",          "to":"recipients",                  "text":"member of"},


{"from":"concept", "to":"workflow", "text":"has type"},
{"from":"concept", "to":"strategy", "text":"has type"},


{"from":"concept",          "to":"sysappmodel",   "text":"has type"},
{"from":"sysappmodel",      "to":"concept",       "text":"is a"},
{"from":"sysappmodel",      "to":"applicationmap",      "text":"has a"},
{"from":"sysappmodel",      "to":"activityformfield",   "text":"has a"},
{"from":"sysappmodel",      "to":"sessioncontenttree",  "text":"has a"},

{"from":"applicationmap",      "to":"applicationmappages",      "text":"has a"},
{"from":"applicationmap",      "to":"applicationmappages",      "text":"has a"},
{"from":"applicationmap",      "to":"applicationmapcategories", "text":"has a"},
{"from":"applicationmap",      "to":"applicationmapsections",    "text":"has a"},
{"from":"applicationmap",      "to":"applicationmapforms",      "text":"has a"},

{"from":"activityformfield",      "to":"formelement",      "text":"has a"},
{"from":"activityformfield",      "to":"fieldtype",      "text":"has a"},
{"from":"activityformfield",      "to":"fieldattribute", "text":"has a"},
{"from":"activityformfield",      "to":"fieldrestriction",    "text":"has a"},
{"from":"activityformfield",      "to":"fieldvalidation",      "text":"has a"},
{"from":"activityformfield",      "to":"fieldtransform",      "text":"has a"},
{"from":"activityformfield",      "to":"fieldtrigger",      "text":"has a"},

{"from":"sessioncontenttree",      "to":"sessioninfo",      "text":"has a"},
{"from":"sessioncontenttree",      "to":"fieldnames",      "text":"has a"},
{"from":"sessioncontenttree",      "to":"placeholdervalues", "text":"has a"},


{"from":"concept",          "to":"roleprofile",     "text":"has type"},
{"from":"roleprofile",      "to":"concept",         "text":"is a"},
{"from":"roleprofile",      "to":"role",            "text":"has part"},
{"from":"role",             "to":"roleprofile",     "text":"part of"},
{"from":"role",             "to":"roletype",        "text":"has part"},
{"from":"role",             "to":"rolegroup",       "text":"has part"},
{"from":"role",             "to":"roleobject",      "text":"has part"},
{"from":"role",             "to":"rolepredicate",   "text":"has part"},
{"from":"role",             "to":"rolesubject",     "text":"has part"},
{"from":"role",             "to":"roleprivilege",   "text":"has part"},
{"from":"roletype",         "to":"role",            "text":"part of"},
{"from":"rolegroup",        "to":"role",            "text":"part of"},
{"from":"roleprivilege",    "to":"role",            "text":"part of"},
{"from":"rolepredicate",    "to":"rolepredicate",   "text":"part of"},
{"from":"rolesubject",      "to":"rolesubject",     "text":"part of"},
{"from":"roleprivilege",    "to":"roleprivilege",   "text":"part of"},


{"from":"workflow",      "to":"convomap",   "text":"has type"},
{"from":"convomap",      "to":"workflow",       "text":"is a"},
{"from":"convomap",      "to":"convomapeditor",       "text":"has a"},
{"from":"convomap",      "to":"convomapchannel",       "text":"has a"},
{"from":"convomap",      "to":"convomapconnector",       "text":"has a"},
{"from":"convomap",      "to":"convomaptemplate",       "text":"has a"},
{"from":"convomap",      "to":"convomapdialect",       "text":"has a"},
{"from":"convomap",      "to":"convomaprecipient",       "text":"has a"},


{"from":"concept", "to":"user", "text":"has type"},
{"from":"user", "to":"concept", "text":"is a"},

{"from":"concept", "to":"group", "text":"has type"},
{"from":"concept", "to":"status", "text":"has type"},
{"from":"concept", "to":"alert", "text":"has type"},

{"from":"event", "to":"calendarevent", "text":"has type"},
{"from":"event", "to":"deadline", "text":"has type"},
{"from":"event", "to":"targetdate", "text":"has type"},
{"from":"event", "to":"actualdate", "text":"has type"},
{"from":"event", "to":"milestone", "text":"has type"},

{"from":"calendarevent", "to":"event", "text":"is a"},
{"from":"deadline", "to":"event", "text":"is a"},
{"from":"targetdate", "to":"event", "text":"is a"},
{"from":"actualdate", "to":"event", "text":"is a"},
{"from":"milestone", "to":"event", "text":"is a"},

{"from":"workflow", "to":"concept", "text":"is a"},
{"from":"workflow", "to":"workflowmodel", "text":"has a"},
{"from":"workflowmodel", "to":"workflow", "text":"is part"},

{"from":"workflow", "to":"workflowelement", "text":"has a"},

{"from":"workflow", "to":"workflowevent", "text":"has a"},
{"from":"workflowevent", "to":"targetdate", "text":"has a"},
{"from":"workflowevent", "to":"actualdate", "text":"has a"},
{"from":"workflowevent", "to":"deadline", "text":"has a"},
{"from":"workflowevent", "to":"milestone", "text":"has a"},
{"from":"workflowevent", "to":"calendarevent", "text":"has a"},

{"from":"workflow", "to":"workflowtrigger", "text":"has a"},

{"from":"workflow",         "to":"touchpoint", "text":"has type"},
{"from":"touchpoint",       "to":"workflow", "text":"is a"},
{"from":"workflowmodel",    "to":"touchpointmodel", "text":"has type"},

{"from":"touchpoint",       "to":"touchpointmodel", "text":"has a"},
{"from":"touchpoint",       "to":"touchpointelement", "text":"has a"},
{"from":"touchpoint",       "to":"touchpointevent", "text":"has a"},
{"from":"touchpoint",       "to":"touchpointtrigger", "text":"has a"},

{"from":"touchpointmodel",  "to":"workflowmodel", "text":"is a"},
{"from":"touchpointmodel",  "to":"emailtouchpointmodel", "text":"has type"},
{"from":"touchpointmodel",  "to":"printtouchpointmodel", "text":"has type"},
{"from":"touchpointmodel",  "to":"webtouchpointmodel", "text":"has type"},
{"from":"touchpointmodel",  "to":"triggeredemailtouchpointmodel", "text":"has type"},
{"from":"touchpointmodel",  "to":"inapptouchpointmodel", "text":"has type"},

{"from":"message", "to":"customizedmessage",    "text":"has type"},
{"from":"message", "to":"personalizedmessage",  "text":"has type"},
{"from":"message", "to":"emotionalizedmessage", "text":"has type"},

{"from":"customizedmessage", "to":"touchpointmodel", "text":"is part"},
{"from":"personalizedmessage", "to":"touchpointmodel", "text":"is part"},
{"from":"emotionalizedmessage", "to":"touchpointmodel", "text":"is part"},

{"from":"recipients", "to":"touchpointmodel", "text":"is part"},
{"from":"template",   "to":"touchpointmodel", "text":"is part"},
{"from":"channel",    "to":"touchpointmodel", "text":"is part"},


{"from":"strategy",   "to":"concept",            "text":"is a"},
{"from":"strategy",   "to":"strategymap",        "text":"has a"},
{"from":"strategy",   "to":"strategyscorecard",  "text":"has a"},
{"from":"strategy",   "to":"strategyobjective",  "text":"has a"},
{"from":"strategy",   "to":"strategyinitiative", "text":"has a"},
{"from":"strategy",   "to":"strategytask",       "text":"has a"},
{"from":"strategy",   "to":"strategymeasure",    "text":"has a"},
{"from":"strategymap",          "to":"strategyobjective",       "text":"has a"},
{"from":"strategyscorecard",    "to":"strategyobjective",       "text":"has a"},
{"from":"strategyscorecard",    "to":"strategymeasure",         "text":"has a"},
{"from":"strategymeasure",      "to":"strategyobjective",       "text":"monitors"},
{"from":"strategymeasure",      "to":"strategyinitiative",      "text":"monitors"},
{"from":"strategyinitiative",   "to":"strategytask",            "text":"has a"},
{"from":"strategyobjective",    "to":"strategyinitiative",      "text":"has a"},


// {"from":"strategyinitiative",   "to":"actionplan",              "text":"has type"},
// {"from":"strategyinitiative",   "to":"actionplanitem",          "text":"has type"},
// {"from":"strategytask",         "to":"actionplanitemstep",      "text":"has type"},
// {"from":"strategymeasure",      "to":"actionplanprogress",      "text":"has type"},

// {"from":"actionplan",           "to":"strategyinitiative",      "text":"is type"},
// {"from":"actionplanitem",       "to":"strategyinitiative",      "text":"is type"},
// {"from":"actionplanitemstep",   "to":"strategytask",            "text":"is type"},
// {"from":"actionplanprogress",   "to":"strategymeasure",         "text":"is type"},

{"from":"strategy",             "to":"actionactivity",          "text":"has type"},
// {"from":"actionactivity",       "to":"strategy",                "text":"is type"},
{"from":"actionactivity",       "to":"actionplan",              "text":"has a"},
// {"from":"actionplan",           "to":"actionactivity",          "text":"is type"},
{"from":"actionactivity",       "to":"actionplanprogress",      "text":"has a"},

{"from":"actionplan",           "to":"actionplanitem",          "text":"has a"},
{"from":"actionplanitem",       "to":"actionplanitemstep",      "text":"has a"},

{"from":"actionplan",           "to":"actionplanprogress",      "text":"monitored by"},
{"from":"actionplanitem",       "to":"actionplanprogress",      "text":"monitored by"},
{"from":"actionplanitemstep",   "to":"actionplanprogress",      "text":"monitored by"},
// {"from":"actionplanitem",       "to":"actionplanprogress",      "text":"monitored by"},

// {"from":"actionplanprogress",   "to":"actionplanitemstep",      "text":"monitors"},
// {"from":"actionplanprogress",   "to":"actionplanitem",          "text":"monitors"},
// {"from":"actionplanprogress",   "to":"actionplan",              "text":"monitors"},

{"from":"actionactivity",             "to":"organactionactivity",          "text":"has type"},
{"from":"organactionactivity",        "to":"organactionplan",          "text":"has a"},
{"from":"organactionactivity",        "to":"organactionplanprogress",      "text":"has a"},
// {"from":"actionplan",           "to":"organactionplan",     "text":"has a"},
// {"from":"organactionplan",           "to":"actionplan",           "text":"is type"},
// {"from":"organactionplanitem",       "to":"actionplanitem",       "text":"is type"},
// {"from":"organactionplanitemstep",   "to":"actionplanitemstep",   "text":"is type"},
// {"from":"organactionplanprogress",   "to":"actionplanprogress",   "text":"is type"},

{"from":"organactionplan",          "to":"organactionplanitem",          "text":"has a"},
{"from":"organactionplanitem",      "to":"organactionplanitemstep",      "text":"has a"},

{"from":"organactionplan",           "to":"organactionplanprogress",      "text":"monitored by"},
{"from":"organactionplanitem",       "to":"organactionplanprogress",      "text":"monitored by"},
{"from":"organactionplanitemstep",   "to":"organactionplanprogress",      "text":"monitored by"},


// {"from":"organactionplanprogress",   "to":"organactionplanitemstep",      "text":"monitors"},
// {"from":"organactionplanprogress",   "to":"organactionplanitem",          "text":"monitors"},
// {"from":"organactionplanprogress",   "to":"organactionplan",              "text":"monitors"},

{"from":"organactionactivity",             "to":"personactionactivity",          "text":"has type"},
{"from":"personactionactivity",             "to":"personactionplan",          "text":"has a"},
{"from":"personactionactivity",           "to":"personactionplanprogress",      "text":"has a"},
// {"from":"organactionplan",      "to":"personactionplan",          "text":"has a"},
// {"from":"personactionplan",           "to":"organactionplan",           "text":"is type"},
// {"from":"personactionplanitem",       "to":"organactionplanitem",       "text":"is type"},
// {"from":"personactionplanitemstep",   "to":"organactionplanitemstep",   "text":"is type"},
// {"from":"personactionplanprogress",   "to":"organactionplanprogress",   "text":"is type"},

{"from":"personactionplan",           "to":"personactionplanitem",          "text":"has a"},
{"from":"personactionplanitem",       "to":"personactionplanitemstep",      "text":"has a"},

{"from":"personactionplanitemstep",   "to":"personactionplanprogress",      "text":"monitored by"},
{"from":"personactionplanitem",       "to":"personactionplanprogress",      "text":"monitored by"},
{"from":"personactionplan",           "to":"personactionplanprogress",      "text":"monitored by"},

// {"from":"personactionplanprogress",   "to":"personactionplanitemstep",      "text":"monitors"},
// {"from":"personactionplanprogress",   "to":"personactionplanitem",          "text":"monitors"},
// {"from":"personactionplanprogress",   "to":"personactionplan",      "text":"monitors"},



{"from":"document", "to":"content", "text":"has type"},
{"from":"document", "to":"asset", "text":"has type"},
{"from":"document", "to":"category", "text":"has type"},
{"from":"document", "to":"keyword", "text":"has type"},
{"from":"document", "to":"message", "text":"has type"},
{"from":"document", "to":"template", "text":"has type"},
{"from":"document", "to":"channel", "text":"has type"},

{"from":"content",  "to":"document", "text":"is a"},
{"from":"asset",    "to":"document", "text":"is a"},
{"from":"category", "to":"document", "text":"is a"},
{"from":"keyword",  "to":"document", "text":"is a"},
{"from":"message",  "to":"document", "text":"is a"},
{"from":"template", "to":"document", "text":"is a"},
{"from":"channel",  "to":"document", "text":"is a"},


{"from":"asset", "to":"file", "text":"has type"},
{"from":"file", "to":"asset", "text":"is a"},

{"from":"file", "to":"image", "text":"has type"},
{"from":"image",    "to":"file", "text":"is a"},

{"from":"image", "to":"photo", "text":"has type"},
{"from":"photo", "to":"image", "text":"is a"},








//
// Greenlite specific node link relationships
//


{"from":"concept", "to":"profileinfo", "text":"has type"},
{"from":"profileinfo", "to":"concept", "text":"is a"},


{"from":"organization", "to":"client", "text":"has type"},
{"from":"client", "to":"organization", "text":"is a"},
{"from":"profileinfo",      "to":"clientinfo",      "text":"has type"},
{"from":"clientinfo",      "to":"profileinfo",      "text":"is a"},
{"from":"client", "to":"clientinfo", "text":"part of"},
{"from":"clientinfo",    "to":"address", "text":"has address"},
{"from":"address",   "to":"clientinfo", "text":"address of"},


{"from":"organization", "to":"partner", "text":"has type"},
{"from":"partner", "to":"organization", "text":"is a"},
{"from":"profileinfo",      "to":"partnerinfo",      "text":"has type"},
{"from":"partnerinfo",      "to":"profileinfo",      "text":"is a"},
{"from":"partner", "to":"partnerinfo", "text":"part of"},
{"from":"partnerinfo",    "to":"address", "text":"has address"},
{"from":"partner",  "to":"library",   "text":"has library", color: "blue", thick: 2 },  


{"from":"user", "to":"employee", "text":"part of"},
{"from":"employee", "to":"user", "text":"is a"},
{"from":"profileinfo",      "to":"employeeprofile",     "text":"has type"},
{"from":"employeeprofile",      "to":"profileinfo",      "text":"is a"},
{"from":"employee", "to":"employeeprofile", "text":"part of"},
{"from":"employeeprofile",    "to":"address", "text":"has address"},
{"from":"address",   "to":"employeeprofile", "text":"address of"},


{"from":"library",  "to":"GoalPlan",   "text":"has goal plan" },
{"from":"GoalPlan", "to":"Goal",       "text":"has goal" },
{"from":"Goal",     "to":"Step",       "text":"has step" },

{"from":"library",  "to":"Survey",     "text":"has survey"},
{"from":"Survey",   "to":"Question",   "text":"has question"},
{"from":"Question", "to":"Answer",     "text":"has answer"},

{"from":"library",  "to":"Campaign",   "text":"has campaign"},
{"from":"Campaign", "to":"Event",      "text":"has event"},
{"from":"Event",    "to":"Task",       "text":"has task"},
{"from":"Task",     "to":"Progress",   "text":"has progress"},
{"from":"Event",    "to":"EventType",  "text":"type of"},
{"from":"EventType","to":"Survey",   "text":"associated with"},
{"from":"EventType","to":"GoalPlan",   "text":"associated with"},

{"from":"partner",  "to":"client",     "text":"has client",  color: "blue", thick: 2 },
{"from":"client",   "to":"Survey",     "text":"has survey"},
{"from":"client",   "to":"GoalPlan",   "text":"has goal plan"},
{"from":"client",   "to":"Campaign",   "text":"has campaign"},

{"from":"client",   "to":"employee",   "text":"has employee"},

{"from":"employee",         "to":"employeeSurvey",    "text":"has survey"},
{"from":"employeeSurvey",   "to":"Survey",            "text":"type of"},
{"from":"employeeSurvey",   "to":"employeeQuestion",    "text":"has question"},
{"from":"employeeQuestion", "to":"Question",          "text":"type of"},
{"from":"employeeQuestion", "to":"employeeAnswer",    "text":"has answer"},
{"from":"employeeAnswer",   "to":"Answer",            "text":"type of"},


{"from":"employee",         "to":"employeeGoalPlan",   "text":"has goal plan"},
{"from":"employeeGoalPlan", "to":"GoalPlan",           "text":"type of"},
{"from":"employeeGoalPlan", "to":"employeeGoal",       "text":"has goal "},
{"from":"employeeGoal",     "to":"GoalPlan",           "text":"type of"},
{"from":"employeeGoal",     "to":"employeeStep",       "text":"has setp"},
{"from":"employeeStep",     "to":"Step",               "text":"type of"},


{"from":"employee",          "to":"employeeCampaign",   "text":"has goal plan"},
{"from":"employeeCampaign",  "to":"Campaign",           "text":"type of"},
{"from":"employeeCampaign",  "to":"employeeEvent",       "text":"has event "},
{"from":"employeeEvent",     "to":"Event",           "text":"type of"},
{"from":"employeeEvent",     "to":"employeeTask",       "text":"has task"},
{"from":"employeeTask",      "to":"Task",               "text":"type of"},
{"from":"employeeTask",      "to":"employeeProgress",       "text":"has progress"},
{"from":"employeeProgress",  "to":"Progress",               "text":"type of"},

{"from":"employeeEvent",     "to":"employeeEventType",       "text":"type of"},
{"from":"employeeEventType", "to":"EventType",               "text":"type of"},
{"from":"employeeEventType", "to":"employeeSurvey",       "text":"associated with"},
{"from":"employeeEventType", "to":"employeeGoalPlan",       "text":"associated with"},



    ]