(()=>{"use strict";var e={831:(e,t,s)=>{s.r(t),s.d(t,{default:()=>n});var a=s(91),i=s.n(a),r=new URL(s(288),s.b);const n='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <link rel="shortcut icon" href="'+i()(r)+'" type="image/x-icon"> <title>RSS Async race</title> </head> <body> </body> </html> '},91:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e):e}},638:(e,t,s)=>{s.r(t)},513:(e,t,s)=>{s.r(t)},488:(e,t,s)=>{s.r(t)},938:(e,t,s)=>{s.r(t)},928:(e,t,s)=>{s.r(t)},260:(e,t,s)=>{s.r(t)},429:(e,t,s)=>{s.r(t)},511:(e,t,s)=>{s.r(t)},854:(e,t,s)=>{s.r(t)},99:(e,t,s)=>{s.r(t)},133:(e,t,s)=>{s.r(t)},897:(e,t,s)=>{s.r(t)},323:(e,t,s)=>{s.r(t)},711:(e,t,s)=>{s.r(t)},442:(e,t,s)=>{s.r(t)},492:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),s(831),(new(a(s(844)).default)).start()},844:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),s(638),s(692);const i=a(s(609));t.default=class{constructor(){this.router=new i.default}start(){document.body.append(this.router.getElem())}}},17:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(504)),r=a(s(111)),n=a(s(714));s(513);class o extends n.default{constructor(){super(),this.classes={baseClass:"car-creator",btnClass:"car-creator__btn"},this.colorRange=new r.default(null),this.submitButton=new i.default("create car",[this.classes.btnClass],(()=>this.createCar())),this.nameInput=null,this.init()}init(){this.nameInput=this.createElem("input",null,null,null,{type:"text",placeholder:"input car name here",required:""}),this.elem=this.createElem("div",[this.nameInput,this.colorRange.getElem(),this.submitButton.getElem()],this.classes.baseClass)}createCar(){if(!this.nameInput?.value||!this.elem)return;const e=new CustomEvent("car-create",{bubbles:!0,detail:{car:{name:this.nameInput.value,color:this.colorRange.getColor()}}});this.nameInput.value="",this.elem.dispatchEvent(e)}}t.default=o},757:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(243),r=a(s(504)),n=a(s(531)),o=s(581),l=a(s(714)),h=a(s(386));s(488);class c extends l.default{constructor(e,t){super(),this.classes={baseClass:"car-track",controlsClass:"car-track__controls",trackClass:"car-track__track",trackName:"car-track__name"},this.addClasses=e||[],this.startButton=new r.default("start",null,(async()=>{await this.startEngine(),this.startCar()})),this.stopButton=new r.default("stop",null,(()=>this.stopCar())),this.changeButton=new r.default("change",null,(()=>this.initCarChanging())),this.deleteButton=new r.default("delete",null,(()=>this.deleteCar())),this.icon=new n.default(t),this.nameElem=null,this.finishOffset=110,this.trackLength=window.innerWidth-this.finishOffset,this.isEngineWork=!0,this.isOnStart=!0,this.currDistance=0,this.speed=0,this.startTime=0,this.totalTime=0,this.carName=t.name,this.carColor=t.color,this.carId=t.id,this.serverAPI=h.default.getInstance(),this.init()}init(){this.nameElem=this.createElem("span",[this.carName],this.classes.trackName);const e=this.createElem("div",[this.startButton.getElem(),this.stopButton.getElem(),this.changeButton.getElem(),this.deleteButton.getElem(),this.nameElem],this.classes.controlsClass),t=this.createElem("div",[this.icon.getElem()],this.classes.trackClass);this.elem=this.createElem("div",[e,t],this.classes.baseClass),this.hydrate()}hydrate(){window.addEventListener("resize",(()=>{const e=this.trackLength;if(this.trackLength=window.innerWidth-this.finishOffset,0!==this.speed){const t=this.trackLength/e;this.speed*=t}})),this.setControlsStateToStart()}async startCar(e){this.isOnStart=!1;const t=()=>{this.icon.getElem().style.transform=`translateX(${this.currDistance}px)`,this.currDistance+=this.speed,this.currDistance<=this.trackLength&&this.isEngineWork?requestAnimationFrame(t):e&&this.isEngineWork&&this.signalFinish()};return requestAnimationFrame(t),this.startTime=Date.now(),e||this.setControlsStateToRace(),500===await this.serverAPI.driveCar(this.carId)&&(this.isEngineWork=!1),this.carId}signalFinish(){this.totalTime=(Date.now()-this.startTime)/1e3;const e=new CustomEvent(o.CustomEvents.finish,{bubbles:!0,detail:{carName:this.carName,carId:this.carId,totalTime:this.totalTime}});this.elem?.dispatchEvent(e)}async startEngine(){this.disableAllControls();const e=await this.serverAPI.startCarEngine(this.carId);e&&(this.speed=this.trackLength/(e.distance/e.velocity/1e3)/60,this.currDistance=0,this.isEngineWork=!0)}async stopCar(e){this.disableAllControls(),await this.serverAPI.stopCarEngine(this.carId),this.isEngineWork=!1,this.icon.getElem().style.transform="none",this.currDistance=0,e||this.setControlsStateToStart(),this.isOnStart=!0}changeCar(e,t){this.carColor=e,this.carName=t,this.nameElem&&(this.nameElem.innerText=this.carName,this.icon.changeColor(e))}initCarChanging(){const e={name:this.carName,color:this.carColor,id:this.carId},t=new CustomEvent(o.CustomEvents.updateStart,{bubbles:!0,detail:{car:e}});this.elem?.dispatchEvent(t)}deleteCar(){const e=new CustomEvent(o.CustomEvents.delete,{bubbles:!0,detail:{carId:this.carId}});this.elem?.dispatchEvent(e)}setControlsStateToRace(){this.stopButton.enable(),this.startButton.disable(),this.changeButton.disable(),this.deleteButton.disable()}setControlsStateToStart(){this.stopButton.disable(),this.startButton.enable(),this.changeButton.enable(),this.deleteButton.enable()}disableAllControls(){this.stopButton.disable(),this.startButton.disable(),this.changeButton.disable(),this.deleteButton.disable()}changeMode(e){e===o.ModeNames.fun?this.transformName():this.removeNameTransform(),this.changeIcon(e)}changeIcon(e){this.icon.changeMode(e)}transformName(){let[e,t]=[...this.carName.split(" ")];e&&e in i.brandTransformer&&(e=i.brandTransformer[e]),t&&t in i.modelTransformer&&(t=i.modelTransformer[t]),e=void 0===e?"":e,t=void 0===t?"":t,this.nameElem&&(this.nameElem.innerText=`${e} ${t}`)}removeNameTransform(){this.nameElem&&(this.nameElem.innerText=this.carName)}}t.default=c},336:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(504)),r=a(s(111)),n=s(581),o=a(s(714)),l=a(s(386));s(938);class h extends o.default{constructor(){super(),this.classes={baseClass:"car-updater"},this.colorRange=new r.default(null),this.submitButton=new i.default("update car",null,(()=>this.finishCarUpdate())),this.nameInput=this.createElem("input",null,null,null,{type:"text"}),this.updatedCarId=null,this.baseColor="#000000",this.serverAPI=l.default.getInstance(),this.init()}init(){this.elem=this.createElem("div",[this.nameInput,this.colorRange.getElem(),this.submitButton.getElem()],this.classes.baseClass),this.submitButton.disable()}initCarUpdate(e){this.updatedCarId=e.id,this.colorRange.setColor(e.color),this.nameInput.value=e.name,this.submitButton.enable()}async finishCarUpdate(){if(null===this.updatedCarId)return;const e={name:this.nameInput.value,color:this.colorRange.getColor(),id:this.updatedCarId};await this.serverAPI.updateCar(e);const t=new CustomEvent(n.CustomEvents.updateEnd,{bubbles:!0,detail:{car:e}});this.elem?.dispatchEvent(t),this.clear()}clear(){this.colorRange.setColor(this.baseColor),this.nameInput.value="",this.updatedCarId=null,this.submitButton.disable()}}t.default=h},536:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(504)),r=a(s(714));s(928);class n extends r.default{constructor(e,t,s){super(),this.classes={baseClass:"pagination"},this.addClasses=e||[],this.prevButton=new i.default("<",null,t),this.nextButton=new i.default(">",null,s),this.pageNumberWindow=this.createElem("span",["1"],null),this.init()}init(){this.elem=this.createElem("div",[this.prevButton.getElem(),this.pageNumberWindow,this.nextButton.getElem()],[this.classes.baseClass,...this.addClasses])}updatePageNumber(e){this.pageNumberWindow.innerText=String(e)}disablePrev(){this.prevButton.getElem().setAttribute("disabled","disabled")}disableNext(){this.nextButton.getElem().setAttribute("disabled","disabled")}enablePrev(){this.prevButton.getElem().removeAttribute("disabled")}enableNext(){this.nextButton.getElem().removeAttribute("disabled")}}t.default=n},441:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(17)),r=a(s(336)),n=a(s(504)),o=a(s(714)),l=a(s(853));s(260);const h=a(s(386)),c=a(s(38)),d=s(581);class u extends o.default{constructor(e){super(),this.classes={baseClass:"garage",controlsClass:"garage__controls",viewNameClass:"garage__name"},this.addClasses=e||[],this.viewName="Garage",this.carUpdater=new r.default,this.carCreator=new i.default,this.startRaceButton=new n.default("start race",null,(()=>this.startRace())),this.stopRaceButton=new n.default("stop race",null,(()=>this.stopRace())),this.carGeneratorButton=new n.default("generate 100 cars",null,(()=>this.massCarGeneration())),this.race=new l.default(null,(()=>this.disableAllControls()),(()=>this.setControlsStateToStart()),(()=>this.setControlsStateToRace())),this.massGenerationCount=100,this.serverAPI=h.default.getInstance(),this.carInfoGenerator=c.default.getInstance(),this.init()}init(){const e=this.createElem("div",[this.carCreator.getElem(),this.carUpdater.getElem(),this.startRaceButton.getElem(),this.stopRaceButton.getElem(),this.carGeneratorButton.getElem()],this.classes.controlsClass),t=this.createElem("h4",[this.viewName],this.classes.viewNameClass);this.elem=this.createElem("div",[t,e,this.race.getElem()],this.classes.baseClass),this.hydrate()}hydrate(){this.elem?.addEventListener(d.CustomEvents.create,(e=>{const t=e.detail.car;this.createCar(t)})),this.elem?.addEventListener(d.CustomEvents.updateStart,(e=>{const t={...e.detail.car};this.carUpdater.initCarUpdate(t)})),this.elem?.addEventListener(d.CustomEvents.updateEnd,(e=>{const t={...e.detail.car};this.race.updateSingleCar(t)}))}startRace(){this.race.startRace()}stopRace(){this.race.stopRace()}async massCarGeneration(){const e=[...Array(this.massGenerationCount)].map((()=>this.carInfoGenerator.generateRandomCar())).map((e=>this.serverAPI.saveCar(e)));await Promise.all(e),this.race.renderCars()}async createCar(e){await this.serverAPI.saveCar(e),this.race.renderCars()}setControlsStateToRace(){this.stopRaceButton.enable(),this.startRaceButton.disable(),this.carGeneratorButton.disable(),this.carCreator.submitButton.enable()}setControlsStateToStart(){this.stopRaceButton.disable(),this.startRaceButton.enable(),this.carGeneratorButton.enable(),this.carCreator.submitButton.enable()}disableAllControls(){this.stopRaceButton.disable(),this.startRaceButton.disable(),this.carGeneratorButton.disable(),this.carCreator.submitButton.disable()}changeMode(e){e===d.ModeNames.fun?this.race.changeMode(d.ModeNames.fun):this.race.changeMode(d.ModeNames.strict)}}t.default=u},990:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(536)),r=s(243),n=s(581),o=a(s(714)),l=a(s(386));s(429);class h extends o.default{constructor(){super(),this.classes={baseClass:"winners",pagination:"winners__pagination",rightOrder:"right-order",reverseOrder:"reverse-order",control:"winners__control",padgination:"winners__pagination",total:"winners__total",viewNameClass:"winners__name"},this.columnNames={id:"Id",image:"Image",name:"Name",wins:"Total wins",time:"Best time (sec)"},this.viewName="Winners",this.pagination=new i.default([this.classes.pagination],(()=>this.prevPage()),(()=>this.nextPage())),this.totalWinnersElem=this.createElem("span",null,this.classes.total),this.winnersPerPage=10,this.currPage=1,this.totalPages=1,this.serverAPI=l.default.getInstance(),this.sortControls={id:this.createElem("th",[this.columnNames.id],[this.classes.control,this.classes.rightOrder]),wins:this.createElem("th",[this.columnNames.wins],this.classes.control),time:this.createElem("th",[this.columnNames.time],this.classes.control)},this.tableContent=this.createElem("tbody",null,null),this.sortByIdOrder=n.SortOrders.RIGHT,this.sortByWinsOrder=n.SortOrders.RIGHT,this.sortByTimeOrder=n.SortOrders.RIGHT,this.sortType=n.SortTypes.byId,this.sortOrders={id:n.SortOrders.RIGHT,wins:n.SortOrders.RIGHT,time:n.SortOrders.RIGHT},this.totalWinners=0,this.currPageWinners=[],this.currPageIcons=[],this.mode=n.ModeNames.strict,this.init()}init(){this.createTable(),this.renderWinners(),this.hydrate()}async renderWinners(){this.clear();const e=await this.serverAPI.getWinners(this.sortType,this.sortOrders[`${this.sortType}`],this.currPage);e?.count&&(this.totalWinners=+e.count,this.updateTotalWinners(e.count),this.enablePagination()),0===e?.winners.length&&this.currPage>1&&this.prevPage(),e?.winners&&e.winners.forEach((async e=>{const t=await this.serverAPI.getCar(e.id);if(!t)return;const{color:s,name:a}=t,i=this.createWinnerRow(e.id,s,a,e.wins,e.time);this.tableContent.append(i),this.currPageWinners.push(e)}))}hydrate(){this.sortControls.id.addEventListener("click",(()=>this.sortBy(n.SortTypes.byId))),this.sortControls.wins.addEventListener("click",(()=>this.sortBy(n.SortTypes.byWins))),this.sortControls.time.addEventListener("click",(()=>this.sortBy(n.SortTypes.byTime)))}sortBy(e){Object.values(this.sortControls).forEach((e=>{e.classList.remove(this.classes.reverseOrder),e.classList.remove(this.classes.rightOrder)})),this.sortType=e,this.sortOrders[this.sortType]===n.SortOrders.REVERS?(this.sortOrders[this.sortType]=n.SortOrders.RIGHT,this.sortControls[this.sortType].classList.add(this.classes.rightOrder)):(this.sortOrders[this.sortType]=n.SortOrders.REVERS,this.sortControls[this.sortType].classList.add(this.classes.reverseOrder)),this.renderWinners()}createTable(){const e=this.createElem("th",[this.columnNames.image],null),t=this.createElem("th",[this.columnNames.name],null),s=this.createElem("div",["Total winners: ",this.totalWinnersElem],null),a=this.createElem("div",[this.pagination.getElem(),s],this.classes.pagination),i=this.createElem("tr",[this.sortControls.id,e,t,this.sortControls.wins,this.sortControls.time],null),r=this.createElem("thead",[i],null),n=this.createElem("table",[r,this.tableContent],null),o=this.createElem("h4",[this.viewName],this.classes.viewNameClass);this.elem=this.createElem("div",[o,a,n],this.classes.baseClass)}clear(){this.tableContent.innerHTML="",this.currPageIcons.length=0,this.currPageWinners.length=0}createWinnerRow(e,t,s,a,i){let r=s;this.mode===n.ModeNames.fun&&(r=this.transformName(r));const o=this.createElem("td",[String(e)],null),l=this.createElem("td",[this.createImage(t)],null),h=this.createElem("td",[r],null),c=this.createElem("td",[String(a)],null),d=this.createElem("td",[String(i)],null);return this.createElem("tr",[o,l,h,c,d],null)}createImage(e){const t="http://www.w3.org/2000/svg",s=document.createElementNS(t,"svg"),a=document.createElementNS(t,"use"),i=this.mode===n.ModeNames.strict?"./assets/sprite.svg#car-icon":"./assets/sprite.svg#witch-icon";a.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",i),s.setAttribute("color",e),s.setAttribute("width","40px"),s.setAttribute("height","40px"),s.appendChild(a);const r=this.createElem("div",[s],this.classes.baseClass);return this.currPageIcons.push(a),r}transformName(e){let[t,s]=[...e.split(" ")];return t&&t in r.brandTransformer&&(t=r.brandTransformer[t]),s&&s in r.modelTransformer&&(s=r.modelTransformer[s]),t=void 0===t?"":t,s=void 0===s?"":s,`${t} ${s}`}changeMode(e){this.mode=e,this.renderWinners()}disablePagination(){this.pagination.disableNext(),this.pagination.disablePrev()}enablePagination(){this.currPage>1?this.pagination.enablePrev():this.pagination.disablePrev(),this.currPage<this.totalPages?this.pagination.enableNext():this.pagination.disableNext()}updateTotalWinners(e){e&&(this.totalWinners=+e,this.totalPages=Math.ceil(this.totalWinners/this.winnersPerPage),this.totalWinnersElem.innerText=String(this.totalWinners))}nextPage(){this.currPage>=this.totalPages||(this.currPage+=1,this.pagination.updatePageNumber(this.currPage),this.renderWinners())}prevPage(){this.currPage<=1||(this.currPage-=1,this.pagination.updatePageNumber(this.currPage),this.renderWinners())}}t.default=h},609:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(441)),r=a(s(990)),n=s(581),o=a(s(714)),l=a(s(857)),h=a(s(459)),c=a(s(149));class d extends o.default{constructor(){super(),this.classes={baseClass:"wrapper",pageClass:"main"},this.mode=n.ModeNames.strict,this.header=new h.default(null,(()=>this.modePopup.showPopup(this.mode===n.ModeNames.fun?n.ModeNames.strict:n.ModeNames.fun))),this.footer=new l.default(null),this.garagePage=new i.default(null),this.winnersPage=new r.default,this.modePopup=new c.default((()=>this.changeMode()),this.header.switchModeBtn),this.init()}init(){document.body.dataset.mode="strict";const e=this.createElem("main",[this.garagePage.getElem(),this.winnersPage.getElem()],this.classes.pageClass);this.elem=this.createElem("div",[this.header.getElem(),e,this.footer.getElem()],this.classes.baseClass),this.hydrate()}hydrate(){this.changeView(),window.addEventListener("hashchange",(()=>{this.changeView()})),this.elem?.addEventListener(n.CustomEvents.newWinner,(()=>{this.winnersPage.renderWinners()})),this.elem?.addEventListener(n.CustomEvents.deleteWinner,(e=>{const{id:t}=e.detail;this.winnersPage.currPageWinners.some((e=>e.id===t))&&this.winnersPage.renderWinners()})),this.elem?.addEventListener(n.CustomEvents.updateEnd,(e=>{const{id:t}=e.detail.car;this.winnersPage.currPageWinners.some((e=>e.id===t))&&this.winnersPage.renderWinners()}))}changeView(){const{hash:e}=window.location;switch(e){case"#garage":this.displayGarage();break;case"#winners":this.displayWinners();break;default:window.location.hash="garage"}}displayGarage(){this.garagePage.getElem().style.display="flex",this.winnersPage.getElem().style.display="none"}displayWinners(){this.garagePage.getElem().style.display="none",this.winnersPage.getElem().style.display="flex"}changeMode(){this.mode===n.ModeNames.fun?(this.mode=n.ModeNames.strict,this.garagePage.changeMode(this.mode),this.winnersPage.changeMode(this.mode),document.body.dataset.mode="strict"):(this.mode=n.ModeNames.fun,this.garagePage.changeMode(this.mode),this.winnersPage.changeMode(this.mode),document.body.dataset.mode="fun")}}t.default=d},243:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.modelTransformer=t.brandTransformer=t.models=t.brands=void 0,t.brands=["Lexus","Tesla","Mersedes","Chevrolet","Mitsubishi","Toyota","Hyundai","Nissan","Dodge","Cadillac","Mazda","Ford","BMW"],t.models=["Q1","A5","Jazz","Alhambra","Sandero","Duster","Aircross","Logan","GLC","Megane","Diablo","Vitara","Highlander"],t.brandTransformer={Lexus:"Sabrina",Tesla:"Luna",Mersedes:"Samantha",Chevrolet:"Ursula",Mitsubishi:"Morgana",Toyota:"Raven",Hyundai:"Agnes",Nissan:"Hecate",Dodge:"Cassandra",Cadillac:"Tabitha",Mazda:"Morrigan",Ford:"Yennifer",BMW:"Triss"},t.modelTransformer={Q1:"the Ripper",A5:"Le Fay",Jazz:"of Endor",Alhambra:"Greenteeth",Sandero:"the Weird",Duster:"of Vengerberg",Aircross:"the Doom",Logan:"the Spider",GLC:"of Underworld",Megane:"of Duskwood",Diablo:"the Drowned",Vitara:"of Aedirn",Highlander:"of Swamp"}},504:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(714));s(511);class r extends i.default{constructor(e,t,s){super(),this.elem=null,this.text=e||"",this.classes={baseClass:"btn"},this.addClasses=t||[],this.callBack=s,this.init()}init(){this.elem=this.createElem("button",[this.text],[this.classes.baseClass,...this.addClasses]),this.hydrate()}hydrate(){if(this.elem&&this.callBack){const e=this.callBack;this.elem.addEventListener("click",e)}}disable(){this.elem?.setAttribute("disabled","disabled")}enable(){this.elem?.removeAttribute("disabled")}}t.default=r},531:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(581),r=a(s(714));s(854);class n extends r.default{constructor(e){super(),this.classes={baseClass:"car-icon"},this.svgNS="http://www.w3.org/2000/svg",this.svgElem=document.createElementNS(this.svgNS,"svg"),this.useElem=document.createElementNS(this.svgNS,"use"),this.color=e.color,this.name=e.name,this.id=e.id,this.funModeEnabled=!1,this.init()}init(){this.useElem.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","./assets/sprite.svg#car-icon"),this.svgElem.setAttribute("color",this.color),this.svgElem.setAttribute("width","70px"),this.svgElem.setAttribute("height","70px"),this.svgElem.appendChild(this.useElem);const e=this.createElem("div",[this.svgElem],this.classes.baseClass);this.elem=e}enableFunMod(){this.useElem.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","./assets/sprite.svg#witch-icon"),this.funModeEnabled=!0}disableFunMode(){this.funModeEnabled=!1,this.useElem.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","./assets/sprite.svg#car-icon")}changeMode(e){e===i.ModeNames.fun?this.enableFunMod():this.disableFunMode()}changeColor(e){this.color=e,this.svgElem.setAttribute("color",this.color)}}t.default=n},111:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(714));s(99);class r extends i.default{constructor(e){super(),this.classes={baseClass:"color-input"},this.addClasses=e||[],this.choosenColor="",this.init()}init(){this.elem=this.createElem("input",null,this.classes.baseClass,null,{type:"color"}),this.choosenColor=this.elem.value,this.hydrate()}hydrate(){this.elem?.addEventListener("input",(()=>{this.choosenColor=this.elem.value}))}getColor(){return this.choosenColor}setColor(e){this.choosenColor=e,this.elem.value=e}}t.default=r},581:(e,t)=>{var s,a,i,r;Object.defineProperty(t,"__esModule",{value:!0}),t.ModeNames=t.CustomEvents=t.SortTypes=t.SortOrders=void 0,function(e){e.RIGHT="ASC",e.REVERS="DESC"}(s||(t.SortOrders=s={})),function(e){e.byId="id",e.byWins="wins",e.byTime="time"}(a||(t.SortTypes=a={})),function(e){e.delete="car-delete",e.updateStart="car-updating-start",e.updateEnd="car-updating-finish",e.create="car-create",e.finish="car-finished",e.newWinner="new-winner-set",e.deleteWinner="winner-delete"}(i||(t.CustomEvents=i={})),function(e){e.strict="strict-mode",e.fun="fun-mode"}(r||(t.ModeNames=r={}))},38:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=s(243);class i{constructor(){this.brands=a.brands,this.models=a.models}static getInstance(){return i.instance||(i.instance=new i),i.instance}getRandomColor(){let e="#";for(let t=0;t<3;t+=1)e+=`0${Math.floor(255*Math.random()).toString(16)}`.slice(-2);return e}generateRandomName(){const e=this.getRandomIndex(this.brands.length),t=this.getRandomIndex(this.models.length);return`${this.brands[e]} ${this.models[t]}`}getRandomIndex(e){return Math.floor(Math.random()*e)}generateRandomCar(){return{name:this.generateRandomName(),color:this.getRandomColor()}}}t.default=i},714:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.elem=null}createElem(e,t,s,a,i){const r=document.createElement(e);if(t&&r.append(...t),a&&r.setAttribute("id",a),i&&Object.entries(i).forEach((e=>{const[t,s]=[...e];r.setAttribute(t,s)})),s){const e=Array.isArray(s)?s:[s];r.classList.add(...e)}return r}getElem(){return this.elem||this.createElem("div",null,null)}}},530:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=s(243);t.default=function(e){let[t,s]=[...e.split(" ")];return t&&t in a.brandTransformer&&(t=a.brandTransformer[t]),s&&s in a.modelTransformer&&(s=a.modelTransformer[s]),t=void 0===t?"":t,s=void 0===s?"":s,`${t} ${s}`}},386:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(){this.baseAddress="http://localhost:3000",this.garageAddress="/garage",this.engineAddress="/engine",this.winnersAddress="/winners",this.carsPerPage=7,this.winnersPerPage=10}static getInstance(){return s.instance||(s.instance=new s),s.instance}async getCars(e){const t=e?`&_page=${e}`:"",s=`?_limit=${this.carsPerPage}`,a=`${this.baseAddress}${this.garageAddress}${s}${t}`;let i;try{i=await fetch(a)}catch(e){if(e instanceof Error)return null}return i?.ok?{cars:await i.json(),count:i.headers.get("X-Total-Count")}:null}async getCar(e){const t=`${this.baseAddress+this.garageAddress}/${e}`;let s;try{s=await fetch(t)}catch(e){if(e instanceof Error)return null}return s?.ok?await s.json():null}async saveCar(e){const t=this.baseAddress+this.garageAddress;let s;try{s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch(e){if(e instanceof Error)return null}return 201===s?.status?await s.json():null}async deleteCar(e){const t=`${this.baseAddress+this.garageAddress}/${e}`;let s;try{s=await fetch(t,{method:"DELETE"})}catch(e){if(e instanceof Error)return null}return 200===s?.status||null}async updateCar(e){const t=`${this.baseAddress+this.garageAddress}/${e.id}`,s={name:e.name,color:e.color};let a;try{a=await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})}catch(e){if(e instanceof Error)return null}return 200===a?.status?await a.json():null}async startCarEngine(e){const t=`${this.baseAddress+this.engineAddress}/?id=${e}&status=started`;let s;try{s=await fetch(t,{method:"PATCH"})}catch(e){if(e instanceof Error)return null}return 200===s?.status?await s.json():null}async stopCarEngine(e){const t=`${this.baseAddress+this.engineAddress}/?id=${e}&status=stopped`;let s;try{s=await fetch(t,{method:"PATCH"})}catch(e){if(e instanceof Error)return null}return 200===s?.status||null}async driveCar(e){const t=`${this.baseAddress+this.engineAddress}/?id=${e}&status=drive`;let s;try{s=await fetch(t,{method:"PATCH"})}catch(e){if(e instanceof Error)return null}switch(s?.status){case 200:return!0;case 404:return 404;case 500:return 500;default:return null}}async getWinners(e,t,s){const a=s?`&_page=${s}`:"",i=`?_limit=${this.winnersPerPage}`,r=`&_sort=${e}`,n=`&_order=${t}`,o=`${this.baseAddress}${this.winnersAddress}${i}${a}${r}${n}`;let l;try{l=await fetch(o)}catch(e){if(e instanceof Error)return null}return l?.ok?{winners:await l.json(),count:l.headers.get("X-Total-Count")}:null}async getWinner(e){const t=`${this.baseAddress+this.winnersAddress}/${e}`;let s;try{s=await fetch(t)}catch(e){if(e instanceof Error)return null}return s?.ok?await s.json():null}async saveWinner(e){const t=this.baseAddress+this.winnersAddress;let s;try{s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch(e){if(e instanceof Error)return null}return 201===s?.status?await s.json():null}async deleteWinner(e){const t=`${this.baseAddress+this.winnersAddress}/${e}`;let s;try{s=await fetch(t,{method:"DELETE"})}catch(e){if(e instanceof Error)return null}return 200===s?.status||null}async updateWinner(e){const t=`${this.baseAddress+this.winnersAddress}/${e.id}`,s={wins:e.wins,time:e.time};let a;try{a=await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})}catch(e){if(e instanceof Error)return null}return 200===a?.status?await a.json():null}}t.default=s},217:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),s(732),t.default=class{constructor(){this.currAudio=new Audio,this.currAudio.src="./assets/music.mp3",this.currAudio.volume=.2}play(){this.currAudio.play()}stop(){this.currAudio.pause(),this.currAudio.currentTime=0}}},857:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),s(133);const i=a(s(714));class r extends i.default{constructor(e){super(),this.classes={baseClass:"footer",link:"footer__link",year:"footer__year",course:"footer__course",image:"footer__img"},this.addClasses=e||[],this.init()}init(){const e=this.createElem("a",["Git-hub"],[this.classes.link]);e.setAttribute("href","https://github.com/Color-zebra");const t=this.createElem("span",["2023"],[this.classes.year]),s=this.createElem("img",null,[this.classes.image]);s.setAttribute("src","https://rs.school/images/rs_school_js.svg");const a=this.createElem("a",[s],[this.classes.course]);a.setAttribute("href","https://rs.school/js/"),this.elem=this.createElem("footer",[e,t,a],this.classes.baseClass)}}t.default=r},459:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(504)),r=a(s(714));s(897);class n extends r.default{constructor(e,t){super(),this.classes={baseClass:"header"},this.addClasses=e||[],this.toGarageBtn=new i.default("Garage",["header__garage-btn"],(()=>{window.location.hash="garage"})),this.toWinnersBtn=new i.default("Winners",["header__winners-btn"],(()=>{window.location.hash="winners"})),this.switchModeBtn=new i.default(null,["header__switch-btn","btn_spec"],(()=>{t()})),this.init()}init(){this.elem=this.createElem("div",[this.toGarageBtn.getElem(),this.switchModeBtn.getElem(),this.toWinnersBtn.getElem()],[this.classes.baseClass])}}t.default=n},149:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(581),r=a(s(714)),n=a(s(217));s(323);class o extends r.default{constructor(e,t){super(),this.classes={baseClass:"mode-change-popup",show:"mode-change-popup_shown",hide:"mode-change-popup_hide",tremor:"mode-change-popup_tremor"},this.modeChangeBtn=t,this.player=new n.default,this.modeChangeCB=e,this.init()}init(){this.elem=this.createElem("div",null,this.classes.baseClass)}showPopup(e){this.elem&&(this.modeChangeBtn.disable(),e===i.ModeNames.fun?this.player.play():this.player.stop(),document.body.append(this.elem),this.elem.addEventListener("animationend",(e=>{this.tremorPopup(e)}),{once:!0}),this.elem.classList.add(this.classes.show))}tremorPopup(e){this.modeChangeCB(),this.elem?.classList.remove(this.classes.show),this.elem?.classList.add(this.classes.tremor),e.stopImmediatePropagation(),this.elem?.addEventListener("animationend",(e=>{this.hidePopup(e)}),{once:!0})}hidePopup(e){this.elem?.classList.remove(this.classes.tremor),this.elem?.classList.add(this.classes.hide),e.stopImmediatePropagation(),this.elem?.addEventListener("animationend",(()=>{this.elem?.classList.remove(this.classes.hide),this.elem?.remove(),this.modeChangeBtn.enable(),e.stopImmediatePropagation()}),{once:!0})}}t.default=o},853:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(757)),r=a(s(536)),n=s(581),o=a(s(714)),l=a(s(530)),h=a(s(386)),c=a(s(716));s(711);class d extends o.default{constructor(e,t,s,a){super(),this.classes={baseClass:"race",pagination:"race__pagination",totalCars:"race__total-cars",trackClass:"race__tracks"},this.addClasses=e||[],this.serverAPI=h.default.getInstance(),this.pagination=new r.default([this.classes.pagination],(()=>this.prevPage()),(()=>this.nextPage())),this.popup=new c.default,this.carTracksContainer=this.createElem("div",null,[this.classes.trackClass]),this.totalCarsElem=this.createElem("span",null,null),this.carTracks=[],this.cars=[],this.currPage=0,this.totalPages=0,this.totalCars=0,this.carsPerPage=7,this.isWinnerSet=!1,this.mode=n.ModeNames.strict,this.disableAllControlsCB=t,this.setControlsStateToStartCB=s,this.setControlsStateToRaceCB=a,this.init()}init(){const e=this.createElem("div",[this.createElem("span",["Total cars:"],null)],[this.classes.totalCars]);e.append(this.totalCarsElem),this.elem=this.createElem("div",[this.pagination.getElem(),e],this.classes.baseClass),this.currPage=1,this.renderCars(),this.hydrate(),this.setControlsStateToStartCB()}hydrate(){this.elem?.addEventListener(n.CustomEvents.delete,(async e=>{this.handleDeleting(e)})),this.elem?.addEventListener(n.CustomEvents.finish,(async e=>{this.handleFinish(e)}))}async renderCars(){if(!this.elem)return;this.clear();const e=await this.serverAPI.getCars(this.currPage);e&&(this.updateCurrPageCars(e.cars),this.updateTotalCars(e?.count),this.enablePagination()),this.mode===n.ModeNames.fun&&this.carTracks.forEach((e=>{e.transformName(),e.changeIcon(this.mode)}))}updateTotalCars(e){e&&(this.totalCars=+e,this.totalPages=Math.ceil(this.totalCars/this.carsPerPage),this.totalCarsElem.innerText=String(this.totalCars))}async handleFinish(e){if(this.isWinnerSet)return;const t=e.detail.carId,s=e.detail.totalTime;let a=e.detail.carName;this.mode===n.ModeNames.fun&&(a=(0,l.default)(a)),this.isWinnerSet=!0,await this.setWinner(t,s),this.setControlsStateToRaceCB(),this.enablePagination(),this.popup.showPopup(a,s),this.carTracks.forEach((e=>e.setControlsStateToRace()));const i=new CustomEvent(n.CustomEvents.newWinner,{bubbles:!0,detail:{id:t}});this.elem?.dispatchEvent(i)}async handleDeleting(e){const t=e.detail.carId;await this.deleteCar(t);const s=new CustomEvent(n.CustomEvents.deleteWinner,{bubbles:!0,detail:{id:t}});this.elem?.dispatchEvent(s)}updateSingleCar(e){const t=this.carTracks.find((t=>t.carId===e.id));t&&t.changeCar(e.color,e.name)}updateCurrPageCars(e){0===e.length&&this.currPage>1&&this.prevPage(),this.cars=e,this.cars.forEach((e=>{const t=new i.default(null,e);this.carTracks.push(t)}));const t=this.carTracks.map((e=>e.getElem()));this.carTracksContainer.append(...t),this.elem?.append(this.carTracksContainer)}clear(){this.carTracksContainer&&(this.carTracksContainer.innerHTML="",this.carTracks=[])}async deleteCar(e){await this.serverAPI.deleteCar(e),await this.serverAPI.deleteWinner(e),this.renderCars()}nextPage(){this.currPage>=this.totalPages||(this.currPage+=1,this.pagination.updatePageNumber(this.currPage),this.renderCars())}prevPage(){this.currPage<=1||(this.currPage-=1,this.pagination.updatePageNumber(this.currPage),this.renderCars())}async startRace(){this.disableAllControlsCB(),this.disablePagination();const e=this.carTracks.filter((e=>!1===e.isOnStart)).map((e=>e.stopCar(!0)));await Promise.all(e);const t=this.carTracks.map((e=>e.startEngine()));await Promise.all(t);const s=this.carTracks.map((e=>e.startCar(!0)));this.isWinnerSet=!1,await Promise.all(s),!1===this.isWinnerSet&&this.setControlsStateToRaceCB()}async stopRace(){const e=this.carTracks.map((e=>e.stopCar()));this.disableAllControlsCB(),await Promise.all(e),this.setControlsStateToStartCB(),this.enablePagination()}async setWinner(e,t){const s=await this.serverAPI.getWinner(e);if(null===s){const s={id:e,wins:1,time:t};await this.serverAPI.saveWinner(s)}else{const a={id:e,wins:s.wins+1,time:Math.min(t,s.time)};await this.serverAPI.updateWinner(a)}}disablePagination(){this.pagination.disableNext(),this.pagination.disablePrev()}enablePagination(){this.currPage>1?this.pagination.enablePrev():this.pagination.disablePrev(),this.currPage<this.totalPages?this.pagination.enableNext():this.pagination.disableNext()}changeMode(e){e===n.ModeNames.fun?this.mode=n.ModeNames.fun:this.mode=n.ModeNames.strict,this.carTracks.forEach((t=>t.changeMode(e)))}}t.default=d},716:function(e,t,s){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=a(s(714));s(442);class r extends i.default{constructor(){super(),this.classes={baseClass:"winner-popup",content:"winner-popup__content",winnerName:"winner-popup__name",winnerTime:"winner-popup__time",show:"winner-popup_shown"},this.texts={winner:"The winner is",time:"With time"},this.winnerNameElem=this.createElem("span",null,this.classes.winnerName),this.winnerTimeElem=this.createElem("span",null,this.classes.winnerTime),this.init()}init(){const e=this.createElem("span",[this.texts.winner],null),t=this.createElem("span",[this.texts.time],null),s=this.createElem("div",[e,this.winnerNameElem,t,this.winnerTimeElem],this.classes.content);this.elem=this.createElem("div",[s],this.classes.baseClass)}showPopup(e,t){this.winnerNameElem.innerText=e,this.winnerTimeElem.innerText=String(t),this.elem&&(document.body.append(this.elem),this.elem.classList.add(this.classes.show),this.elem.addEventListener("animationend",(()=>{this.elem?.classList.remove(this.classes.show),this.elem?.remove()}),{once:!0}))}}t.default=r},288:(e,t,s)=>{e.exports=s.p+"assets/fav.png"},692:(e,t,s)=>{e.exports=s.p+"assets/sprite.svg"},732:(e,t,s)=>{e.exports=s.p+"assets/music.mp3"}},t={};function s(a){var i=t[a];if(void 0!==i)return i.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,s),r.exports}s.m=e,s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var a=t.getElementsByTagName("script");if(a.length)for(var i=a.length-1;i>-1&&!e;)e=a[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),s.b=document.baseURI||self.location.href,s(492)})();