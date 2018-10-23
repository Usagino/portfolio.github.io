$(function(){


  //画面高さ取得
  // スクロールできる要素の数を取得し、バーを描画
  let bar_length = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
  let window_height = document.documentElement.clientHeight;
  let floor_length = bar_length / window_height
  console.log(`このサイトは${bar_length}`);
  console.log(`${floor_length}階建てです`);
  for(let i= 0; i < floor_length;i++){
    $(`.flex-pos`).append('<div class="pos"><span></span></div>');
  }



  let half = $(window).height() / 2;

  let flex_length = $(".flex-pos div").length

  $.scrollify({section:".contents"});

  $(`.flex-ham`).click(function(event) {
    $(`.hamburger-menu`).css('right', '0%');
    $(`.hamburger-menu_nav`).css('right', '0%');
  });
  $(`.hamburger-menu`).click(function(event) {
    $(`.hamburger-menu`).css('right', '');
    $(`.hamburger-menu_nav`).css('right', '');
  });

  let pos_list = [],content_pos,pos;

  for (let i = 1; i <= flex_length; i++) {
    content_pos = $(`.content-${i}`).offset().top;
    pos_list.push(content_pos - half);
    console.log(`content-${i} の高さは${content_pos}`);
  }

  for (let i = 1; i <= flex_length; i++) {
    if(pos_list[i] >= pos){
      console.log(`Hello-${i}`);
    }
  }

  const pos_anime = () =>{
    pos =  $(window).scrollTop() + 1;
    for (let i = 0; i <= flex_length; i++) {
      if(pos_list[i] <= pos && !(pos_list[ i+1 ] <= pos)){
        $(`.flex-pos div:nth-child(${i+1})`).addClass('double').css('opacity', 1);
      }else {
        $(`.flex-pos div:nth-child(${i+1})`).removeClass('double').css('opacity', 0.1);
      }
    }
  }
  const scroll_anime = () =>{
    if(pos_list[1] <= pos){
      $(`.content-2 h1`).addClass(`move_left`);
      $(`.content-2 img`).addClass(`move_bottom`);
      $(`.content-2 a`).addClass(`move_left`);
    }
    if(pos_list[2] <= pos){
      $(`.content-3 h1`).addClass(`move_right`);
      $(`.content-3 img`).addClass(`move_top`);
      $(`.content-3 a`).addClass(`move_right`);
    }

  }

  pos_anime();
  scroll_anime();

  $(window).scroll(function(event) {
    pos =  $(window).scrollTop() + 1;
    pos_anime();
    scroll_anime();
  });

  let link_array = ['twitter','instagram','wantedly'];
  for(let icon of link_array){
    $(`.contact_sns .link_${icon}`).hover(function() {
      $(`.contact_icon_${icon}`).css('right', '0%');
    }, function() {
      $(`.contact_icon_${icon}`).css('right', '100%');
    });
  }

  // 下から数えて何pxかを算出し、footerを表示する
  let h = $(window).height();
  $(window).scroll(function() {
    let bottom_pos = bar_length - pos - h + 1;

    if(bottom_pos <= h/2){
      $(`.footer-wrap .contact_section`).addClass('translateX');
      $(`.footer-wrap .contact_icon`).addClass('translateX_double');
    }
  })

  // hamburger-menu
  $(`.hamburger`).on('click',function(){
     $(`.phone`).css('transform','translateX(0%)');
     $(this).css('opacity',0);
     console.log("押された");
  });

});
