class Reloj {
    constructor(h, m, s) {
      this.h = h;
      this.m = m;
      this.s = s;
      this.v = 1000;
      this.p = false;
    }
  
    hora() {
      setInterval(() => {
        if (!this.p) {
          if (this.s < 59) {
            this.s += 1;
          } else if (this.m < 59) {
            this.s = 0;
            this.m += 1;
          } else if (this.h < 23) {
            this.s = 0;
            this.m = 0;
            this.h += 1;
          } else {
            this.h = 0;
            this.m = 0;
            this.s = 0;
          }
        }
        //console.log(this.h, this.m, this.s);
      }, this.v);
    }

    formato_hora(){
        let hora = '';
        if(this.h < 10){
            hora+="0"+this.h.toString()+":";
        }
        else{
            hora+=this.h.toString()+":";
        }
        if(this.m < 10){
          hora+="0"+this.m.toString()+":";
        }
        else{
            hora+=this.m.toString()+":";
        }
        if(this.s < 10){
            hora+="0"+this.s.toString();
        }
        else{
          hora+=this.s.toString();
        }
        return hora
    }

    parar(){
      this.p = true;
    }
  
    continuar(){
      this.p = false;
    }
    
    set setH(h) {
      this.h = h;
    }
  
    set setM(m) {
      this.m = m;
    }
  
    set setS(s) {
      this.s = s;
    }

    set setV(v) {
      this.v = v;
    }
  
    get getH() {
      return this.h;
    }
  
    get getM() {
      return this.m;
    }
  
    get getS() {
      return this.s;
    }
  
    get getV() {
      return this.v;
    }
};