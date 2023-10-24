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
            ["_", 2, 3],
            [4, 5, 6],
            [7, 8, 1]
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
    // console.log("Frontier Filled");
    explored.push([...initialNode.map(nested => [...nested])]);
    frontier = [];
    frontierChoice.forEach(node => {
        var v1 = moveUp([...node.map(nested => [...nested])]);
        var v2 = moveDown([...node.map(nested => [...nested])]);
        var v3 = moveRight([...node.map(nested => [...nested])]);
        var v4 = moveLeft([...node.map(nested => [...nested])]);

        if (JSON.stringify(v1) != JSON.stringify(node)) {
            frontier.push(v1);
        }
        if (JSON.stringify(v2) != JSON.stringify(node)) {
            frontier.push(v2);
        }
        if (JSON.stringify(v3) != JSON.stringify(node)) {
            frontier.push(v3);
        }
        if (JSON.stringify(v4) != JSON.stringify(node)) {
            frontier.push(v4);
        }
    });
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
    var min = 10;
    frontier.forEach(node => {
        var h = h_value(node);
        if (h < min) {
            min = h;
        }
    });
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
        else if (h === min) {
            frontierChoice.push([...node.map(nested => [...nested])]);
            explored.push([...node.map(nested => [...nested])]);
            console.log("-------");
            print(node);
            console.log("-------");
        }
    }
    return false;
}

// Remove Explored
function removeExplored() {
    // console.log("Started Removing Explored");
    for (let x = 0; x < frontier.length; x++) {
        for (let y = 0; y < explored.length; y++) {
            if (JSON.stringify(frontier[x]) === JSON.stringify(explored[y])) {
                frontier.splice(x, 1);
            }
        };
    };
    // console.log("Endeded Removing Explored");
    if (frontier.length === 0) {
        console.log("Empty");
        return true;
    }
}

// Processing
function process() {
    var step = 1;
    while (true) {
        // for (let i = 0; i < 2; i++) {
        console.log("\nSTEP = " + step++);
        fillFrontier();
        frontier.forEach(node => {
            print(node);
            console.log("");
        });
        if (removeExplored()) {
            break;
        }

        if (checkBest()) {
            break;
        }
    }

}


////////////////////////////////////////////////


var goal = [[1, 2, 3], [4, 5, 6], [7, 8, "_"]],
    initialNode = generateRandom(),
    frontier = [],
    frontierChoice = [],
    explored = [];


explored.push([...initialNode.map(nested => [...nested])]);
frontierChoice.push([...initialNode.map(nested => [...nested])]);

console.log("{{{{{{{");
print(initialNode);
console.log("}}}}}}}\n");

process();

