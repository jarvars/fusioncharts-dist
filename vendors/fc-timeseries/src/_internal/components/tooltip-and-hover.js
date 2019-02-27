import SmartRenderer from'../../../../fc-core/src/component-interface/smart-renderer';import{pluckNumber}from'../../../../fc-core/src/lib';let MOUSEOVER='fc-mouseover',MOUSEDOWN='fc-mousedown',MOUSEUP='fc-mouseup',MOUSEMOVE='fc-mousemove',MOUSEOUT='fc-mouseout',CLICK='fc-click',xShift=5;class MouseAction extends SmartRenderer{configure(){super.configure();let a=this,b=a.config,c=a.getFromEnv('chart-attrib'),d=a.getFromEnv('mouseTracker');b.showTooltip=pluckNumber(c.showtooltip,1),b.eventAdded||a.addExtEventListener('canvasHovered',function(a){return b.eventAdded=!0,function(){switch(arguments[1].hoveredInfo&&arguments[1].hoveredInfo.component&&arguments[1].hoveredInfo.component.getType()){case'timeMarker':a._triggerMarkerMouseActions(...arguments);break;default:a._triggerMouseActions(...arguments);}}}(a),d)}mouseoutHandler(a,b,c,d){var e=this,f=e.config;d&&d.config&&(d.setHoverOutEffect(c),d._firePlotEvent&&d._firePlotEvent(MOUSEOUT,c,a)),f.showTooltip&&e.getFromEnv('toolTipController').hide(f.currentToolTip),delete f._lastDatasetIndex,delete f._lastPointIndex}_triggerMarkerMouseActions(a){let b,c,d=this,e=a.data,f=d.getFromEnv('toolTipController'),g=e.chartX,h=e.chartY,i=d.getLinkedParent(),j=i.getTranslation(),k=e.hoveredInfo,l=k.hovered,m=d.config,n=m.showTooltip,o=k.component,p=k.pointObj.hoveredMarkerDim||{},q=k.hovered&&o.getToolTextConfiguration(p.toolTextArr,k.pointObj.type),r=i.isWithinCanvas(g-(p.thresholdX||0),h-(p.thresholdY||0));l&&r?(b=g,c=p.y-q.dimensions.height+j.y,n&&(m.currentToolTip=f.drawAt(b,c,q.toolText,m.currentToolTip,i)),o.setHoverInEffect(k.pointIndex,k.pointObj.index,!1)):(n&&f.hide(m.currentToolTip),o.setHoverOutEffect())}_triggerMouseActions(a){var b,c,d,f,g,h,i,k,m,n=this,o=a.data,p=n.getFromEnv('toolTipController'),q=o.i,r=o.e,e=o.chartX,s=o.chartY,t=o.hoveredInfo,u=0<=q,v=n.getLinkedParent(),w=v.getChild(void 0,'dataset'),x=n.config,y=x._lastDatasetIndex,z=x._lastPointIndex,A=v.getTranslation(),B='',C=t&&t.pointIndex,D=v.isWithinCanvas(e,s);if(u&&(t.datasetIndex=q,m=n.getMouseEvents(r,t.datasetIndex,C,t.component.getName(),t.markerObj)),(!D||(!u||m&&m.fireOut)&&'undefined'!=typeof y)&&(m&&!m.events.length?x.mouseoutTimer=setTimeout(function(){n.mouseoutHandler(r,y,z,x._lastComponentHovered)},20):(n.mouseoutHandler(r,y,z,x._lastComponentHovered),clearTimeout(x.mouseoutTimer))),D&&w.length&&x.showTooltip&&(w.forEach((a,b)=>{k=a.config,'visible'===k.visibility&&(f=a._getTooltext(u,q===b,a._getHoveredBin()),B+=f,k.dataInfo[a._getHoveredBin()]&&f&&(g=k.dataInfo[a._getHoveredBin()],i=a))}),B=(i?i._getDateForToolText(i._getHoveredBin()):'')+B,b=u?t.pointObj:g,b?''===B?p.hide(x.currentToolTip):x.currentToolTip=p.drawAt(b.x+(b.width||0)/2+xShift+A.x,(b.colY||b.y)+A.y,B,x.currentToolTip,v):p.hide(x.currentToolTip)),u&&(c=m.events&&m.events.length,c))for(x._lastDatasetIndex=t.datasetIndex,x._lastPointIndex=C,h=x._lastComponentHovered=t.component,x._lastComponentHoveredName=h&&h.getName(),h.setHoverInEffect(C),x.showTooltip&&'dataMarker'===h.getType()&&(B=h._getTooltext(C),x.currentToolTip=p.draw(r,B,x.currentToolTip)),d=0;d<c;d+=1)h&&h._firePlotEvent&&h&&h._firePlotEvent&&h._firePlotEvent(m.events[d],C,r,t)}getMouseEvents(a,b,c,d){var e=this,f=e.config,g=f._lastDatasetIndex,h=f._lastPointIndex,i=f._lastComponentHoveredName,j=a.type,k={fireOut:!1,events:[]};return j===CLICK?k.events.push(CLICK):j===MOUSEMOVE?i===d&&g===b&&h===c?(clearTimeout(f.mouseoutTimer),k.events.push(MOUSEMOVE)):(k.events.push(MOUSEOVER),k.fireOut=!0):j===MOUSEDOWN?((i!==d||g!==b||h!==c)&&(k.fireOut=!0,k.events.push(MOUSEOVER)),k.events.push(MOUSEDOWN)):j===MOUSEOVER?i===d&&g===b&&h===c?clearTimeout(f.mouseoutTimer):(k.fireOut=!0,k.events.push(MOUSEOVER)):j===MOUSEUP?k.events.push(MOUSEUP):j===MOUSEOUT?k.fireOut=!0:void 0,k}}export default MouseAction;