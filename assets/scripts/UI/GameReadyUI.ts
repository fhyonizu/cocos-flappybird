import { _decorator, Component, Node,input,Input } from 'cc';
import {GameManager} from "db://assets/scripts/GameManager";
const { ccclass, property } = _decorator;

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {
    protected onLoad(){
        input.on(Input.EventType.TOUCH_START,this.onTouchStart,this);
    }

    onDestroy (){
        input.off(Input.EventType.TOUCH_START,this.onTouchStart,this);
    }
    onTouchStart(){
        GameManager.inst().transitionToGamingState();
    }
}


