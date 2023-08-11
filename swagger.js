const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./doc.json";
const endpointsFiles = ["./index"];

swaggerAutogen(outputFile, endpointsFiles);
