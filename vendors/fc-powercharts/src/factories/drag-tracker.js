import DragTracker from'../chart/_internal/drag-tracker';import{componentFactory}from'../../../fc-core/src/lib';export default function(a){let b;componentFactory(a,DragTracker,'dragTracker'),b=a.getChildren('dragTracker')[0],b.addEvents()}