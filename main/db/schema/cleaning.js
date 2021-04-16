const ajv = require('ajv');
const addFormats = require("ajv-formats")

const ajv_handler= new ajv();
addFormats(ajv_handler)
const schema={
    type: "object",
    properties: {
        date: {
            type: "string",
            format: "date"
        },
        publisher: {type:"string"}
    },
    required: ["date", "publisher"],
    additionalProperties: false
}

const validate = ajv_handler.compile(schema)

module.exports = validate