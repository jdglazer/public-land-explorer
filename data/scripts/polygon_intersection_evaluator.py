from typing import List, Any, Callable, Tuple
from utils import order_items_indexes_ascending

class Coordinate:
    def __init__(self, lat: float, lon: float):
        self.lat = lat
        self.lon = lon

class OptimizedPolygonPart:

    def __init__(self, ordered_points: List[Tuple[float, float]]):
        self.coordinates = [Coordinate(lon = point[0], lat = point[1]) for point in ordered_points]

        self.ordered_ascending_lon_indexes = order_items_indexes_ascending(self.coordinates, lambda item: item.lon)
        self.ordered_ascending_lat_indexes = order_items_indexes_ascending(self.coordinates, lambda item: item.lat)

    def get_max_lon(self) -> float:
        return self.coordinates[self.ordered_ascending_lon_indexes[-1]].lon

    def get_min_lon(self) -> float:
        return self.coordinates[self.ordered_ascending_lon_indexes[0]].lon

    def get_max_lat(self) -> float:
        return self.coordinates[self.ordered_ascending_lon_indexes[-1]].lat

    def get_min_lat(self) -> float:
        return self.coordinates[self.ordered_ascending_lon_indexes[0]].lat

class OptimizedPolygon:

    def __init__(self, polygon_parts: List[List[Tuple[float, float]]]):
        self.parts: List[OptimizedPolygonPart] = []

        for polygon_part in polygon_parts:
            self.parts.append(OptimizedPolygonPart(polygon_part))

        self.max_lon = max((part.get_max_lon() for part in self.parts))
        self.min_lon = max((part.get_min_lon() for part in self.parts))
        self.max_lat = max((part.get_max_lat() for part in self.parts))
        self.min_lat = max((part.get_min_lat() for part in self.parts))

    def overlaps(self, polygon_part: OptimizedPolygonPart) -> bool:
        if self.min_lon >= polygon_part.get_max_lon() \
                or self.max_lon <= polygon_part.get_min_lon() \
                or self.min_lat >= polygon_part.get_max_lat() \
                or self.max_lat <= polygon_part.get_min_lat():
            return False

        return True


if __name__ == '__main__':
    coors = [(-1.4, 0.0),(-8.4, 0.0),(-0.4, 0.0),(-0.4, 0.0),(-15.4, 0.0),(-7.4, 0.0),(-20.4, 0.0)]
    o = OptimizedPolygonPart(coors)
