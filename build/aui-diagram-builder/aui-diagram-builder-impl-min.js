AUI.add("aui-diagram-builder-impl",function(av){var ah=av.Lang,c=ah.isArray,J=ah.isObject,aW=ah.isString,aS=ah.isBoolean,a5=av.Array,aa=function(A){return(A instanceof av.DiagramBuilderBase);},aT=function(A){return(A instanceof av.DiagramNode);},ap=function(A){return(A instanceof av.Anchor);},aA=function(A,a8){var a7=c(a8)?a8:a8.getXY();var a9=c(A)?A:A.getXY();return a5.map(a9,function(bb,ba){return Math.max(0,bb-a7[ba]);});},af="activeElement",ay="addAnchor",aZ="addAnchorMessage",j="addNode",aC="anchor",aw="anchors",ao="anchorsDragConfig",V="availableField",z="backspace",ad="boolean",p="boundingBox",a1="builder",al="cancel",am="canvas",aK="click",aX="closeEvent",G="closeMessage",a0="condition",ar="content",P="controls",aI="controlsToolbar",aH="data",an="dblclick",Z="delete",aF="deleteConnectorsMessage",n="deleteNodesMessage",aO="description",H="diagram",aq="diagram-builder",aB="diagramNode",C="diagram-node",aP="dragNode",D="editEvent",M="editMessage",R="editing",aN="end",a="esc",aR="field",r="fields",az="fieldsDragConfig",au="fork",ab="graphic",aQ="height",q="hover",aJ="id",t="join",T="keydown",at="link",aj="max",W="maxFields",v="maxSources",s="mouseenter",ae="mouseleave",m="name",o="node",aE="p1",aD="p2",d="parentNode",l="pencil",ak="records",k="recordset",h="region",a2="rendered",L="required",aV="selected",K="shuffle",S="source",aU="sources",aG="start",ac="state",i="target",N="targets",E="task",Q="tmpConnector",e="type",O="width",aY="wrapper",y="xy",x="zIndex",a4="-",g=".",U="",f="#",I="_",w=av.getClassName,X=w(H,a1,aC,o,aj,N),ax=w(H,a1,aC,q),aM=w(H,a1,aC,o),F=w(H,a1,aC,o,aY),u=w(H,a1,P),ag=w(H,o),b=w(H,o,ar),aL=w(H,o,R),a3=w(H,o,aV);var ai=function(){var a7="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",A="<br/>";av.all(".aui-diagram-node").each(function(bd){var a8=U,ba=av.Widget.getByNode(bd),a9=ba.get("name"),bc=ba.get("boundingBox"),bb=bc.one(".log")||av.Node.create("<div class=log />").appendTo(bc);a8+=a9+A;ba.get(r).each(function(be){a8+=a7+"a: "+be.get("id")+A;be.get("targets").each(function(bf){var bg=bf.get(aB);bf.get("node").setContent(bf.get("id"));a8+=a7+a7+"t: "+bg.get("name")+" (s: "+bf.get("id")+")"+A;});be.get("sources").each(function(bg){var bf=bg.get(aB);bg.get("node").setContent(bg.get("id"));a8+=a7+a7+"s: "+bf.get("name")+" (t: "+bg.get("id")+")"+A;});});bb.setContent(a8);});};var B=av.Component.create({NAME:aq,ATTRS:{fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:J},graphic:{valueFn:function(){return new av.Graphic();},validator:J},strings:{value:{addNode:"Add node",cancel:"Cancel",deleteConnectorsMessage:"Are you sure you want to delete the selected connector(s)?",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}},tmpConnector:{setter:"_setTmpConnector",value:{},validator:J}},EXTENDS:av.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{selectedConnector:null,selectedNode:null,initializer:function(){var A=this;A.on({cancel:A._onCancel,"drag:drag":A._onDrag,"drag:end":A._onDragEnd,"drop:hit":A._onDropHit,save:A._onSave});A.handlerKeyDown=av.getDoc().on(T,av.bind(A._afterKeyEvent,A));A.dropContainer.delegate(aK,av.bind(A._onNodeClick,A),g+ag);A.dropContainer.delegate(an,av.bind(A._onNodeEdit,A),g+ag);A.dropContainer.delegate(s,av.bind(A._onMouseenterAnchors,A),g+aM);A.dropContainer.delegate(ae,av.bind(A._onMouseleaveAnchors,A),g+aM);},renderUI:function(){var A=this;av.DiagramBuilder.superclass.renderUI.apply(this,arguments);A._renderGraphic();},syncUI:function(){var A=this;av.DiagramBuilder.superclass.syncUI.apply(this,arguments);A._setupFieldsDrag();A.tmpConnector=new av.Connector(A.get(Q));},clearFields:function(){var a7=this;var A=[];a7.get(r).each(function(a8){A.push(a8);});a5.each(A,function(a8){a8.destroy();});A=a7.editingConnector=a7.editingNode=a7.selectedNode=null;},closeEditProperties:function(){var A=this;var a7=A.editingNode;A.tabView.selectTab(av.DiagramBuilder.FIELDS_TAB);if(a7){a7.get(p).removeClass(aL);}A.editingConnector=null;A.editingNode=null;},connect:function(a8,bb,ba){var a7=this;if(aW(a8)){a8=av.Widget.getByNode(f+av.DiagramNode.buildNodeId(a8));}if(aW(bb)){bb=av.Widget.getByNode(f+av.DiagramNode.buildNodeId(bb));}if(a8&&bb){var a9=a8.findAvailableAnchor();var A=bb.findAvailableAnchor();if(a9&&A){a9.connect(A,ba);}}return a7;},connectAll:function(a7){var A=this;a5.each(a7,function(a8){if(a8.hasOwnProperty(S)&&a8.hasOwnProperty(i)){A.connect(a8.source,a8.target,a8.connector);}});return A;},createField:function(a7){var A=this;if(!aT(a7)){a7.builder=A;a7=new (A.getFieldClass(a7.type||o))(a7);}a7.set(a1,A);return a7;},deleteConnectors:function(a7){var A=this;a5.each(a7,function(a8){var a9=a8.get(aC);if(a9){var ba=a9.findConnectorTarget(a8);if(ba){a9.disconnect(ba);}}});},eachConnetor:function(a8){var A=this;var a7=false;A.get(r).some(function(a9){a9.get(r).some(function(ba){av.some(ba.connectors,function(bb){a7=a8.call(A,bb,ba,a9);return a7;});return a7;});return a7;});},editConnector:function(a7){var A=this;if(a7){A.closeEditProperties();A.tabView.selectTab(av.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(k,a7.getProperties());A.editingConnector=A.selectedConnector=a7;}},editNode:function(a7){var A=this;if(a7){A.closeEditProperties();A.tabView.selectTab(av.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(k,a7.getProperties());a7.get(p).addClass(aL);A.editingNode=A.selectedNode=a7;}},getSelectedConnectors:function(){var A=this;var a7=[];A.eachConnetor(function(a8){if(a8.get(aV)){a7.push(a8);}});return a7;},getFieldClass:function(a8){var A=this;var a7=av.DiagramBuilder.types[a8];if(a7){return a7;}else{av.log("The field type: ["+a8+"] couldn't be found.");return null;}},isFieldsDrag:function(a8){var A=this;var a7=A.fieldsDrag;return(a8===a7.dd);},plotField:function(a7){var A=this;if(!a7.get(a2)){a7.render(A.dropContainer);}},unselectConnectors:function(){var A=this;a5.each(A.getSelectedConnectors(),function(a7){a7.set(aV,false);});},unselectNodes:function(){var A=this;var a7=A.selectedNode;
if(a7){a7.set(aV,false);}A.selectedNode=null;},select:function(a7){var A=this;A.unselectNodes();A.selectedNode=a7.set(aV,true).focus();},stopEditing:function(){var A=this;A.unselectConnectors();A.unselectNodes();A.closeEditProperties();},toJSON:function(){var A=this;var a7={nodes:[]};A.get(r).each(function(a9){var ba=a9.get(m);var a8={transitions:[]};a5.each(a9.SERIALIZABLE_ATTRS,function(bb){a8[bb]=a9.get(bb);});a9.get(r).each(function(bb){bb.get(N).each(function(bc){a8.transitions.push({connector:bb.getConnector(bc).toJSON(),source:ba,target:bc.get(aB).get(m)});});});a7.nodes.push(a8);});return a7;},_afterKeyEvent:function(a7){var A=this;if(a7.hasModifier()||av.getDoc().get(af).test(":input,td")){return;}if(a7.isKey(a)){A._onEscKey(a7);}else{if(a7.isKey(z)||a7.isKey(Z)){A._onDeleteKey(a7);}}},_onCancel:function(a7){var A=this;A.closeEditProperties();},_onDrag:function(a8){var A=this;var a7=a8.target;if(A.isFieldsDrag(a7)){var a9=av.Widget.getByNode(a7.get(aP));a9.get(r).each(function(ba){ba.alignConnectors();});}},_onDragEnd:function(a8){var A=this;var a7=a8.target;if(A.isFieldsDrag(a7)){var a9=av.Widget.getByNode(a7.get(aP));a9.set(y,a9.getLeftTop());}},_onDropHit:function(a8){var A=this;var a7=a8.drag;if(A.isAvailableFieldsDrag(a7)){var ba=a7.get(o).getData(V);var a9=A.addField({xy:aA(a7.lastXY,A.dropContainer),type:ba.get(e),fields:[{}]});A.select(a9);}},_onDeleteKey:function(a9){var a7=this;var A=a7.getStrings();var a8=a7.getSelectedConnectors();if(a8.length&&confirm(A[aF])){a7.deleteConnectors(a8);}var ba=a7.selectedNode;if(ba){if(!ba.get(L)){ba.close();}}a9.halt();},_onEscKey:function(a7){var A=this;A.stopEditing();a7.halt();},_onMouseenterAnchors:function(a7){var A=this;a7.currentTarget.addClass(ax);},_onMouseleaveAnchors:function(a7){var A=this;a7.currentTarget.removeClass(ax);},_onNodeClick:function(a7){var A=this;var a8=av.Widget.getByNode(a7.currentTarget);A.select(a8);},_onNodeEdit:function(a7){var A=this;if(!a7.target.ancestor(g+b,true)){return;}var a8=av.Widget.getByNode(a7.currentTarget);if(a8){A.editNode(a8);}},_onSave:function(a8){var A=this;var a7=A.editingNode;var a9=A.editingConnector;var ba=A.propertyList.get(k);if(a7){a5.each(ba.get(ak),function(bb){var bc=bb.get(aH);a7.set(bc.attributeName,bc.value);});}else{if(a9){a5.each(ba.get(ak),function(bb){var bc=bb.get(aH);a9.set(bc.attributeName,bc.value);});}}},_renderGraphic:function(){var A=this;A.get(ab).render(A.get(am));},_setTmpConnector:function(a8){var A=this;var a7=A.get(am).getXY();return av.merge({p1:a7,p2:a7,lazyDraw:true,graphic:A.get(ab)},a8);},_setFieldsDragConfig:function(a8){var A=this;var a7=A.dropContainer;return av.merge({bubbleTargets:A,container:a7,dragConfig:{plugins:[{cfg:{constrain:a7},fn:av.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:av.Plugin.DDWinScroll}]},nodes:g+ag},a8||{});},_setupFieldsDrag:function(){var A=this;A.fieldsDrag=new av.DD.Delegate(A.get(az));}}});av.DiagramBuilder=B;av.DiagramBuilder.types={};var Y=av.Component.create({NAME:C,EXTENDS:av.Overlay,AUGMENTS:[av.FieldSupport]});var a6=av.Component.create({NAME:C,UI_ATTRS:[r,m,L,aV],ATTRS:{anchorsDragConfig:{value:null,setter:"_setAnchorsDragConfig",validator:J},builder:{validator:aa},required:{value:false,validator:aS},description:{value:U,validator:aW},height:{value:60},name:{valueFn:function(){var A=this;return A.get(e)+(++av.Env._uidx);},validator:aW},selected:{value:false,validator:aS},strings:{value:{addAnchorMessage:"Add Anchor",closeMessage:"Close",deleteNodesMessage:"Are you sure you want to delete the selected node(s)?",description:"Description",editMessage:"Edit",name:"Name",type:"Type"}},type:{value:o,validator:aW},controlsToolbar:{validator:J,valueFn:"_valueControlsToolbar"},width:{value:60},zIndex:{value:100},tabIndex:{value:1}},EXTENDS:Y,buildNodeId:function(A){return aB+I+aR+I+A.replace(/[^a-z0-9.:_-]/ig,"_");},prototype:{ANCHOR_WRAPPER_TEMPLATE:'<div class="'+F+'"></div>',CONTROLS_TEMPLATE:'<div class="'+u+'"></div>',SERIALIZABLE_ATTRS:[aO,m,L,e,O,aQ,x,y,W],initializer:function(){var A=this;A._renderNodes();A._setupAnchorsDrag();A.after({render:A._afterRender});A.on({"drag:drag":A._onAnchorDrag,"drag:end":A._onAnchorDragEnd,"drag:start":A._onAnchorDragStart,"drop:hit":A._onAnchorDropHit});A.get(p).addClass(ag+a4+A.get(e));},destructor:function(){var A=this;A.get(r).each(function(a7){a7.destroy();});A.get(a1).removeField(A);},alignAnchors:function(){var a7=this;var bb=a7.get(r);var a9=a7.get(p).get(h),ba=Math.floor(360/bb.size()),a8=a9.width/2,A=a9.height/2,bd=a9.left+a9.width/2,bc=a9.top+a9.height/2;bb.each(function(bh,bg){var bf=bh.get(o);var bi=bf.get(h);var be=a7._getEllipseXY(a8,A,bd,bc,bg*ba);bf.setXY([be[0]-bi.width/2,be[1]-bi.height/2]);bh.alignConnectors();});return a7;},close:function(){var a7=this;var A=a7.getStrings();if(confirm(A[n])){a7.destroy();}return a7;},createField:function(a8){var A=this;if(!ap(a8)){var a7=A.get(a1);a8.diagramNode=A;a8=new av.Anchor(a8);}return a8;},findAvailableAnchor:function(){var A=this;var a7=null;A.get(r).some(function(a8){if(!a8.hasConnection()){a7=a8;return true;}});if(!a7){a7=A.addField({});}return a7;},getConnectionNode:function(){var A=this;return new av.DiagramNode({xy:[100,100]});},getLeftTop:function(){var A=this;return aA(A.get(p),A._getContainer());},getProperties:function(){var A=this;var a7=A.getPropertyModel();a5.each(a7,function(ba){var a9=A.get(ba.attributeName),a8=ah.type(a9);if(a8===ad){a9=String(a9);}ba.value=a9;});return a7;},getPropertyModel:function(){var a7=this;var A=a7.getStrings();return[{attributeName:aO,editor:new av.TextAreaCellEditor(),name:A[aO]},{attributeName:m,editor:new av.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[m]},{attributeName:e,editor:false,name:A[e]}];},syncDragTargets:function(){var A=this;A.anchorsDrag.syncTargets();},syncDropTargets:function(a7){var A=this;A.get(r).each(function(a9){var a8=av.DD.DDM.getDrop(a9.get(o));if(a8){if(a9.get(aU).size()===a9.get(v)){a8.removeFromGroup(aw);}else{a8.addToGroup(aw);
}}});},_afterRender:function(a7){var A=this;A.alignAnchors();A._renderControls();},_getContainer:function(){var A=this;return(A.get(a1).dropContainer||A.get(p).get(d));},_getEllipseXY:function(a7,A,ba,a9,bb){var a8=bb*Math.PI/180;return[ba+a7*Math.cos(a8),a9-A*Math.sin(a8)];},_handleAddAnchorEvent:function(a7){var A=this;A.addField({});},_handleAddNodeEvent:function(a8){var A=this;var a7=A.get(a1);var a9=A.findAvailableAnchor();if(a9){var ba=A.getConnectionNode();a7.addField(ba);a9.connect(ba.addField({}));}},_handleEditEvent:function(a7){var A=this;A.get(a1).editNode(A);},_handleCloseEvent:function(a7){var A=this;if(!A.get(L)){A.close();}},_onAnchorDrag:function(a8){var A=this;var a7=A.get(a1);a7.tmpConnector.set(aD,a8.target.get(aP).getCenterXY());},_onAnchorDragEnd:function(a8){var A=this;var a7=A.get(a1).tmpConnector.shape;a7.clear();a7.end();},_onAnchorDragStart:function(a8){var A=this;var a7=A.get(a1);a7.tmpConnector.set(aE,a8.target.get(o).getCenterXY());},_onAnchorDropHit:function(a7){var A=this;var a8=av.Anchor.getAnchorByNode(a7.drag.get(o));var a9=av.Anchor.getAnchorByNode(a7.drop.get(o));a8.connect(a9);},_renderControls:function(){var A=this;var a7=A.get(p);A.controlsNode=av.Node.create(A.CONTROLS_TEMPLATE).appendTo(a7);},_renderNodes:function(){var A=this;var a7=A.get(p);A.anchorWrapper=av.Node.create(A.ANCHOR_WRAPPER_TEMPLATE).appendTo(a7);},_renderControlsToolbar:function(a7){var A=this;A.controlsToolbar=new av.Toolbar(A.get(aI)).render(A.controlsNode);A._uiSetRequired(A.get(L));},_setAnchorsDragConfig:function(a8){var A=this;var a7=A.get(a1);return av.merge({bubbleTargets:A,container:A.anchorWrapper,dragConfig:{groups:[aw],plugins:[{cfg:{constrain:(a7?a7.get(am):null)},fn:av.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:av.Plugin.DDWinScroll},{cfg:{moveOnEnd:false},fn:av.Plugin.DDProxy}]},nodes:g+aM,target:true},a8||{});},_setupAnchorsDrag:function(){var A=this;A.anchorsDrag=new av.DD.Delegate(A.get(ao));A.anchorsDrag.dd.addInvalid(g+X);},_uiSetFields:function(a7){var A=this;if(A.get(a2)){A.alignAnchors();A.syncDragTargets();A.syncDropTargets();}},_uiSetName:function(a8){var A=this;var a7=A.get(p);a7.set(aJ,av.DiagramNode.buildNodeId(a8));},_uiSetRequired:function(a9){var a8=this;var a7=a8.getStrings();var A=a8.controlsToolbar;if(A){if(a9){A.remove(aX);}else{A.add({handler:av.bind(a8._handleCloseEvent,a8),icon:al,id:aX,title:a7[G]});}}},_uiSetSelected:function(a7){var A=this;A.get(p).toggleClass(a3,a7);if(a7&&!A.controlsToolbar){A._renderControlsToolbar();}},_uiSetXY:function(a8){var A=this;var a7=A._getContainer().getXY();this._posNode.setXY([a8[0]+a7[0],a8[1]+a7[1]]);},_valueControlsToolbar:function(a8){var a7=this;var A=a7.getStrings();return{activeState:false,children:[{handler:av.bind(a7._handleEditEvent,a7),icon:l,id:D,title:A[M]},{handler:av.bind(a7._handleAddAnchorEvent,a7),icon:at,id:ay,title:A[aZ]},{handler:av.bind(a7._handleAddNodeEvent,a7),icon:K,id:j},{handler:av.bind(a7._handleCloseEvent,a7),icon:al,id:aX,title:A[G]}]};}}});av.DiagramNode=a6;av.DiagramBuilder.types[o]=av.DiagramNode;av.DiagramNodeState=av.Component.create({NAME:C,ATTRS:{height:{value:40},type:{value:ac},width:{value:40}},EXTENDS:av.DiagramNode,});av.DiagramBuilder.types[ac]=av.DiagramNodeState;av.DiagramNodeCondition=av.Component.create({NAME:C,ATTRS:{height:{value:60},type:{value:a0},width:{value:60}},EXTENDS:av.DiagramNodeState,});av.DiagramBuilder.types[a0]=av.DiagramNodeCondition;av.DiagramNodeStart=av.Component.create({NAME:C,ATTRS:{type:{value:aG}},EXTENDS:av.DiagramNodeState,});av.DiagramBuilder.types[aG]=av.DiagramNodeStart;av.DiagramNodeEnd=av.Component.create({NAME:C,ATTRS:{type:{value:aN}},EXTENDS:av.DiagramNodeState,});av.DiagramBuilder.types[aN]=av.DiagramNodeEnd;av.DiagramNodeJoin=av.Component.create({NAME:C,ATTRS:{height:{value:60},type:{value:t},width:{value:60}},EXTENDS:av.DiagramNodeState,});av.DiagramBuilder.types[t]=av.DiagramNodeJoin;av.DiagramNodeFork=av.Component.create({NAME:C,ATTRS:{height:{value:60},type:{value:au},width:{value:60}},EXTENDS:av.DiagramNodeState,});av.DiagramBuilder.types[au]=av.DiagramNodeFork;av.DiagramNodeTask=av.Component.create({NAME:C,ATTRS:{height:{value:70},type:{value:E},width:{value:70}},EXTENDS:av.DiagramNodeState,});av.DiagramBuilder.types[E]=av.DiagramNodeTask;},"@VERSION@",{requires:["aui-diagram-builder-base","overlay"],skinnable:true});