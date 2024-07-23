//----------------------------class definition-------------------------------------------------
class Box {
    constructor(buttons,states){
        //state -- array of playeur
        //button --array of button
        this.buttons = buttons;
        this.states = states; //0 = empty, 1 = playeur one and 2 = playeur2
    }

    selected(id,state){
        this.states[id] = state;
        this.buttons[id].disabled = true; // desactiver le bouton
        if(state == 1){
            this.buttons[id].style.backgroundColor='red';
        }
        else{
            this.buttons[id].style.backgroundColor='blue';
        }
    }
    propagerTop(id,direction,stop){
        let top = 0;
        if(this.states[id]!=0 && this.states[id] == this.states[id + direction]){

            top =1;
        }
        return top;
    }
    propagerDown(id,direction,stop){
        let down = 0;
        if(this.states[id]!=0 && this.states[id] == this.states[id - direction]){
            down = 1;
        }
        return down;
    }
    propager(id, direction,stop){
        let top = 0
        let down = 0
        top = this.propagerTop(id,direction,stop);
        down = this.propagerDown(id,direction,stop);
        return (top + down + 1);
    }
}

class Playeur {
    constructor(id,name){
        this.id = id;
        this.name = name;
    }
}

class Game {
    checkGame(idState,idPlayeur,box){
        //vertical
        let vertical3 = box.propager(3,3);
        let vertical4 = box.propager(4,3);
        let vertical5 = box.propager(5,3);
        let vertical = vertical3*vertical4*vertical5;
        //horizontal
        let horizontal1 = box.propager(1,1);
        let horizontal4 = box.propager(4,1);
        let horizontal7 = box.propager(7,1);
        let horizontal = horizontal1*horizontal4*horizontal7;
        //diagonale droite
        let diagonaleDroite = box.propager(4,4);
        //diagonale gauche
        let diagonaleGauche  = box.propager(4,2);
        
        let mult = vertical * horizontal*diagonaleDroite*diagonaleGauche;
        if(mult %3 == 0){
            alert("Joueur"+idPlayeur+" a gagner");
        }
    }
}

//----------------------------------------------------------------------- function main---------------------------------------------------------------------------------------------------------------------
var arrayButton = [];
var arrayState = [0,0,0,0,0,0,0,0,0];
var playeur1 = new Playeur(1,"Bot1");
var playeur2 = new Playeur(2,"Bot2");
var playeurs  = [playeur1,playeur2];
var actualPlayeur = 0
var box = new Box(arrayButton,arrayState);
var game = new Game();
function main(){
    let size = 9;
    for(let i=0; i<size;i++){
        let button = document.getElementById("button"+i);
        button.onclick = function(evt){
            box.selected(i,playeurs[actualPlayeur].id);
            game.checkGame(i,playeurs[actualPlayeur].name,box);
            actualPlayeur = (actualPlayeur +1 ) %2;
        }
        arrayButton.push(button);
    }

}
window.onload = main;