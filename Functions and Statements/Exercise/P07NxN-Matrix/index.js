function nxnMatrixPrint(n){
    let gfg = [];
let row = n;
let col = n;


// Loop to initialize 2D array elements.
for (let i = 0; i < row; i++) {
	gfg[i] = [];
	for (let j = 0; j < col; j++) {
		gfg[i][j] = n;
	}
}

for (let i = 0; i < gfg.length; i++) {
    console.log(...gfg[i]);
    
}

}
nxnMatrixPrint(4);