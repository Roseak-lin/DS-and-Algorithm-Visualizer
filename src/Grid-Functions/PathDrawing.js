import { unweightedShortestPath } from "../Algorithms/UnweightedSearchAlgorithms"
import { weightedShortestPath } from "../Algorithms/WeightedSearchAlgorithms"

export function drawWeightedShortestPath(weightedStartNodeX, weightedStartNodeY, speed, path) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const shortestPath = weightedShortestPath(
        weightedStartNodeX,
        weightedStartNodeY,
        path
    );
    for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
            let id = shortestPath[i][1] + "-" + shortestPath[i][0];
            document.getElementById(id).className = "grid-square shortestpath";
        }, speed * i * 2);
    }

    setTimeout(() => {
        document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
    }, shortestPath.length * speed * 2);
}

export function drawUnweightedShortestPath(unweightedStartNodeX, unweightedStartNodeY, unweightedEndNodeX, unweightedEndNodeY, speed, path) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const shortestPath = unweightedShortestPath(
        unweightedStartNodeX,
        unweightedStartNodeY,
        unweightedEndNodeX,
        unweightedEndNodeY,
        path
    );
    for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
            let id = shortestPath[i][1] + "-" + shortestPath[i][0];
            document.getElementById(id).className = "grid-square shortestpath";
        }, speed * i * 2);
    }

    setTimeout(() => {
        document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
    }, speed * shortestPath.length * 2);
}