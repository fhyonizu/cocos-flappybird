import { _decorator, Component, instantiate, Node ,Prefab, math} from 'cc';
import {Pipe} from "db://assets/scripts/Pipe";
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab:Prefab = null;

    @property()
    spawnRate:number = 0.5;

    private _isSpawning:boolean = false;

    private timer:number = 0;

    update(deltaTime: number) {
        if(this._isSpawning==false)return;
        this.timer += deltaTime;
        if (this.timer > this.spawnRate) {
            this.timer = 0;
            const pipeInst = instantiate(this.pipePrefab);
            this.node.addChild(pipeInst);
            const p =this.node.getWorldPosition()
            pipeInst.setWorldPosition(p);
            const y = math.randomRangeInt(-100,200)
            const pLoca = pipeInst.getPosition();
            pipeInst.setPosition(pLoca.x,y);
        }
    }

    public  pause(){
        this._isSpawning=false;
        const nodeArray = this.node.children;
        for (let i = 0; i < nodeArray.length; i++) {
           const pipe = nodeArray[i].getComponent(Pipe);
           if(pipe){
               pipe.enabled=false;
           }
        }

    }
    public  start(){
        this._isSpawning=true;
    }
}


