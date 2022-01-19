interface OsrmWaypoint{
    hint?: string;
    distance?: number;
    location?: Array<number>;
    name?: string;
}

interface OsrmGeometry{
    type: GeometryType;
    coordinates?: Array<Array<number>>;
}

enum GeometryType {
    LINE_STRING = "LineString"
}

interface OsrmRoute{
    geometry: OsrmGeometry;
}

export interface Osrm{
    code?: string;
    waypoints?: Array<OsrmWaypoint>;
    routes: Array<OsrmRoute>;
}