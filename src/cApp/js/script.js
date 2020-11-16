class CalculatorObject {
    constructor() {
        this.mainScreen = "";
        this.subScreen = "";
        this.mainValue = [0];
        this.resultValue = [0];
        this.LaTeX = [];
        this.resultLaTeX = [];
    }
    getMainScreen() {
        this.mainScreen = "";
        for(var n=0;n<this.mainValue.length;n++) {
            this.mainScreen += new Intl.NumberFormat("en-EN").format(this.mainValue[n]);
            if(this.LaTeX[n]) {
                this.mainScreen += this.LaTeX[n];
            }
        }
        return this.mainScreen;
    }
    getSubScreen() {
        this.subScreen = "";
        for(var n=0;n<this.resultValue.length;n++) {
            this.subScreen += new Intl.NumberFormat("en-EN").format(this.resultValue[n]);
            if(this.resultLaTeX[n]) {
                this.subScreen += this.resultLaTeX[n];
            }
        }
        return this.subScreen;
    }
    renderScreen() {
        document.getElementById("cal_monitor-main").innerHTML = this.getMainScreen();
        document.getElementById("cal_monitor-sub").innerHTML = this.getSubScreen();
    }

    addNum(num) {
        if(!this.mainValue[this.LaTeX.length]) {
            this.mainValue[this.LaTeX.length] = 0;
        }
        this.mainValue[this.LaTeX.length] = Number(String(this.mainValue[this.LaTeX.length]) + num);
        this.renderScreen();
    }
    markNum(LaTeX) {
        this.LaTeX[this.mainValue.length - 1] = LaTeX
        console.log(this.mainValue);
        console.log(this.LaTeX);
        this.renderScreen();
    }
    processNum() {
        var result = 0;
        for(var n=0;n<this.mainValue.length;n++) {
            if(n==0) {
                result = Number(this.mainValue[n]);
            }
            switch (this.LaTeX[n - 1]) {
                case "+":
                    console.log(result+"+"+Number(this.mainValue[n]));
                    result = result + Number(this.mainValue[n]);
                    console.log(result);
                    break;
                case "-":
                    console.log(result+"-"+Number(this.mainValue[n]));
                    result = result - Number(this.mainValue[n]);
                    console.log(result);
                    break;
                case "*":
                    console.log(result+"*"+Number(this.mainValue[n]));
                    result = result * Number(this.mainValue[n]);
                    console.log(result);
                    break;
                case "/":
                    console.log(result+"/"+Number(this.mainValue[n]));
                    result = result / Number(this.mainValue[n]);
                    console.log(result);
                    break;
                default:
                    break;
            }
        }
        this.resultValue = this.mainValue;
        this.resultLaTeX = this.LaTeX;

        this.resultValue.push(result);
        this.resultLaTeX.push("=");

        this.mainValue = [];
        this.mainValue = [result];
        this.LaTeX = [];
        this.renderScreen();
    }
}

var cal_monitor = new CalculatorObject;

cal_monitor.renderScreen()