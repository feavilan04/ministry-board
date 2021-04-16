const ajv = require('ajv');

const ajv_handler= new ajv();
const schema={
    type: "object",
    properties: {
        name: {type: "string"}
    },
    required: ["name"],
    additionalProperties: false
}

const validate = ajv_handler.compile(schema)

module.exports = validate