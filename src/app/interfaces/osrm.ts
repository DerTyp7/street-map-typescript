interface OsrmWaypoint{
    hint?: string;
    distance?: number;
    location?: Array<number>;
    name?: string;
}

interface OsrmGeometry{
    coordinates?: Array<Array<number>>;
}

interface OsrmRoute{
    geometry?: OsrmGeometry;
}

export interface Osrm{
    code?: string;
    waypoints?: Array<OsrmWaypoint>;
    routes?: Array<OsrmRoute>;
}