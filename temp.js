// Randomly Generate a Node
function generateRandom() {
    // node template
    var node =
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    // all tiles
    var tiles = [1, 2, 3, 4, 5, 6, 7, 8, "_"];

    // assign tiles randomly
    loop1: for (let i = 0; i < node.length; i++) {
        for (let j = 0; j < node[i].length; j++) {

            var rand = Math.floor(Math.random() * tiles.length);
            var tile = tiles[rand];
            tiles.splice(rand, 1);

            if (node[i][j] == 0) {
                node[i][j] = tile;
            }
        }
    }

    // return node;
    var node1 =
        [
            ["_", 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
    return node1;
}

// Print
function print(node) {
    for (let i1 = 0; i1 < node.length; i1++) {
        var x = "";
        for (let j1 = 0; j1 < node[i1].length; j1++) {
            x = x + " " + node[i1][j1];
        }
        console.log(x);
    }
}

// Up
function moveUp(node) {
    loop1: for (let i = 0; i < node.length; i++) {
        for (let j = 0; j < node[i].length; j++) {
            if (node[i][j] == "_") {
                if (i > 0) {
                    var temp = node[i - 1][j];
                    node[i - 1][j] = node[i][j];
                    node[i][j] = temp;
                    break loop1;
                }
            }
        }
    }
    return node;
}

// Down
function moveDown(node) {
    loop1: for (let i = 0; i < node.length; i++) {
        for (let j = 0; j < node[i].length; j++) {
            if (node[i][j] == "_") {
                if ((i + 1) < node.length) {
                    var temp = node[i + 1][j];
                    node[i + 1][j] = node[i][j];
                    node[i][j] = temp;
                    break loop1;
                }
            }
        }
    }
    return node;
}

// Right
function moveRight(node) {
    loop1: for (let i = 0; i < node.length; i++) {
        for (let j = 0; j < node[i].length; j++) {
            if (node[i][j] == "_") {
                if ((j + 1) < node[i].length) {
                    var temp = node[i][j + 1];
                    node[i][j + 1] = node[i][j];
                    node[i][j] = temp;
                    break loop1;
                }
            }
        }
    }
    return node;
}

// Left
function moveLeft(node) {
    loop1: for (let i = 0; i < node.length; i++) {
        for (let j = 0; j < node[i].length; j++) {
            if (node[i][j] == "_") {
                if (j > 0) {
                    var temp = node[i][j - 1];
                    node[i][j - 1] = node[i][j];
                    node[i][j] = temp;
                    break loop1;
                }
            }
        }
    }
    return node;
}

// Fill Frontier
function fillFrontier() {
    frontier = [];
    for (let i = 0; i < frontierChoice.length; i++) {
        var node = frontierChoice[i];
        var v1 = moveUp([...node.map(nested => [...nested])]);
        var v2 = moveDown([...node.map(nested => [...nested])]);
        var v3 = moveRight([...node.map(nested => [...nested])]);
        var v4 = moveLeft([...node.map(nested => [...nested])]);

        if (verifyNode(v1)) {
            frontier.push(v1);
        }
        if (verifyNode(v2)) {
            frontier.push(v2);
        }
        if (verifyNode(v3)) {
            frontier.push(v3);
        }
        if (verifyNode(v4)) {
            frontier.push(v3);
        }
    }
}

// Compare Nodes
function compareNodes(node1, node2) {
    if (JSON.stringify(node1) === JSON.stringify(node2)) {
        console.log("same");
        return true;
    }
    return false;
}

// Heuristic Value
function h_value(node) {
    var misplacedTiles = 0;
    // compare arrays
    for (let i = 0; i < node.length; i++) {
        for (let j = 0; j < node.length; j++) {
            if (node[i][j] != goal[i][j]) {
                misplacedTiles++;
            }
        }
    }
    return misplacedTiles;
}

// Minimum Heuristic Value 
function minH() {
    var min = 9;
    for (let i = 0; i < frontier.length; i++) {
        var h = h_value(frontier[i]);
        if (h < min) {
            min = h;
        }
    }
    return min;
}

// Check Best
function checkBest() {
    var min = minH();
    frontierChoice = [];
    for (let x = 0; x < frontier.length; x++) {
        var node = frontier[x];
        var h = h_value(node);
        if (h === 0) {
            console.log("=======");
            print(node);
            console.log("=======");
            console.log("--> Goal State Reached !\n");
            return true;
        }
        else if (h == min) {
            frontierChoice.push([...node.map(nested => [...nested])]);
            explored.push([...node.map(nested => [...nested])]);
            console.log("-------");
            print(node);
            console.log("-------");
        }
    }
    return false;
}

// Verify Node
function verifyNode(node) {

    // explored
    for (let i = 0; i < explored.length; i++) {
        if (compareNodes(node, explored[i])) {
            return false;
        }
    };

    return true;
}

// Processing
function process() {
    var step = 1;
    while (true) {
        // for (let i = 0; i < 2; i++) {
        console.log("\nSTEP = " + step++);

        frontier.forEach(node => {
            print(node);
            console.log("");
        });


        if (frontier.length === 0) {
            console.log("==>Empty");
            break;
        }

        if (checkBest()) {
            break;
        }
        fillFrontier();
    }

}


////////////////////////////////////////////////


var goal = [[1, 2, 3], [4, 5, 6], [7, 8, "_"]],
    initialNode = generateRandom(),
    frontier = [],
    frontierChoice = [],
    explored = [];


explored.push([...initialNode.map(nested => [...nested])]);
frontier.push([...initialNode.map(nested => [...nested])]);
frontierChoice.push([...initialNode.map(nested => [...nested])]);

console.log("{{{{{{{");
print(initialNode);
console.log("}}}}}}}\n");

process();

