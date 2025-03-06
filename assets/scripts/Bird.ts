import { _decorator, Component, Node ,AudioClip, input, Input , RigidBody2D, Vec2 ,Vec3,Contact2DType,Collider2D,IPhysics2DContact,Animation} from 'cc';
import {Tags} from "db://assets/scripts/Tags";
import {GameManager} from "db://assets/scripts/GameManager";
import {AudioMgr} from "db://assets/scripts/AudioMgr";
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    private rgd2D:RigidBody2D = null;
    @property
    rotateSpeed = 30;
    @property(AudioClip)
    clickAudio:AudioClip=null;

    private _canControl = false;

    onLoad (){
        input.on(Input.EventType.TOUCH_START,this.onTouchStart,this);
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    onDestroy (){
        input.off(Input.EventType.TOUCH_START,this.onTouchStart,this);
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onTouchStart(){
        if(this._canControl==false)return;
        this.rgd2D.linearVelocity = new Vec2(0,10);
        // this.node.setRotationFromEuler(new Vec3(0,0,30));
        this.node.angle = 30;
        AudioMgr.inst.playOneShot(this.clickAudio);
    }
    protected update(dt):void{
        if(this._canControl==false)return;
        this.node.angle -= this.rotateSpeed*dt;
        if (this.node.angle<-60){
            this.node.angle = -60;
        }

    }

    public enabledControl(){
        this.getComponent(Animation).enabled = true;
        this.rgd2D.enabled = true;
        this._canControl=true;
    }
    public disableControl(){
        this.getComponent(Animation).enabled = false;
        this.rgd2D.enabled =false;
        this._canControl=false;
    }
    public disableControlNotRGD(){
        this.getComponent(Animation).enabled = false;
        this._canControl=false;
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        console.log(otherCollider.tag);
        if(otherCollider.tag ==Tags.LAND|| otherCollider.tag == Tags.PIPE){
            GameManager.inst().transitionToGameOverState();
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.tag == Tags.PIPE_MIDDLE){
            GameManager.inst().addScore();
        }
    }
}


