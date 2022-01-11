$(function(){
    $(".ul-animate").parent("li").on("mouseenter",function(){
        $(this).addClass("ul-animate-css right-ulli-mouse").children('ul').slideDown(10).addClass("ul-animate-css");
    }).on("mouseleave",function(){
        $(this).removeClass("ul-animate-css right-ulli-mouse").children('ul').slideUp(10).removeClass("ul-animate-css");
    })
    $(".last-li").parent("li").on("mouseenter",function(){
        $(this).addClass("ul-animate-css right-ulli-mouse").children().slideDown(10).addClass("ul-animate-css");
    }).on("mouseleave",function(){
        $(this).removeClass("ul-animate-css right-ulli-mouse").children().slideUp(10).removeClass("ul-animate-css");
    })
    $("#ul-list").children('li').on('mouseenter',function(){
        $(this).children('a').css('color','black').siblings('.info-wrapper').css('display', 'block');
    }).on('mouseleave',function(){
        $(this).children('a').css('color','#646464').siblings('.info-wrapper').css('display', 'none');
    })

    var listMunes=$('.munes').children()
    var timer=setInterval(function(){
        var x=0
        var lef=$('.banner-row-image').css('left')
        lef=parseInt(-parseInt(lef)/550)

        lef=-(lef+1)*550
        $('.banner-row-image').animate({'left':lef},1000)
        if(lef<=-2750) {
            lef=-550
            $('.banner-row-image').animate({'left':0},1)
        }
       
    },3000)
    $('.banner-row').on('mouseenter',function(){
        $('.banner-row-chevron-circle-left').css('display','block')
        $('.banner-row-chevron-circle-right').css('display','block')
        
    }).on('mouseleave',function(){
        $('.banner-row-chevron-circle-left').css('display','none')
        $('.banner-row-chevron-circle-right').css('display','none')
    })
    $('.banner-row-chevron-circle-right').on('click',function(){
        clearInterval(timer)
        var inages=$(this).siblings('.banner-row-image')
        var lefts=inages.css('left')
        lefts=Math.ceil(-parseInt(lefts)/550)
        if(lefts+1>=6) {
            lefts=0
            inages.animate({'left':-550*(lefts+1)},1)
            inages.animate({'left':-550*(lefts+2)},100)
            //
        }else{
            inages.animate({'left':-550*(lefts+1)},100)
            //
        }

        timer=setInterval(function(){
            var lef=$('.banner-row-image').css('left')
            lef=parseInt(-parseInt(lef)/550)
        
            //$('.munes').children()[lef]
            lef=-(lef+1)*550
            
            if(lef<-2750) {
                lef=-550
                $('.banner-row-image').animate({'left':0},1)
               
            }else{
                $('.banner-row-image').animate({'left':lef},1000)
            }
        },3000)
        
    })
    $('.banner-row-chevron-circle-left').on('click',function(){
        clearInterval(timer)
        var inages=$(this).siblings('.banner-row-image')
        var lefts=inages.css('left')
        lefts=Math.ceil(-parseInt(lefts)/550)
        if(lefts-1<=0) {
            lefts=6
            inages.animate({'left':-550*(lefts-1)},1)
            inages.animate({'left':-550*(lefts-2)},100)
        }else{
            inages.animate({'left':-550*(lefts-1)},100)
        }

        //
        timer=setInterval(function(){
            var lef=$('.banner-row-image').css('left')
            lef=parseInt(-parseInt(lef)/550)
            lef=-(lef+1)*550
            
            if(lef<-2750) {
                lef=-550
                $('.banner-row-image').animate({'left':0},1)
            }else{
                $('.banner-row-image').animate({'left':lef},1000)
            }
        },3000)
        
    })
    $('#movie-right').on('click',function(){
        $(this).parent('.maoyanMovie-circle-right').siblings('.maoyanMovie').animate({'left':-1190},1000)
    })
    $('.movie-left').on('click',function(){
       $(this).parent('.maoyanMovie-circle-left').siblings('.maoyanMovie').animate({'left':0},1000)
    })
    $('.index-nav-movie').on('mouseenter',function(){
        $(this).children('div').not('.maoyanMovie').css('display', 'block')
    }).on('mouseleave',function(){
       $(this).children('div').not('.maoyanMovie').css('display', 'none')
    })

    $('#movie-rights').on('click',function(){
        $(this).parent('.maoyanMovie-circle-right').siblings('.maoyanMovie').animate({'left':-1190},1000)
    })
    $('.movie-lefts').on('click',function(){
       $(this).parent('.maoyanMovie-circle-left').siblings('.maoyanMovie').animate({'left':0},1000)
    })
   

    $('.showmovietwo').on('mouseenter',function(){
        $(this).addClass('movie-after-two').children('div').css({'display':'block','left':0})
        $('.showmovieone').removeClass('movie-after-one').children('div').css('display','none')
        
         })
   $('.showmovieone').on('mouseenter',function(){
       $(this).addClass('movie-after-one').children('div').css({'display':'block','left':0})
       $('.showmovietwo').removeClass('movie-after-two').children('div').css('display','none')
      
   })
   $('.login-register').on('click',function(){
       window.location.href='./user.html'
   })
   $('.register').on('click',function(){
       window.location.href='./register.html'
   })
   // 动态登录设置
   var search=window.location.search
   if(search){
       search=search.split('=')[1]
           $('.register-box>label').text(search)
           $('.register-user>p').text(search)
           $('.register-box').css('display','block').siblings().css('display','none')
           $('.register-user').css('display','block').siblings().css('display','none')  
       }

   $('.register-box>a').on('click',function(){
       $(this).parent().css('display','none').siblings().css('display','block')
       $('.register-user').css('display','none').siblings().css('display','block')
   })
   $('#user-button-zc').on('click',function(){
       window.location.href='./user.html'
   })
   $('#user-button-regi').on('click',function(){
       window.location.href='./register.html'
   })

   $('.box-table').on('mouseenter',function(){
      $(this).addClass('box-table-int').children('div').css('display','block').parent().siblings().removeClass('box-table-int').children('div').css('display','none')
   })





})