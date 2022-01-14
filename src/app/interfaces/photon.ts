interface PhotonGeometry{
    coordinates?: Array<number>;
    type?: string;
}

interface PhotonProperties{
    osm_id?: number;
    osm_type?: string;
    extent?: Array<number>;
    country?: string;
    osm_key?: "place";
    countrycode?: string;
    osm_value?: string;
    name?: string;
    type?: string;
    postcode?: string;
    city?: string;
}

export interface Photon{
    geometry?: PhotonGeometry;
    type?: string;
    properties: PhotonProperties;
}

export interface PhotonFeatureCollection{
    features?: Array<Photon>;
    type?: string;
}