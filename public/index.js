{
    const calculate = (num1, action, num2) => {
        let res = 0;
        switch(action){
            case "+":
                res = num1+num2;
                break;
            case "-":
                res = num1-num2;
                break;
            case "*":
                res = num1*num2;
                break;
            case "/":
                res = num1/num2;
                break;
            case "^":
                res = num1**num2;
                break;
            case "sin":
                res = Math.sin(num2);
                break;
            case "cos":
                res = Math.cos(num2);
                break;
            case "tan":
                res = Math.tan(num2);
                break;
            case "tg":
                res = Math.tan(num2);
                break;
            case "cot":
                res = 1/(Math.tan(num2));
                break;
        }

        return res;
    }

    const calculationPriority = (arr, action) => {
        if (action === "(") {
            while (arr.indexOf("(") !== -1){
                let openPran = arr.indexOf("(");
                let closePran = arr.indexOf(")");
                let checking = closePran - openPran;
                if (checking === 4){
                    let calcInsidePran = calculate(arr[openPran+1],arr[openPran+2],arr[openPran+3]);
                    arr = [...arr.slice(0,openPran), calcInsidePran , ...arr.slice(closePran+1)]
                }else if (checking < 4){
                    arr = [...arr.slice(0,openPran), arr[openPran+1] , ...arr.slice(closePran+1)]
                }else{
                    console.error('more than length=4');
                    break;
                }
            }

        }else if (action ==='trigonometry'){
            let condition = arr.indexOf("sin") !== -1 || arr.indexOf("cos") !== -1 ||
                            arr.indexOf("tan") !== -1 || arr.indexOf("tg") !== -1 ||
                            arr.indexOf("cot") !== -1;

            while (condition){
                if (arr.includes("sin")){
                    let sinIndex = arr.indexOf("sin");
                    let calculateSin = calculate("","sin",arr[sinIndex+1]);
                    arr = [...arr.slice(0,sinIndex), calculateSin, ...arr.slice(sinIndex+2)]
                }
                if (arr.includes("cos")){
                    let cosIndex = arr.indexOf("cos");
                    let calculateCos = calculate("","cos",arr[cosIndex+1]);
                    arr = [...arr.slice(0,cosIndex), calculateCos, ...arr.slice(cosIndex+2)]
                }
                if (arr.includes("tan") || arr.includes("tg")){
                    let tanIndex = arr.indexOf("tan");
                    let calculateTan = calculate("","tan",arr[tanIndex+1]);
                    arr = [...arr.slice(0,tanIndex), calculateTan, ...arr.slice(tanIndex+2)]
                }
                if (arr.includes("cot")){
                    let cotIndex = arr.indexOf("cot");
                    let calculateCot = calculate("","cot",arr[cotIndex+1]);
                    arr = [...arr.slice(0,cotIndex), calculateCot, ...arr.slice(cotIndex+2)]
                }

                condition = arr.indexOf("sin") !== -1 || arr.indexOf("cos") !== -1 ||
                            arr.indexOf("tan") !== -1 || arr.indexOf("tg") !== -1 ||
                            arr.indexOf("cot") !== -1;

            }

        }else if (action === "^"){
            while (arr.indexOf("^") !== -1){
                let powerBase = arr.indexOf("^")-1;
                let power = arr.indexOf("^")+1;
                let calculatePower = calculate(arr[powerBase],"^",arr[power]);
                arr = [...arr.slice(0,powerBase), calculatePower, ...arr.slice(power+1)]
            }

        }else if (action === "*/" || action === "/*"){
            let arrLength = arr.length;
            while (arr.indexOf("*")!== -1 || arr.indexOf("/")!== -1){
                let priorityFromLeftMultiply = arr.indexOf("*");
                let priorityFromLeftDivide = arr.indexOf("/");
                let selectAction;
                
                if (priorityFromLeftMultiply<0){
                    selectAction = '/';
                }else if(priorityFromLeftDivide <0){
                    selectAction = '*';
                }else if (priorityFromLeftMultiply < priorityFromLeftDivide){
                    selectAction = "*";
                }else{
                    selectAction = "/";
                }
                let firstNum = arr.indexOf(selectAction)-1;
                let secondNum = arr.indexOf(selectAction)+1;
                

                let calculation = calculate(arr[firstNum],selectAction,arr[secondNum]);
                
                arr = [...arr.slice(0,firstNum), calculation, ...arr.slice(secondNum+1)];
            
                if (arr.length > arrLength){
                    console.log('error')
                    break;
                }

            }

        }else if (action === "+-" || action === "-+"){
            let arrLength = arr.length;
            let trying = 0;

            while (arr.indexOf("+")!== -1 || arr.indexOf("-")!== -1){
                let priorityFromLeftPlus = arr.indexOf("+");
                let priorityFromLeftMinus = arr.indexOf("-");
                let selectAction;
                
                if (priorityFromLeftPlus<0){
                    selectAction = '-';
                }else if(priorityFromLeftMinus <0){
                    selectAction = '+';
                }else if (priorityFromLeftPlus < priorityFromLeftMinus){
                    selectAction = "+";
                }else{
                    selectAction = "-";
                }


                let firstNum = arr.indexOf(selectAction)-1;
                let secondNum = arr.indexOf(selectAction)+1;
                let calculation;
                

                if (arr.indexOf(selectAction)!==0){
                    if (arr[firstNum] !== "("){
                        calculation = calculate(arr[firstNum],selectAction,arr[secondNum]);
                        arr = [...arr.slice(0,firstNum), calculation, ...arr.slice(secondNum+1)];
                    }else{
                        calculation = calculate(0,selectAction,arr[secondNum]);
                        arr = [...arr.slice(0,firstNum), calculation, ...arr.slice(secondNum+1)];
                    }
                }else{
                    calculation = calculate(0,selectAction,arr[secondNum]);
                    arr = [calculation, ...arr.slice(secondNum+1)];
                }
                trying++

                if (arr.length > arrLength || trying>1000){
                    console.log('error')
                    break;
                }

            }
        }
        
        return arr;
    }

    const trigonometry = (arr) => {
        let sinIndex = arr.indexOf("s");
        let cosOrCotIndex = arr.indexOf("c");
        let tanIndex = arr.indexOf('t');
        while (sinIndex !==-1 || cosOrCotIndex !== -1 || tanIndex !==-1){
                
            if (sinIndex !== -1 && arr[sinIndex+1]==='i' && arr[sinIndex+2]==='n'){
                arr = [...arr.slice(0,sinIndex), "sin", ...arr.slice(sinIndex+3)]
                sinIndex = arr.indexOf("s");
                cosOrCotIndex = arr.indexOf("c");
                tanIndex = arr.indexOf('t');
            }
            if (tanIndex !== -1 && arr[tanIndex +1]==='a' && arr[tanIndex+2]==='n'){
                arr = [...arr.slice(0,tanIndex), "tan", ...arr.slice(tanIndex+3)]
                sinIndex = arr.indexOf("s");
                cosOrCotIndex = arr.indexOf("c");
                tanIndex = arr.indexOf('t');
            } 
    
            if (tanIndex !== -1 && arr[tanIndex +1]==='g'){
                arr = [...arr.slice(0,tanIndex), "tan", ...arr.slice(tanIndex+2)]
                sinIndex = arr.indexOf("s");
                cosOrCotIndex = arr.indexOf("c");
                tanIndex = arr.indexOf('t');
            }
    
            if (cosOrCotIndex !==-1 && arr[cosOrCotIndex+1]==='o' && arr[cosOrCotIndex+2]==='s'){
                arr = [...arr.slice(0,cosOrCotIndex), "cos", ...arr.slice(cosOrCotIndex+3)]
                sinIndex = arr.indexOf("s");
                cosOrCotIndex = arr.indexOf("c");
                tanIndex = arr.indexOf('t');
            }
    
            if (cosOrCotIndex !==-1 && arr[cosOrCotIndex+1]==='o' && arr[cosOrCotIndex+2]==='t'){
                arr = [...arr.slice(0,cosOrCotIndex), "cot", ...arr.slice(cosOrCotIndex+3)]
                sinIndex = arr.indexOf("s");
                cosOrCotIndex = arr.indexOf("c");
                tanIndex = arr.indexOf('t');
            }
        }
        

        return arr;
    }

    const eqSplit = (inp) => {
        let equation = document.getElementById('eq');
        let eqArr = equation.value.split("");
        let result = [];

        while (eqArr.length>0){
            s = "";
            j = 0;
            if (!isNaN(Number(eqArr[j]))){
                while ( !isNaN(Number(eqArr[j]) ) ){
                    s += eqArr[j];
                    j++
                }
            }else{
                s = eqArr[j];
                j++
            }
            result.push(s);
            eqArr = eqArr.slice(j);
        }
        
        result = result.map( (elm) => {
            if (elm === "x" || elm === "X"){
                return inp;
            }else if( !isNaN(Number(elm)) ){
                return Number(elm);
            }else{
                return elm
            }
        })

        result = trigonometry(result);
        return result;
    }

    const eq = (inp) => {
        let arr = eqSplit(inp);

        let result =[];
        let index = 0;
        for (i=0; i<arr.length; i++){

            if (!isNaN(Number(arr[i])) && (!isNaN(Number(arr[i+1])) || arr[i+1] === "(" || arr[i+1] === "sin" || arr[i+1] === "cos" || arr[i+1] === "tan" || arr[i+1] === "tg" || arr[i+1] === "cot" )){
                result[index] = arr[i];
                result[index+1] = '*';
                result[index+2] = arr[i+1];
                index = index+3;
                i++
            }else{
                result[index] = arr[i];
                index++
            }
        }

        arr = result;
        let trying = 0;
        while (arr.indexOf('(') !== -1){
            let firstOpenPran = arr.indexOf('(');
            let firstClosePran = arr.indexOf(')');
            let result =[];
            let indexFound;
            for (i=firstOpenPran+1;i<firstClosePran; i++){
                if (arr[i] === "("){
                    indexFound = i;
                    result = arr.slice(i,firstClosePran+1);
                }
                
            }
            if (result.length === 0) {
                result = arr;
            }

            if (result.length === arr.length){
                result = result.slice(firstOpenPran+1,firstClosePran);

                result = calculationPriority(result,"trigonometry");
                result = calculationPriority(result,"^");
                result = calculationPriority(result,"*/");
                result = calculationPriority(result,"+-");

                arr = [...arr.slice(0,firstOpenPran), result[0], ...arr.slice(firstClosePran+1)];

                break;
            }else{

                result = calculationPriority(result,"trigonometry");
                result = calculationPriority(result,"^");
                result = calculationPriority(result,"*/");
                result = calculationPriority(result,"+-");

                result = calculationPriority(result,"(");

                result = calculationPriority(result,"trigonometry");
                result = calculationPriority(result,"^");
                result = calculationPriority(result,"*/");
                result = calculationPriority(result,"+-");

                arr = [...arr.slice(0,indexFound), result[0], ...arr.slice(firstClosePran+1)]

                trying++
                if (trying>100){
                    console.log('error');
                    break;
                }
            }
            
        }
        arr = calculationPriority(arr,"(");

        arr = calculationPriority(arr,"trigonometry");
        arr = calculationPriority(arr,"^");
        arr = calculationPriority(arr,"*/");
        arr = calculationPriority(arr,"+-");

        return arr[0];

    }

    const outputEq = (color,eq) => {
        let h2 = document.createElement('h2');
        
        h2.innerText = "- " + eq;
        h2.style.color = color;
        let legend = document.getElementById('legend')
        legend.style.display = 'block';
        legend.appendChild(h2); 
    }

    
    const drawWithoutTime = (start,end,color,scaleX,scaleY,step,structure,scaleValueX,scaleValueY) => {
        let endBoundry = start;
        let xScale;
        let yScale1;
        let yScale2;
        let resultX = [];
        let resultY1 = [];
        let resultY2 = [];
        
        while (endBoundry <= end){
            if (scaleX === 'without') {
                xScale = endBoundry;
            }else{
                xScale = scaleValueX*endBoundry;
            }
            if (scaleY === 'without'){
                yScale1 = (225 - eq(endBoundry-0.01));
                yScale2 = (225 - eq(endBoundry+0.01));
            }else{
                yScale1 =  (225 - scaleValueY*eq(endBoundry-0.01));
                yScale2 =  (225 - scaleValueY*eq(endBoundry+0.01))
            }
            resultX.push(xScale);
            resultY1.push(yScale1);
            resultY2.push(yScale2);
            endBoundry = endBoundry + step;

        }
        for (i=0; i<resultX.length; i++){
            ctx.beginPath();

            if (structure === 'line') {
                ctx.moveTo(225 + resultX[i] -0.01,resultY1[i]);
                ctx.lineTo(225 + resultX[i] +0.01,resultY2[i]);
            }else{
                ctx.arc(225 + resultX[i] -0.01,resultY1[i], 1, 0, 2 * Math.PI);
            }
            ctx.strokeStyle = color;
            ctx.stroke();
        }
           
    }


    const draw = (start,end,color,scaleX,scaleY,step,structure,scaleValueX,scaleValueY,speed) => {
        let endBoundry = start;
        let xScale;

        let yScale1;
        let yScale2;

        let workingAlarm = document.getElementById('drawing');
        workingAlarm.style.display = 'block';

        const lineDrawing = () => {
            

            if (endBoundry > end){
                clearInterval(y);
                workingAlarm.style.display = 'none';
            }else{
                ctx.beginPath();
                
                if (scaleX === 'without') {
                    xScale = endBoundry;
                }else{
                    xScale = scaleValueX*endBoundry;
                }
                if (scaleY === 'without'){
                    yScale1 = (225 - eq(endBoundry-0.01));
                    yScale2 = (225 - eq(endBoundry+0.01));
                }else{
                    yScale1 =  (225 - scaleValueY*eq(endBoundry-0.01));
                    yScale2 =  (225 - scaleValueY*eq(endBoundry+0.01))
                }
                if (structure === 'line') {
                    ctx.moveTo(225 + xScale -0.01,yScale1);
                    ctx.lineTo(225 + xScale +0.01,yScale2);
                }else{
                    ctx.arc(225 + xScale -0.01,yScale1, 1, 0, 2 * Math.PI);
                }
                endBoundry = endBoundry + step;


                ctx.strokeStyle = color;
                ctx.stroke();

            }
        }
        let y = setInterval(lineDrawing, speed);
    }

    const inputValue = (tag,str) => {
        let inp = document.getElementById(tag);
        let val = inp.value;
        if (val === "" && str === 'start') {
            val = -50;
        }else if (val === "" && str === 'end'){
            val = 50;
        }
        val = Number(val);
        return val;
    }

    const inputColor = () => {
        let select = document.getElementById('color');
        return select.value;
    }

    let c = document.getElementById('canvas');
    let container = document.getElementById('container');
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;
    let size = Math.min(parseInt(containerWidth)-100,parseInt(containerHeight)-100);    
    [c.style.width, c.style.height] = [size+'px',size+'px'] 
    let ctx = c.getContext("2d");
    window.addEventListener('resize', () => {
        containerWidth = container.clientWidth;
        containerHeight = container.clientHeight;
        size = Math.min(parseInt(containerWidth)-100,parseInt(containerHeight)-100);    
        [c.style.width, c.style.height] = [size+'px',size+'px'] 
    })

    const canvasMaker = () => {
        
        
        for(i=0; i<480; i=i+25){
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,450);
            if (i === 225){
                ctx.strokeStyle = "coral";
            }else{
                ctx.strokeStyle = "#ddd";
            }
            
            ctx.stroke();
        
            ctx.beginPath();
            ctx.moveTo(0,i);
            ctx.lineTo(450,i);
            if (i === 225){
                ctx.strokeStyle = "coral";
            }else{
                ctx.strokeStyle = "#ddd";
            }
            ctx.stroke();
        }
        
    }
    canvasMaker();
    
    
    
    const givingScale = (scaleDirection) => {
        let scaleTag = document.getElementById(scaleDirection);
        scaleTag.addEventListener('change',() => {
            let inpNew = document.getElementById(`${scaleDirection}Value`);
            if (scaleTag.value === 'with'){
                inpNew.readOnly = false;
                inpNew.style.backgroundColor='white';
                
            }else{
                inpNew.readOnly = true;
                inpNew.style.backgroundColor='gray';
                
            }
        })
    }
    givingScale('scaleX');
    givingScale('scaleY');

    document.getElementById('button').addEventListener('click', () => {
        let equation = document.getElementById('eq');
        let scaleOrNotX = document.getElementById('scaleX');
        
        let scaleOrNotY = document.getElementById('scaleY');
        let step = document.getElementById('step');
        let lineOrPoints = document.getElementById('line-points');
        let scaleXValue = document.getElementById('scaleXValue');
        let scaleYValue = document.getElementById('scaleYValue');
        
        let scaleValueX = Number(scaleXValue.value) || 10;
        let scaleValueY = Number(scaleYValue.value) || 50;

        let scaleX = scaleOrNotX.value;
        let scaleY = scaleOrNotY.value;
        let stepX = Number(step.value) || 0.01;
        let line_points = lineOrPoints.value;

        let x0 = inputValue('x0','start');
        let x1 = inputValue('x1','end');
        

        let color = inputColor();
        
        outputEq(color,equation.value);
        
        let speedTag = document.getElementById('range');
        let speed = Number(speedTag.value);
        if ( speed === 0 ) {
            drawWithoutTime(x0,x1,color,scaleX,scaleY,stepX,line_points,scaleValueX,scaleValueY);
        }else{
            speed = (4-1000)/(10-0.1)*(speed-10)+ 4
            draw(x0,x1,color,scaleX,scaleY,stepX,line_points,scaleValueX,scaleValueY,speed);
        }
        
        
    })


}