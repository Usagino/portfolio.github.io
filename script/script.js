

$(function(){
  $.scrollify({section:".contents"});

  let pos_list = [],content_pos,pos;


  for (let i = 1; i <= 4; i++) {
    content_pos = $(`.content-${i}`).offset().top;
    pos_list.push(content_pos);
    console.log(`content-${i} の高さは${content_pos}`);
  }

  for (let i = 1; i <= 4; i++) {
    if(pos_list[i] >= pos){
      console.log(`Hello-${i}`);
    }
  }
  const posanime = () =>{
    pos =  $(window).scrollTop() + 1;
    console.log(pos);
    if(pos_list[0] <= pos && pos_list[1] >= pos){
      console.log(`今は1`);
      $('.flex-pos div:nth-child(1)').addClass('double');
    }else {
      $('.flex-pos div:nth-child(1)').removeClass('double');
    }

    if(pos_list[1] <= pos && pos_list[2] >= pos){
      console.log(`今は2`);
      $('.flex-pos div:nth-child(2)').addClass('double');
    }
    else{
      $('.flex-pos div:nth-child(2)').removeClass('double');
    }

    if(pos_list[2] <= pos && pos_list[3] >= pos){
      console.log(`今は3`);
      $('.flex-pos div:nth-child(3)').addClass('double');
    }else{
      $('.flex-pos div:nth-child(3)').removeClass('double');
    }

    if(pos_list[3] <= pos){
      console.log(`今は4`);
      $('.flex-pos div:nth-child(4)').addClass('double');
    }else{
      $('.flex-pos div:nth-child(4)').removeClass('double');
    }
  }
  posanime();


  $(window).scroll(function(event) {
    posanime();
  });
});
