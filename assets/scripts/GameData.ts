import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export class GameData  {
    private static readonly BESTSCORE:string = "BestScore";
    private static _score = 0;
    public static addScore(count :number=1) {
        this._score += count;

    }
    public static RemoveScore(){
        this._score = 0;
    }
    public static getScore() {
        return this._score;
    }
    public static getBestScore(){
        let score =localStorage.getItem(this.BESTSCORE);
        if(score){
            return parseInt(score);
        }else {
            return 0;
        }
    }
    public static saveScore(){
        let  currentScore = this.getScore();
        let bestScore = this.getBestScore();
        if(currentScore > bestScore){
            localStorage.setItem(this.BESTSCORE,currentScore.toString());
        }
    }
}


