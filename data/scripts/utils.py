import math
from typing import List, Any, Callable, Tuple


def order_items_indexes_ascending(items: List[Any], value_getter: Callable[[Any], Any]) -> List[int]:
    ordered_ascending_indexes: List[int] = [0]

    for coor_index in range(1, len(items)):
        current_value = value_getter(items[coor_index])

        start_index = 0
        end_index = len(ordered_ascending_indexes) - 1

        end_value = value_getter(items[ordered_ascending_indexes[end_index]])
        if current_value >= end_value:
            ordered_ascending_indexes.append(coor_index)
            continue

        start_value = value_getter(items[ordered_ascending_indexes[start_index]])
        if current_value <= start_value:
            ordered_ascending_indexes.insert(0, coor_index)
            continue

        while end_index - start_index > 1:
            middle_index: int = math.floor((end_index + start_index) / 2)
            middle_value = value_getter(items[ordered_ascending_indexes[middle_index]])

            if current_value >= middle_value:
                start_index = middle_index
            elif current_value < middle_value:
                end_index = middle_index

        ordered_ascending_indexes.insert(end_index, coor_index)

    return ordered_ascending_indexes

def split_shape_polygon_parts(points: List[Tuple[int]], parts_start_indexes: List[int]) -> List[List[Tuple[float, float]]]:
    parts_points = []
    part_len = len(parts_start_indexes)
    for index in range(0, part_len):
        if part_len == (index + 1):
            parts_points.append(points[parts_start_indexes[index]:-1])
        else:
            parts_points.append(points[parts_start_indexes[index]:parts_start_indexes[index + 1] - 1])

    return parts_points