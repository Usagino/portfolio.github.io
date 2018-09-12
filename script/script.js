$(function(){

  //画面高さ取得

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
        console.log(`今は${i+1}階`);
        $(`.flex-pos div:nth-child(${i+1})`).addClass('double');
      }else {
        $(`.flex-pos div:nth-child(${i+1})`).removeClass('double');
      }
    }
  }

  pos_anime();


  $(window).scroll(function(event) {
    pos_anime();
  });


  let link_array = ['twitter','instagram','wantedly'];
  for(let icon of link_array){
    $(`.link_${icon}`).hover(function() {
      $(`.contact_icon_${icon}`).css('right', '0%');

    }, function() {
      $(`.contact_icon_${icon}`).css('right', '100%');
    });
  }

});
