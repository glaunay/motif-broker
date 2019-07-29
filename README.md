# motif-broker
front-end service to dispatch and aggregate motif requests on the list of couchDB databases
This is the stand-alone version

#### Querying the service
```sh
curl --header "Content-Type: application/json" --request POST --data '{"keys": [ "AAAAAAAAAATTTCAATTATAGG", "AAAAAAAATTATGTTCTTGACGG","AAAAAAACGGACATCCTTTATGG", "AAAACTTCATGCAAGTTTTGCGG","AAAACGGGTTGAATAGTCTCTGG","AAAACGACAATTGCCGTTTTCGG", "AAAAAAAAAAAAAAAATCAATGG", "ATTAAAAAAAAAAGCAGGATGGG"] }' MOTIF-BROKER_ENDPOINT/bulk_request
```

will return data only for query keys found in databases


```json
{
    "request": {
        "AAAAAAAAAAAAAAAATCAATGG": {
            "Buchnera aphidicola BCc GCF_000090965.1": {
                "NC_008513.1": [
                    "-(203304,203326)"
                ]
            }
        },
        "ATTAAAAAAAAAAGCAGGATGGG": {
            "Wigglesworthia glossinidia endosymbiont of Glossina morsitans morsitans (Yale colony) GCF_000247565.1": {
                "NC_016893.1": [
                    "-(252902,252924)"
                ]
            }
        }
    }
}
````
