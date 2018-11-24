console.log('loading nodedata ')
var nodedata = [
    {
        key: 1,
        name: "sdm:Thing",
        properties: [
            { name: "a", type: "rdfs:Class", visibility: "public" },
            { name: "rdfs:label ", type: "Thing", visibility: "public" },
            { name: "rdfs:comment", type: "The most generic type of item.", visibility: "public" },
            { name: "rdfs:subClassOf", type: "owl:Thing", visibility: "public" },
            { name: "owl:equivalentClass", type: "schema:Thing", visibility: "public" }
        ],
        methods: []
      },
    {
        key: 11,
        name: "sdm:Person",
        properties: [
            { name: "givenName", type: "String", visibility: "public" },
            { name: "familyName", type: "String", visibility: "public" },
            { name: "nickname", type: "String", visibility: "public" },
            { name: "fullname", type: "String", visibility: "public" },

            { name: "birth", type: "Date", visibility: "protected" }

        ],
        methods: [
            { name: "getCurrentAge", type: "int", visibility: "public" }
        ]
      },
    {
        key: 12,
        name: "Member",
        properties: [
            { name: "classes", type: "List<Course>", visibility: "public" }
        ],
        methods: [
            { name: "attend", parameters: [{ name: "class", type: "Course" }], visibility: "private" },
            { name: "sleep", visibility: "private" }
        ]
      },
    {
        key: 13,
        name: "Age",
        properties: [
            { name: "name", type: "String", visibility: "public" },
            { name: "description", type: "String", value: "A integer between `1` and `99` (inclusive).", visibility: "public" },
            { name: "type", type: "string", visibility: "public" },
            { name: "format", type: "string", visibility: "public" },
            { name: "minimum", type: "integer", value: 0, visibility: "public" },
            { name: "maximum", type: "integer", value: 100, visibility: "public" }
        ],
        methods: [
        ]
      },
    {
        key: 14,
        name: "Address",
        properties: [
            { name: "name", type: "String", visibility: "public" },
            { name: "description", type: "String", visibility: "public" },
            { name: "professor", type: "Professor", visibility: "public" },
            { name: "location", type: "String", visibility: "public" },
            { name: "times", type: "List<Time>", visibility: "public" },
            { name: "prerequisites", type: "List<Course>", visibility: "public" },
            { name: "students", type: "List<Student>", visibility: "public" }
        ]
      }
    ];

linkdata = [
    { from: 11, to: 1, relationship: "generalization" },
    { from: 12, to: 11, relationship: "generalization" },
    { from: 13, to: 11, relationship: "aggregation" },
    { from: 14, to: 11, relationship: "aggregation" }
    ];
