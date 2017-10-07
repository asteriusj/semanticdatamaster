{
  $ref: "basic_person.json",
  properties: {
    location: {
      type: "object",
      title: "Location",
      properties: {
        city: {
          type: "string"
        },
        state: {
          type: "string"
        },
        citystate: {
          type: "string",
          description: "This is generated automatically from the previous two fields",
          template: "{{city}}, {{state}}",
          watch: {
            city: "person.location.city",
            state: "person.location.state"
          }
        }
      }
    },
    pets: {
      type: "array",
      format: "table",
      title: "Pets",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: [
              "cat",
              "dog",
              "bird",
              "reptile",
              "other"
            ],
            default: "dog"
          },
          name: {
            type: "string"
          },
          fixed: {
            type: "boolean",
            title: "spayed / neutered"
          }
        }
      }
    }
  }
}
