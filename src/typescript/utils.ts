export interface PlantForObnoxiousDatabase {
    user: string,
    commonName: string,
    scientificName: string,
    taxonomy: {
        kingdom: string,
        phylum: string,
        class: string,
        order: string,
        family: string,
        genus: string
    },
    distribution: string[],
    nsxUrl: string
}

export interface PlantFromObnoxiousDatabase {
    _id: string,
    user: string,
    commonName: string,
    scientificName: string,
    taxonomy: {
        kingdom: string,
        phylum: string,
        class: string,
        order: string,
        family: string,
        genus: string
    },
    distribution: string[],
    nsxUrl: string
}

export interface PlantFromNatureServe {
    recordType: string,
    nsxUrl: string,
    scientificName: string,
    primaryCommonName: string,
    nations: {
        nationCode: string,
        subnations: {
            subnationCode: string,
            exotic: boolean
        }[]
    }[]
    ,
    speciesGlobal: {
        kingdom: string | null,
        phylum: string | null,
        taxclass: string | null,
        taxorder: string | null,
        family: string | null,
        genus: string | null
    }
}