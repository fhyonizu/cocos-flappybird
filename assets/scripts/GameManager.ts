import { _decorator, Component, Node ,Label,AudioClip} from 'cc';
import {Bird} from "db://assets/scripts/Bird";
import {MoveBg} from "db://assets/scripts/MoveBg";
import {PipeSpawner} from "db://assets/scripts/PipeSpawner";
import {GameReadyUI} from "db://assets/scripts/UI/GameReadyUI";
import {GameData} from "db://assets/scripts/GameData";
import {GameOverUI} from "db://assets/scripts/UI/GameOverUI";
import {AudioMgr} from "db://assets/scripts/AudioMgr";
const { ccclass, property } = _decorator;

    enum GameState {
        Ready,
        Gaming,
        GameOver,

    }
@ccclass('GameManager')

export class GameManager extends Component {

    private static _inst:GameManager = null;
    public static inst(){
        return this._inst;
    }
    @property
    moveSpeed:number = 100;

    @property(Bird)
    bird : Bird = null

    @property(MoveBg)
    bgMoving:MoveBg = null;
    @property(MoveBg)
    landMoving:MoveBg = null;

    @property(PipeSpawner)
    pipeSpawner: PipeSpawner = null;
    @property(GameReadyUI)
    gameReadyUI: GameReadyUI = null;
    @property(Node)
    gamingUI:Node = null;

    @property(GameOverUI)
    gameOverUI:GameOverUI = null;


    @property(Label)
    scoreLabel:Label = null;
    @property(AudioClip)
    bgAudio :AudioClip =null;
    @property(AudioClip)
    gameOverAudio :AudioClip =null;

    curGS:GameState = GameState.Ready;

    onLoad() {
        GameManager._inst = this;
    }
    protected start():void{
        this.transitionToReadyState();
        AudioMgr.inst.play(this.bgAudio);
}

    transitionToReadyState(){
        this.curGS = GameState.Ready;
        this.bird.disableControl();
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause();
        this.gamingUI.active=false;
        this.gameOverUI.node.active = false;
        this.gameReadyUI.node.active = true;
    }
    transitionToGamingState(){
        this.curGS = GameState.Gaming;

        this.bird.enabledControl();
        this.bgMoving.enabledMoving();
        this.landMoving.enabledMoving();
        this.pipeSpawner.start();
        this.gameReadyUI.node.active = false;
        this.gamingUI.active=true;

    }
    transitionToGameOverState(){
        if (this.curGS == GameState.GameOver)return;
        this.curGS = GameState.GameOver;
        this.bird.disableControlNotRGD();
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause();
        this.gamingUI.active=false;
        this.gameOverUI.show(GameData.getScore(),GameData.getBestScore());

        GameData.saveScore();
        AudioMgr.inst.stop();
        AudioMgr.inst.playOneShot(this.gameOverAudio);
        GameData.RemoveScore();
    }
    addScore(count:number=1) {
        GameData.addScore();
        this.scoreLabel.string = GameData.getScore().toString();
    }
}


