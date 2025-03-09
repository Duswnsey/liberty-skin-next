"use client"
import Link from "next/link";
import md5 from "md5";

import "./bootstrap/css/bootstrap.min.css"
import "./css/default.css"
import "./css/default_mobile.css"
import "./css/wiki.css"
import "./css/only-mw.css"
import "./css/liberty.css"
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRouter as rt } from "next/router";
import dynamic from "next/dynamic";
// Server Component로 데이터 로딩
function Skin(props) {
	let data = props.data
	let user = data.user;
	let action = data.action;
	let LibertyUserSidebarSettings = user.setting.LibertyLayoutSidebar;
	let LibertyAdSetting = data.config.LibertyAdSetting;
	let LibertyMobileReplaceAd = data.config.LibertyMobileReplaceAd;
	let maincolor = "linear-gradient(to left, #248790, #223344, #234567)";
	let secondcolor = "#348790";
	const DefaultComponent = dynamic(() => import(`@/defaultcomponents/${data.action}`), {ssr:false})
	if (user.setting.LibertyMainColor != undefined) {
		maincolor=user.setting.LibertyMainColor
	} else if (data.config.LibertyMainColor != undefined) {
		maincolor=data.config.LibertyMainColor
	}
	if (user.setting.LibertyMainColor != undefined) {
		secondcolor=user.setting.LibertySecondColor
	} else if (data.config.LibertySecondColor != undefined) {
		secondcolor=data.config.LibertySecondColor
	}
	return (
	<>
	{user.setting.theme != undefined ? (
		user.setting.theme == "dark" && (
			<link rel="stylesheet" href="/skins/liberty-skin/css/dark.css" />
		)
	) : (
		process.env.NEXT_PUBLIC_DEFAULT_THEME == "dark" && (
			<link rel="stylesheet" href="/skins/liberty-skin/css/dark.css" />
		)
	)}
	<style>
		{`.Liberty .nav-wrapper, .Liberty .nav-wrapper .navbar .form-inline .btn:hover, .Liberty .nav-wrapper .navbar .form-inline .btn:focus, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link.active::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link:hover::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link:focus::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link:active::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-footer .label, .Liberty .content-wrapper .liberty-content .liberty-content-header .content-tools .tools-btn:hover, .Liberty .content-wrapper .liberty-content .liberty-content-header .content-tools .tools-btn:focus, .Liberty .content-wrapper .liberty-content .liberty-content-header .content-tools .tools-btn:active { background: ${maincolor};} .Liberty .nav-wrapper .navbar .form-inline .btn:hover, .Liberty .nav-wrapper .navbar .form-inline .btn:focus { border-color: ${secondcolor};} .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link.active::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link:hover::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link:focus::before, .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-header .nav .nav-item .nav-link:active::before { border-bottom: 2px solid; border-image: ${maincolor};;} .Liberty .content-wrapper .liberty-sidebar .live-recent-wrapper .live-recent .live-recent-footer .label:hover, .Liberty .nav-wrapper .navbar .navbar-nav .nav-item .nav-link:hover, .Liberty .nav-wrapper .navbar .navbar-nav .nav-item .nav-link:focus, .dropdown-menu .dropdown-item:hover { background-color: ${secondcolor}; } .Liberty .content-wrapper #liberty-bottombtn, .Liberty .content-wrapper #liberty-bottombtn:hover {background: ${maincolor};}`}
	</style>
	<link rel="stylesheet" href="//use.fontawesome.com/releases/v5.13.1/css/all.css" />
	<link rel="stylesheet" href="//use.fontawesome.com/releases/v5.13.1/css/v4-shims.css" />
	<link href="https://fonts.googleapis.com/css?family=Dokdo|Gaegu|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Noto+Serif+KR|Noto+Sans+KR&display=swap&subset=korean" rel="stylesheet"></link>
	<script async src="https://unpkg.com/share-api-polyfill/dist/share-min.js"></script>
	<Script src="/skins/liberty-skin/js/lib/jquery.js" />
		<Script src="/skins/liberty-skin/js/lib/jquery.ba-throttle-debounce.js" strategy="beforeInteractive"/>
		<Script src="/skins/liberty-skin/js/lib/bootstrap.min.js" />
		<Script src="/skins/liberty-skin/js/layout.js" />
		<Script src="/skins/liberty-skin/js/table.js" />
		<Script src="/skins/liberty-skin/js/disable-notice.js" />
		<Script src="/skins/liberty-skin/js/delay-scrolling.js" />
		<Script src="/skins/liberty-skin/js/scroll-button.js" />
		<header>
			<div className="nav-wrapper navbar-fixed-top">
				{navMenu(data)}
			</div>
		</header>
		<section>
			<div className="content-wrapper">
				{LibertyUserSidebarSettings === false && (
					<aside>
						<div className="liberty-sidebar">
							<div className="live-recent-wrapper">
								{liveRecent(data)}
							</div>
							{LibertyAdSetting['right'] != undefined && LibertyAdSetting['right'] && (
								buildAd( 'right', data )
							)}
						</div>
					</aside>
					)}
				<div className="container-fluid liberty-content">
					<div className="liberty-content-header">
						{data.sitenotice &&  (
							<div className="alert alert-dismissible fade in alert-info liberty-notice" role="alert">
								<button type="button" className="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								{data['sitenotice']}
							</div>
						)}
						{LibertyAdSetting['header'] != undefined && LibertyAdSetting['header'] && (
							buildAd( 'header', data )
						)}
						{data.actiontype == "document" &&(
							contentsToolbox(data)
						)}
						<div className="title">
							<h1 style={{display:"inline-block"}} id="title">
								{data.namespace}
							</h1>
							<h1 style={{display:"inline-block"}} id="title">
								:
							</h1>
							<h1 style={{display:"inline-block"}} id="title">
								{data.title}
							</h1>
						</div>
					</div>
					<div className="liberty-content-main" id="content">
						{data['newtalk'] && (
							<div className="usermessage">{data['newtalk']}</div>
						)}
						{data['catlinks'] && (
							<div>{data['catlinks']}</div>
						)}
						{data.hasdefault == true && (
							<DefaultComponent />
						)}
						<article className="mw-body-content" id="mw-content-text" dangerouslySetInnerHTML={{ __html: data.bodycontent }} />
						
						{LibertyAdSetting['belowarticle'] != undefined && LibertyAdSetting['belowarticle'] && (
							buildAd( 'belowarticle', data )
						)}
					</div>
					<footer>
						<div className="liberty-footer">
							{data['dataAfterContent'] && (
								data['dataAfterContent']
							)}
							{LibertyAdSetting['bottom'] != undefined && LibertyAdSetting['bottom'] (
								buildAd( 'bottom', data )
							)}
							{
								LibertyMobileReplaceAd != undefined && LibertyMobileReplaceAd &&
								LibertyAdSetting['right'] != undefined && LibertyAdSetting['right'] &&
								(
									<div className="mobile-ads"></div>
								)
							}
							{footer(data)}
						</div>
					</footer>
					<div id="liberty-bottombtn">
						<div className="scroll-button" id="liberty-scrollup"><i className="fas fa-angle-up"></i></div>
						<div className="scroll-button" id="liberty-scrolldown"><i className="fas fa-angle-down"></i></div>
					</div>
				</div>
			</div>
		</section>
		{LibertyAdSetting['client'] != undefined && LibertyAdSetting['client'] && (
			<script async defer src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		)}
		{loginModal(data)}
		{data['debughtml']}
	</>
  );
}
function navMenu(data) {
	let skin = data["skin"];
	return (
		<nav className="navbar navbar-dark">
			<Link className="navbar-brand" href={"/w/"+process.env.NEXT_PUBLIC_FRONTPAGE}></Link>
			<ul className="nav navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" href="/recentchange"><span className="fas fa-sync"></span><span className="hide-title">{data.lang["recentchange"]}</span></Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" href="/randompages"><span className="fa fa-random"></span><span className="hide-title">{data.lang['randompage']}</span></Link>
				</li>
				{renderPortal(parseNavbar(data), data)}
			</ul>
			{loginBox(data)}
			{searchBox(data)}
		</nav>
	);
}
function liveRecent (data) {
	let LibertyEnableLiveRC = data.config.LibertyEnableLiveRC;
	let LibertyMaxRecent = data.config.LibertyMaxRecent;
	let LibertyLiveRCArticleNamespaces = data.config.LibertyLiveRCArticleNamespaces;
	let LibertyLiveRCTalkNamespaces = data.config.LibertyLiveRCTalkNamespaces;
	if ( !LibertyEnableLiveRC ) {
		return;
	}
	let skin = data['skin'];

	let articleNS = LibertyLiveRCArticleNamespaces.join('|');
	let talkNS = LibertyLiveRCTalkNamespaces.join('|');
	return (
		<div className="live-recent" data-article-ns={articleNS} data-talk-ns={talkNS}>
			<div className="live-recent-header">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a href="javascript:" className="nav-link active" id="liberty-recent-tab1">
							{skin.msg['recentchanges']}
						</a>
					</li>
					<li className="nav-item">
						<a href="javascript:" className="nav-link" id="liberty-recent-tab2">
							{skin.msg['liberty-recent-discussions']}
						</a>
					</li>
				</ul>
			</div>
			<div className="live-recent-content">
				<ul className="live-recent-list" id="live-recent-list">
				{new Array(LibertyMaxRecent).fill(null).map((_, index) => (
					<li key={index}>
						<span className="recent-item">&nbsp;</span>
					</li>
				))}
				</ul>
			</div>
			<div className="live-recent-footer">
				<Link href="/Recentchanges"><span className="label label-info">{skin.msg['liberty-view-more']}</span></Link>
			</div>
		</div>
	);
}
function buildAd( position, data) {
	let LibertyAdSetting = data.config.LibertyAdSetting;
	let adFormat = 'auto';
	let fullWidthResponsive = true;
	if (position === 'header') {
		adFormat = 'horizontal';
		fullWidthResponsive = 'false';
	}
	return (
		<div className={position+"-ads"}>
			<ins className="adsbygoogle" 
				data-full-width-responsive={fullWidthResponsive} 
				data-ad-client={LibertyAdSetting['client']} 
				data-ad-slot={LibertyAdSetting[position]}
				data-ad-format={adFormat}>
			</ins>
		</div>
	);
}
function contentsToolbox(data) {
	if (data.CanDoWithThisDoc != undefined) {
		let user = data.user;
		let title = data.title;
		let watched = data.stared;
			let editable = data.CanDoWithThisDoc["edit"];
			let action = data.action
			if (action == undefined) {
				action = "view";
			}
			let companionTitle = "";
			if (title.isTalkPage == true) {
				companionTitle=title.SubjectPage
			} else {
				companionTitle=title.TalkPage;
			}
			return (
				<div className="content-tools">
					<Script strategy="lazyOnload">{`
					$( '.tools-share' ).click( function () {
						'use strict';
						var ns, title, url, host;
						host = "${process.env.NEXT_PUBLIC_WIKI_URL}"
						if ( host.startsWith( '//' ) ) {
							host = location.protocol + host;
						}
						ns = "${data.namespace}";
						title = "${data.title}";
						if ( ns ) {
							title = ns+":"+title;
						}
						url = host + "w/"+ns+":"+title;
						navigator.share( {
							title: title,
							text: title + ' - ' + "caki",
							url: url,
							hashtags: [ "${process.env.NEXT_PUBLIC_WIKI_NAME}".replace( / /g, '_' ) ]
						} )
						.catch( function ( error ) {
							console.error( 'Share API error: ', error );
						} );
} );
					`}</Script>
					<div className="btn-group" role="group" aria-label="content-tools">
					
						{action != "edit" && (
							/* TODO accessKey 스킨에서 설정 가능하게 만들기 */
							<Link title={data.lang["edit_title"]} accessKey="e" className="btn btn-secondary tools-btn" id="ca-edit"  href={"/edit/"+encodeURIComponent(title.Namespaces+":"+title.name)}>
								{editable && (<i className="fa fa-edit"></i>)}
								{!editable && (<i className="fa fa-lock"></i>)}
								{data.lang["edit"]}
							</Link>
						)}
						{data.action != "watch" && (
							<Link href={`/w/${encodeURIComponent(data.namespace)}:${encodeURIComponent(data.title)}`} title="본문" accessKey="c" className="btn btn-secondary tools-btn">본문</Link>
						)}
						{(data.action != "talk" || data.action != "talks") && (
							<Link href={`/talks/${encodeURIComponent(data.namespace)}/${encodeURIComponent(data.title)}`} title="토론" accessKey="c" className="btn btn-secondary tools-btn">토론</Link>
						)}
						{data.action != "history" && (
							<Link href={`/history/${encodeURIComponent(data.namespace)}/${encodeURIComponent(data.title)}`} title="역사" accessKey="h" className="btn btn-secondary tools-btn">력사</Link>
						)}
						{action == "watch" && (
							<button type="button" className="btn btn-secondary tools-btn tools-share">
								<i className="far fa-share-square"></i>
								공유
							</button>
						)}
						<button type="button" className="btn btn-secondary tools-btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
							<span className="caret"></span>
						</button>
						<div className="dropdown-menu dropdown-menu-right" role="menu">
							{title.Namespaces != undefined && (
							title.Namespaces.includes("사용자") || title.Namespaces.includes("사용자토론")) && (
								<Link href={"/contributions/"+title.text} className="dropdown-item" title={"사용자 "+title.text+"의 기여 내역을 조회합니다."}>사용자 기여</Link>
							
							)}
							<Link href={`/w/${encodeURIComponent(data.namespace)}:${encodeURIComponent(data.title)}`} accessKey="p" className="dropdown-item" title="새로 고침">새로 고침</Link>
							<Link href={watched == true ? ("/unwatch/"+encodeURIComponent(title.Namespaces+":"+title.name)) : ("/watch/"+encodeURIComponent(title.Namespaces+":"+title.name))} accessKey="w" className="dropdown-item" title={watched ? ("별찜 해제") : ("별찜")}>{watched ? ("별찜 해제") : ("별찜")}</Link>
							<Link href={"/backlink/"+title.SubjectPage} className="dropdown-item" title="역링크" accessKey="j">역링크</Link>
							<Link href={"/info/"+title.SubjectPage} className="dropdown-item" title="정보" accessKey="j">정보</Link>
							{data.CanDoWithThisDoc["move"] && (
								<Link href={"/move/"+title.SubjectPage} className="dropdown-item" title="이동">이동</Link>
							)}
								<Link href={"/acl/"+title.Namespaces+"/"+title.name} className="dropdown-item" title="acl">acl</Link>
							{data.CanDoWithThisDoc["delete"] && (
							//TODO access키 찾기
								<Link href={"/delete/"+title.SubjectPage} className="dropdown-item" title="삭재">삭재</Link>
							)}
						</div>
					</div>
				</div>
			);
	}
}
function footer(data) {
	let footericons = data["footericons"];
	return (
		<>
			{Object.entries(data.Footers).map(([k, v]) => (
				<ul key={k+"-ul"} className={"footer-"+k}>
					<li key={"footer-"+k+"-li"} className={"footer-"+k+"-li"} dangerouslySetInnerHTML={{ __html: v}} />
				</ul>
			))}
			<ul className="footer-icons">
			{Object.entries(footericons).length !== 0 && (
  				Object.entries(footericons).map(([blockName, icons]) => (
    				<li key={blockName} className={`footer-${blockName}ico`}>
      				{Object.values(icons).map(icon => (
        				<a key={icon.website} href={icon.website}>
          					<img src={icon.image} style={{height: "31px"}} alt={icon.alt} />
    					</a>
      				))}
    				</li>
  				))
			)}
				<li className="designedbylibre">
					<a href="https://librewiki.net">
						<img src="/skins/liberty-skin/img/designedbylibre.png" style={{height:"31px"}} alt="Designed by Librewiki" />
					</a>
				</li>
				<li className="portebycaki">
					<a href="">
						<img src="/skins/liberty-skin/img/portedbynootnoot.png" style={{height:"31px"}}alt="Skin Ported By NootNoot" />
					</a>
				</li>
			</ul>
		</>
	)
}
function loginModal (data) {
	const [name, setname] = useState("")
	const [password, setpassword] = useState("")
	const [autologin, setautologin] = useState(false)
	const [wrong, setwrong] = useState("none");
	const on_change_name = (e) => {
		setname(e.target.value)
	};
	const on_change_password = (e) => {
		setpassword(e.target.value)
	};
	const on_change_autologin = (e) => {
		setautologin(!autologin)
	};
	useEffect(() => {
		setwrong("none")
	}, [name, password])
	if (data.title != undefined) {
		let title = data.title;
		let returnto = undefined;
		let easteregg = false;
		const submit = (e) => {
			e.preventDefault()
			fetch(`${process.env.NEXT_PUBLIC_WIKI_URL}/api/login`, {
				method:"POST",
				body:JSON.stringify({
					name:name,
					password:password,
					autologin:autologin
				})
			}).then(async (res) => {
				let resp = await res.json()
				if (resp.message == "suc") {
					window.location.href = "/"+decodeURIComponent(returnto)
				} else {
					setwrong("block")
				}
			})
		}
		if (data.actiontype == "document") {
			returnto = `/w/${encodeURIComponent(data.namespace)}:${encodeURIComponent(data.title)}`
		}
		if ( data.user.isRegistered == true ) {
				return;
		}
		
		return (
			<div className="modal fade login-modal" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="login-modalLabel" aria-hidden="true">
				<div className="modal-dialog modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">{data.lang["login"]}</h4>
						</div>
						<div className="modal-body">
							<div id="modal-login-alert" className="alert alert-hidden alert-danger" role="alert">
							</div>
							<form id="modal-loginform" name="userlogin" className="modal-loginform" method="post" action={"/login/"+returnto}>
								<input onChange={on_change_name} className="loginText form-control" id="wpName1" tabIndex="1" placeholder="사용자 이름을 입력하세요" defaultValue="" name="lgname" />
								<label htmlFor="inputPassword" className="sr-only">비밀번호</label>
								<input onChange={on_change_password} className="loginPassword form-control" id="wpPassword1" tabIndex="2" placeholder="비밀번호를 입력하세요" type="password" name="lgpassword" />
								<div className="modal-checkbox">
									<input onChange={on_change_autologin} name="lgremember" type="checkbox" id="lgremember" tabIndex="3" />
									<label htmlFor="lgremember">로그인 상태를 유지하기</label>
								</div>
								<small style={{color:"red", display:wrong}}>뭔가 잘못됨</small>
								<input onClick={submit} className="btn btn-success btn-block" type="submit" defaultValue="로그인" tabIndex="4" />
								<a className="btn btn-primary btn-block" tabIndex={5} href={"/register/"+encodeURIComponent(returnto)}>{data.lang["register"]}</a>
								<a href={"/resetpassword/"+returnto} >비밀번호를 잊으셨나요?</a>
								<br />
								{easteregg ? (
									<a title="로그인 페이지를 뒤로두고 굳이 스킨의 로그인 창을 여시다니...! 그럼 이 페이지는 왜 방문했나요?" data-dismiss="modal" aria-label="Close" aria-hidden="true">평범한 방법으로 로그인하기</a>
								) : (
									<a href={"/login/"+encodeURIComponent(returnto)}>다른 방법으로 로그인하기</a>
								)}
								
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function renderPortal(contents, data) {
	let skin = data["skin"]
	let user = data.user;
	let userGroup = user.usergroups;
	let userRights = user.userRights;
	//TODO 여기있는 foreach. 씨퓨타임 낭비가 너무 심하다. for문으로 바꾸자.
	return (
		<>
			{Object.values(contents).forEach(content => {
				if (content == undefined) {
					return;
				}
				if (content["right"] != undefined && content["right"].includes(userRights) || content["group"] != undefined && content["group"].includes(userGroup)) {
					return;
				}
				content["classes"] = content["classes"].concat(" nav-link")
				if ( Array.isArray(content['children']) && content['children'].length() > 1 ) {
					content["classes"] = content["classes"].concat(" dropdown-toggle dropdown-toggle-fix")
				}
				{
					<li className="dropdown nav-item">
						<a className={$content['classes']} role="button" data-toggle={Array.isArray(content['children'])} aria-haspopup="true" aria-expanded="true" title={content['title']} href={content['href']}>
							{content["icon"] != undefined && (
								<span className={"fa fa-"+content["icon"]}></span>
							)}
							{content["text"] != undefined && (
								<span className="hide-title">{content["text"]}</span>
							)}
						</a>
						{Array.isArray(content["children"]) && content["children"].length() != 0 && (
							<div className="dropdown-menu" role="menu">
								{
									Object.values(content["children"]).forEach(child => {
										if (child["right"] != undefined && child["right"].includes(userRights) || child["group"] != undefined && child["group"].includes(userGroup)) {
											return;
										}
										child["classes"] = child["classes"].concat(" dropdown-item")
										if (Array.isArray(child["children"])) {
											child["classes"] = child["classes"].concat(" dropdown-toggle dropdown-toggle-sub")
										}
										{
											<a accessKey={child["access"]} className={child["classes"]} href={child["href"]} title={child["title"]}>
												{child["icon"] != undefined && (
													<span className={"fa fa-"+child['icon']}></span>
												)}
												{content["text"] != undefined && (
													child["text"]
												)}
											</a>
										}
										{Array.isArray(content['children']) && content['children'].length() > 2 && Object.entries(child["children"]).length != 0 && (
											<div className="dropdown-menu" role="menu">
											{
												Object.values(content["children"]).forEach(child => {
													if (child["right"] != undefined && child["right"].includes(userRights) || child["group"] != undefined && child["group"].includes(userGroup)) {
														return;
													}
													child["classes"] = child["classes"].concat(" dropdown-item")
													if (Array.isArray(child["children"])) {
														child["classes"] = child["classes"].concat(" dropdown-toggle dropdown-toggle-sub")
													}
													{
														<a accessKey={child["access"]} className={child["classes"]} href={child["href"]} title={child["title"]}>
															{child["icon"] != undefined && (
																<span className={"fa fa-"+child['icon']}></span>
															)}
															{content["text"] != undefined && (
																child["text"]
															)}
														</a>
													}
												})
											}
											</div>
										)}
									})
								}
							</div>
						)}
					</li>
				}
			})
		}
		</>
	)
}
function parseNavbar (datas) {
	let LibertyNavbar = datas.config.LibertyNavbar;
	let headings = [];
	let userlang = datas.user.lang;
	let data = undefined;
	let globalData = LibertyNavbar.data;
	let globalLangData = LibertyNavbar[userlang];
	let level2Children = undefined;
	let level3Children = undefined;
	//TODO 사용자 커스텀 지원하기
	let UserData = undefined;
	if (UserData != undefined) {
		data = UserData;
	} else if (globalLangData != undefined) {
		data = globalLangData;
	} else {
		data = globalData
	}
		if ( data == undefined ) {
			return headings;
		}
		let lines = data.split("\n");
		let types = [ 'icon', 'display', 'title', 'link', 'access', 'class' ];
		Object.values(lines).forEach(line => {
			line = line.replace(/\r+$/, "");
			if (line[0] !== "*") {
				return;
			}
			if (line[1] !== "*") {
				let href = undefined;
				let text = undefined;
				let icon = undefined;
				let right = undefined;
				let group = undefined;
				let title = undefined;
				let access = undefined;
				let classes = undefined;
				data = [];
				let split = line.split("|");
				split[0] = split[0].substr(1);
				Object.entries(split).forEach(([key, value]) => {
					let valueArr = value.trim().split("=");
					if (valueArr[1] != undefined) {
						let newValue = valueArr.slice(1).join("=");
						data[valueArr[0]] = newValue;
					} else {
						data[types[key]] = value.trim();
					}
				})
				if (data["icon"] != undefined) {
					icon = data["icon"];
				}
				if (data["group"] != undefined) {
					group = data["group"];
				}
				if (data["right"] != undefined) {
					right = data["right"];
				}
				if (data["display"] != undefined) {
					let textObj = datas.lang[data["display"]];
					if (textObj == undefined) {
						if ([data["link"] != undefined]) {
							href = data["link"]
						}
					} else {
						text = textObj.text();
					} 
				} else {
					text = "";
				}
				if (icon == undefined && text == undefined) {
					return;
				}
				if (data["title"] != undefined) {
					let titleObj = datas.lang[data["title"]];
					if (titleObj == undefined) {
						title = data["title"];
					} else {
						title = titleObj.text();
					}
				} else {
					if (text != undefined) {
						title = text;
					}
				}
				if (data["link"] != undefined) {
					if (/^((?:(?:http(?:s)?)?:)?\/\/(?:.{4,}))$/i.exec(data["link"])) {
						href = data["link"];
					} else {
						href = encodeURI(data["link"]).replace("%3A", ":");
						href = "/w/$1/".replace("$1", href);
					}
				} else {
					href = undefined;
				}
				if (data["access"] != undefined) {
					if (/^([0-9a-z]{1})$/i.exec(data["access"])) {
						access = data['access']
					} else {
						access = undefined;
					}
				}
				if (data["class"] != undefined) {
					classes = data["class"].split(",");
					Object.entries(classes).forEach(([key, value]) => {
						classes[key] = value.trim();
					})
				} else {
					classes = [];
				}
				let item = {
					"access" : access,
					"classes" : classes,
					"href" : href,
					"icon" : icon,
					"text" : text,
					"title" : title,
					"group" : group,
					"right" : right
				};
				level2Children = item["children"];
				headings.push(item);
				return;
			}
			if (line[2] !== "*") {
				let href = undefined;
				let text = undefined;
				let icon = undefined;
				let right = undefined;
				let group = undefined;
				let title = undefined;
				let access = undefined;
				let classes = undefined;
				data = [];
				let split = line.split("|");
				split[0] = split[0].substr(2);
				Object.entries(split).forEach(([key, value]) => {
					let valueArr = value.trim().split("=");
					if (valueArr[1] != undefined) {
						data[valueArr[0]] = valueArr[1];
					} else {
						data[types[key]] = value.trim();
					}
				})
				if (data["icon"] != undefined) {
					icon = data["icon"];
				}
				if (data["group"] != undefined) {
					group = data["group"];
				}
				if (data["right"] != undefined) {
					right = data["right"];
				}
				if (data["display"] != undefined) {
					let textObj = datas.lang[data["display"]];
					if (textObj == undefined) {
						if ([data["link"] != undefined]) {
							href = data["link"]
						}
					} else {
						text = textObj.text();
					} 
				} else {
					text = "";
				}
				if (icon == undefined && text == undefined) {
					return;
				}
				if (data["title"] != undefined) {
					let titleObj = datas.lang[data["title"]];
					if (titleObj == undefined) {
						title = data["title"];
					} else {
						title = titleObj.text();
					}
				} else {
						title = text;
				}
				if (data["link"] != undefined) {
					if (/^((?:(?:http(?:s)?)?:)?\/\/(?:.{4,}))$/i.exec(data["link"])) {
						href = data["link"];
					} else {
						href = encodeURI(data["link"]).replace("%3A", ":");
						href = "/w/$1/".replace("$1", href);
					}
				}
				if (data["access"] != undefined) {
					if (/^([0-9a-z]{1})$/i.exec(data["access"])) {
						access = data['access']
					} else {
						access = undefined;
					}
				} else {
					href = undefined;
				}
				if (data["class"] != undefined) {
					classes = data["class"].split(",");
					Object.entries(classes).forEach(([key, value]) => {
						classes[key] = value.trim();
					})
				} else {
					classes = [];
				}
				let item = {
					"access" : access,
					"classes" : classes,
					"href" : href,
					"icon" : icon,
					"text" : text,
					"title" : title,
					"group" : group,
					"right" : right
				};
				level3Children = item["children"];
				level2Children.push(item);
				return;
			}
			if (line[3] !== "*") {
				let href = undefined;
				let text = undefined;
				let icon = undefined;
				let right = undefined;
				let group = undefined;
				let title = undefined;
				let access = undefined;
				let classes = undefined;
				data = [];
				let split = line.split("|");
				split[0] = split[0].substr(3);
				Object.entries(split).forEach(([key, value]) => {
					let valueArr = value.trim().split("=");
					if (valueArr[1] != undefined) {
						data[valueArr[0]] = valueArr[1];
					} else {
						data[types[key]] = value.trim();
					}
				})
				if (data["icon"] != undefined) {
					icon = data["icon"];
				}
				if (data["group"] != undefined) {
					group = data["group"];
				}
				if (data["right"] != undefined) {
					right = data["right"];
				}
				if (data["display"] != undefined) {
					let textObj = datas.lang[data["display"]];
					if (textObj == undefined) {
						if ([data["link"] != undefined]) {
							href = data["link"]
						}
					} else {
						text = textObj.text();
					} 
				} else {
					text = "";
				}
				if (icon == undefined && text == undefined) {
					return;
				}
				if (data["title"] != undefined) {
					let titleObj = datas.lang[data["title"]];
					if (titleObj == undefined) {
						title = data["title"];
					} else {
						title = titleObj.text();
					}
				} else {
						title = text;
				}
				if (/^((?:(?:http(?:s)?)?:)?\/\/(?:.{4,}))$/i.exec(data["link"])) {
					href = data["link"];
				} else {
					href = encodeURI(data["link"]).replace("%3A", ":");
					href = "/w/$1/".replace("$1", href);
				}
				if (data["access"] != undefined) {
					if (/^([0-9a-z]{1})$/i.exec(data["access"])) {
						access = data['access']
					} else {
						access = undefined;
					}
				} else {
					href = undefined;
				}
				if (data["class"] != undefined) {
					classes = data["class"].split(",");
					Object.entries(classes).forEach(([key, value]) => {
						classes[key] = value.trim();
					})
				} else {
					classes = [];
				}
				let item = {
					"access" : access,
					"classes" : classes,
					"href" : href,
					"icon" : icon,
					"text" : text,
					"title" : title,
					"group" : group,
					"right" : right
				};
				level3Children.push = item;
				return;
			} else {
				return
			}
		})
	return headings;
}
function loginBox (data) {
	let LibertyUseGravatar = data.config.LibertyUseGravatar;
	let skin = data["skin"];
	let user = data.user;
	let title = data.title;
	if (title != undefined) {
		let returnto = (data.actiontype == "document" ? (`/w/${encodeURIComponent(data.namespace)}:${encodeURIComponent(data.title)}`) : (`/w/${encodeURIComponent(process.env.NEXT_PUBLIC_FRONTPAGE)}`)) 
		return (
			<div className="navbar-login">
			  {user.isRegistered ? (
				<>
				  <div className="dropdown login-menu">
					<a className="dropdown-toggle" type="button" id="login-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{LibertyUseGravatar ? (
					user.EmailAuthenticationTimestamp ? (
					  <img className="profile-img" src={"//secure.gravatar.com/avatar/" + md5(user.name.trim().toLowerCase()) + "?d=identicon"} />
					) : (
					  <img className="profile-img" src="//secure.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y" />
					)
				  ) : (
					<div></div>
				  )}
					</a>
					<div className="dropdown-menu dropdown-menu-right login-dropdown-menu" aria-labelledby="login-menu">
					  <Link id="pt-userpage" className="dropdown-item" title="내 사용자 문서" accessKey="." href={"./사용자:" + user.name}>
						
						{user.perms.includes(" owner ") ? (
							<b>{user.name} (서버장)</b>
						) : (
							<>
								{user.perms.includes(" admin ") ? (
									<>{user.name} (관리자)</>
								) : (
									<>{user.name}</>
								)}
							</>
						)}
					  </Link>
					  <div className="dropdown-divider"></div>
					  <Link href={"/contributions/" + user.name} className="dropdown-item" title="내 기여 목록" accessKey="y">기여</Link>
					  <Link href={"/talk/사용자:" + user.name} className="dropdown-item" title="사토" accessKey="n">사토</Link>
					  <Link href={"/watchlist/" + user.name} className="dropdown-item" title="주시문서 목록" accessKey="l">주시문서 목록</Link>
					  <div className="dropdown-divider"></div>
					  {(user.perms.includes(" owner ") || user.perms.includes(" edit_group ")) && (
						<Link href={"/groups"} className="dropdown-item" title="그룹 편집">그룹 편집</Link>
					  )}
					  {(user.perms.includes(" owner ") || user.perms.includes(" login_history ")) && (
						<Link href={"/loginhistory"} className="dropdown-item" title="로그인 기록">로그인 내역</Link>
					  )}
					  {(user.perms.includes(" owner ") || user.perms.includes(" grant_group ")) && (
						<Link href={"/"} className="dropdown-item" title="그룹 부여">그룹 부여</Link>
					  )}
					  {user.perms.includes(" owner ") && (
						<Link href={"/config"} className="dropdown-item" title="위키 설정">위키 설정</Link>
					  )}
					  {(user.perms.includes(" owner ") ||user.perms.includes(" site_notice ")) && (
						<Link href={"#"} className="dropdown-item" title="공시 설정">공지 설정</Link>
					  )}
					  <div className="dropdown-divider"></div>
					  <Link href={"/preference/"} className="dropdown-item" title="환경설정">{data.lang["preference"]}</Link>
					  <div className="dropdown-divider view-logout"></div>
					  <a href={"/logout/"+encodeURIComponent(returnto)} className="dropdown-item view-logout">로그아웃</a>
					</div>
				  </div>
		  
				  <a href={"/logout/"+encodeURIComponent(returnto)} className="hide-logout logout-btn" title="로그아웃">
					<span className="fa fa-sign-out"></span>
				  </a>
				</>
			  ) : (
				<a href="#" className="none-outline" data-toggle="modal" data-target="#login-modal">
				  <span className="fa fa-sign-in"></span>
				</a>
			  )}
			</div>
		  );
	}
}
/* 그런 거 없다.
function getNotification () {

}
*/
function searchBox (data) {
	const router = useRouter()
	const [inputValue, setInputValue] = useState('');
	const [results, setresults] = useState([]);
	const [lastresult, setlastresult] = useState([]);
	function move(page) {
		document.getElementById("searchInput").style.borderBottomLeftRadius = ".35rem"
		document.getElementById("searchButton").style.borderBottomRightRadius = ".35rem"
		document.getElementById("searchResults").style.display = "none"
		router.push(`/w/${page.namespace}:${page.title}`)
	}
	async function handleChange(event) {
		event.preventDefault()
		setInputValue(event.target.value)
		if (event.target.value != undefined && event.target.value != "") {
			const res = await fetch(`${process.env.NEXT_PUBLIC_WIKI_URL}/api/search/${encodeURIComponent(event.target.value)}`, {method:"GET"})
			//..을 넣으면 인젝션이 되니까 나중에 post로 바꿀 예정
			const resp = await res.json()
			if (resp.body.length != 0) {
				document.getElementById("searchInput").style.borderBottomLeftRadius = 0
				document.getElementById("searchButton").style.borderBottomRightRadius = 0
				setlastresult(resp.body.pop())
				console.log(resp)
				setresults(resp.body)
				document.getElementById("searchResults").style.display = "block"
			}
			
		} else {
			document.getElementById("searchInput").style.borderBottomLeftRadius = ".35rem"
			document.getElementById("searchButton").style.borderBottomRightRadius = ".35rem"
			document.getElementById("searchResults").style.display = "none"
		}
	}
		let skin = data["skin"];
		//TODO 이거 동적으로 바꾸기
		return (
		<form action="/search" id="searchform" className="form-inline">
			
			<input type="hidden" name="title" defaultValue="리버티 스킨 검색" />
			<div className="input-group">
			<input autoComplete="off" onChange={handleChange} type="search" name="search" placeholder="caki 검색" aria-label="caki 검색" autoCapitalize="sentences" title="리브레 위키 검색 [alt-shift-f]" accessKey="f" className="form-control" id="searchInput" />
				<span className="input-group-btn">
				<Link href={"/randompage"} className="btn btn-secondary"><span className="fa fa-random"></span></Link>
					<Link href={inputValue} name="go" defaultValue="갑시다."id="searchGoButton" className="btn btn-secondary"><span className="fa fa-eye"></span></Link>
					<button type="submit" name="fulltext" defaultValue="검색합니다"id="searchButton" className="btn btn-secondary">
						<span className="fa fa-search"></span></button>
				</span>
			</div>
			<div id="searchResults" style={{position:"relative",display:"none"}}>
				<div style={{background:"#1f2023",position:"absolute",width:"100%",border:"1px solid",borderBottomLeftRadius:".35rem",borderBottomRightRadius:".35rem",borderColor:"#555"}}>
					{results.map((res) => {
						return (<div onClick={(e) => {e.preventDefault(); move(res)}} key={res.namespace+":"+res.title} className="btn-secondary tools-btn" style={{position:"relative",width:"100%",textAlign:"left", borderRadius:"0", backgroundColor:"transparent"}}>{res.namespace}:{res.title}</div>)
					})}
					<div className="btn-secondary tools-btn" onClick={(e) => {e.preventDefault(); move(lastresult)}} style={{position:"relative",width:"100%",textAlign:"left", borderRadius:"0", borderBottomLeftRadius:".35rem",borderBottomRightRadius:".35rem", backgroundColor:"transparent"}}>{lastresult.namespace}:{lastresult.title}</div>
				</div>
			</div>
		</form>
	)
}
function Loginpage (props) {
	const router = useRouter();
	let returnto = props.returnto;
	let lang = props.lang;
	const [name, setname] = useState("");
	const [password, setpassword] = useState("");
	const [autologin, setautologin] = useState(false);
	const [isinvalidname, setisinvalidname] = useState("none");
	const on_change_name = (e) => {
		setname(e.target.value)
	};
	const on_change_password = (e) => {
		setpassword(e.target.value)
	};
	const on_change_autologin = (e) => {
		setautologin(!autologin)
	};
	const submit = (e) => {
		e.preventDefault();
		fetch (`${process.env.NEXT_PUBLIC_WIKI_URL}/api/login`, {
			method: "POST",
			body: JSON.stringify({
				name:name,
				password:password,
				autologin:autologin
			})
		})
		.then(async (res) => {
			let result = await res.json();
			if (result.message == "suc") {
				window.location.href = "/"+decodeURIComponent(returnto)
			} else if (result.message == "wrong") {
				setisinvalidname("block")
			} else {
				console.log(result)
			}
		})
	}
	return (
		<>
		<div className="form-group">
			<label>{lang["name"]}</label>
			<input type="id" defaultValue="" tabIndex="1" className="loginText form-control" onChange={on_change_name} placeholder={lang["insert_name"]} />
		</div>
		<div className="form-group">
			<label>{lang["password"]}</label>
			<input type="password" defaultValue="" tabIndex="2" className="loginText form-control" onChange={on_change_password} placeholder={lang["insert_password"]} />
		</div>
		<div className="form-group form-check">
			<input type="checkbox" tabIndex="3" className="form-check-input" onClick={on_change_autologin} />
			<label className="form-check-label">{lang["auto_login"]}</label>
		</div>
		<small style={{color:"red", display:isinvalidname}} className="form-text text-muted">뭔가 틀렸습니다.</small>
		<div className="form-group">
		<button onClick={submit} style={{width:"100%"}} className="btn">{lang["login"]}</button>
		</div>
		<Link href={`/register/${returnto}`}><button style={{width:"100%"}} className="btn btn-primary">{lang["register"]}</button></Link>
		</>
	);
}
function Registerpage (props) {
	let router = useRouter();
	let returnto = props.returnto;
	const [name, setname] = useState("");
	const [password, setpassword] = useState("");
	const [isdisabled, setisdisabled] = useState(true);
	const [isinvalidname, setisinvalidname] = useState("none");
	useEffect(() => {
		if (name !== '' && password !== '') {
		  setisdisabled(false);
		} else {
		  setisdisabled(true);
		}
	  }, [name, password]); // name과 password가 변경될 때마다 실행
	useEffect(() => {
	setisinvalidname("none")
	}, [name])
	const on_change_name = (e) => {
		setname(e.target.value)
	};
	const on_change_password = (e) => {
		setpassword(e.target.value)
	};
	const submit = (e) => {
		e.preventDefault();
		fetch (`${process.env.NEXT_PUBLIC_WIKI_URL}/api/register`, {
			method: "POST",
			body: JSON.stringify({
				name:name,
				password:password
			})
		})
		.then(async (res) => {
			let result = await res.text();
			if (result == "suc") {
				router.push("/"+decodeURIComponent(returnto))
			} else if (result == "name already used") {
				setisinvalidname("block")
			} else {
				console.log(result)
			}
		})
	}
	return (
		<>
		<div className="form-group">
			<label>이름</label>
			<input defaultValue="" tabIndex="1" className="loginText form-control" onChange={on_change_name} placeholder="이름을 입력하세요." />
			<small style={{color:"red", display:isinvalidname}} className="form-text text-muted">이미 사용된 이름입니다.</small>
		</div>
		<div className="form-group">
			<label>비밀번호</label>
			<input type="password" defaultValue="" tabIndex="2" className="loginText form-control" onChange={on_change_password} placeholder="비밀번호를 입력하세요." />
		</div>
		<div className="form-group">
		<button onClick={submit} style={{width:"100%"}} disabled={isdisabled} className="btn">회원가입</button>
		</div>
		</>
	);
}
function Acl (props) {
	let title = props.title;
	let CanDoWithThisDoc = props.user.CanDoWithThisDoc;
	useEffect(() => {
		if (CanDoWithThisDoc.acl == true) {
			setCan_ACL("block")
		}
	}, [])
	const [Can_ACL, setCan_ACL] = useState("none")
	const [In_Edit, setIn_Edit] = useState("none")
	const [invalidjson, setinvalidjson] = useState("none")
	const [ACL, setACL] = useState(title.acl);
	useEffect(() => {
		setinvalidjson("none")
		try {JSON.parse(ACL)} catch (err) {setinvalidjson("block")}
	}, [ACL])
	const on_change_ACL = (e) => {
		let value = e.target.value;
		setACL(value)
	}
	const submit = (e) => {
		console.log(ACL)
		e.preventDefault();
		setIn_Edit("none");
		setCan_ACL("block")
		fetch(`${process.env.NEXT_PUBLIC_WIKI_URL}/api/document/${title.Namespaces}/${title.name}`, {
			method:"POST",
			body:JSON.stringify({acl:ACL})
		}).then((res) => {
			console.log(res)
		})
	}
	
	return(
		<>
			<div>ACL이란? (일단 이 엔진에선) ACcessLimit의 준말로, 접근제한을 의미한다.</div> <br />
			<div>watch, edit, acl이 있으며 condition은 everyone정도가 있다. 또한 다른 컨디션인 group, perms는 group:그룹 이름, perms:권한 이름 이런식으로 조정할 수 있으며, allow는 그 컨디션이 참일 때 이 권한을 사용할 수 있을 지, 없을 지 정한다. 참고로 각 권한의 컨디션은 배열로 되어있는데, 마지막 배열의 결과에 따라서 권한 여부가 결정되(지만 나중에는 기본적으로 거부, 모두 만족시 승인으로 바꿀 예정) Owner 권한을 가진 사람은 ACL의 영향을 받지 않는다.</div><br />
			<h2>현제 이 문서의 ACL</h2>
			<div>{title.acl}</div>
			<button onClick={ (e) => {
				e.preventDefault();
				setIn_Edit("block");
				setCan_ACL("none")
			}} style={{display:Can_ACL}}>ACL 편집</button>
			<textarea onChange={on_change_ACL} style={{display:In_Edit}} defaultValue={title.acl} />
			<span style={{display:invalidjson,color:"red"}}>invalid JSON</span>
			<button onClick={submit} style={{display:In_Edit}}>편집</button>
		</>
	)
}
export default Skin;