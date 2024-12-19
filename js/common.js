if ( window.console === undefined ) { console = { log : function(){} } }		// IE console.log

//브라우저 확인
var myNavigator;
if(navigator.userAgent.indexOf("MSIE 5.5") != -1) myNavigator = 'IE5';		// IE 5.x
else if (navigator.userAgent.indexOf("MSIE 6") != -1) myNavigator = 'IE6';	// IE 6.x
else if(navigator.userAgent.indexOf("MSIE 7") != -1) myNavigator = 'IE7';	// IE 7.x
else if(navigator.userAgent.indexOf("MSIE 8") != -1) myNavigator = 'IE8';	// IE 8.x
else if(navigator.userAgent.indexOf("MSIE 9") != -1) myNavigator = 'IE9';	// IE 9.x
else if(navigator.userAgent.indexOf("MSIE 10") != -1) myNavigator = 'IE10';	// IE 10.x
else if(navigator.userAgent.indexOf("Firefox") != -1) myNavigator = 'FF';	// FF
else if(navigator.userAgent.indexOf("Opera") != -1) myNavigator = 'OP';	// Opera
else if(navigator.userAgent.indexOf("Netscape") != -1) myNavigator = 'NC';	// Netscape
else if(navigator.userAgent.indexOf("Chrome") != -1) myNavigator = 'CR';	// Chrome
else if(navigator.userAgent.indexOf("Safari") != -1) myNavigator = 'SF';	// Safari
else myNavigator = 'IE6';

function popupAutoResize()
{
	var marginX = 0;	//브라우저별 가로차이
	var marginY = 0;	//브라우저별 세로차이
	var thisY = 0;
	var thisX = parseInt(document.body.scrollWidth);
	var body_thisY = parseInt(document.body.scrollHeight);
	var doc_thisY = parseInt(document.documentElement.scrollHeight);

	var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 50;

	switch (myNavigator){
		case 'IE6':
			thisY = doc_thisY;
			marginX = 10;
			marginY = 45;
			break;
		case 'IE7':
		case 'IE8':
		case 'IE9':
		case 'IE10':
			thisY = doc_thisY;
			marginX = 10;
			marginY = 75;
			break;
		case 'FF':
			thisY = doc_thisY - 1;
			marginX = 8;
			marginY = 80;
			break;
		case 'OP':
			thisY = doc_thisY;
			marginX = 9;
			marginY = 42;
			break;
		case 'NC':
			thisY = body_thisY;
			marginX = 8;
			marginY = -2;
			break;
		case 'CR':
			thisY = body_thisY;
			marginX = 20;
			marginY = 60;
			break;
		case 'SF':
			thisY = body_thisY;
			marginX = 20;
			marginY = 41;
			break;
		default:
			thisY = doc_thisY;
			break;
	}
    if (thisX > maxThisX) {
        window.document.body.scroll = "yes";
        thisX = maxThisX;
    }
    if (thisY > maxThisY - marginY) {
        window.document.body.scroll = "yes";
        thisX += 19;
        thisY = maxThisY - marginY;
    }
    window.resizeTo(thisX+marginX, thisY+marginY);

    // 센터 정렬
    //var windowX = (screen.width - (thisX+10))/2;
    //var windowY = (screen.height - (thisY+marginY))/2 - 20;
    //window.moveTo(windowX,windowY);
}

function _getNavigaterMargin(){
	var result = new Array();
	var marginX = 0;	//브라우저별 가로차이
	var marginY = 0;	//브라우저별 세로차이

	switch (myNavigator){
		case 'IE6':
			marginX = 0;
			marginY = 0;
			break;
		case 'IE7':
			marginX = 0;
			marginY = 0;
			break;
		case 'FF':
			marginX = 0;
			marginY = 0;
			break;
		case 'OP':
			marginX = 0;
			marginY = 2;
			break;
		case 'NC':
			marginX = 8;
			marginY = -2;
			break;
		case 'CR':
			marginX = 3;
			marginY = 2;
			break;
		case 'SF':
			marginX = 3;
			marginY = 3;
			break;
	}
	result['marginX'] = marginX;
	result['marginY'] = marginY;
	return result;
}

//새창
function openWin(url, target, w, h, s) {
	var winleft = (screen.width - w) / 2;
	var wintop = (screen.height - h) / 2 -35;

	var margin = new Array();
	margin = _getNavigaterMargin();

	w = parseInt(w) + margin['marginX'];
	h = parseInt(h) + margin['marginY'];

    var its = window.open(url,target,'width='+w+',height='+h+',top='+wintop+',left='+winleft+', scrollbars='+s);
    if (its) its.focus();
}

function openWindow(url, target, l, t, w, h, s) {
	var margin = new Array();
	margin = _getNavigaterMargin();

	w = parseInt(w) + margin['marginX'];
	h = parseInt(h) + margin['marginY'];
    var its = window.open(url,target,'width='+w+',height='+h+',top='+t+',left='+l+', scrollbars='+s);
    its.focus();
}

// 숫자만 허용
function onlyNumber(event) {
	var key = window.event ? event.keyCode : event.which;

	if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
	|| key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end
	|| key  == 8  || key  == 46 || key == 9 || key == 190 || key == 110) // del, back space, tab
	) {
		return true;
	} else {
		return false;
	}
}

// 숫자 및 CTRL + v만 허용
function onlyNumber2(event) {
	var key = window.event ? event.keyCode : event.which;

	if (event.ctrlKey && key == 86) {
		return true;
	}

	if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
	|| key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end
	|| key  == 8  || key  == 46 || key == 9) // del, back space, tab
	) {
		return true;
	} else {
		return false;
	}
}

// 숫자만 허용(.도 허용)
function onlyNumber3(event) {
	var key = window.event ? event.keyCode : event.which;
	if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
	|| key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end
	|| key  == 8  || key  == 46 || key == 9 || key == 190 || key == 110) // del, back space, tab, comma
	) {
		return true;
	} else {
		return false;
	}
}

// 타입체크
function chkType(str,type)
{
	var check_type = false;
	switch (type)
	{
		case 'number'://숫자만(int)
			var filter = /^[1-9][0-9]*$/;
			break;
		case 'digit'://숫자만(string)
			var filter = /^[0-9]*$/;
			break;
		case 'alpha'://영문만
			var filter = /^[a-zA-Z]*$/;
			break;
		case 'alnum'://영문,숫자만
			var filter = /^[0-9a-zA-Z]*$/;
			break;
		case 'falnum'://영문,숫자만(첫자는 영문)
			var filter = /^[a-zA-Z][0-9a-zA-Z]*$/;
			break;
		case 'lalpha'://소-영문만
			var filter = /^[a-z]*$/;
			break;
		case 'ualpha'://대-영문만
			var filter = /^[A-Z]*$/;
			break;
		case 'lalnum'://소-영문,숫자만
			var filter = /^[0-9a-z]*$/;
			break;
		case 'ualnum'://대-영문,숫자만
			var filter = /^[0-9a-z]*$/;
			break;
		case 'email'://메일
			var filter =/^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.[a-zA-Z]/;
			break;
		case 'koralnum'://한글숫자영문
			var filter = /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]*$/;
			break;
		case 'koralpha'://한글영문
			var filter = /^[a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]*$/;
			break;
		case 'kor'://한글
			var filter = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]*$/;
			break;
		case 'korno'://한글제외(띄어쓰기 미포함)
			var filter = /^[^ㄱ-ㅎ|ㅏ-ㅣ|가-힝| ]*$/;
			break;
		case 'htmlno'://HTML 제외
			var filter = /(<[^>]+>)+/;
			check_type = true;
			break;
		case 'spec_char'://특수문자
			var filter = /^[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]*$/;
			break;
	}
	if(filter.test(str) === check_type) {
		return false;
	} else {
		return true;
	}
}

// 길이체크
function chkLength(str,min,max,is_null)
{
	if(str.length >= min && str.length <= max){
		return true;
	}else{
		if(is_null && str.length == 0){
			return true;
		}else{
			return false;
		}
	}
}

// 패스워드 체크
function chkPw(password){
	if(chkLength(password,6,20) === false){
		return false;
	}else{
		return true;
	}
}
// 휴대폰 체크
function chkPhone(phone1, phone2, phone3){
	if(chkType(phone1,'digit') === false || chkType(phone2,'digit') === false || chkType(phone3,'digit') === false || chkLength(phone1,3,3) === false || chkLength(phone2,3,4) === false || chkLength(phone3,4,4) === false){
		return false;
	}else{
		return true;
	}
}
// 연락처 체크
function chkPhone2(phone1, phone2, phone3){
	if(chkType(phone1,'digit') === false || chkType(phone2,'digit') === false || chkType(phone3,'digit') === false || chkLength(phone1,2,4) === false || chkLength(phone2,3,4) === false || chkLength(phone3,4,4) === false){
		return false;
	}else{
		return true;
	}
}

// 주민등록앞번호 체크
function chkJumin1(jumin){
	if(chkType(jumin,'digit') === false || chkLength(jumin,6,6) === false){
		return false;
	}else{
		return true;
	}
}
// 주민등록뒷번호 체크
function chkJumin2(jumin){
	if(chkType(jumin,'digit') === false || chkLength(jumin,7,7) === false){
		return false;
	}else{
		return true;
	}
}

function fnrrnCheck(rrn) // 주민등록번호유효성검사.
{
	var sum = 0;
	if (rrn.length != 13) {
		return false;
	} else if (rrn.substr(6, 1) != 1 && rrn.substr(6, 1) != 2 && rrn.substr(6, 1) != 3 && rrn.substr(6, 1) != 4) {
		return false;
	}
	for (var i = 0; i < 12; i++) {
		sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);
	}
	if (((11 - (sum % 11)) % 10) == Number(rrn.substr(12, 1))) {
		return true;
	}
	return false;
}

// 휴대폰체크(모바일)
function chkPhoneM(phone1, phone2){
	if(chkType(phone1,'digit') === false || chkType(phone2,'digit') === false || chkLength(phone1,3,3) === false || chkLength(phone2,7,8) === false){
		return false;
	}else{
		return true;
	}
}
// 우편번호찾기
function openZipcode()
{
	openWin('/zipcode', 'zipcode', 500, 460, 'no');
}

// 로그인 페이지 이동
function goLogin()
{
	location.href = "/auth/login?url=" + encodeURIComponent(location.href);
}

$(function(){
	// 즐겨찾기
	$('#favorite').click(function(e){
		e.preventDefault();
		if (document.all) {
			window.external.AddFavorite(document.location.href , document.title.replace(' :: ', ' - '));
		} else {
		}
	});

	// 시작페이지 설정
	$('#homepage').click(function(e) {
		e.preventDefault();
		if (document.all) {
			document.body.style.behavior='url(#default#homepage)';
			document.body.setHomePage($(this).attr('href'));
		} else if (window.sidebar) {
		}
	});

	//말풍선
	$('.bubble_over').mouseover(function(){
		$(this).children('div').show();
	});
	$('.bubble_over').mouseleave(function(){
		$(this).children('div').hide();
	});
	//말풍선
	$('.bubble_click').click(function(){
		if($(this).children('div').css('display')=='none'){
			$(this).children('div').show();
		}else{
			$(this).children('div').hide();
		}
	});

});


// 프린트
function printWindow(area) {
	bV = parseInt(navigator.appVersion);
	if(bV>=4) window.print();


	var tempBody;
	window.onbeforeprint = function() {
		tempBody = document.body.innerHTML;
		document.body.innerHTML = area.innerHTML;
	}

	window.onafterprint = function() {
		document.body.innerHTML = tempBody;
	}
}


function changeMailDomain(form) {
	if (form.email_list.value != "" && form.email_list.value != "self") {
		form.email2.style.display = "none";
		form.email2.value = form.email_list.value;
	} else if (form.email_list.value == "self") {
		form.email2.value = "";
		form.email2.style.display = "inline";
		form.email2.focus();
	}
	if (form.email1.value && form.email2.value) form.email.value = form.email1.value + "@" + form.email2.value;
}

// 콤마
function commaNum(num) {
	var len, point, str;

	num = num + "";
	point = num.length % 3
	len = num.length;

	str = num.substring(0, point);
	while (point < len) {
		if (str != "") str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}
	return str;
}

// 관심판매자 등록
function sellerReg(shop_id , wish_id , memo){

	if(user_id == '') {
		if(mobile_chk){
			var pathname = encodeURIComponent(document.location.pathname);
			var search = encodeURIComponent(document.location.search);
			location.href="/auth/login?url="+pathname+search;
			return;
		}else{
		SLB('/auth/login_pop','iframe', 512, 440, false, false);
		return;
		}
	}

	if(wish_id == ''){
		alert('판매자를 선택후 이용 바랍니다.');
		return;
	}

	if($("#minishop_code").val() == ''){
		alert('STORE 상품만 판매자 등록이 가능 합니다.');
		return false;
	}

	jPrompt(shop_id+' 판매자 : '+wish_id, '메모입력', '헤이재팬', function(r) {
		if( r ){

			$.ajax({
				type: 'post',
				url: '/mypage/goods_seller_regist',
				dataType: 'json',
				data: { "shop_id" : shop_id , "wish_id" : wish_id , "memo" : r , "user_id" : user_id },
				success: function(d,s) {
					if(d.result == '_ok') {
						alert(d.message+'님 관심판매자가 등록 되었습니다.\r\n퀵메뉴에서 등록하신 판매자 정보를 확인하실수 있습니다.');
					}else{
						alert('이미 등록한 판매자 입니다.');
					}
				},
				cache: false
			});

		}
	});


}


// 관심카테고리 등록
function categoryReg(shop_id , cate_name , level1 , level2 , level3 , level4 , level5 , level6 , lo , depth , cate_code){

	if(user_id == '') {
		if(mobile_chk){
			var pathname = encodeURIComponent(document.location.pathname);
			var search = encodeURIComponent(document.location.search);
			location.href="/auth/login?url="+pathname+search;
			return;
		}else{
		SLB('/auth/login_pop','iframe', 512, 440, false, false);
		return;
		}
	}

	if(level1 == ''){
		alert('현재 경로에서는 관심카테고리를 등록하실수 없습니다.');
		return;
	}

	$.ajax({
		type: 'post',
		url: '/mypage/goods_category_regist',
		dataType: 'json',
		data: { "shop_id" : shop_id , "user_id" : user_id , "cate_name" : cate_name , "level1" : level1 , "level2" : level2 , "level3" : level3 , "level4" : level4 , "level5" : level5 , "level6" : level6 , "lo" : lo , "depth" : depth , "cate_code" : cate_code},
		success: function(d,s) {
			if(d.result == '_ok') {
				alert(d.message +'님 관심카테고리로 등록 되었습니다.\n\r퀵메뉴 관심카테고리에서 등록하신 카테고리를 확인하실수 있습니다.');
			}else{
				alert('이미 등록한 카테고리 입니다.');
			}
		},
		cache: false
	});
}
// 관심상품 등록
function recomReg(shop_id , img_url , link_url , goods_name , goods_price, end_time){

	if($("input[name=goods_name]").val()){
		var goods_name = encodeURIComponent($("input[name=goods_name]").val());
	}

	if(user_id == '') {
		if(mobile_chk){
			var pathname = encodeURIComponent(document.location.pathname);
			var search = encodeURIComponent(document.location.search);
			location.href="/auth/login?url="+pathname+search;
			return;
		}else{
		SLB('/auth/login_pop','iframe', 512, 440, false, false);
		return;
		}
	}

	$.ajax({
		type: 'post',
		url: '/mypage/goods_wish_regist',
		dataType: 'json',
		data: { shop_id : shop_id , img_url : img_url , link_url : link_url , goods_name : goods_name , goods_price : goods_price  , user_id : user_id, end_time : end_time},
		success: function(d,s) {
			if(d.result == '_ok') {
				alert('관심상품이 등록 되었습니다.\r\n퀵메뉴에서 등록하신 상품을 확인하실수 있습니다.');
			}else{
				alert('이미 등록한 관심상품 입니다.');
			}
		},
		cache: false
	});

}
// 관심키워드 등록
function keywordReg(keyword){

	if(user_id == '') {
		if(mobile_chk){
			var pathname = encodeURIComponent(document.location.pathname);
			var search = encodeURIComponent(document.location.search);
			location.href="/auth/login?url="+pathname+search;
			return;
		}else{
		SLB('/auth/login_pop','iframe', 512, 440, false, false);
		return;
		}
	}

	if(keyword == ''){
		alert('키워드를 입력해주세요.');
		return false;
	}

	$.ajax({
		type: 'post',
		url: '/mypage/goods_keyword_regist',
		dataType: 'json',
		data: { keyword : keyword , user_id : user_id},
		success: function(d,s) {
			if(d.result == '_ok') {
				alert(d.message+'님 관심키워드가 등록 되었습니다.\r\n퀵메뉴에서 등록하신 키워드를 확인하실수 있습니다.');
			}else{
				alert('이미 등록한 관심키워드 입니다.');
			}
		},
		cache: false
	});
}


// 모바일옵션 슬라이드
function option_slide(){
	$("#mypage_menu").hide();
	$("#mypageslide_img").attr("src" , "/M/images/20140410_05_off.png");
	$("#info_slide").hide();
	$("#infoslide_img").attr("src" , "/M/images/btn_explain.png");
	//$("#search_top").hide();

	if($("#option_slide").css("display") == "none"){
		$("#option_slide").slideDown("slow");
		$("#opslide_img").attr("src" , "/M/images/re_btn_option_off.png?230201");
	}else{
		$("#option_slide").slideUp("slow");
		$("#opslide_img").attr("src" , "/M/images/re_btn_option_on.png?230201");
	}
}
// 모바일 마이페이지 메뉴 슬라이드
function mypage_slide(){
	$("#option_slide").hide();
	$("#opslide_img").attr("src" , "/M/images/re_btn_option_off.png?230201");
	$("#info_slide").hide();
	$("#infoslide_img").attr("src" , "/M/images/btn_explain.png");
	//$("#search_top").hide();

	if($("#mypage_menu").css("display") == "none"){
		$("#mypage_menu").slideDown("slow");
		$("#mypageslide_img").attr("src" , "/M/images/20140410_05.png");
	}else{
		$("#mypage_menu").slideUp("slow");
		$("#mypageslide_img").attr("src" , "/M/images/20140410_05_off.png");
	}
}

// 모바일 부가정보 슬라이드
function info_slide(){
	$("#mypage_menu").hide();
	$("#mypageslide_img").attr("src" , "/M/images/20140410_05_off.png");
	$("#option_slide").hide();
	$("#opslide_img").attr("src" , "/M/images/re_btn_option_off.png?230201");
	//$("#search_top").hide();

	if($("#info_slide").css("display") == "none"){
		$("#info_slide").slideDown("slow");
		$("#infoslide_img").attr("src" , "/M/images/btn_explain_off.png");
	}else{
		$("#info_slide").slideUp("slow");
		$("#infoslide_img").attr("src" , "/M/images/btn_explain.png");
	}
}

// 모바일 상품링크
function go_detail(url){
	$('#loading').html("<span style='position:relative; left:47%; top:17%;'><img src='/images/bigWaiting.gif'></span>");
	setTimeout(function() {
		$('#loading').html("");
	}, 5000);
	//location.href=url;
	window.open(url);
}
// 년도 체크
function chkYear(year)
{
	if(year.length != 4 || chkType(year,'digit') === false){
		return false;
	}else{
		return true;
	}
}
function chkMonth(month)
{
	if(month.length > 2 || chkType(month,'digit') === false || month < 1 || month > 12){
		return false;
	}else{
		return true;
	}
}
function chkDay(day)
{
	if(day.length > 2 || chkType(day,'digit') === false || day < 1 || day > 31){
		return false;
	}else{
		return true;
	}
}


// 차액환불 신청 , web + mobile
var is_2st_return_chk = false;
function return_ok(order_id , type , price){

	if(is_2st_return_chk == true){
		alert("진행중입니다");
		return false;
	}

	if(price){
		var pay = price;
	}else{
		var pay = $('input[name=order_total_price]').val();
	}

	if(type){
		var chk_type = type;
	}else{
		if($('#return_type').val()){ // ver2
			var chk_type =  $('#return_type').val();
		}else{
			var chk_type =  $(':radio[name="return_type"]:checked').val();
		}
	}


	if(chk_type == 'bank'){
		if($(':radio[name="return_bank"]:checked').val()){
			var return_bank = $(':radio[name="return_bank"]:checked').val(); // // ver2
		}else if($('select[name=return_bank]').val()){
			var return_bank = $('select[name=return_bank]').val(); // // ver3
		}else{
			var return_bank = $('input[name=return_bank]').val();
			if(!return_bank){
				alert('은행명을 입력 해 주세요.');
				$('input[name=return_bank]').focus();
				return false;
			}
		}
		var return_num = $('input[name=return_num]').val();
		var return_name = $('input[name=return_name]').val();


		if(!return_num){
			alert('계좌번호를 입력 해 주세요.');
			$('input[name=return_num]').focus();
			return false;
		}
		if(!return_name){
			alert('예금주를 입력 해 주세요.');
			$('input[name=return_name]').focus();
			return false;
		}
	}else if(chk_type == 'card'){
		if (confirm("환불금액이 발생하였습니다. 아래의 [확인]을 클릭하면, 신용카드 결제대금에서 자동으로 마이너스 청구되며, 곧 국제운송(출고)를 준비하겠습니다.") == false){    //취소
			return false;
		}
	}

	is_2st_return_chk = true;

	var url = '/order/return_order_pay';

	$.ajax({
		type: 'post',
		url: url,
		dataType: 'json',
		data: { "return_price" : pay, 'order_id' : order_id , 'return_type' : chk_type , 'return_bank' : return_bank , 'return_num' : return_num , 'return_name' : return_name},
		success: function(d,s) {
			if(d.result == '_ok') {
				if(chk_type == 'cash'){
					if(pay > 0) {
						alert('반환금이 정상적으로 캐시로 전환 되었습니다.');
						location.href='/mypage/cash_list';
					} else {
						alert('정상적으로 2차결제가 완료 되었습니다.');
						location.href='/mypage/latest';
					}
				}else if(chk_type == 'bank'){
					alert(d.message);
					location.href='/mypage/latest';
				}else if(chk_type == 'card'){
					alert('환불금액이 카드결제금에서 부분취소 되었습니다.');
					location.href='/mypage/latest';
				}
			} else {
				alert('처리가 실패하였습니다. 고객센터에 문의 해 주시기 바랍니다.');
				return false;
			}
		},
		cache: false
	});

}


jQuery(document).ready(function(){

    var select = $("select");

    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });

	select.each(function(){
		var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
	});

	//181113 보안문자
	$(".captcha_reload_button").on('click', function(){
		$.get('/auth/get_captcha', function (response) {
			$('#captcha_img').html(response);
		});
	});

	//190222 category
	$('.search_category_btn').click(function(){
		if($('#categoryList').css('display')=='none'){
			$('#categoryList').show();
			$('.search_category_btn').val('접기');
		}else{
			$('#categoryList').hide();
			$('.search_category_btn').val('펼치기');
		}
	});

});


function select_css(){
	var select = $("select");

	select.change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings("label").text(select_name);
	});

	select.each(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings("label").text(select_name);
	});
}

$("a > button").live('click', function() {
    location.href = $(this).closest("a").attr("href");
}); // fixed

$("a").live('click', function() {
	var linkurl = $(this).closest("a").attr("href");
  if( linkurl ){ // 230804 스크립트 오류 방지를 위해 추가
		//if(  linkurl != "#null" && linkurl != "#" && linkurl.indexOf('javascript') == -1 && linkurl.indexOf('http') == -1){
		if(( linkurl.indexOf('/deal/detail') > -1 || linkurl.indexOf('/hey/search') > -1 ) && $(this).attr("target") != "_blank"){
		    web_detail2($(this).closest("a").attr("href"));
		}

		if(( linkurl.indexOf('/auth/login') > -1  ) && $(this).attr("target") != "_blank" && $(this).attr("id") != "mlogin"){ //|| linkurl.indexOf('/hey/search') > -1
			SLB('/auth/login_pop','iframe', 512, 440, false, false);
			return false;
		}
  }
}); // fixed


function popup_center(url,title , width , height) {

	var w = width;    //팝업창의 너비
	var h = height;    //팝업창의 높이

	//중앙위치 구해오기
	var LeftPosition=(screen.width-w)/2;
	var TopPosition=(screen.height-h)/2;

	if(!title) title = 'untitled';

	window.open(
		url,
		title,
		"width="+w+",height="+h+",top="+TopPosition+",left="+LeftPosition+", scrollbars=no");
}

function popup_center_scroll(url,title , width , height) {

	var w = width;    //팝업창의 너비
	var h = height;    //팝업창의 높이

	//중앙위치 구해오기
	var LeftPosition=(screen.width-w)/2;
	var TopPosition=(screen.height-h)/2;

	if(!title) title = 'untitled';

	window.open(
		url,
		title,
		"width="+w+",height="+h+",top="+TopPosition+",left="+LeftPosition+", scrollbars=yes");
}

function web_detail(url){
	SLB('/images/712.gif', 'image', true);

	// 가상의 이미지 객체를 바인딩 후 이동
	var $img = $('<img src="./images/712.gif" />');
	$img.bind('load', function(){
		//location.href=url;
		location.replace(url);
	});

}

function web_detail2(url){
	$("#SLB_film").css("background-color","#fff");
	SLB('/images/integ/loader2.gif', 'image', true);

	// 241029 미작동, 미사용으로 주석처리
	// // 가상의 이미지 객체를 바인딩 후 이동
	// var $img = $('<img src="./images/712.gif" />');
	// $img.bind('load', function(){
	// 	//location.href=url;
	// 	location.replace(url);
	// });

}

function close_pop(name, value, expirehours, domain)
{
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours));
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}

function cookie_info(name)
{
	var find_sw = false;
	var start, end;
	var i = 0;

	for (i=0; i<= document.cookie.length; i++)
	{
		start = i;
		end = start + name.length;

		if(document.cookie.substring(start, end) == name)
		{
			find_sw = true
			break
		}
	}

	if (find_sw == true)
	{
		start = end + 1;
		end = document.cookie.indexOf(";", start);

		if(end < start)
			end = document.cookie.length;

		return document.cookie.substring(start, end);
	}
	return "";
}
function go_detail_hash(url , key){

	if(document.location.hash){
		var HashLocationName = document.location.hash;

		if(document.location.hash == "#null"){
			HashLocationName = "";
		}else{
			HashLocationName = HashLocationName.replace("#","");

			// search 는 내부동작으로 새로고침시 hash 데이터로 보여주기 체크
			var hashArr = HashLocationName.split("&");

			// document.location.hash = "#"+hashArr[0]+"&"+hashArr[1]+"&"+hashArr[2]+"&"+hashArr[3]+"&"+hashArr[4]+"&"+hashArr[5]+"&"+hashArr[6]+"&"+hashArr[7]+"&"+hashArr[8]+"&"+hashArr[9]+"&"+hashArr[10]+"&"+hashArr[11]+"&"+hashArr[12]+"&"+hashArr[13]+"&"+hashArr[14]+"&"+hashArr[15]+"&"+key;
			var hashString = "#"+hashArr[0]+"&"+hashArr[1]+"&"+hashArr[2]+"&"+hashArr[3]+"&"+hashArr[4]+"&"+hashArr[5]+"&"+hashArr[6]+"&"+hashArr[7]+"&"+hashArr[8]+"&"+hashArr[9]+"&"+hashArr[10]+"&"+hashArr[11]+"&"+hashArr[12]+"&"+hashArr[13]+"&"+hashArr[14]+"&"+hashArr[15]+"&"+key+"&"+hashArr[17];
			history.replaceState({},"",hashString);
		}
	}else{
		if(typeof link_code !== "undefined") {
			// document.location.hash = "#1&"+link_code+"&&"+now_level+"&"+shop_id+"&"+lo+"&&&&&&&&&&&"+key;
			var hashString = "#1&"+link_code+"&&"+now_level+"&"+shop_id+"&"+lo+"&&&&&&&&&&&"+key+"&";
			history.replaceState({},"",hashString);
		}else{
			// document.location.hash = "#1&&&&&&&&&&&&&&&&"+key;
			var hashString = "#1&&&&&&&&&&&&&&&&"+key+"&";
			history.replaceState({},"",hashString);
		}


	}
	$('#loading').html("<span style='position:relative; left:47%; top:17%;'><img src='/images/bigWaiting.gif'></span>");
	setTimeout(function() {
		$('#loading').html("");
	}, 5000);
	//location.href=url;
	window.open(url);
}

function fnMove(seq){
    var offset = $("#" + seq).offset();
    $('html, body').animate({scrollTop : offset.top}, 200);
}

//180111
function keyword_hide(){
	setTimeout("$('.keyword').hide()", 100);
}

//180615 문의게시판 피드백
function qna_feedback()
{
	var reply_id = $('input[name=reply_id]').val();
	var feedback_rating = $(':radio[name="feedback_rating"]:checked').val();
	var feedback_text = $('input[name=feedback_text]').val();

	if($(':radio[name="feedback_rating"]:checked').length < 1){
		alert('만족도를 평가 해 주세요.');
		return false;
	}

	if(feedback_text == ''){
		alert('사유를 간단히 남겨주세요.');
		$('input[name=feedback_text]').focus();
		return false;
	}
	$.ajax({
		type: 'post',
		url: '/mypage/feedback_regist',
		dataType: 'json',
		data: { "feedback_rating" : feedback_rating , "feedback_text" : feedback_text, "reply_id" : reply_id },
		success: function(d,s) {
			//alert(d.message);
			if(d.result == '_ok') {
				window.location.reload();
			}
		},
		cache: false
	});
}


//180702
function sms_send_app()
{
	var mobile = $('.input_trumph').val();
	var app_type = $(":input:radio[name=app_type]:checked").val();

	if(chkType(mobile,'digit') === false){
		alert('숫자만 입력가능합니다.');
		return false;
	}
	if($('#send_app_url_check').is(':checked') === false){
		alert('SMS 발송을 위해 휴대폰 번호 수집에 동의해주세요.');
		return false;
	}
	$.ajax({
		type: 'post',
		url: '/event/send_app_url',
		dataType: 'json',
		data: { "mobile" : mobile , "app_type" : app_type},
		success: function(d,s) {
			if(d.result == '_ok') {
				alert('성공적으로 문자를 발송하였습니다.');
				$('.input_trumph').val('');
				$("input:checkbox[id='send_app_url_check']").attr("checked", false);
			}else{
				alert(d.message);
			}
		},
		cache: false
	});
}

//181106 숫자체크
function number_check(event)
{
	if(chkType(event.value, 'number')){
		//alert('true');
	}else{
		$(event).val('');
		alert('숫자만 입력가능합니다.');
	}
}

//181106 영숫자체크
function alnum_check(event,obj)
{
	if (!(event.keyCode >=37 && event.keyCode<=40)) {
		obj.value = obj.value.replace(/[^a-z0-9]/gi,'');
	}
}

//공백제거 190618
function remove_spaces(obj){
    var str_space = /\s/;  // 공백체크
    if(str_space.exec(obj.value)) { //공백 체크
        obj.focus();
        obj.value = obj.value.replace(' ',''); // 공백제거
        return false;
    }
}

//200121 합산과세 무시
function total_tax_type(order_id){
	$.ajax({
		type: 'post',
		url: '/mypage/total_tax_type',
		dataType: 'json',
		data: { "order_id" : order_id},
		success: function(d,s) {
			if(d.result == '_ok') {
				$("input:checkbox[name='total_tax_type_"+order_id+"']").attr("checked", true);
				alert('합산과세 무시 체크시 해당 물품이 모두 한번에 출고(국제운송)되어 합산과세(관세)가 발생할 수 있습니다.');
			}else{
				$("input:checkbox[name='total_tax_type_"+order_id+"']").attr("checked", false);
			}
		},
		cache: false
	});
}

//200605 숫자제외하고 삭제
function onlynumber_blur(is){
	var id = is.id;
	var v = $('#'+id).val();
	$('#'+id).val(v.replace(/[^0-9]/gi,''));	//숫자
}

//191022 크로스도메인
function window_parent_message(auction){
	window.parent.postMessage({
		'viz': auction,
		'location': window.location.href
	}, "*");
}

//최근검색어 211001
function set_local_Array(key, value, limitMax){
	var str = localStorage.getItem(key);
	var obj = {};
	try {
		obj = JSON.parse(str);
	} catch(error) {
		obj = {};
	} if(!obj){
		obj = {}; obj[key] = [];
	}

	let tmp = [];
	for(let j = 0; j < obj[key].length; j++){
		if(obj[key][j] != value){
			tmp.push(obj[key][j]);
		}
	}
	obj[key] = tmp;
	obj[key].push(value);

	if (limitMax && limitMax < obj[key].length) {
		let tempList = [];
		for(let i = obj[key].length-limitMax; i < obj[key].length; i++) {
			tempList.push(obj[key][i]);
		}
		obj[key] = tempList;
	}
	localStorage.setItem(key, JSON.stringify(obj));

}
function get_local_Array(key, reverse) {
	var str = localStorage.getItem(key);
	var obj = {};
	try {
		obj = JSON.parse(str);
	} catch(error) {
		obj = {};
	}
	if(!obj){
		obj = {};
		obj[key] = [];
	}
	return reverse?obj[key].reverse():obj[key];
}
function del_local_Array(key, value){
	var str = localStorage.getItem(key);
	var obj = {};
	try {
		obj = JSON.parse(str);
	} catch(error) {
		obj = {};
	} if(!obj){
		obj = {}; obj[key] = [];
	}

	if(value == '' || obj[key].length==1){
		localStorage.removeItem(key);
		$('.ns_keyword').html('최근 검색어가 없습니다. 상품을 검색해보세요.');
		$('.ns_alldel').hide();
		return;
	}

	let tmp = [];
	for(let j = 0; j < obj[key].length; j++){
		if(obj[key][j] != value){
			tmp.push(obj[key][j]);
		}
	}
	obj[key] = tmp;
	localStorage.setItem(key, JSON.stringify(obj));
	var recent_searches_html = '';
	for(let r = 0; r < tmp.length; r++){
		recent_searches_html += "<li><a href='/hey/search?keyword="+tmp[r]+"&type=buy' title='"+tmp[r]+"'>"+sliceByByte(tmp[r], '12', '')+"</a>";
		recent_searches_html += "<a onclick=\"del_local_Array('search','"+tmp[r]+"')\"><img src=\"./images/integ/ns_close.png\"></a></li>";
		$('.ns_keyword').html(recent_searches_html);
		$('.ns_alldel').show();
	}
}

//문자열 byte로 자르기
function sliceByByte(str, maxByte, lastTxt) {

    if (maxByte == "" || maxByte == null) { // 기본값
        maxByte = 20;
    }

    if (lastTxt == "" || lastTxt == null) { // 기본값
        lastTxt = ".";
    }

	for(b=i=0;c=str.charCodeAt(i);) {
		b+=c>>7?2:1;
		if (b > maxByte)
			break;
		i++;
	}

    if (str.length > maxByte) {
        str = str.substring(0,i) + lastTxt;
    }

	return str;
}

window.addEventListener('message', function (event) {
    switch(event.data.viz) {
        //var data = event.data;
		case 'close':
	        parent.SLB();
		break;
		case 'reload':
			parent.location.reload();
		break;
    }

}, false);
