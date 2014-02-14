function fullprivacy(options) {
        document.write('<!-- START PRIVACY POLICY CODE --><div style="font-family:arial"><strong>What information do we collect?</strong> <br /><br />We collect information from you when you use our app.  <br /><br />When ordering or registering on our site, as appropriate, you may be asked to enter your: location. You may, however, visit our site anonymously.<br /><br /><strong>What do we use your information for?</strong> <br /><br />Any of the information we collect from you may be used in one of the following ways: <br /><br />* To process transactions<br />' );
	 text_only(options);
	    document.write('<strong>How do we protect your information?</strong> <br /><br />We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. <br /> <br />We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Database to be only accessed by those authorized with special access rights to our systems, and are required to?keep the information confidential. <br /><br />After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be stored on our servers.<br /><br /><strong>Do we use cookies?</strong> <br /><br />We do not use cookies.<br /><br /><strong>Do we disclose any information to outside parties?</strong> <br /><br />We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.<br /><br /><strong>California Online Privacy Protection Act Compliance</strong><br /><br />Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent.<br /><br /><strong>Childrens Online Privacy Protection Act Compliance</strong> <br /><br />We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age. Our website, products and services are all directed to people who are at least 13 years old or older.<br /><br /><strong>Your Consent</strong> <br /><br />By using our app, you consent to our privacy policy.<br /><br /><strong>Changes to our Privacy Policy</strong> <br /><br />If we decide to change our privacy policy, we will post those changes on this page, and/or update the Privacy Policy modification date below. <br /><br />This policy was last modified on 12/6/2013<br /><br /><strong>Contacting Us</strong> <br /><br />If there are any questions regarding this privacy policy you may contact us using the information below. <br /><br />http://cups.cs.cmu.edu<br />5000 Forbes Ave<br />Pittsburgh, PA 15218<br />United States<br /><br /><span></span><span></span>This policy is powered by Free Privacy Policy and Rhino Support <a rel="nofollow" style="color:#000; text-decoration:none;" href="http://www.rhinosupport.com" target="_blank">help desk software</a>.</div><!-- END PRIVACY POLICY CODE -->');
}

function page(options) {

	classname = 'icon-' + options.icon + (options.yes ? '-yes' : '-no');
	document.write("<div data-role='page' id='" + options.id + "'  class='linen'>");
	document.write("<div data-role='header'  class='homeheader' data-position='fixed' data-theme='b'><a data-rel='back' class='back'></a>");
	document.write("<h1>Details</h1></div><div data-role='content' style='background-color:#fff;padding: 0'>");
	if (options.icon) {
		document.write('<div class="'+ classname + '" style="margin: 0 20px 10px 0"></div>');
	}
	document.write("<div class='detailheading'>" + options.title + "</div>");
	document.write("<div class='detailsummary'>" + options.summary + "</div><br clear='all'>");
	if (options.text && options.text != '') {
		document.write("<h2>WHY?</h2><div class='detaildescription'>")
		document.write(options.text);
	}
	document.write("</div></div>");
	document.write('<div data-role="footer" data-position="fixed" data-theme="b" style="padding-bottom: 2px">');
	document.write('<div class="linkbar"><a href="#fullpolicy" data-transition="slide">FULL PRIVACY POLICY</a></div>');
	document.write('</div></div>');	
}

function launch_icon(options, hide_nos) {
    if (hide_nos && !options.yes) {
		return;
    }
    classname = 'icon-' + options.icon + (options.yes ? '-yes' : '-no');
    var logcallstart=' onclick="jslogger.event(\'mid='+mid+',action=' + options.icon + '\')"';
    document.write("<a href='#" + options.id + "' data-transition='slide'" + logcallstart + "><div class='"+ classname + "'></div></a>");
}

// include only the description text for icons with value yes=true , wrapped in a blockqute
function text_only(icons) {
    document.write('<blockquote>');
    for (i in icons){
	var options=icons[i];
	if (options.yes) {
	    document.write(options.text + "<br/>");
	}
    }
    document.write('</blockquote>');
}

function section(title, icons, hide_nos) {
	document.write("<h2>" + title + "</h2><div class='panel'>");
	for (i in icons) {
		launch_icon(icons[i], hide_nos);
	}
	document.write("<br clear='all'></div>");
}

window.behavior_icons = [{
	id: 'history',
	icon: 'history',
	title: 'Browser History',
	yes: false,
	summary: "A list of websites you visited.",
	text: "We may share or sell browsing history with social networks for marketing purposes."

}, {
	id: 'phone',
	icon: 'phone',
	title: 'Phone &amp; Text Logs',
	yes: false,
	summary: "A list of the calls or texts made or received.",
	text: ""
}, {
	id: 'bio',
	icon: 'bio',
	title: 'Biometrics',	
	yes: false, 
	summary: "Information about your body, including fingerprints, facial recognition, signatures and/or voice print.",
	text: ""
}, {
	id: 'financial',
	icon: 'financial', 
	title: "Financial Info",
	yes: false,
	summary: "Credit, bank and consumer-specific financial information such as transaction data.",
	text: ""
}, {
	id: 'contacts',
	icon: 'contacts', 
	title: "Contacts",
	yes: false,
	summary: "Contacts, social networking connections or their phone numbers, postal, email and text addresses.",
	text: "We may share or sell contact information with data analytics providers for marketing purposes"
}, {
	id: 'files',
	icon: 'files', 
	title: "User Files",
	yes: false,
	summary: "Files stored on the device that contain your content, such as calendar, photos, text, or video.",
	text: ""
}, {
	id: 'location',
	icon: 'location', 
	title: "Location",
	summary: "Precise past or current location of where a user has gone.",
	yes: false,
	text: "We may share or sell location information with advertisers for marketing purposes."

}, {
	id: 'health',
	icon: 'health', 
	title: "Health Info",
	summary: "Health claims and other information used to measure health or wellness.",
	yes: false,
	text: ""
}];

window.partner_icons = [{
	id: 'ads',
	icon: 'ads',
	title: 'Ad Networks',
	yes: false,
	summary: "Companies that display ads to you through apps",
	text: "We may share or sell location information with advertisers for marketing purposes."

}, {
	id: 'carriers',
	icon: 'carriers',
	title: 'Carriers',
	yes: false,
	summary: "Companies that provide mobile connections.",
	text: ""
}, {
	id: 'resellers',
	icon: 'resellers',
	title: 'Consumer Data Resellers',
	yes: false,
	summary: "Companies that sell consumer information to other companies for multiple purposes including offering products and services that may interest you.",
	text:""

}, {
	id: 'analytics',
	icon: 'analytics',
	title: 'Data Analytics Providers',
	yes: false,
	summary: "Companies that collect and analyze your data.",
	text: ""
}, 

{
	id: 'government',
	icon: 'government',
	title: 'Government Entities',
	yes: false,
	summary: "Any sharing with the government except where required by law or expressly permitted in an emergency.",
	text: ""
}, 

{
	id: 'platforms',
	icon: 'platforms',
	title: 'Operating Systems and Platforms',
	yes: false,
	summary: "Software companies that power your device, app stores, and companies that provide common tools and information for apps about app consumers.",
	text: ""
}, 

{
	id: 'apps',
	icon: 'apps',
	title: 'Other Apps',
	yes: false,
	summary: "Other apps of companies that the consumer may not have a relationship with.",
	text: ""
}, 

{
	id: 'social',
	icon: 'social',
	title: 'Social Networks',
	yes: false,
	summary: "Companies that connect individuals around common interests and facilitate sharing.",
	text: "We may share or sell browsing history with social networks for marketing purposes."
}

];

function content(options, mid) {
	for (i in behavior_icons ) {
		behavior_icons[i].yes = options['show_' + behavior_icons[i].id];
	}
	
	for (n in partner_icons ) {
		partner_icons[n].yes = options['show_' + partner_icons[n].id];
	}
	window._options = options;
	var logcallstart=' onclick="jslogger.event(\'mid='+mid+',action=';
	var logcallend='\')"';
	document.write('<div data-role="page" data-theme="b" class="linen">');
	document.write('<div class="homeheader" data-role="header" data-position="fixed" data-theme="b" style="padding-bottom: 2px">');
	// document.write('<img src="seal.png" class="seal">');
	document.write('<div class="pageheader">' + options.app_name + '</div>');
	document.write('<div class="subheading"><b>PRIVACY</b> DASHBOARD</div></div>');
	document.write('<div data-role="content" style="margin:0;padding:0">');
	section('This app collects the following types of data:', behavior_icons, options.hide_nos);
	section('This app shares data with:', partner_icons, options.hide_nos);		
	document.write('</div><div data-role="footer" data-position="fixed" data-theme="b" style="padding-bottom: 2px">');
	var logcall=logcallstart+"fullpolicy" +logcallend;
	//logcall="";
	document.write('<div class="linkbar"><a href="#fullpolicy" data-transition="slide" '+logcall+'>FULL PRIVACY POLICY</a></div></div></div>');
	for (i in behavior_icons ) {
	    page(behavior_icons[i]);
	}
	for (i in partner_icons ) {
		page(partner_icons[i]);
	}
	document.write('<div data-role="page" id="shortform">');
	document.write('<div data-role="header" data-position="fixed" data-theme="b" class="homeheader" >');
	document.write('<a data-rel="back">Back</a><h1>Short Form</1></div>');
	document.write('<div data-role="content">');
	document.write('</div></div><div data-role="page" id="fullpolicy">');
	document.write('<div data-role="header" data-position="fixed" data-theme="b" class="homeheader" >');
	document.write('<a data-rel="back" class="back"></a><h1>Policy</h1></div><div data-role="content">');
	fullprivacy(behavior_icons, mid);
	document.write('</div></div>');
	
	$(window).scroll(function () {
		jslogger.event(mid + " scrolled " + $(window).scrollTop() + " px.");
	    })

	}