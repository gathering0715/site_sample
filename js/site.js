function popLayer(targetID, options)
{
	var $layer = $('#'+targetID);
	var $close = $layer.find('.close');
	var width = $layer.outerWidth();
	var ypos = options.top;
	var xpos = options.left;
	var marginLeft = 0;

	if(xpos==undefined){
		xpos = '50%';
		marginLeft = -(width/2);
	}

	if(!$layer.is(':visible')){
		$layer.css({'top':ypos+'px','left':xpos,'margin-left':marginLeft})
			.show();
	}

	$close.bind('click',function(){
		if($layer.is(':visible')){
			$layer.hide();
		}
		return false;
	});
}

// 검색
function detail_search(){
	var search1 = $("#search_sel1 option:selected").val();
	var search2 = $("#search_sel2 option:selected").val();
	var keyword_detail = $("#keyword_detail").val();

	if(!keyword_detail){
		alert('검색어를 입력후 이용 바랍니다.');
		$("#keyword_detail").focus();
		return;
	}

	if(search1 == 'yhauc'){
		var link_code = 'auction';
	}else{
		var link_code = 'category';
	}

	if(search2 == 'title'){
		location.href='/'+link_code+'/buy?shop_id='+search1+'&keyword='+keyword_detail;
	}else if(search2 == 'seller'){
		location.href='/'+link_code+'/buy?shop_id='+search1+'&seller='+keyword_detail;
	}else if(search2 == 'goodscode'){
		if(search1 == 'amazon_jp'){
			location.href='/deal/detail?url='+keyword_detail+'&shop_id=amazon_jp';
		}else{
			alert('상품아이디 검색은 아마존에서만 가능합니다.');
		}
	}
}

// 검색
function select_chk(){
	if($("#search_sel1 option:selected").val() == ""){
		alert('통합검색시 상품명으로만 검색이 가능합니다.');
	}
}

function select_step(){
	if($("#search_sel1 option:selected").val() == ""){
		$("#search_sel2").val('title');
		$("#search_sel2 option:eq(2)").attr("disabled", true);
		$("#search_sel2 option:eq(1)").attr("disabled", true);
	}else if($("#search_sel1 option:selected").val() == "yhshop" || $("#search_sel1 option:selected").val() == "amazon_jp"){
		$("#search_sel2 option:eq(2)").attr("disabled", true);
	}else{
		$("#search_sel2 option:eq(2)").attr("disabled", false);
		$("#search_sel2 option:eq(1)").attr("disabled", false);
	}
}
/*
function total_search(){

	var val2 = $("#sel2_hidden").val();
	var val3 = $("#sel3_hidden").val();
	var total_keyword = $("#SearchWord").val();

	if(total_keyword == ''){
		alert('검색할 상품명이나 브랜드를 입력 해 주세요.');
		$("#SearchWord").focus();
		return false;
	}


	if(val2 == '' || val2 == 'undefined'){ // 구매대행 통합검색
		location.href='/hey/search?keyword='+total_keyword+'&type=buy';
		return false;
	}else{
		if(val3 == '' || val3 == 'undefined'){
			location.href='/hey/search?keyword='+total_keyword+'&type=buy&type2='+val2;
			return false;
		}else{
			if(val3 == 'yhauc'){ // 야후경매
				location.href='/auction/buy?level1=&shop_id=yhauc&keyword='+total_keyword;
				return false;
			}else{

				location.href='/category/buy?level1=&shop_id='+val3+'&keyword='+total_keyword;
				return false;
			}
		}
	}

}
*/

function onPopCertMar(){
	openWin('http://heyprice.co.kr/blank.html', '_blank', 700, 800, 'yes');
}

// 세부 카테고리 레이어
var timeout	= 0;
var closetimer	= 0;
var ddmenuitem	= 0;

function mopen(id)
{
	mcancelclosetime();
	if(ddmenuitem) ddmenuitem.style.display = 'none';
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.display = 'block';
}

function mclose()
{
	if(ddmenuitem) ddmenuitem.style.display = 'none';
}

function mclosetime()
{
	closetimer = window.setTimeout(mclose, timeout);
}

function mcancelclosetime()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

// 세부 카테고리 레이어


function quick_switch(tab, price){		// tab num, 가격
	var expect_price = 0;
	$('#toggle').val(1);

	for(i=0;i<10;i++){
		$("#quickTapbox"+i).hide();
	}
	$('#quick_contents').html('');

	var open_quick = false;		// 퀵보이기 초기화
	if(tab == 3){ 	// 관심상품
		open_quick = login_check();
		get_wishlist();
	}else if (tab == 4){ // 관심판매자
		open_quick = login_check();
		get_sellerlist();
	}else if (tab == 5){ // 관심장르
		open_quick = login_check();
		get_wishcatelist();
	}else if (tab == 6){ // 관심 키워드
		open_quick = login_check();
		get_wishkeylist();
	}else if (tab == 7){ // 오늘본 상품
		open_quick = true;
		get_todaylist();
	}else if (tab == 8){ // 입찰중 경매
		open_quick = login_check();
		get_bidlist();
	}else if(tab == 2) { // 예상비용 미리보기
		open_quick = true;
		expect_price = price;	// 비용 전달
		get_expect(expect_price);
	}else if(tab == 1){ // 단문번역
		open_quick = login_check();
		get_trans();
	}else if(tab == 'calc'){ // 관부가세계산기
		open_quick = true;
		get_calc();
	}

	if(open_quick == true) {
		quick_open();
	}
}

function quick_open_top() {
	if($('#toggle').val() == 1){
		$('#toggle').val(0);
		quick_close();
	}else{
		$('#toggle').val(1);
		quick_switch('2', 0);
	}
}

// 퀵 open
function quick_open() {

	$('#quick_arrow').attr('src','/images/integ/rrt_close_hj.png')
	$('.nrlayer').attr('style', 'right:550px');
	$('#quick_contents').show();
	$("#isQuickOpen").val(true);

}



function quick_close(){
	for(i=0;i<10;i++){
		$("#quickTapbox"+i).hide();
	}
	$('#quick_arrow').attr('src','/images/integ/rrt_open_hj.png');
	$('.nrlayer').attr('style', 'right:0');
	$('.nrlayer_inner').attr('style', 'position: inherit;');
	$('#quick_contents').hide();
	$("#isQuickOpen").val(false);
}

// 입찰중경매
function get_bidlist(){
	var url = '/hey/quick8';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}
// 관심상품
function get_wishlist(){
	var url = '/hey/quick3';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}
// 관심판매자
function get_sellerlist(){
	var url = '/hey/quick4';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}
// 관심카테고리
function get_wishcatelist(){
	var url = '/hey/quick5';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}
// 관심키워드
function get_wishkeylist(){
	var url = '/hey/quick6';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}
// 오늘본상품
function get_todaylist(){
	var url = '/hey/quick7';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}
// 예상비용
function get_expect(price){
	var url = '/quick/quick2';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id, price : price },
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}

function get_trans(){
	var url = '/quick/quick1';
	var type = '';
	var text = '';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "user_id" : user_id , "type" : type , "text" : text},
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}

//관부가세 계산기
function get_calc(){
	var url = '/cs/customs_calc';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "quick" : 1 },
		success: function(d,s) {
			$('#quick_contents').html(d);
		},
		cache: false
	});
}

// 로그인 체크
function login_check() {

	if(!user_id){
		quick_close();
		SLB('/auth/login_pop','iframe', 512, 440, false, false);
		return false;
	}
	return true;
}

// 예상비용
function load_price() {

	var quick_price = $('input[name=quick_price]').val();
	var weight = $('select[name=weight]').val();
	var delivery_jp_free = $('input:checkbox[name=delivery_jp_free]').is(':checked');
	if(delivery_jp_free == true) delivery_jp_free = 1
	else delivery_jp_free = 0;

	if(quick_price == '' || quick_price == 0) {
		alert('금액을 입력하셔야 합니다.');
		$('input[name=quick_price]').val('');
		$('input[name=quick_price]').focus();
		$("input:checkbox[name='delivery_jp_free']").attr("checked", false);
		return false;
	}

	if(chkType(quick_price, 'number') == false) {
		alert('금액은 숫자로만 입력하셔야 합니다.');
		$('input[name=quick_price]').val('');
		$('input[name=quick_price]').focus();
		return false;
	}

	if(weight == '') {
		alert('예상무게값을 선택하여햐 합니다.');
		$("input:checkbox[name='delivery_jp_free']").attr("checked", false);
		return false;
	}

	var url = '/quick/cost_preview';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { 'quick_price' : quick_price, 'weight' : weight, 'delivery_free' : delivery_jp_free },
		success: function(d,s) {

			$('#quick_contents').html(d);
			return false;
		},
		cache: false
	});
}


// 레이어 팝업 관련 함수
function main_closeWin() {
	document.getElementById('main_event_popup').style.display = "none";
}

function setCookie( name, value, expirehours ) {
	var todayDate = new Date();
	todayDate.setHours( todayDate.getHours() + expirehours );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function closeWin() {
	setCookie( "event_layer", "done" , 1 );
	document.getElementById('main_event_popup').style.display = "none";
}



// 메인 레이어 카테고리
function get_cate(shop_id , cate1 , cate2 , cate3 , cate4 , cate5 , cate6){
	var url = '/category/sub_category';
	$.ajax({
		type: 'post',
		url: url,
		dataType: 'html',
		data: { "shop_id" : shop_id, "cate1" : cate1, "cate2": cate2, "cate3": cate3, "cate4": cate4, "cate5": cate5, "cate6": cate6 },
		success: function(d,s) {
			$('#cate_contents').html(d);
		},
		cache: false
	});
}

// 서브 카테고리 보이기
function submenuview(idx)
{
	$('#_main_gslist').show();
}

// 서브 카테고리 숨기기
function submenuhide(idx)
{
	$('#_main_gslist').hide();
}


$(function(){

	select_step();
	// 브랜드 이니셜 선택
	$('#search_brand').live('change', function() {

		var brand = $("#search_brand option:selected").val();
		if(brand == 'brand')
		{
			$.ajax({
				url: '/hey/select_type',
				type: 'POST',
				data: { select_val : brand },
				dataType: 'json'
			}).done(function(data){
				$('#search_sel1').hide();
				$('#search_sel2').hide();
				$('#search_box1').html(data.select1);
				$('#search_box2').html(data.select2);
			});

		} else {

			$('#search_box1').html('');
			$('#search_box2').html('');
			$('#search_sel1').show();
			$('#search_sel2').show();
			$('input[name=SearchWord]').val('');
		}
	});

	// 브랜드 선택
	$('#select_spelling').live('change', function() {
		var spelling = $("#select_spelling option:selected").val();

		if(spelling) {
			$.ajax({
				url: '/hey/select_brand',
				type: 'POST',
				data: { spelling : spelling },
				dataType: 'json'
			}).done(function(data){
				$('#search_box2').html(data.select1);
			});
		}
	});

	// 브랜드 선택
	$('#select_brand_name').live('change', function() {
		var brand = $("#select_brand_name option:selected").val();
		$('input[name=SearchWord]').val(brand);
	});

	// top 메뉴 마우스 오버
	$(".menu_rollover").mouseover(function(){
		 var temp = $(this).attr("src");
		 var length = temp.length;
		 var file_name = temp.substring(0, length-6);
		 var status = temp.substring(length-6).substring(0,2);
		 var file_type = temp.substring(length-6).substring(3);
		 if (status == "ff") $(this).attr("src", file_name + "n." + file_type);
	}).mouseout(function(){
		 var temp = $(this).attr("src");
		 var length = temp.length;
		 var file_name = temp.substring(0, length-6);
		 var status = temp.substring(length-6).substring(0,2);
		 var file_type = temp.substring(length-6).substring(3);
		 if (status == "on") $(this).attr("src", file_name + "off." + file_type);
	});

	// 상단 롤링 배너

	var slider = $('.bxslider').bxSlider({
	controls : false,
	pager : false,
	auto : true
	});

	$('#slider-next').click(function(){
	  slider.goToNextSlide();
	  return false;
	});

	$('#slider-prev').click(function(){
	  slider.goToPrevSlide();
	  return false;
	});


	// 페이징 입력시 리스트 호출
	$('#paging_quick a').live('click', function(e) {

		$('#quick_contents').show();
		e.preventDefault();
		var url = $(this).attr('href');
		if(url=='#' || url=='#current') return false;
		$.ajax({
			type: 'post',
			url: url,
			dataType: 'html',
			data: { "user_id" : user_id},
			success: function(d,s) {
				$('#quick_contents').html(d);
			},
			cache: false
		});
		return false;
	});

	$('.mouseover').hover(function() {
		var img_src = $(this).attr('src').split('_off')[0];

		$(this).attr('src', img_src +'_on.gif');
		$('#_main_gslist').show();

	}, function() {
		var img_src = $(this).attr('src').split('_on')[0];
		$(this).attr('src', img_src +'_off.gif');
		$('#_main_gslist').hide();
	});

	$("ul.m_tabs li").click(function() {
		$("ul.m_tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).show();

		if(activeTab == '#tab1') {
			$("#tab1_img").attr("src" , "./images/integ/s_cate09_on.gif");
			$("#tab2_img").attr("src" , "./images/integ/s_cate10.gif");
		}else{
			$("#tab1_img").attr("src" , "./images/integ/s_cate09.gif");
			$("#tab2_img").attr("src" , "./images/integ/s_cate10_on.gif");
		}
		return false;
	});

});




// 통합리뉴얼 메인 상품 스크립트
function main_cate_flip(val){

	if(val == 1){
		$("#main_cate_1").attr('src' , '/images/integ/bb_ya.png');
		$("#main_cate_2").attr('src' , '/images/integ/bb_ea_on.png');

		$("#main_cate_list_1").show();
		$("#main_cate_list_2").hide();
	}else{
		$("#main_cate_1").attr('src' , '/images/integ/bb_ya_on.png');
		$("#main_cate_2").attr('src' , '/images/integ/bb_ea.png');

		$("#main_cate_list_1").hide();
		$("#main_cate_list_2").show();
	}
}

function wp_flip(val){
	for(i=1;i<=4;i++){
		$("#wp"+i+"_img").attr('src' , '/images/integ/wp'+i+'.png');
		$("#wp"+i).hide();
	}
	$("#wp"+val+"_img").attr('src' , '/images/integ/wp'+val+'-1.png');
	$("#wp"+val).css('display', 'inline-block');
}

function process_flip(val){
	if(val == 1){
		$("#process_img1").attr('src' , '/images/integ/prtab1.png');
		$("#process_img2").attr('src' , '/images/integ/prtab2-1.png');
		$("#process1").show();
		$("#process2").hide();
	}else{
		$("#process_img1").attr('src' , '/images/integ/prtab1-1.png');
		$("#process_img2").attr('src' , '/images/integ/prtab2.png');
		$("#process1").hide();
		$("#process2").show();
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

function popup_close(id) {
	close_pop(id, "no", 24, window.location.host);
	self.close();
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
