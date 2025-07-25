import { _decorator, Component, Node,Label, director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    curScoreLabel:Label = null;

    @property(Label)
    bestScoreLabel:Label = null;

    @property(Node)
    newSprite:Node = null;

    @property([Node])
    medalArray:Node[] = [];

    public show(curScore:number,bestScore:number){
        this.node.active=true;
        this.curScoreLabel.string =curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();
        if (curScore>bestScore){
            this.newSprite.active=true;
        }else {
            this.newSprite.active=false;
        }
        const index = curScore/10;
        let indexInt = Math.floor(index);
        if(indexInt >3){
            indexInt =3;
        }
        this.medalArray[indexInt].active = true;
    }
    public hide(){
        this.node.active=false;
    }
    onPlayButtonClick(){
        director.loadScene(director.getScene().name);
    }
}


