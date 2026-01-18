---
title: YAML-LD
parent:
  - "[[data storage]]"
  - "[[programming languages and datatypes]]"
peer:
  - "[[RDF]]"
  - "[[RDFa]]"
child:
  - "[[RDF quads for claim provenance]]"
"@context":
  - https://json-ld.org/contexts/dollar-convenience.jsonld
  - "@base": https://anothersplinter.net/yaml-ld
    rdfs: http://www.w3.org/2000/01/rdf-schema#
    schema: https://schema.org/
    license:
      "@type": "@id"
$id: https://anothersplinter.net/yaml-ld
rdfs:label: YAML-LD
license: https://anothersplinter.net/licenses/CC0
schema:hasPart:
  - rdfs:label: Resources
---
YAML with Linked Data for use in the Semantic Web

YAML-LD is readable as YAML frontmatter but needs better formatting on e.g. Obsidian

YAML-LD is fully translatable to JSON-LD (lossless)

---
## conversion from JSON-LD
- A [YAML stream](http://yaml.org/spec/1.2/spec.html#streams) _MUST_ include only a single [YAML document](http://yaml.org/spec/1.2/spec.html#documents), as the [JSON-LD internal representation](https://www.w3.org/TR/json-ld11-api/#dfn-internal-representation) only supports a single document model.

## example

```YAML-LD
"@context":
  - https://json-ld.org/contexts/dollar-convenience.jsonld
  - "@base": https://json-ld.github.io/yaml-ld/spec/
    rdfs: http://www.w3.org/2000/01/rdf-schema#
    schema: https://schema.org/
    license:
      "@type": "@id"

$id: https://json-ld.github.io/yaml-ld/spec/
rdfs:label: YAML-LD
license: https://spdx.org/licenses/W3C.html
schema:hasPart:
  - rdfs:label: Abstract
  - rdfs:label: Status of This Document
  - rdfs:label: Introduction
```

## Resources
- [W3C Specification](https://json-ld.github.io/yaml-ld/spec/) (draft)