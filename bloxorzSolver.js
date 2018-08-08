function moveLeft(positions){
  // block is standing up
  if ((positions.length === 1)){
  // return 2d array, with two items connoting positions 1 to the left of original place,
  // and 2 to the left of original place
    return [[positions[0][0], positions[0][1] - 2], [positions[0][0], positions[0][1] - 1]];
  }
  // block is placed horizontally on board
  if ((positions.length === 2) && (positions[0][0] === positions[1][0])){
    return [[positions[0][0], positions[0][1] -  1]]; 
  }
  // block is placed vertically on board
  if ((positions.length === 2) && (positions[0][1] === positions[1][1])){
    return [[positions[0][0], positions[0][1] - 1], [positions[1][0], positions[1][1] - 1]]; 
  }
}

function moveRight(positions){
  //block is standing up 
  if (positions.length === 1){
    return [[positions[0][0], positions[0][1] + 1], [positions[0][0], positions[0][1] + 2]]
  }
  //block is placed horizontally on board
  if ((positions.length === 2) &&(positions[0][0] === positions[1][0])){
    return [[positions[1][0], positions[1][1] + 1]]
  }
  // block is placed vertically on board
  if ((positions.length === 2) && (positions[0][1] === positions[1][1])){
    return [[positions[0][0], positions[0][1] + 1], [positions[1][0], positions[1][1] + 1]]
  }
}
function moveUp(positions){
  // block is standing up 
  if (positions.length === 1){
    return [[positions[0][0] - 2, positions[0][1]],[positions[0][0] - 1, positions[0][1]]]
  }
  // block is horizontal 
  if ((positions.length === 2)&& (positions[0][0] === positions[1][0])){
    return [[positions[0][0] - 1, positions[0][1]], [positions[1][0] - 1, positions[1][1]]]
  }
  // block is vertical
  if ((positions.length === 2)&&(positions[0][1] === positions[1][1])){
    return [[positions[0][0] - 1, positions[0][1]]]
  }
}
function moveDown(positions){
  // block is standing up
  if (positions.length === 1){
    return [[positions[0][0] + 1, positions[0][1]],[positions[0][0] + 2, positions[0][1]]]
  }
  // block is horizontal 
  if ((positions.length === 2) && (positions[0][0] === positions[1][0])){
    return [[positions[0][0] + 1, positions[0][1]], [positions[1][0] + 1, positions[1][1]]]
  }
  // block is vertical
  if ((positions.length === 2) && (positions[0][1] === positions[1][1])){
    return [[positions[1][0] + 1, positions[1][1]]]
  }
}


function serialize(positions){
  if (positions.length === 1){
    return `${positions[0][0]} ${positions[0][1]}`
  }
  if (positions.length === 2){
    return `${positions[0][0]}_${positions[0][1]}__${positions[1][0]}_${positions[1][1]}`
  }
}

function checkPositions(arr, positionsIndex){
    if (positionsIndex[0] < 0){
        return false; 
    } 
    if (positionsIndex[0] >= arr.length){
        return false; 
    }
    if (positionsIndex[1] >= arr[0].length){
        return false; 
    }
    if (positionsIndex[1] < 0){
        return false;
    }
    return true; 
}

function inHole(arr, positions){
    if (positions.length === 1){
        if (arr[positions[0][0]][positions[0][1]] === 'X'){
            return true; 
        }
    }
    return false; 
}

function checkValidPosition(arr, position){
    if ((position[0] < 0) || (position[0] >= arr.length)){
        return false; 
    }
    if ((position[1] < 0) || (position[1] >= arr[0].length)){
        return false; 
    }
    if (arr[position[0]][position[1]] === '0'){
        return false; 
    }
    return true; 
}

function isValid(checker, arr, positions){
    if(checker[serialize(positions)]){
        return false; 
    }
    for (let i = 0; i < positions.length; i++){
        if (!checkValidPosition(arr, positions[i])){
            return false 
        }
    }
    return true
}

function bloxSolver(arr){
   let prevPositions = {}
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            if (arr[i][j] === 'B'){
                let queue = []; 
                let firstItem = ['', [[i, j]]];
                queue.push(firstItem); 
                while(queue.length){
                    let dequeued = queue.shift(); 
                    if (inHole(arr, dequeued[1])){
                        return dequeued[0]; 
                    }
                    prevPositions[serialize(dequeued[1])] = true; 
                    let leftMove = moveLeft(dequeued[1]); 
                    let leftStr = dequeued[0] + 'L';
                    let upMove = moveUp(dequeued[1]);
                    let upStr = dequeued[0] + 'U'; 
                    let rightMove = moveRight(dequeued[1]);
                    let rightStr = dequeued[0] + 'R'; 
                    let downMove = moveDown(dequeued[1]); 
                    let downStr = dequeued[0] + 'D'
                    if (isValid(prevPositions, arr, leftMove)){
                        queue.push([leftStr, leftMove]);
                    }
                    if (isValid(prevPositions, arr, upMove)){
                        queue.push([upStr, upMove]); 
                    }
                    if (isValid(prevPositions, arr, rightMove)){
                        queue.push([rightStr, rightMove]); 
                    }
                    if (isValid(prevPositions, arr, downMove)){
                        queue.push([downStr, downMove]);
                    }
                }
            }
        }
    }
}