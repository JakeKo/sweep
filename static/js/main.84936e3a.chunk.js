(this.webpackJsonpsweep=this.webpackJsonpsweep||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(6),o=n.n(r),l=n(1),c=n(3),u=n(2),s=(n(14),n(4)),m=n(8),d=n(7),h=(n(15),n(16),function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).evaluateCellClass=function(){return["cell","cell-revealed",e.props.isMine?"cell-mine":"cell-value-".concat(e.props.mineCount)].join(" ")},e.evaluteCellContent=function(){return e.props.isMine?"M":e.props.mineCount>0?e.props.mineCount:""},e.render=function(){return i.a.createElement("div",{className:e.evaluateCellClass()},e.evaluteCellContent())},e}return n}(i.a.Component)),f=(n(17),function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onClickHandler=function(t){t.preventDefault();var n=e.props,a=n.x,i=n.y,r=n.isFlagged,o=n.toggleFlagCell,l=n.revealCell;"contextmenu"===t.type?o(a,i):"click"!==t.type||r||l(a,i)},e.evaluateCellClass=function(){return["cell","cell-hidden",e.props.isFlagged?"cell-flagged":""].join(" ")},e.evaluteCellContent=function(){return e.props.isFlagged?"X":""},e.render=function(){return i.a.createElement("div",{className:e.evaluateCellClass(),onClick:e.onClickHandler,onContextMenu:e.onClickHandler},e.evaluteCellContent())},e}return n}(i.a.Component)),p="GAME OVER",v="CONTINUE",C="WIN",g=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).revealCell=function(e,t){var n=a.props,i=n.height,r=n.width,o=function e(t,n,a){return t[n][a].isRevealed?t:(t[n][a].isRevealed=!0,t[n][a].mineCount>0||t[n][a].isMine||(n>0&&a>0&&(t=e(t,n-1,a-1)),n>0&&(t=e(t,n-1,a)),n>0&&a<i-1&&(t=e(t,n-1,a+1)),a>0&&(t=e(t,n,a-1)),n<r-1&&(t=e(t,n+1,a)),n<r-1&&a>0&&(t=e(t,n+1,a-1)),a<i-1&&(t=e(t,n,a+1)),n<r-1&&a<i-1&&(t=e(t,n+1,a+1))),t)}(a.state.matrix,e,t);a.setState({matrix:o})},a.toggleFlagCell=function(e,t){a.state.matrix[e][t].isRevealed||a.setState({matrix:a.state.matrix.map((function(n){return n.map((function(n){return Object(m.a)({},n,{isFlagged:n.x===e&&n.y===t?!n.isFlagged:n.isFlagged})}))}))})},a.evaluateBoardState=function(){var e=a.props,t=e.height,n=e.width,i=e.mineCount,r=a.state,o=r.matrix;return r.minePositions.some((function(e){var t=e.x,n=e.y;return o[t][n].isRevealed&&o[t][n].isMine}))?p:t*n-i===o.reduce((function(e,t){return e+t.reduce((function(e,t){return e+t.isRevealed}),0)}),0)?C:v},a.render=function(){return i.a.createElement("div",{className:"board"},a.state.matrix.map((function(e){return i.a.createElement("div",{className:"column",key:Math.random()},e.map((function(e){return e.isRevealed?i.a.createElement(h,{key:Math.random(),isMine:e.isMine,mineCount:e.mineCount}):i.a.createElement(f,{key:Math.random(),x:e.x,y:e.y,isFlagged:e.isFlagged,revealCell:a.revealCell,toggleFlagCell:a.toggleFlagCell})})))})))},a.state=a.initializeBoard(e),a}return Object(d.a)(n,[{key:"initializeBoard",value:function(e){for(var t=e.width,n=e.height,a=e.mineCount,i=Object(s.a)(Array(t).keys()).map((function(e){return Object(s.a)(Array(n).keys()).map((function(t){return{x:e,y:t,isMine:!1,mineCount:0,isRevealed:!1,isFlagged:!1}}))})),r=new Set;r.size<a;)r.add(JSON.stringify({x:Math.round(Math.random()*(t-1)),y:Math.round(Math.random()*(n-1))}));var o=Object(s.a)(r).map(JSON.parse);return o.forEach((function(e){var a=e.x,r=e.y;a>0&&r>0&&(i[a-1][r-1].isMine||i[a-1][r-1].mineCount++),a>0&&(i[a-1][r].isMine||i[a-1][r].mineCount++),a>0&&r<n-1&&(i[a-1][r+1].isMine||i[a-1][r+1].mineCount++),r>0&&(i[a][r-1].isMine||i[a][r-1].mineCount++),i[a][r].isMine=!0,r<n-1&&(i[a][r+1].isMine||i[a][r+1].mineCount++),a<t-1&&r>0&&(i[a+1][r-1].isMine||i[a+1][r-1].mineCount++),a<t-1&&(i[a+1][r].isMine||i[a+1][r].mineCount++),a<t-1&&r<n-1&&(i[a+1][r+1].isMine||i[a+1][r+1].mineCount++)})),{minePositions:o,matrix:i}}},{key:"componentDidUpdate",value:function(e){e.id!==this.props.id&&this.setState(this.initializeBoard(this.props))}}]),n}(i.a.Component),y={easy:{height:15,width:15,mineCount:30},medium:{height:25,width:25,mineCount:50},hard:{height:30,width:60,mineCount:200}},M=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).changeGameDifficulty=function(e){a.setState({difficulty:e.target.value,boardId:Math.random()})},a.resetGame=function(e){e.preventDefault(),a.setState({boardId:Math.random()})},a.render=function(){var e=a.state,t=e.difficulty,n=e.boardId,r=y[t],o=r.height,l=r.width,c=r.mineCount;return i.a.createElement("div",{className:"app"},i.a.createElement("form",{className:"game-controls"},i.a.createElement("select",{className:"game-difficulty",value:t,onChange:a.changeGameDifficulty},i.a.createElement("option",{value:"easy"},"EASY"),i.a.createElement("option",{value:"medium"},"MEDIUM"),i.a.createElement("option",{value:"hard"},"HARD")),i.a.createElement("button",{className:"game-reset",onClick:a.resetGame},"RESET")),i.a.createElement(g,{id:n,height:o,width:l,mineCount:c}))},a.state={difficulty:"medium",boardId:Math.random()},a}return n}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.84936e3a.chunk.js.map