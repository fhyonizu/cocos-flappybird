import { _decorator, Component, Node } from 'cc';
import {GameManager} from "db://assets/scripts/GameManager";
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {

    @property
    private moveSpeed:number = 100;

    start() {
        this.moveSpeed = GameManager.inst().moveSpeed
    }

    update(deltaTime: number) {
        const p = this.node.position;
        this.node.setPosition(p.x- this.moveSpeed*deltaTime, p.y);

        if (p.x<-900){
            this.node.destroy();
        }
    }
}


