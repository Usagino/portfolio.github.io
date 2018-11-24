$(function() {
  function no_scroll() {
    console.log("no_scroll");
    //PC用
    var scroll_event = 'onwheel' in document ?
      'wheel' :
      'onmousewheel' in document ?
      'mousewheel' :
      'DOMMouseScroll';
    $(document).on(scroll_event, function(e) {
      e.preventDefault();
    });
    //SP用
    $(document).on('touchmove.noScroll', function(e) {
      e.preventDefault();
    });
  }


  //スクロール復活用関数
  function return_scroll() {
    console.log("return_scroll");
    //PC用
    var scroll_event = 'onwheel' in document ?
      'wheel' :
      'onmousewheel' in document ?
      'mousewheel' :
      'DOMMouseScroll';
    $(document).off(scroll_event);
    //SP用
    $(document).off('.noScroll');
  }

  //画面高さ取得
  // スクロールできる要素の数を取得し、バーを描画
  let bar_length = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
  let window_height = document.documentElement.clientHeight;
  let floor_length = bar_length / window_height
  console.log(`このサイトは${bar_length}`);
  console.log(`${floor_length}階建てです`);

  let half = $(window).height() / 2;



  $(`.flex-ham`).click(function(event) {
    $(`.hamburger-menu`).css('right', '0%');
    $(`.hamburger-menu_nav`).css('right', '0%');
  });
  $(`.hamburger-menu`).click(function(event) {
    $(`.hamburger-menu`).css('right', '');
    $(`.hamburger-menu_nav`).css('right', '');
  });

  let pos_list = [],
    content_pos,
    pos;

  let link_array = ['twitter', 'instagram', 'wantedly'];
  for (let icon of link_array) {
    $(`.contact_sns .link_${icon}`).hover(function() {
      $(`.contact_icon_${icon}`).css('right', '0%');
    }, function() {
      $(`.contact_icon_${icon}`).css('right', '100%');
    });
  }


  // hamburger-menuのインタラクション
  let hamburger_list = ["phone", "hamburger-top", "hamburger-middle", "hamburger-bottom"];
  let ham_count = 0;
  console.log(ham_count);

  $(`.hamburger`).on('click', function() {
    if (ham_count == 0) {
      $(`.hamburger span`).css('background', 'white');
      hamburger_list.forEach(function(value) {
        $(`.${value}`).addClass(`${value}-after`);
      });
      ham_count += 1;
      console.log(ham_count);
    } else {
      $(`.hamburger span`).css('background', 'black');
      hamburger_list.forEach(function(value) {
        $(`.${value}`).removeClass(`${value}-after`);
      });
      ham_count -= 1;
      console.log(ham_count);

    }
  });

  let circlebar_draw = () =>{
    // 円の座標を取得してcircle_posオブジェクトに渡している
    let circle_pos = {},
      pos_top = 0,
      pos_left = 0,
      count =0;
    let pos_array = [`.circle-header`,`.wrap-self_text`,`.wrap-works_text`];

    pos_array.forEach(function(class_name) {
      pos_top = $(class_name).offset().top + ($(class_name).height() / 2 );
      pos_left = $(class_name).offset().left + ($(class_name).width() / 2 );
      circle_pos[`${count}_Y`] = pos_top;
      circle_pos[`${count}_X`] = pos_left;
      count++;
    });
    console.log(circle_pos);

    // circle_posオブジェクトの中にある２つの座標間の距離を計測
    let header_dist = Math.sqrt(
      Math.pow( circle_pos[`0_Y`] - circle_pos[`1_Y`] , 2 ) +
      Math.pow( circle_pos[`0_X`] -circle_pos[`1_X`] , 2 )
    );
    $(".circle-header_bar,.circle-header_bar_wrap-color").css('width', `${header_dist}px`);
//
    let self_dist = Math.sqrt(
      Math.pow( circle_pos[`1_Y`] - circle_pos[`2_Y`] , 2 ) +
      Math.pow( circle_pos[`1_X`] -circle_pos[`2_X`] , 2 )
    );
    $(".circle-self_bar").css('width',`${self_dist}px`);
//
    let header_deg = Math.atan2(
      circle_pos[`1_Y`] - circle_pos[`0_Y`],
      circle_pos[`1_X`] -circle_pos[`0_X`]
    ) ;
    $(".circle-header_bar").css('transform', `rotate(${header_deg}rad)`);
//
    let self_deg = Math.atan2(
      circle_pos[`2_Y`] - circle_pos[`1_Y`],
      circle_pos[`2_X`] -circle_pos[`1_X`]
    ) ;
    $(".circle-self_bar").css('transform',`rotate(${self_deg}rad)`);

  }
  if ($('div').hasClass('circle-index')) {
    circlebar_draw();

    window.onresize = function () {
      circlebar_draw();
    };
  }


  // 下から数えて何pxかを算出し、footerを表示する
  // getScrollBottom()は下からのスクロール量を算出する関数
  function getScrollBottom() {
    var body = window.document.body;
    var html = window.document.documentElement;
    var scrollTop = body.scrollTop || html.scrollTop;
    return html.scrollHeight - html.clientHeight - scrollTop;
  }

  $(window).scroll(function() {
    if (getScrollBottom() <= 240) {
      $(`.footer-wrap .contact_section`).addClass('translateX');
      $(`.footer-wrap .contact_icon`).addClass('translateX_double');
    }
  });
  // マウスカーソルのアニメーション

  window.onload=function(){
    //マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", function(e){
      //座標を取得する
      let mX = e.pageX;  //X座標
      let mY = e.pageY;  //Y座標
      //座標を表示する


    });
  }

});
