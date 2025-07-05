#!/usr/bin/env node
// use rdflib to make sparql queries into a ttl file
// get the command line argument indicating gts rank such as 'Epoch', 'Period', 'Era', "Eon", 'Age', 'Stage'
// if no argument is given, use 'Epoch' as default
// Usage: node sparql_to_ttl.js [rank]
// Example: node sparql_to_ttl.js Epoch
// This script fetches a turtle file from a URL, parses it, and runs a SPARQL query to extract chronostratigraphic data.
// It uses the rdflib library to handle RDF data and SPARQL queries.
// // The script reads a turtle file from the local file system and also fetches a turtle file from a URL.
// // It then runs a SPARQL query to extract information about chronostratigraphic intervals, specifically focusing on the 'Epoch' rank.
// // The results are printed to the console in a comma-separated format, showing the title, start time, and end time of each interval.
// // The script is designed to work with the ChronostratChart2024-12.ttl file, which contains chronostratigraphic data.
// // The script uses the rdflib library to parse RDF data and execute SPARQL queries.
// // The script is intended to be run in a Node.js environment and requires the rdflib library to be installed.
const argv = process.argv.slice(2);
// If no argument is provided, default to 'Epoch'
let rank = argv[0] || 'Epoch';

// https://www.easyrdf.org/converter
// read ChronostratChart2024-12.ttl from file system
const rdf = require('rdflib');
let store = rdf.graph();
const fs = require('fs');
const path = require('path');
//const filePath = path.join(__dirname, 'ChronostratChart2024-12.ttl');
//console.log("Reading file: %s\n", filePath);
//const rdfTtlContent = fs.readFileSync(filePath, 'utf8');
const sparql_query = `
PREFIX ti: <http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#>
PREFIX cs: <http://resource.geosciml.org/classifier/ics/ischart>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX gts: <http://resource.geosciml.org/ontology/timescale/gts#>
PREFIX ischart: <http://resource.geosciml.org/classifier/ics/ischart/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rank: <http://resource.geosciml.org/ontology/timescale/rank/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sdo: <https://schema.org/>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX time: <http://www.w3.org/2006/time#>
PREFIX ts: <http://resource.geosciml.org/vocabulary/timescale/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?x ?from ?to
WHERE {
  ?x a skos:Concept;
  skos:prefLabel ?title;
  gts:rank rank:Epoch;
  time:hasBeginning ?bt;
  time:hasEnd ?et.
  ?bt ischart:inMYA ?from.
  ?et ischart:inMYA ?to.
} order by desc(?to) 
`.replace(/rank:Epoch/g, `rank:${rank}`);


function downgradeTurtle2008(turtle2008lines) {
  // Convert the turtle2008lines to a format compatible with rdflib
  multiLines = turtle2008lines.split('\n');
  return multiLines.map(line => {
    if (line.startsWith('PREFIX')) {
      return line.replace('PREFIX', '@prefix') + ' .';
    }
    return line;
  }).join('\n');
}
// read another file over URL https://stratigraphy.org/ICSchart/data/ChronostratChart2024-12.ttl
const url = 'https://stratigraphy.org/ICSchart/data/ChronostratChart2024-12.ttl';
fetch(url)
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the response body as text
    return response.text();
  })
  .then(textData => {
    //console.log(`Fetched data from ${url}`);
    // 'textData' now contains the content of the file from the URL
    //console.log('Content from URL:', textData);
    // You can then use 'textData' to display it on a webpage, process it, etc.
    rdf.parse(downgradeTurtle2008(textData), store, url, 'text/turtle');
    q=rdf.SPARQLToQuery(sparql_query, false, store);
    store.query(q, function(result) {
    console.log([result['?title'].value , result['?from'].value, result['?to'].value].join(","));
    }, undefined, function() {
    //console.log("\n\n");
    });

    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

//console.log("Read file: %s\n", rdfTtlContent.length);
// split the content into lines


//lines = rdfTtlContent.split('\n');
//console.dir(lines.entries());

turtle2008lines = [];
//for( [index,line] of lines.entries() ) {
//  if (line.startsWith('PREFIX')) {
//    line = line.replace('PREFIX', '@prefix');
//    line = line + ' .';
//  }
//  turtle2008lines.push(line);
//}
//console.log(turtle2008lines) //.join("\n"));

//rdf.parse(turtle2008lines.join("\n"), store, "file://" + filePath, 'text/turtle');
//q=rdf.SPARQLToQuery(sparql_query, false, store);
// store.query(q, function(result) {
// console.log([result['?title'].value , result['?from'].value, result['?to'].value].join(","));
// }, undefined, function() {
// //console.log("\n\n");
// });
