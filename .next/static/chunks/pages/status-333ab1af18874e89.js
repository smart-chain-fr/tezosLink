(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[465],{9377:function(t,s,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/status",function(){return e(6504)}])},1908:function(t,s){"use strict";s.Z={src:"/_next/static/media/cards.ed8bbff2.svg",height:24,width:24}},7593:function(t,s){"use strict";s.Z={src:"/_next/static/media/login.dd97bdfd.svg",height:24,width:24}},1145:function(t,s){"use strict";s.Z={src:"/_next/static/media/plus-card.52deae9f.svg",height:24,width:24}},2686:function(t,s,e){"use strict";e.d(s,{z:function(){return _}});var n=e(5893),i=e(7294),a=e(4184),r=e.n(a),o=e(9937),c=e.n(o),l=e(5675),d=e.n(l);function _(t){let[s,e]=(0,i.useState)(!1),a=()=>{e(!0),setTimeout(()=>e(!1),1e3)};return(0,n.jsxs)("div",{className:r()(c().root,c()[t.color],c()[s?"clicked":""]),onClick:()=>{a(),t.onClick&&t.onClick()},children:[(0,n.jsx)("div",{className:c().text,children:t.text}),t.icon&&(0,n.jsx)(d(),{className:r()(c().icon,c()[t.color]),src:t.icon,alt:"icon"})]})}_.defaultProps={icon:void 0,color:"primary"}},5467:function(t,s,e){"use strict";e.d(s,{Z:function(){return B}});var n,i=e(5893),a=e(7294),r=e(1664),o=e.n(r),c=e(5675),l=e.n(c),d={src:"/_next/static/media/link_logo.dc7af256.svg",height:19,width:140},_={src:"/_next/static/media/logo.88863be8.svg",height:76,width:67},u=e(2045),h=e.n(u),p=e(2686),m=e(9474),x=e.n(m),S=e(4184),w=e.n(S);function f(t){let{state:s,callback:e}=t;return(0,i.jsx)("div",{className:x().root,onClick:()=>e(),children:(0,i.jsxs)("div",{className:x().box,children:[(0,i.jsx)("div",{className:w()(x()["inner-top"],x().inner,x()[String(s)])}),(0,i.jsx)("div",{className:w()(x()["inner-middle"],x().inner,x()[String(s)])}),(0,i.jsx)("div",{className:w()(x()["inner-bottom"],x().inner,x()[String(s)])})]})})}var v=e(2612),g=e.n(v),j=e(7593),N=e(1908),V=e(1145),k={src:"/_next/static/media/documentation.3f34ec4e.svg",height:24,width:24},I=e(1163);class T extends a.Component{render(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:w()(g()[String(this.props.status)],g().shadow),onClick:this.props.hideCallback}),(0,i.jsxs)("div",{className:w()(g()[String(this.props.status)],g().root),children:[(0,i.jsx)("h1",{children:"Menu"}),this.state.Links.map((t,s)=>this.renderItem(t,s))]})]})}renderItem(t,s){return(0,i.jsx)("div",{className:w()(g().item,g()[this.isCurrentPath(t.link)]),children:(0,i.jsxs)(o(),{href:t.link,onClick:this.props.hideCallback,children:[(0,i.jsx)(l(),{alt:"icon",src:t.icon}),t.name]})},s)}isCurrentPath(t){return this.props.router.pathname===t?"current-path":"other-path"}constructor(t){super(t),this.state={Links:[{name:"See my project",link:"/show-project",icon:j.Z},{name:"Create",link:"/new-project",icon:V.Z},{name:"Status",link:"/status",icon:N.Z},{name:"Documentation",link:"/documentation",icon:k}]}}}var R=(0,I.withRouter)(T);class b extends a.Component{render(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(R,{status:this.state.status,hideCallback:this.switchStatus}),(0,i.jsxs)("div",{className:h().root,children:[(0,i.jsx)(f,{state:this.state.status,callback:this.switchStatus}),(0,i.jsx)("div",{className:h().menu,children:(0,i.jsx)(o(),{href:"/",children:(0,i.jsx)(l(),{alt:"TEZOS LINK",src:d})})}),(0,i.jsx)("div",{className:h()["triangle-under-logo"]}),(0,i.jsx)("div",{className:h().logo,children:(0,i.jsx)(o(),{href:"/",children:(0,i.jsx)(l(),{alt:"entire stack",src:_})})}),(0,i.jsxs)("div",{className:h().button,children:[(0,i.jsx)(o(),{href:"/show-project",children:(0,i.jsx)(p.z,{color:"transparent",text:"MY PROJECT",icon:j.Z})}),(0,i.jsx)(o(),{href:"/new-project",children:(0,i.jsx)(p.z,{text:"CREATE",icon:V.Z})})]})]})]})}switchStatus(){this.state.status?this.setState({status:!1}):this.setState({status:!0})}constructor(t){super(t),this.state={status:!1},this.switchStatus=this.switchStatus.bind(this)}}var C=e(4876),L=e.n(C);class B extends(n=a.Component){render(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(b,{}),(0,i.jsx)("div",{className:L().root,children:(0,i.jsx)("div",{className:L().content,children:this.props.children})})]})}componentDidMount(){window.document.title=this.props.title,null!==this.props.scrollTop&&window.scrollTo(0,this.props.scrollTop)}}B.defaultProps={scrollTop:0}},5900:function(t,s,e){"use strict";e.d(s,{Z:function(){return i}});var n=e(7294);class i extends n.Component{}},6504:function(t,s,e){"use strict";e.r(s),e.d(s,{__N_SSP:function(){return m},default:function(){return x}});var n=e(5893),i=e(9211),a=e.n(i);function r(t){return(0,n.jsxs)("div",{className:a().StatusViewHeader,children:[t.nodeArchiveStatus&&t.nodeRollingStatus?(0,n.jsx)("div",{className:a().StatusViewIndicatorGreen}):(0,n.jsx)("div",{className:a().StatusViewIndicatorRed}),(0,n.jsxs)("div",{className:a().StatusViewTitle,children:["Nodes RPC services for ",t.network," are ",t.nodeArchiveStatus&&t.nodeRollingStatus?"online":"offline","."]}),(0,n.jsxs)("div",{className:a().StatusViewSubtitle,children:[t.nodeArchiveStatus?(0,n.jsx)("div",{className:a().StatusViewIndicatorGreenLittle}):(0,n.jsx)("div",{className:a().StatusViewIndicatorRedLittle})," Archive nodes are ",t.nodeArchiveStatus?"online":"offline","."]}),(0,n.jsxs)("div",{className:a().StatusViewSubtitle,children:[t.nodeRollingStatus?(0,n.jsx)("div",{className:a().StatusViewIndicatorGreenLittle}):(0,n.jsx)("div",{className:a().StatusViewIndicatorRedLittle})," Rolling nodes are ",t.nodeRollingStatus?"online":"offline","."]})]})}var o=e(3803),c=e.n(o);function l(t){return(0,n.jsxs)("div",{className:c().StatusViewHeader,children:[t.proxyStatus?(0,n.jsx)("div",{className:c().StatusViewIndicatorGreen}):(0,n.jsx)("div",{className:c().StatusViewIndicatorRed}),(0,n.jsxs)("div",{className:c().StatusViewTitle,children:["Proxy service for ",t.network," is ",t.proxyStatus?"online":"offline","."]}),(0,n.jsxs)("div",{className:c().StatusViewSubtitle,children:["As of ",t.date,"."]})]})}var d=e(5900),_=e(5467),u=e(9618),h=e.n(u);class p extends d.Z{render(){return(0,n.jsx)(_.Z,{title:"Status",children:(0,n.jsx)("div",{className:h().root,children:(0,n.jsxs)("div",{className:h().content,children:[(0,n.jsx)("h2",{children:"Services status"}),(0,n.jsx)(l,{proxyStatus:this.props.MainnetProxyStatus,network:"Mainnet",date:this.props.Date}),(0,n.jsx)(r,{nodeArchiveStatus:this.props.MainnetArchiveStatus,nodeRollingStatus:this.props.MainnetRollingStatus,network:"Mainnet"}),(0,n.jsx)(l,{proxyStatus:this.props.TestnetProxyStatus,network:this.props.TestnetName,date:this.props.Date}),(0,n.jsx)(r,{nodeArchiveStatus:this.props.TestnetArchiveStatus,nodeRollingStatus:this.props.TestnetRollingStatus,network:this.props.TestnetName})]})})})}constructor(t){super(t)}}var m=!0;function x(t){let s={MainnetProxyStatus:t.archive_node,MainnetArchiveStatus:t.archive_node,MainnetRollingStatus:t.rolling_node,TestnetName:"LIMANET",TestnetProxyStatus:t.archive_node,TestnetArchiveStatus:t.archive_node,TestnetRollingStatus:t.rolling_node,Date:new Date(Date.now()).toLocaleString()};return(0,n.jsx)(p,{...s})}},9474:function(t){t.exports={root:"classes_root__4Fle2",box:"classes_box__1IEVi",inner:"classes_inner__LW7Uu","inner-top":"classes_inner-top__qP_Rx",true:"classes_true__u9FcJ",BurgerTopForward:"classes_BurgerTopForward__I1LYv",false:"classes_false__bTN5A",BurgerTopBackward:"classes_BurgerTopBackward__MOWph","inner-middle":"classes_inner-middle__QePmH","inner-bottom":"classes_inner-bottom__mj3ZO",BurgerBottomForward:"classes_BurgerBottomForward__mL2pp",BurgerBottomBackward:"classes_BurgerBottomBackward__PDVPQ"}},9937:function(t){t.exports={root:"classes_root__E5gKU",clicked:"classes_clicked__aPe_V",clickWave:"classes_clickWave__UQWCU",primary:"classes_primary__BeagU",secondary:"classes_secondary__NYCty",transparent:"classes_transparent__er04s",loading:"classes_loading__j3BJK",text:"classes_text__P6__z",icon:"classes_icon__Hv8nm",ButtonLoadingIcon:"classes_ButtonLoadingIcon__AktTi",turn:"classes_turn__VIf6c",path:"classes_path__o84bV"}},2612:function(t){t.exports={shadow:"classes_shadow__pCyzh",true:"classes_true__r9vtG",root:"classes_root__MCUG5",false:"classes_false__yybRK",item:"classes_item__4Q3hN","current-path":"classes_current-path__wUhu3"}},9211:function(t){t.exports={StatusViewHeader:"classes_StatusViewHeader__zRzJR",StatusViewIndicatorGreen:"classes_StatusViewIndicatorGreen__2VNZq",StatusViewIndicatorGreenLittle:"classes_StatusViewIndicatorGreenLittle__khQUE",StatusViewIndicatorRed:"classes_StatusViewIndicatorRed__nXNoV",StatusViewIndicatorRedLittle:"classes_StatusViewIndicatorRedLittle__X7dVX",StatusViewTitle:"classes_StatusViewTitle__7V_EJ",StatusViewSubtitle:"classes_StatusViewSubtitle__fGyY_"}},3803:function(t){t.exports={StatusViewHeader:"classes_StatusViewHeader__TVuz8",StatusViewIndicatorGreen:"classes_StatusViewIndicatorGreen__WeCia",StatusViewIndicatorRed:"classes_StatusViewIndicatorRed__X9eJh",StatusViewTitle:"classes_StatusViewTitle__oVg8c",StatusViewSubtitle:"classes_StatusViewSubtitle__ilI4s"}},4876:function(t){t.exports={root:"classes_root__Ko1Z4"}},9618:function(t){t.exports={root:"classes_root__c8RoG",fadeInFromLeft:"classes_fadeInFromLeft__o1hdC",content:"classes_content__XcPKt",slideRightEnter:"classes_slideRightEnter__JLko4",slideRightExit:"classes_slideRightExit__pMWPH",slideLeftEnter:"classes_slideLeftEnter__uVvha",slideLeftExit:"classes_slideLeftExit__Sk1TY",fadeIn:"classes_fadeIn__Dkj2Z",fadeInFromRight:"classes_fadeInFromRight__dElWI",fadeInFromTop:"classes_fadeInFromTop__Us4Lg",fadeInFromBottom:"classes_fadeInFromBottom__j8OW9"}},2045:function(t){t.exports={root:"classes_root__Gt7iu","triangle-under-logo":"classes_triangle-under-logo__ewBGi",menu:"classes_menu__fGaI_",logo:"classes_logo__WoMPQ",button:"classes_button__DrJHV","top-menu-burger":"classes_top-menu-burger__i0TsK"}}},function(t){t.O(0,[614,774,888,179],function(){return t(t.s=9377)}),_N_E=t.O()}]);