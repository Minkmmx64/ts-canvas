const l={div:(i,t)=>({x:i.x-t.x,y:i.y-t.y}),add:(i,t)=>({x:i.x+t.x,y:i.y+t.y})};class m{constructor(t,s,e){if(!t)throw new TypeError("canvas is not exist");this.canvas=t,this.boundary=s,this.canvasSystem=e,this.initEvenListener()}toCanvasScreenPoint(t){return l.div(t,this.boundary)}initEvenListener(){const t=this.eventMouseDown.bind(this),s=this.eventMouseUp.bind(this),e=this.eventMouseMove.bind(this),n=this.eventWheel.bind(this);this.canvas.addEventListener("mousedown",a=>{t(a),this.canvas.addEventListener("mousemove",e)}),this.canvas.addEventListener("mouseup",a=>{s(a),this.canvas.removeEventListener("mousemove",e)}),this.canvas.addEventListener("wheel",n),this.canvas.addEventListener("contextmenu",a=>{a.preventDefault()})}eventMouseDown(t){this.begin=this.toCanvasScreenPoint({x:t.clientX,y:t.clientY}),this.preMove=this.toCanvasScreenPoint({x:t.clientX,y:t.clientY}),console.log("mousedown",this.begin)}eventMouseMove(t){this.move=this.toCanvasScreenPoint({x:t.clientX,y:t.clientY});const s=l.div(this.move,this.preMove);this.canvasSystem.canvasTransform.addTranslation(s),this.preMove=this.toCanvasScreenPoint({x:t.clientX,y:t.clientY}),console.log("mousemove",this.move)}eventMouseUp(t){this.end=this.toCanvasScreenPoint({x:t.clientX,y:t.clientY}),console.log("mouseup",this.end)}eventWheel(t){console.log("wheel",t),t.deltaY>0?this.canvasSystem.canvasTransform.addScale(-this.canvasSystem.const.TRANSFORM_SCALE_STEP):t.deltaY<0&&this.canvasSystem.canvasTransform.addScale(+this.canvasSystem.const.TRANSFORM_SCALE_STEP)}}class f{constructor(t){this.canvasSystem=t,this.transform={translation:{x:0,y:0},scale:1}}setTranslation(t){this.transform.translation=t,this.canvasSystem.render()}addTranslation(t){this.transform.translation=l.add(this.transform.translation,t),this.canvasSystem.render()}setScale(t){this.transform.scale=t,this.canvasSystem.render()}addScale(t){this.transform.scale+=t,this.transform.scale=Math.max(this.canvasSystem.const.TRANSFORM_SCALE_MIN,Math.min(this.canvasSystem.const.TRANSFORM_SCALE_MAX,this.transform.scale)),this.canvasSystem.render()}getReTransformPoint(t){return{x:(t.x-this.transform.translation.x)/this.transform.scale,y:(t.y-this.transform.translation.y)/this.transform.scale}}getTransformPoint(t){return{x:(t.x+this.transform.translation.x)*this.transform.scale,y:(t.y+this.transform.translation.y)*this.transform.scale}}}class y{constructor(){}}class v{constructor(t,s){if(this.const={TRANSFORM_SCALE_STEP:.1,TRANSFORM_SCALE_MAX:5,TRANSFORM_SCALE_MIN:.1,GRID:{SIZE:100}},!t)throw new TypeError("canvas is not exist");const e=t.getContext("2d");if(!e)throw new TypeError("can not found CanvasRenderingContext2D");if(s.aspect==="auto"){const r=s.size;t.width=r.width,t.height=r.height}else{const r=s.size;t.width=r,t.height=r/s.aspect}this.node=t,this.context=e,this.canvasOptions=s.canvasOptions,t.style.width=t.width+"px",t.style.height=t.height+"px",t.style.background=this.canvasOptions.background??"#ffffff";const{left:n,top:a}=t.getBoundingClientRect();this.canvasEventListener=new m(this.node,{x:n,y:a},this),this.canvasTransform=new f(this),this.cavnasCoordinate=new y,this.render()}static createCanvas(t,s){return new v(t,s)}render(){const t=this.context;t.clearRect(0,0,this.node.width,this.node.height),t.save(),t.translate(this.canvasTransform.transform.translation.x,this.canvasTransform.transform.translation.y),t.scale(this.canvasTransform.transform.scale,this.canvasTransform.transform.scale),this.drawRule(),t.fillStyle="#ff0000",t.fillRect(100,100,100,100),t.restore()}drawRule(){const t={x:0,y:0},s={x:this.node.width,y:this.node.height},e=this.const.GRID.SIZE*this.canvasTransform.transform.scale,n=this.context,a=this.canvasTransform.transform,r=a.translation.x-Math.floor(a.translation.x/e)*e,d=a.translation.y-Math.floor(a.translation.y/e)*e;for(let o=t.x;o<=s.x;o+=e){n.beginPath(),n.strokeStyle="#000000";const c=this.canvasTransform.getReTransformPoint({x:o+r,y:t.y}),h=this.canvasTransform.getReTransformPoint({x:o+r,y:s.y});n.moveTo(c.x,c.y),n.lineTo(h.x,h.y),n.stroke(),n.closePath()}for(let o=t.y;o<=s.y;o+=e){n.beginPath(),n.strokeStyle="#000000";const c=this.canvasTransform.getReTransformPoint({x:t.x,y:o+d}),h=this.canvasTransform.getReTransformPoint({x:s.x,y:o+d});n.moveTo(c.x,c.y),n.lineTo(h.x,h.y),n.stroke(),n.closePath()}}}const x=document.getElementById("canvas");v.createCanvas(x,{aspect:"auto",size:{width:window.innerWidth-50,height:window.innerHeight-50},canvasOptions:{background:"rgba(200,200,200,0.1)"}});
//# sourceMappingURL=bundle.js.map